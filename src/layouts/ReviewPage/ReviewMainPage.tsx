import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import SongModel from "../../models/SongModel";
import ReviewModel from "../../models/ReviewModel";
import LoadingScreen from "../../utils/LoadingPage";
import { Review } from "./Review";
import AddReviewButton from "./AddReviewButton";

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
        const accessToken = isAuthenticated
          ? await getAccessTokenSilently()
          : null;

        const headers: HeadersInit = {
          Accept: "application/json",
          "Content-Type": "application/json",
        };

        if (accessToken) {
          headers.Authorization = `Bearer ${accessToken}`;
        }

        const reviewUrl: string = `http://localhost:8081/api/reviews/song/getReviewsBySongId?songId=${songId}`;
        const responseReviews = await fetch(reviewUrl, { headers });

        if (!responseReviews.ok) {
          throw new Error("Something went wrong!");
        }

        const responseJsonReviews = await responseReviews.json();
        const responseData = responseJsonReviews._embedded.reviews;
        const loadedReviews: ReviewModel[] = [];
        let weightedStarReviews: number = 0;

        for (const key in responseData) {
          loadedReviews.push({
            id: responseData[key].id,
            userEmail: responseData[key].userEmail,
            userName: responseData[key].userName,
            date: responseData[key].date,
            rating: responseData[key].rating,
            song_id: responseData[key].songId,
            reviewTitle: responseData[key].reviewTitle,
            reviewDescription: responseData[key].reviewDescription,
          });
          weightedStarReviews = weightedStarReviews + responseData[key].rating;
        }

        if (loadedReviews.length > 0) {
          const round = (
            Math.round((weightedStarReviews / loadedReviews.length) * 2) / 2
          ).toFixed(1);
          setTotalStars(Number(round));
        }

        setReviews(loadedReviews);
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
      id: -1, // Use a temporary negative ID to indicate it's a new review
      userEmail: "", // Assuming you might get the user's email from Auth0
      userName: "", // Set the user's name based on your authentication system
      date: new Date(), // Set the current date
      rating: 0, // Set a default rating or let the user choose
      song_id: songId,
      reviewTitle: "", // You might want to add a title to the review
      reviewDescription: "", // Initialize with an empty description
    });
  };

  const handleReplyTo = (reviewId: number) => {
    // Implement the logic to handle replies to existing reviews
    // You can use setReplyTo to store the review ID to which the user is replying.
    setReplyTo(reviewId);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">
          <Card style={{ width: "20rem" }}>
            <Card.Img variant="top" src={song.img} />
            <Card.Body>
              <Card.Title>{song.title}</Card.Title>
              <Card.Text>
                <h5>{song.artist}</h5>
                <b>Album:</b> {song.album}
                <br />
                <b>Duration:</b> {song.duration}
                <br />
                Visited {song.clicks} times
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-6">
          {/* Review Section */}
          <div className="mb-4">
            <AddReviewButton onAddReview={handleAddReview} />
          </div>
          {/* Display Existing Reviews */}
          {reviews.map((review) => (
            <Review review={review} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ReviewComments;
