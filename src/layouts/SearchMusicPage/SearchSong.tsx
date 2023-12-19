import React, { useEffect, useState } from "react";
import placeholder from "../../Images/blank.jpg";
import SongModel from "../../models/SongModel";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import PlaylistModel from "../../models/PlaylistModel";

export const SearchSong: React.FC<{ song: SongModel }> = (props) => {
  const navigate = useNavigate();
  const [playlists, setPlaylists] = useState<PlaylistModel[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [httpError, setHttpError] = useState<string | null>(null);
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();

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
        } catch (error) {
          setHttpError(
            error instanceof Error ? error.message : "An error occurred"
          );
        }
      }
    };

    fetchPlaylists();
  }, [isAuthenticated, getAccessTokenSilently, user]);

  const handleSeeReviewsClick = async () => {
    navigate(`/song/${props.song.id}`, { state: { songData: props.song } });
    const url = `http://localhost:8081/api/songs/public/incrementClicks?id=${props.song.id}`;
    const responseIncrement = await fetch(url);
  };

  const addSongToPlaylist = async (playlistId: number) => {
    if (isAuthenticated) {
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: "https://music-api",
            scope: "openid profile email",
          },
        });

        const requestOptions = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };

        const url = `http://localhost:8081/api/playlists/private/add-song?playlistId=${playlistId}&songId=${props.song.id}`;
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
        setShowModal(false);
      } catch (error) {
        console.error("Error adding song to playlist:", error);
        setHttpError(
          error instanceof Error ? error.message : "An error occurred"
        );
      }
    }
  };

  const handleAddToPlaylist = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className="card mt-3 shadow p-3 mb-3 text-color background-darker rounded">
      <div className="row g-0">
        <div className="col-md-1">
          <div className="d-none d-lg-block">
            {props.song.img ? (
              <img src={props.song.img} width="100" height="100" alt="Song" />
            ) : (
              <img src={placeholder} width="100" height="100" alt="Song" />
            )}
          </div>
          <div className="d-lg-none d-flex justify-content-center align-items-center">
            {props.song.img ? (
              <img src={props.song.img} width="123" height="196" alt="Song" />
            ) : (
              <img src={placeholder} width="123" height="196" alt="Song" />
            )}
          </div>
        </div>
        <div className="col-md-6">
          <div className="card-body">
            <h5 className="card-title">{props.song.artist}</h5>
            <h4>{props.song.title}</h4>
            <p className="card-text">
              Album: {props.song.album}
              <br />
              Duration: {props.song.duration}
              <br />
              Genres: {props.song.genres.join(", ")}
              <br />
            </p>
          </div>
        </div>
        <div className="col-md-4 d-flex justify-content-center align-items-center">
          <button
            className="btn btn-md text-color"
            onClick={handleSeeReviewsClick}
          >
            See Reviews
          </button>
          <button
            className="btn btn-md text-color"
            onClick={handleAddToPlaylist}
          >
            Add to playlist
          </button>
          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Select a Playlist</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {playlists.map((playlist) => (
                <>
                  <button
                    className="btn btn-md"
                    onClick={() => addSongToPlaylist(playlist.id)}
                  >
                    {playlist.name}
                  </button>
                  <br></br>
                </>
              ))}
            </Modal.Body>
            <Modal.Footer>
              <button className="btn btn-secondary" onClick={handleClose}>
                Close
              </button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};
