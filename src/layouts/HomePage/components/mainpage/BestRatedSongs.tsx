import React, { useEffect, useState } from "react";
import SongModel from "../../../../models/SongModel";
import placeholder from "../../../../Images/blank.jpg";

export const BestRatedSongs = () => {
  const [songs, setSongs] = useState<SongModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSongs = async () => {
      const baseUrl = "http://localhost:8081/api/songs/public/most-reviews";
      try {
        const response = await fetch(baseUrl);
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const responseData = await response.json();

        const loadedSongs = responseData.map((songData: any) => ({
          ...songData,
          img: songData.img || placeholder,
        }));
        setSongs(loadedSongs);
      } catch (error: any) {
        setHttpError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSongs();
  }, []);

  if (isLoading) {
    return (
      <div style={{ margin: "5rem", color: "text-color" }}>
        {" "}
        {/* Apply text color */}
        <p>Loading...</p>
      </div>
    );
  }

  if (httpError) {
    return (
      <div style={{ margin: "5rem", color: "text-color" }}>
        {" "}
        {/* Apply text color */}
        <p>{httpError}</p>
      </div>
    );
  }

  return (
    <div className="text-color" style={{ margin: "5rem 0" }}>
      <h2 style={{ textAlign: "left", marginBottom: "2rem" }}>
        Songs with most reviews
      </h2>
      <div
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        {songs.map((song, index) => (
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
};
