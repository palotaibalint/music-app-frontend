import { useLocation } from "react-router-dom";
import { SideBar } from "../SideBar";
import PlaylistPage from "./Playlist";

export const AssembledPlaylistPage = () => {
  const location = useLocation();
  const { playlistId } = location.state;

  return (
    <div className="container-fluid">
      <div className="row">
        <SideBar />
        <PlaylistPage playlistId={playlistId} />
      </div>
    </div>
  );
};
