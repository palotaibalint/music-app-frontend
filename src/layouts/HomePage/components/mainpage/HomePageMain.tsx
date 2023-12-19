import { Footer } from "../../../NavBarAndFooter/Footer";
import { BestRatedSongs } from "./BestRatedSongs";
import MainHeader from "./MainHeader";
import { PopularPlaylistSongs } from "./PopularPlaylistSongs";
import TopSongs from "./TopSongs";

export const HomePageMain = () => {
  return (
    <div
      className="col-sm-9 background-main d-flex flex-column justify-content-between"
      style={{ overflowX: "hidden" }}
    >
      <MainHeader />
      <div className="flex-fill">
        <TopSongs />
        <BestRatedSongs />
        <PopularPlaylistSongs />
      </div>
      <Footer />
    </div>
  );
};
