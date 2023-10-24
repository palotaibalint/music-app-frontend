import { SideBar } from "../Sidebar/SideBar";
import { ReviewPage } from "./ReviewPage";

export const AssembledReviewPage = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <SideBar />
        <ReviewPage />
      </div>
    </div>
  );
};
