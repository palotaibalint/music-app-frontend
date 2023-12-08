import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import SongModel from "../../../models/SongModel";
import LoadingScreen from "../../../utils/LoadingPage";
import { SearchSong } from "../../SearchMusicPage/SearchSong";

type Props = {
  playlistId: number;
};

function PlaylistPage({ playlistId }: Props) {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const [songs, setSongs] = useState<SongModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);

  useEffect(() => {
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
          const responseData = playlistSongsJson.content;
          const loadedSongs: SongModel[] = [];

          for (const key in responseData) {
            loadedSongs.push({
              id: responseData[key].id,
              title: responseData[key].title,
              artist: responseData[key].artist,
              album: responseData[key].album,
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

    fetchPlaylistSongs();
  }, [isAuthenticated]);

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

  return (
    <div className="container">
      <p>abc</p>
    </div>
  );
}

export default PlaylistPage;
