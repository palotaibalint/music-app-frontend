import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import AddPlaylistButton from "./AddPlaylistButton";
import PlaylistModel from "../../../models/PlaylistModel";
import { Link, useNavigate } from "react-router-dom";

function PlaylistManagement() {
  const [playlists, setPlaylists] = useState<PlaylistModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();

  const navigate = useNavigate();

  const handlePlaylistClick = (playlistId: number, playlistName: string) => {
    navigate(`/playlist/${playlistId}`, {
      state: { playlistId: playlistId, playlistName: playlistName },
    });
  };

  const fetchPlaylists = async () => {
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

      const url = `http://localhost:8081/api/playlists/private/get-all?username=${user?.nickname}`;
      const responsePlaylists = await fetch(url, requestOptions);

      if (!responsePlaylists.ok) {
        throw new Error(`HTTP error! Status: ${responsePlaylists.status}`);
      }

      const responseData = await responsePlaylists.json();

      const loadedPlaylists: PlaylistModel[] = Object.keys(responseData).map(
        (key) => ({
          id: responseData[key].id,
          username: responseData[key].username,
          songs: responseData[key].songs,
          name: responseData[key].name,
        })
      );

      setPlaylists(loadedPlaylists);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setHttpError(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchPlaylists();
    }
  }, [isAuthenticated, getAccessTokenSilently, user]);

  return (
    <div>
      {!isAuthenticated && (
        <p
          className="text-color"
          style={{ marginLeft: "10px", marginTop: "20px" }}
        >
          Sign in to view playlists.
        </p>
      )}

      {isLoading && isAuthenticated && (
        <p
          className="text-color"
          style={{ marginLeft: "10px", marginTop: "20px" }}
        >
          Loading playlists...
        </p>
      )}

      <div style={{ marginBottom: "0px" }}>
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            onClick={() => handlePlaylistClick(playlist.id, playlist.name)}
            className="nav-link main-span"
            style={{
              backgroundColor: "#0f0335",
              color: "white",
              padding: "15px 20px", // Increased padding
              margin: "10px 0", // Adjusted margin
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
              transition: "background-color 0.3s ease",
              cursor: "pointer",
              fontSize: "1.25rem", // Optional: Increase font size
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#2c215a")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#0f0335")
            }
          >
            <i className="bi bi-music-note-list fs-5"></i>
            <span className="ms-2">{playlist.name}</span>
          </div>
        ))}
      </div>

      {playlists.length === 0 && isAuthenticated && (
        <p
          className="text-color"
          style={{ marginLeft: "10px", marginTop: "20px" }}
        >
          No playlists found.
        </p>
      )}

      {isAuthenticated && (
        <div style={{ marginTop: "0px" }}>
          <AddPlaylistButton onPlaylistAdded={fetchPlaylists} />
        </div>
      )}

      {httpError && <p>Error: {httpError}</p>}
    </div>
  );
}

export default PlaylistManagement;
