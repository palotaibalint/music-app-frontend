import { Link } from "react-router-dom";
import PlaylistModel from "../../models/PlaylistModel";

export const PlaylistSidebarItem: React.FC<{ playlist: PlaylistModel }> = (
  props
) => {
  return (
    <li className="list-group-item py-3">
      <Link
        to={`/playlist/${props.playlist.id}`}
        className="nav-link main-span"
      >
        <div className="d-flex text-color justify-content-between align-items-center">
          <h4 className="m-0">{props.playlist.name}</h4>
        </div>
      </Link>
    </li>
  );
};
