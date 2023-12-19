import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import SongModel from "../../../models/SongModel";
import LoadingScreen from "../../../utils/LoadingPage";
import MainHeader from "../../HomePage/components/mainpage/MainHeader";
import { Footer } from "../../NavBarAndFooter/Footer";
import { PlaylistSong } from "./PlaylistSong";
import DeletePlaylistButton from "./DeletePlaylistButton";

type Props = {
  playlistId: number;
  playlistName: string;
};

function PlaylistPage({ playlistId, playlistName }: Props) {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const [songs, setSongs] = useState<SongModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);

  const fetchPlaylistSongs = async () => {
    if (isAuthenticated) {
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: "https://music-api",
            scope: "openid profile email",
          },
        });

        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };

        const url = `http://localhost:8081/api/playlists/private/get-songs?playlistId=${playlistId}`;
        const playlistSongs = await fetch(url, requestOptions);

        if (!playlistSongs.ok) {
          console.error(
            `Error fetching playlist songs: ${playlistSongs.status} - ${playlistSongs.statusText}`
          );
          setIsLoading(false);
          return;
        }

        const playlistSongsJson = await playlistSongs.json();
        const responseData = playlistSongsJson;
        const loadedSongs: SongModel[] = [];

        for (const key in responseData) {
          loadedSongs.push({
            id: responseData[key].song_id,
            title: responseData[key].title,
            artist: responseData[key].artist,
            album: responseData[key].album,
            img: responseData[key].img,
            duration: responseData[key].duration,
            clicks: responseData[key].clicks,
            genres: responseData[key].genres,
          });
        }

        setSongs(loadedSongs);
        setIsLoading(false);
      } catch (error) {
        console.error("Error getting ID token claims:", error);
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaylistSongs();
  }, [isAuthenticated, playlistId, getAccessTokenSilently]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  const refreshPlaylist = () => {
    setIsLoading(true);
    fetchPlaylistSongs();
  };

  return (
    <div className="col-sm-9 background-main d-flex flex-column justify-content-between">
      <MainHeader />
      <div className="flex-fill">
        <div className="container">
          <h2 className="text-color" style={{ marginTop: "20px" }}>
            {playlistName}
          </h2>
          {songs.length > 0 ? (
            <>
              <div className="mt-3 text-color">
                <h5>Number of songs: ({songs.length})</h5>
              </div>

              {songs.map((song) => (
                <PlaylistSong
                  song={song}
                  playlistId={playlistId}
                  key={song.id}
                  onDelete={refreshPlaylist}
                />
              ))}
            </>
          ) : (
            <div className="m-5 text-color">
              <h3>This playlist has no songs.</h3>
            </div>
          )}
          <DeletePlaylistButton id={playlistId} onDelete={refreshPlaylist} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PlaylistPage;
