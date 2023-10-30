import { Link } from "react-router-dom";

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
          <li className="nav-item text-color my-1">
            <span className="fs-5 my-1 ms-2 text-color">Reviews</span>
          </li>
          <li className="nav-item my-1">
            <Link
              to="/review"
              className="nav-link main-span"
              aria-current="page"
            >
              <i className="bi bi-arrow-right fs-7"></i>
              <span className="fs-7 ms-3">All reviews</span>
            </Link>
          </li>
          <li className="nav-item my-1">
            <Link
              to="/submitreview"
              className="nav-link main-span"
              aria-current="page"
            >
              <i className="bi bi-arrow-right fs-7"></i>
              <span className="fs-7 ms-3">My reviews</span>
            </Link>
          </li>
          <li className="nav-item text-color my-1">
            <span className="fs-5 my-1 ms-2 text-color">Playlists</span>
          </li>
          <li className="nav-item my-1">
            <a href="#" className="nav-link main-span" aria-current="page">
              <i className="bi bi-arrow-right fs-7"></i>
              <span className="fs-7 ms-3">All playlists</span>
            </a>
          </li>
          <li className="nav-item text-color my-2">
            <a href="#" className="nav-link playlist-item" aria-current="page">
              <div className="row text-color">
                <div className="col-auto">
                  <img src="album-image.jpg" alt="Playlist Image" width="100" />
                </div>
                <div className="col">
                  <h4>Playlist Name1</h4>
                  <p>Owner Name</p>
                </div>
              </div>
            </a>
          </li>
          <li className="nav-item text-color my-2">
            <a href="#" className="nav-link playlist-item" aria-current="page">
              <div className="row text-color">
                <div className="col-auto">
                  <img src="album-image.jpg" alt="Playlist Image" width="100" />
                </div>
                <div className="col">
                  <h4>Playlist Name2</h4>
                  <p>Owner Name</p>
                </div>
              </div>
            </a>
          </li>
          <li className="nav-item text-color my-2">
            <a href="#" className="nav-link playlist-item" aria-current="page">
              <div className="row text-color">
                <div className="col-auto">
                  <img src="album-image.jpg" alt="Playlist Image" width="100" />
                </div>
                <div className="col">
                  <h4>Playlist Name3</h4>
                  <p>Owner Name</p>
                </div>
              </div>
            </a>
          </li>
          <li className="nav-item text-color my-2">
            <a href="#" className="nav-link playlist-item" aria-current="page">
              <div className="row text-color">
                <div className="col-auto">
                  <img src="album-image.jpg" alt="Playlist Image" width="100" />
                </div>
                <div className="col">
                  <h4>Playlist Name4</h4>
                  <p>Owner Name</p>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
