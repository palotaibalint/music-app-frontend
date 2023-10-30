import { SideBar } from "../Sidebar/SideBar";
import { ReviewFormPage } from "./ReviewFormPage";

export const AssembledReviewFormPage = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <SideBar />
        <ReviewFormPage />
      </div>
    </div>
  );
};
