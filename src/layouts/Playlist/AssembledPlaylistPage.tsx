import { SideBar } from "../Sidebar/SideBar";
import { PlaylistPageMain } from "./PlaylistPageMain";

export const AssembledPlaylistPage = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <SideBar />
        <PlaylistPageMain />
      </div>
    </div>
  );
};
