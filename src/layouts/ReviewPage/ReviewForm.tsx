import React, { useState } from "react";

const ReviewForm: React.FC = () => {
  const [rating, setRating] = useState<number>(1);
  const [description, setDescription] = useState<string>("");
  const [summary, setSummary] = useState<string>("");

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleSummaryChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setSummary(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission here, e.g., send data to the server
  };
  return (
    <div className="container-fluid">
      <h2 className="text-decoration-none ms-4 mb-4 d-flex align-items-center text-color d-none d-sm-inline">
        Write your review
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mt-5">
          <label className="form-label text-color">Short summary:</label>
          <textarea
            className="form-control"
            rows={2}
            value={summary}
            onChange={handleSummaryChange}
            placeholder="Write a short summary..."
          />
        </div>
        <div className="form-group mt-3">
          <label className="form-label text-color">Detailed review:</label>
          <textarea
            className="form-control"
            rows={6}
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Write a detailed review..."
          />
        </div>
        <div className="star-rating">
          <label className="form-label text-color mt-4">Rating:</label>
          <br></br>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${star <= rating ? "yellow" : ""}`}
              onClick={() => handleRatingChange(star)}
            >
              {star <= rating ? (
                <i className="bi bi-star-fill custom-star-fill"></i>
              ) : (
                <i className="bi bi-star custom-star"></i>
              )}
            </span>
          ))}
        </div>
        <button type="submit" className="btn btn-primary mt-4">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
