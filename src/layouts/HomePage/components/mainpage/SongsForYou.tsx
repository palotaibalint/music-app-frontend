import placeholder from "../../../../Images/blank.jpg";
import { useEffect, useState } from "react";
import SongModel from "../../../../models/SongModel";

export const SongsForYou = () => {
  const [songs, setSongs] = useState<SongModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      const baseUrl: string = "http://localhost:8081/api/songs";
      const url: string = `${baseUrl}?page=0&size=4`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const responseJson = await response.json();
      const responseData = responseJson._embedded.songs;

      const loadedSongs: SongModel[] = [];
      for (const key in responseData) {
        loadedSongs.push({
          id: responseData[key].id,
          title: responseData[key].title,
          artist: responseData[key].artist,
          album: responseData[key].album,
          genre: responseData[key].genre,
          duration: responseData[key].duration,
          img: responseData[key].img,
        });
      }
      setSongs(loadedSongs);
      setIsLoading(false);
    };

    fetchSongs().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
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
    <div className="container-fluid">
      <div className="row">
        <h2 className="text-decoration-none ms-4 my-5 d-flex align-items-center text-color d-none d-sm-inline">
          New songs for you
        </h2>
      </div>
      <div className="row">
        <div className="col-sm-2">
          <div className="image-container">
            <img src={placeholder} alt="Your Image1" width="180" height="180" />
            <div className="text-overlay">
              <h4 className="text-color">Song name</h4>
              <p className="text-color">Song creator</p>
            </div>
          </div>
        </div>
        <div className="col-sm-2">
          <div className="image-container">
            <img src={placeholder} alt="Your Image1" width="180" height="180" />
            <div className="text-overlay">
              <h4 className="text-color">Song name</h4>
              <p className="text-color">Song creator</p>
            </div>
          </div>
        </div>
        <div className="col-sm-2">
          <div className="image-container">
            <img src={placeholder} alt="Your Image1" width="180" height="180" />
            <div className="text-overlay">
              <h4 className="text-color">Song name</h4>
              <p className="text-color">Song creator</p>
            </div>
          </div>
        </div>
        <div className="col-sm-2">
          <div className="image-container">
            <img src={placeholder} alt="Your Image1" width="180" height="180" />
            <div className="text-overlay">
              <h4 className="text-color">Song name</h4>
              <p className="text-color">Song creator</p>
            </div>
          </div>
        </div>
        <div className="col-sm-2">
          <div className="image-container">
            <img src={placeholder} alt="Your Image1" width="180" height="180" />
            <div className="text-overlay">
              <h4 className="text-color">Song name</h4>
              <p className="text-color">Song creator</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
