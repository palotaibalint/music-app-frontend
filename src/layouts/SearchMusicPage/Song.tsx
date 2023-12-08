export const Song = () => {
  return (
    <li className="nav-item text-color my-2">
      <a href="#" className="nav-link playlist-item" aria-current="page">
        <div className="row text-color">
          <div className="col"></div>
          <div className="col">
            <p>Number</p>
          </div>
          <div className="col">
            <p>Song name</p>
          </div>
          <div className="col">
            <p>Artist</p>
          </div>
          <div className="col">
            <p>Album</p>
          </div>
          <div className="col">
            <p>Genres</p>
          </div>
          <div className="col">
            <p>Duration</p>
          </div>
        </div>
      </a>
    </li>
  );
};
