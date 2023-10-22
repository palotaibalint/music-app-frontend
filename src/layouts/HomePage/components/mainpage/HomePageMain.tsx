import { Footer } from "../../../NavBarAndFooter/Footer";
import MainHeader from "./MainHeader";
import { SongsForYou } from "./SongsForYou";
import { TopSongs } from "./TopSongs";
import { YourMostPlayed } from "./YourMostPlayed";

export const HomePageMain = () => {
  return (
    <div className="col-sm-9 background-main d-flex flex-column justify-content-between">
      <MainHeader />
      <div className="flex-fill">
        <TopSongs />
        <SongsForYou />
        <YourMostPlayed />
        <Footer />
      </div>
    </div>
  );
};
