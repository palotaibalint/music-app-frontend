import React, { useState, useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import SongModel from "../../../models/SongModel";
import ReviewModel from "../../../models/ReviewModel";
import LoadingScreen from "../../../utils/LoadingPage";
import AddReviewButton from "../AddReviewButton";
import SongTable from "../SongTable";
import { StarsReview } from "../../../utils/StarsReview";
import { LatestReviews } from "../LatestReviews";
import YouTubePlayerUtil from "../../../utils/YoutubePlayer";

type Props = {
  song: SongModel;
  songId: number;
};

function ReviewComments({ song, songId }: Props) {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [totalStars, setTotalStars] = useState(0);
  const [isLoadingReview, setIsLoadingReview] = useState(true);
  const [isReviewLeft, setIsReviewLeft] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [songOwnerUsername, setSongOwnerUsername] = useState<string | null>(
    null
  );

  useEffect(() => {}, []);

  useEffect(() => {
    const fetchUserReview = async () => {
      if (isAuthenticated) {
        try {
          const accessToken = await getAccessTokenSilently({
            authorizationParams: {
              audience: "https://music-api",
              scope: "openid profile email",
            },
          });

          const requestOptions = {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          };

          const url = `http://localhost:8081/api/reviews/private/user/song?userEmail=${user?.email}&songId=${songId}`;
          const userReview = await fetch(url, requestOptions);

          if (!userReview.ok) {
            console.error(
              `Error fetching user review: ${userReview.status} - ${userReview.statusText}`
            );
            setIsLoadingReview(false);
            return;
          }

          const userReviewResponseText = await userReview.text();

          if (!userReviewResponseText.trim()) {
            setIsReviewLeft(true);
            setIsLoadingReview(false);
            return;
          }

          setIsReviewLeft(false);

          const userReviewResponseJson = JSON.parse(userReviewResponseText);
        } catch (error) {
          console.error("Error getting ID token claims:", error);
          setIsLoadingReview(false);
        }
      } else {
        setIsLoadingReview(false);
      }
    };

    fetchUserReview();
  }, [isAuthenticated]);

  const fetchReviewsFromApi = async () => {
    try {
      const reviewUrl = `http://localhost:8081/api/reviews/public/by-id?songId=${songId}`;
      const responseReviews = await fetch(reviewUrl);

      if (!responseReviews.ok) {
        throw new Error("Something went wrong!");
      }

      const responseJsonReviews = await responseReviews.json();
      const responseData = responseJsonReviews.content;
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

      if (loadedReviews) {
        const averageRating = (
          Math.round((weightedStarReviews / loadedReviews.length) * 2) / 2
        ).toFixed(1);
        setTotalStars(Number(averageRating));
      }

      setReviews(loadedReviews);
      setIsLoadingReview(false);
    } catch (error) {
      setIsLoadingReview(false);
      setHttpError((error as Error).message);
    }
  };

  const fetchSongOwnerUsername = async () => {
    if (isAuthenticated) {
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: "https://music-api",
            scope: "openid profile email",
          },
        });

        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };
        const url = `http://localhost:8081/api/songs/private/song-owner?id=${songId}`;
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
          throw new Error("Failed to fetch song owner username");
        }
        const username = await response.text(); // Assuming the response is just a plain text username
        setSongOwnerUsername(username);
      } catch (error) {
        console.error("Error fetching song owner username:", error);
        setSongOwnerUsername(null);
      }
    }
  };

  useEffect(() => {
    fetchSongOwnerUsername();
    fetchReviewsFromApi();
  }, [songId]);

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
    genres: song.genres,
    owner: songOwnerUsername,
    link: song.link,
    reviewsnumber: reviews.length,
    rating: averageReviewRating.toFixed(1),
  };

  return (
    <div className="container-fluid">
      <Row className="container-fluid">
        <Col md={5}>
          <Card
            style={{ width: "35rem", marginTop: "20px", marginBottom: "20px" }}
          >
            <Card.Img variant="top" src={song.img} />
          </Card>
        </Col>
        <Col md={7}>
          <SongTable song={songDetails} />
          <div style={{ marginLeft: "20px", marginTop: "20px" }}>
            <h3 className="text-color">Rating:</h3>
            <StarsReview Rating={totalStars} size={32} />
            {isAuthenticated ? (
              isReviewLeft ? (
                <div
                  className="mb-4"
                  style={{ marginLeft: "20px", marginTop: "20px" }}
                >
                  <AddReviewButton
                    songId={songId}
                    onReviewAdded={fetchReviewsFromApi}
                  />
                </div>
              ) : (
                <p className="text-color">Thank you for your review!</p>
              )
            ) : (
              <p className="text-color">Sign in to leave a review</p>
            )}
          </div>
        </Col>
      </Row>
      {songDetails.link && (
        <>
          <h3 className="text-color" style={{ marginTop: "20px" }}>
            Listen to the song:
          </h3>
          <YouTubePlayerUtil url={songDetails.link} />
        </>
      )}
      <Row className="container-fluid">
        <hr style={{ borderColor: "white" }} />
        <LatestReviews
          reviews={reviews}
          songId={songId}
          onDelete={fetchReviewsFromApi}
          mobile={true}
        />
      </Row>
    </div>
  );
}

export default ReviewComments;
