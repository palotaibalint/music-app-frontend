export const Footer = () => {
  return (
    <div className="main-color">
      <footer
        className="container d-flex flex-wrap justify-content-between
    align-items-center py-5"
      >
        <p className="col-md-4 mb-0 text-dark">Music App, Inc</p>
        <ul className="nav navbar-dark col-md-4 justify-content-end">
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-dark">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-dark">
              Search music
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};
