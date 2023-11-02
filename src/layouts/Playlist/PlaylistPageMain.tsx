import MainHeader from "../HomePage/components/mainpage/MainHeader";
import { Footer } from "../NavBarAndFooter/Footer";
import Playlist from "./Playlist";

export const PlaylistPageMain = () => {
  return (
    <div className="col-sm-9 background-main d-flex flex-column justify-content-between">
      <MainHeader />
      <div className="flex-fill">
        <Playlist />
      </div>
      <Footer />
    </div>
  );
};
