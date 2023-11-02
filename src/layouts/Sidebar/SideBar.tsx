import { Link } from "react-router-dom";
import PlaylistManagement from "./PlaylistManagement";

export const SideBar = () => {
  return (
    <nav className="col-sm-3 background-darker d-flex d-none d-md-block flex-column justify-content-between sticky-sidebar sidebar">
      <div className="fixed-sidebar">
        <a className="text-decoration-none ms-4 d-flex align-items-center text-color d-none d-sm-inline">
          <span className="fs-1">HarmonyCritic</span>
        </a>
        <hr className="text-color d-none d-sm-block"></hr>
        <ul className="nav nav-pills flex-column primary-color">
          <li className="nav-item text-color my-1">
            <Link to="/" className="nav-link main-span" aria-current="page">
              <i className="bi bi-house fs-5"></i>
              <span className="fs-5 ms-2 ">Home</span>
            </Link>
          </li>
          <li className="nav-item text-color my-1">
            <Link
              to="/search"
              className="nav-link main-span"
              aria-current="page"
            >
              <i className="bi bi-search fs-5"></i>
              <span className="fs-5 ms-2">Search</span>
            </Link>
          </li>
        </ul>
        <hr className="text-color d-none d-sm-block"></hr>
        <ul className="nav nav-pills flex-column  primary-color">
          <li className="nav-item my-1">
            <Link
              to="/submitreview"
              className="nav-link main-span"
              aria-current="page"
            >
              <span className="fs-7 ms-3">My reviews</span>
            </Link>
          </li>
          <li className="nav-item text-color my-1">
            <span className="fs-5 my-1 ms-2 text-color">Playlists</span>
          </li>
          <PlaylistManagement />
        </ul>
      </div>
    </nav>
  );
};
