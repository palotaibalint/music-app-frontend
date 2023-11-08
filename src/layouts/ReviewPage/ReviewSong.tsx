import React, { useState, useEffect } from "react";
import { Card, Button, ListGroup, Form } from "react-bootstrap";
import SongModel from "../../models/SongModel";
import ReviewModel from "../../models/ReviewModel";
import LoadingScreen from "../../utils/LoadingPage";

type Props = {
  song: SongModel;
  songId: number;
};

function ReviewSong({ song, songId }: Props) {
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [totalStars, setTotalStars] = useState(0);
  const [isLoadingReview, setIsLoadingReview] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchCommentsFromApi = async () => {
      const reviewUrl: string = `http://localhost:8081/api/reviews/search/findBySongId?songId=${songId}`;
      const responseReviews = await fetch(reviewUrl);
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

      if (loadedReviews) {
        const round = (
          Math.round((weightedStarReviews / loadedReviews.length) * 2) / 2
        ).toFixed(1);
        setTotalStars(Number(round));
      }

      setReviews(loadedReviews);
      setIsLoadingReview(false);
    };

    fetchCommentsFromApi().catch((error: any) => {
      setIsLoadingReview(false);
      setHttpError(error.message);
    });
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
      </div>
    </div>
  );
}

export default ReviewSong;
