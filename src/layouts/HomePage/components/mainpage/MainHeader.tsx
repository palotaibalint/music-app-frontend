function MainHeader() {
  return (
    <nav className="navbar background-main">
      <div>
        <button className="btn btn-primary m-3">Upload songs</button>
      </div>
      <a className="nav-link main-span" href="#contact">
        <i className="bi bi-person fs-3 ml-auto"></i>
      </a>
    </nav>
  );
}

export default MainHeader;
