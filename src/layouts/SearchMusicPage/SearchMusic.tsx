import { SideBar } from "../Sidebar/SideBar";
import { SearchPage } from "./SearchPage";

export const SearchMusic = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <SideBar />
        <SearchPage />
      </div>
    </div>
  );
};
