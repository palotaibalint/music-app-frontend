import React, { useEffect, useState } from "react";
import SongModel from "../../../../models/SongModel";

function TopSongs() {
  const [topSongs, setTopSongs] = useState<SongModel[]>([]);

  useEffect(() => {
    fetch("http://localhost:8081/api/songs/public/top-songs") // Adjust the URL as needed
      .then((response) => response.json())
      .then((data) => setTopSongs(data))
      .catch((error) => console.error("Error fetching top songs:", error));
  }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        <h2 className="text-decoration-none ms-4 my-5 d-flex align-items-center text-color d-none d-sm-inline">
          Top songs
        </h2>
      </div>
      <div className="row">
        {topSongs.map((song, index) => (
          <div className="col-sm-2">
            <div className="image-container">
              <img src={song.img} width="180" height="180" />
              <div className="text-overlay">
                <h4 className="text-color">{song.title}</h4>
                <p className="text-color">{song.artist}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopSongs;
