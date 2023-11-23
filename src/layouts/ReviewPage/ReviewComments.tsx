import React, { useState, useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap"; // Import Col and Row for better layout
import { useAuth0 } from "@auth0/auth0-react";
import SongModel from "../../models/SongModel";
import ReviewModel from "../../models/ReviewModel";
import LoadingScreen from "../../utils/LoadingPage";
import { Review } from "./Review";
import AddReviewButton from "./AddReviewButton";
import SongTable from "./SongTable";

type Props = {
  song: SongModel;
  songId: number;
};

function ReviewComments({ song, songId }: Props) {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [totalStars, setTotalStars] = useState(0);
  const [isLoadingReview, setIsLoadingReview] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);
  const [newReview, setNewReview] = useState<ReviewModel | null>(null);
  const [replyTo, setReplyTo] = useState<number | null>(null);

  useEffect(() => {
    const fetchCommentsFromApi = async () => {
      try {
        if (isAuthenticated) {
          const reviewUrl = `http://localhost:8081/api/reviews/public/by-id?songId=${songId}`;
          const responseReviews = await fetch(reviewUrl);

          if (!responseReviews.ok) {
            throw new Error("Something went wrong!");
          }

          const responseJsonReviews = await responseReviews.json();
          const responseData = responseJsonReviews.content;
          const loadedReviews: ReviewModel[] = [];
          let weightedStarReviews = 0;

          for (const key in responseData) {
            const reviewData = responseData[key];
            const loadedReview: ReviewModel = {
              id: reviewData.id,
              userEmail: reviewData.userEmail,
              userName: reviewData.userName,
              date: reviewData.date,
              rating: reviewData.rating,
              song_id: reviewData.songId,
              reviewTitle: reviewData.reviewTitle,
              reviewDescription: reviewData.reviewDescription,
            };

            loadedReviews.push(loadedReview);
            weightedStarReviews += reviewData.rating;
          }

          if (loadedReviews.length > 0) {
            const averageRating = (
              Math.round((weightedStarReviews / loadedReviews.length) * 2) / 2
            ).toFixed(1);
            setTotalStars(Number(averageRating));
          }

          setReviews(loadedReviews);
        }

        setIsLoadingReview(false);
      } catch (error) {
        setIsLoadingReview(false);
        setHttpError((error as Error).message);
      }
    };

    fetchCommentsFromApi();
  }, [songId, isAuthenticated, getAccessTokenSilently]);

  if (isLoadingReview) {
    return <LoadingScreen />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  const handleAddReview = () => {
    setNewReview({
      id: -1,
      userEmail: "",
      userName: "",
      date: new Date(),
      rating: 0,
      song_id: songId,
      reviewTitle: "",
      reviewDescription: "",
    });
  };

  const handleReplyTo = (reviewId: number) => {
    setReplyTo(reviewId);
  };

  const sumOfRatings = reviews.reduce((sum, review) => sum + review.rating, 0);

  const averageReviewRating =
    reviews.length > 0 ? sumOfRatings / reviews.length : 0;

  const songDetails = {
    title: song.title,
    artist: song.artist,
    album: song.album,
    duration: song.duration,
    clicks: song.clicks,
    genre: "",
    reviewsnumber: reviews.length,
    rating: averageReviewRating.toFixed(1),
  };

  return (
    <div className="container-fluid">
      <Row className="container-fluid">
        <Col md={5}>
          <Card style={{ width: "35rem" }}>
            <Card.Img variant="top" src={song.img} />
          </Card>
        </Col>
        <Col md={7}>
          <SongTable song={songDetails} />
        </Col>
      </Row>
      <Row className="container-fluid">
        {isAuthenticated && (
          <div className="mb-4">
            <AddReviewButton onAddReview={handleAddReview} />
          </div>
        )}
        {/* Display Existing Reviews */}
        {reviews.map((review) => (
          <Review key={review.id} review={review} />
        ))}
      </Row>
    </div>
  );
}

export default ReviewComments;
