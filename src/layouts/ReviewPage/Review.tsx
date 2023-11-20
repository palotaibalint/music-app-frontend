import ReviewModel from "../../models/ReviewModel";
import { StarsReview } from "../../utils/StarsReview";

export const Review: React.FC<{ review: ReviewModel }> = (props) => {
  const date = new Date(props.review.date);

  const longMonth = date.toLocaleString("en-us", { month: "long" });
  const dateDay = date.getDate();
  const dateYear = date.getFullYear();

  const dateRender = longMonth + " " + dateDay + ", " + dateYear;

  return (
    <div>
      <div className="col-sm-8 col-md-8">
        <h5>{props.review.userName}</h5>
        <h3>{props.review.userEmail}</h3>
        <div className="row">
          <div className="col">{dateRender}</div>
          <div className="col">
            <StarsReview Rating={props.review.rating} size={16}></StarsReview>
          </div>
        </div>
        <div className="mt-2">
          <h3>{props.review.reviewTitle}</h3>
          <p>{props.review.reviewDescription}</p>
        </div>
      </div>
    </div>
  );
};
