import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import AddPlaylistButton from "./AddPlaylistButton";
import PlaylistModel from "../../../models/PlaylistModel";
import { useNavigate } from "react-router-dom";

function PlaylistManagement() {
  const [playlists, setPlaylists] = useState<PlaylistModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();

  const navigate = useNavigate();

  const handlePlaylistClick = (playlistId: number) => {
    navigate(`/playlist/${playlistId}`, { state: { playlistId: playlistId } });
  };

  useEffect(() => {
    const fetchPlaylists = async () => {
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

          const url = `http://localhost:8081/api/playlists/private/get-all?username=${user?.nickname}`;
          const responsePlaylists = await fetch(url, requestOptions);

          if (!responsePlaylists.ok) {
            // Handle HTTP error
            throw new Error(`HTTP error! Status: ${responsePlaylists.status}`);
          }

          const responseData = await responsePlaylists.json();

          const loadedPlaylists: PlaylistModel[] = Object.keys(
            responseData
          ).map((key) => ({
            id: responseData[key].id,
            username: responseData[key].username,
            songs: responseData[key].songs,
            name: responseData[key].name,
          }));

          setPlaylists(loadedPlaylists);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          setHttpError(
            error instanceof Error ? error.message : "An error occurred"
          );
        }
      }
    };

    fetchPlaylists();
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
          <button
            onClick={() => handlePlaylistClick(playlist.id)}
            className="text-color fs-3 my-4 text-decoration-none"
            key={playlist.id}
            style={{
              backgroundColor: "#140936",
              width: "100%",
              textAlign: "left",
              color: "white",
              padding: "0px",
              border: "0px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#2c215a")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#140936")
            }
          >
            {playlist.name}
            <br />
            <span style={{ fontSize: "18px", color: "white" }}>
              Songs: {playlist.songs?.length}
            </span>
          </button>
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

      <AddPlaylistButton />
      {httpError && <p>Error: {httpError}</p>}
    </div>
  );
}

export default PlaylistManagement;
