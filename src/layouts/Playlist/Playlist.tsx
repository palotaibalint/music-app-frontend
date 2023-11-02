import React, { useEffect, useState } from "react";
import SongModel from "../../models/SongModel";

function Playlist() {
  const [songs, setSongs] = useState<SongModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      const baseUrl: string = "http://localhost:8081/api/songs/playlist";

      const response = await fetch(baseUrl);
      if (!response.ok) {
        throw new Error("Search request failed!");
      }
      const responseJson = await response.json();
      const responseData = responseJson.content;

      const loadedSongs: SongModel[] = [];

      for (const key in responseData) {
        loadedSongs.push({
          title: responseData[key].title,
          artist: responseData[key].artist,
          album: responseData[key].album,
          duration: responseData[key].duration,
          img: responseData[key].img,
          clicks: responseData[key].clicks,
          id: responseData[key].song_id,
        });
      }
      setSongs(loadedSongs);
      setIsLoading(false);
    };

    fetchSongs().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <div className="container m-5">
        <p>Loading...</p>
      </div>
    );
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div></div>
    </div>
  );
}

export default Playlist;
