import MainHeader from "../HomePage/components/mainpage/MainHeader";
import { Footer } from "../NavBarAndFooter/Footer";
import Search from "./Search";

export const SearchPage = () => {
  return (
    <div className="col-sm-9 background-main d-flex flex-column justify-content-between">
      <MainHeader />
      <div className="flex-fill">
        <Search />
      </div>
      <Footer />
    </div>
  );
};
