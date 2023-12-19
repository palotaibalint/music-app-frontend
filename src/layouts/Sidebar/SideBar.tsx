import { Link } from "react-router-dom";
import PlaylistManagement from "./Playlist/PlaylistManagement";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../NavBarAndFooter/LoginButton";
import LogoutButton from "../NavBarAndFooter/LogoutButton";

const footerBackgroundColor = "#0a0127";

export const SideBar = () => {
  const { isAuthenticated, user } = useAuth0();
  return (
    <nav className="col-sm-3 background-darker d-flex flex-column sticky-sidebar">
      <div
        className="fixed-sidebar d-flex flex-column"
        style={{ height: "100%" }}
      >
        <div>
          <a className="text-decoration-none ms-4 d-flex align-items-center text-color">
            <span className="fs-1">HarmonyCritic</span>
          </a>
          <hr className="text-color"></hr>
          <ul className="nav nav-pills flex-column primary-color">
            <li className="nav-item text-color my-1">
              <Link to="/" className="nav-link main-span" aria-current="page">
                <i className="bi bi-house fs-5"></i>
                <span className="fs-5 ms-2">Home</span>
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
            {isAuthenticated && (
              <li className="nav-item text-color my-1">
                <Link
                  to="/profile"
                  className="nav-link main-span"
                  aria-current="page"
                >
                  <i className="bi bi-house fs-5"></i>
                  <span className="fs-5 ms-2">Profile</span>
                </Link>
              </li>
            )}
          </ul>
          <hr className="text-color"></hr>
        </div>

        <div className="flex-grow-1" style={{ backgroundColor: "#0f0335" }}>
          <ul className="nav nav-pills flex-column primary-color">
            <li className="nav-item text-color my-1">
              <span className="fs-5 my-1 ms-2 text-color">Playlists</span>
            </li>
            <PlaylistManagement />
          </ul>
        </div>
        <div style={{ height: "5vh", backgroundColor: footerBackgroundColor }}>
          <LoginButton />
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
};
