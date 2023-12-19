import React, { useEffect, useState } from "react";
import SongModel from "../../../../models/SongModel";
import placeholder from "../../../../Images/blank.jpg"; // Placeholder image path

function TopSongs() {
  const [topSongs, setTopSongs] = useState<SongModel[]>([]);

  useEffect(() => {
    fetch("http://localhost:8081/api/songs/public/top-songs")
      .then((response) => response.json())
      .then((data) => setTopSongs(data))
      .catch((error) => console.error("Error fetching top songs:", error));
  }, []);

  return (
    <div className="text-color" style={{ margin: "5rem 0" }}>
      <h2 style={{ textAlign: "left", marginBottom: "2rem" }}>
        Top visited songs
      </h2>
      <div
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        {topSongs.map((song, index) => (
          <div key={index} style={{ width: "20%", padding: "1rem" }}>
            <div style={{ width: "100%" }}>
              <img
                src={song.img}
                alt={song.title}
                style={{ width: "100%", height: "auto" }}
              />
              <div style={{ textAlign: "center" }}>
                <h4>{song.title}</h4>
                <p>{song.artist}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopSongs;
