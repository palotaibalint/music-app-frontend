import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ReviewModel from "../../models/ReviewModel";
import CommentModel from "../../models/CommentModel";
import { StarsReview } from "../../utils/StarsReview";
import { Button } from "react-bootstrap";
import AddCommentsButton from "./Comments/AddCommentsButton";
import CommentDelete from "./Comments/CommentDelete";
import DeleteConfirmationModal from "../../utils/DeleteConfirmModal";

export const Review: React.FC<{
  review: ReviewModel;
  songId: number | undefined;
  onDelete: () => void;
}> = (props) => {
  const date = new Date(props.review.date);

  const [httpError, setHttpError] = useState<string | null>(null);
  const [comments, setComments] = useState<CommentModel[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  const longMonth = date.toLocaleString("en-us", { month: "long" });
  const dateDay = date.getDate();
  const dateYear = date.getFullYear();
  const dateRender = longMonth + " " + dateDay + ", " + dateYear;

  const fetchCommentsFromApi = async () => {
    try {
      const commentUrl = `http://localhost:8081/api/comments/public/review-comments?id=${props.review.id}`;
      const responseComments = await fetch(commentUrl);

      if (!responseComments.ok) {
        throw new Error("Something went wrong!");
      }

      const responseJsonComments = await responseComments.json();
      const responseData = responseJsonComments;
      const loadedComments: CommentModel[] = [];

      for (const key in responseData) {
        loadedComments.push({
          id: responseData[key].id,
          userName: responseData[key].userName,
          review_id: responseData[key].reviewId,
          text: responseData[key].text,
        });
      }

      setComments(loadedComments);
      setIsLoadingComments(false);
    } catch (error) {
      setIsLoadingComments(false);
      setHttpError((error as Error).message);
    }
  };

  useEffect(() => {
    fetchCommentsFromApi();
  }, [isAuthenticated]);

  const onCommentDeleted = () => {
    fetchCommentsFromApi();
  };

  const handleDeleteReview = async () => {
    if (isAuthenticated) {
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: "https://music-api",
            scope: "openid profile email",
          },
        });

        const requestOptions = {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };

        const url = `http://localhost:8081/api/reviews/private/delete?userEmail=${user?.email}&songId=${props.songId}`;
        const deleteRequest = await fetch(url, requestOptions);

        props.onDelete();
        setShowDeleteModal(false);

        if (!deleteRequest.ok) {
          console.error(
            `Error fetching user review: ${deleteRequest.status} - ${deleteRequest.statusText}`
          );
        }
      } catch (error) {
        console.error("Error getting ID token claims:", error);
      }
    }
  };

  const onAddedComment = () => {
    fetchCommentsFromApi();
  };

  return (
    <div style={{ marginLeft: "20px", marginTop: "20px" }}>
      <div className="col-sm-8 col-md-8">
        <div className="col text-color h3" style={{ marginLeft: "3px" }}>
          {props.review.userName}
        </div>
        <h4
          className="text-color"
          style={{ marginTop: "20px", wordWrap: "break-word" }}
        >
          {props.review.reviewTitle}
        </h4>
        <div className="row">
          <div className="col h6 text-color" style={{ wordWrap: "break-word" }}>
            {props.review.reviewDescription}
          </div>
          <div className="col">
            <StarsReview Rating={props.review.rating} size={20}></StarsReview>
          </div>
        </div>
        <div className="row">
          <div className="col text-color">{dateRender}</div>
        </div>
      </div>
      <div
        className="text-color col-sm-8 col-md-8"
        style={{ marginTop: "20px" }}
      >
        {comments.length > 0 ? <h6>Replies:</h6> : <h6>No replies</h6>}
        {isLoadingComments ? (
          <p>Loading replies...</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              style={{ marginLeft: "11px", marginTop: "20px" }}
            >
              <h5 className="text-color">{comment.userName}</h5>
              <p className="text-color">{comment.text}</p>
              {isAuthenticated && comment.userName === user?.nickname && (
                <CommentDelete id={comment.id} onDelete={onCommentDeleted} />
              )}
            </div>
          ))
        )}
      </div>
      {isAuthenticated && (
        <AddCommentsButton reviewId={props.review.id} onAdd={onAddedComment} />
      )}
      {isAuthenticated &&
        props.review.userName === user?.nickname &&
        props.review.userEmail === user.email && (
          <>
            <Button
              variant="danger"
              onClick={() => setShowDeleteModal(true)}
              style={{ marginTop: "10px" }}
            >
              Delete Review
            </Button>
            <DeleteConfirmationModal
              show={showDeleteModal}
              handleClose={() => setShowDeleteModal(false)}
              handleDelete={handleDeleteReview}
            />
          </>
        )}
      <hr style={{ borderColor: "white" }} />
    </div>
  );
};
