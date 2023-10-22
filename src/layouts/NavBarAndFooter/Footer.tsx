export const Footer = () => {
  return (
    <div className="background-color">
      <footer
        className="container d-flex flex-wrap justify-content-between
    align-items-center py-5"
      >
        <p className="col-md-4 mb-0 text-color">Music App, Inc</p>
        <ul className="nav col-md-4 justify-content-end">
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-color">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-color">
              Search music
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};
