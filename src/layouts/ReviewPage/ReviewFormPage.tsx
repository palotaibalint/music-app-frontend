import MainHeader from "../HomePage/components/mainpage/MainHeader";
import { Footer } from "../NavBarAndFooter/Footer";
import ReviewForm from "./ReviewForm";

export const ReviewFormPage = () => {
  return (
    <div className="col-sm-9 background-main d-flex flex-column justify-content-between">
      <MainHeader />
      <div className="flex-fill">
        <ReviewForm />
      </div>
      <Footer />
    </div>
  );
};
