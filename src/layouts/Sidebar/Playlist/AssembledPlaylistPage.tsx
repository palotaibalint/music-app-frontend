import { useLocation } from "react-router-dom";
import { SideBar } from "../SideBar";
import PlaylistPage from "./PlaylistPage";

export const AssembledPlaylistPage = () => {
  const location = useLocation();
  const { playlistId, playlistName } = location.state;

  return (
    <div className="container-fluid">
      <div className="row">
        <SideBar />
        <PlaylistPage playlistId={playlistId} playlistName={playlistName} />
      </div>
    </div>
  );
};
