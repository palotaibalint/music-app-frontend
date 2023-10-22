import { HomePageMain } from "./mainpage/HomePageMain";
import { SideBar } from "../../Sidebar/SideBar";

export const AssembledHomePage = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <SideBar />
        <HomePageMain />
      </div>
    </div>
  );
};
