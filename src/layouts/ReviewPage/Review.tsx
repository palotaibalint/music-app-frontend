import { useAuth0 } from "@auth0/auth0-react";
import ReviewModel from "../../models/ReviewModel";
import { StarsReview } from "../../utils/StarsReview";
import { Button } from "react-bootstrap";
import AddCommentsButton from "./Comments/AddCommentsButton";
import { useEffect, useState } from "react";
import CommentModel from "../../models/CommentModel";
import CommentDelete from "./Comments/CommentDelete";

export const Review: React.FC<{
  review: ReviewModel;
  songId: number | undefined;
}> = (props) => {
  const date = new Date(props.review.date);

  const [httpError, setHttpError] = useState<string | null>(null);
  const [comments, setComments] = useState<CommentModel[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(true);

  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  const longMonth = date.toLocaleString("en-us", { month: "long" });
  const dateDay = date.getDate();
  const dateYear = date.getFullYear();

  const dateRender = longMonth + " " + dateDay + ", " + dateYear;

  useEffect(() => {
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

    fetchCommentsFromApi();
  }, [isAuthenticated]);

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

        if (!deleteRequest.ok) {
          console.error(
            `Error fetching user review: ${deleteRequest.status} - ${deleteRequest.statusText}`
          );
        }

        // Continue with the rest of your code...
      } catch (error) {
        console.error("Error getting ID token claims:", error);
      }
    }
  };

  return (
    <div style={{ marginLeft: "20px", marginTop: "20px" }}>
      <div className="col-sm-8 col-md-8">
        <div className="col text-color h3" style={{ marginLeft: "3px" }}>
          {props.review.userName}
        </div>
        <h4 className="text-color" style={{ marginTop: "20px" }}>
          {props.review.reviewTitle}
        </h4>
        <div className="row">
          <div className="col h6 text-color">
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
          <>
            {comments.map((comment) => (
              <>
                <div style={{ marginLeft: "11px", marginTop: "20px" }}>
                  <h5 className="text-color">{comment.userName}</h5>
                  <p className="text-color" key={comment.id}>
                    {comment.text}
                  </p>
                  {isAuthenticated &&
                    props.review.userName === user?.nickname &&
                    props.review.userEmail === user.email && (
                      <CommentDelete id={comment.id} />
                    )}
                </div>
              </>
            ))}
          </>
        )}
      </div>
      {isAuthenticated && <AddCommentsButton reviewId={props.review.id} />}
      {isAuthenticated &&
        props.review.userName === user?.nickname &&
        props.review.userEmail === user.email && (
          <Button
            variant="danger"
            onClick={handleDeleteReview}
            style={{ marginTop: "10px" }}
          >
            Delete Review
          </Button>
        )}
      <hr style={{ borderColor: "white" }} />
    </div>
  );
};
