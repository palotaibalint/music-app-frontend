import { useLocation } from "react-router-dom";
import { SideBar } from "../Sidebar/SideBar";
import { ReviewPage } from "./ReviewPage";

export const AssembledReviewPage = () => {
  const location = useLocation();
  const { songData } = location.state;

  return (
    <div className="container-fluid">
      <div className="row">
        <SideBar />
        <ReviewPage id={songData.id} />
      </div>
    </div>
  );
};
