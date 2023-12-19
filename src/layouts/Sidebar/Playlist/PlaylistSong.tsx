import React from "react";
import placeholder from "../../../Images/blank.jpg";
import { useNavigate } from "react-router-dom";
import SongModel from "../../../models/SongModel";
import DeletePlaylistSong from "./DeletePlaylistSong";

export const PlaylistSong: React.FC<{
  song: SongModel;
  playlistId: number;
  onDelete: () => void;
}> = (props) => {
  const navigate = useNavigate();
  console.log(props.playlistId);

  const handleSeeReviewsClick = () => {
    navigate(`/song/${props.song.id}`, { state: { songData: props.song } });
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
          <DeletePlaylistSong
            id={props.song.id}
            playlist_id={props.playlistId}
            onDelete={props.onDelete}
          />
        </div>
      </div>
    </div>
  );
};
