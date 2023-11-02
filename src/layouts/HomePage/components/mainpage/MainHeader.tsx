import UploadSong from "../../../../utils/UploadSong";

function MainHeader() {
  return (
    <nav className="navbar background-main">
      <div>
        <UploadSong />
      </div>
      <a className="nav-link main-span" href="#contact">
        <i className="bi bi-person fs-3 ml-auto"></i>
      </a>
    </nav>
  );
}

export default MainHeader;
