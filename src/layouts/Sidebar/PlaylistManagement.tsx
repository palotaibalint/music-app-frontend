import React, { useEffect, useState } from "react";
import { PlaylistSidebarItem } from "./PlaylistSidebarItem";
import LoadingPage from "../../utils/LoadingPage";

interface Playlist {
  id: number;
  name: string;
}

function PlaylistManagement() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [newPlaylistName, setNewPlaylistName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  const handleCreatePlaylist = () => {
    const data = { name: newPlaylistName };

    fetch("http://localhost:8081/api/playlists/private/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to create playlist");
        }
      })
      .then((newPlaylist: Playlist) => {
        setPlaylists([...playlists, newPlaylist]);
        setNewPlaylistName("");
      })
      .catch((error) => {
        console.error("Error creating playlist:", error);
      });
  };

  useEffect(() => {
    setIsLoading(true);

    fetch("http://localhost:8081/api/playlists/private/get-all")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch playlists");
        }
      })
      .then((data) => {
        setPlaylists(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching playlists:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <ul>
          {playlists.map((playlist) => (
            <PlaylistSidebarItem playlist={playlist} key={playlist.id} />
          ))}
        </ul>
      )}
      <input
        type="text"
        placeholder="Enter playlist name"
        value={newPlaylistName}
        onChange={(e) => setNewPlaylistName(e.target.value)}
      />
      <button onClick={handleCreatePlaylist}>Create Playlist</button>
    </div>
  );
}

export default PlaylistManagement;
