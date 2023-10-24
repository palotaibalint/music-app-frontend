import React from "react";
import placeholder from "../../Images/blank.jpg";
import SongModel from "../../models/SongModel";

export const SearchSong: React.FC<{ song: SongModel }> = (props) => {
  return (
    <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
      <div className="row g-0">
        <div className="col-md-2">
          <div className="d-none d-lg-block">
            {props.song.img ? (
              <img src={props.song.img} width="123" height="196" alt="Song" />
            ) : (
              <img src={placeholder} width="123" height="196" alt="Song" />
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
            <h5 className="card-title">{props.song.title}</h5>
            <h4>{props.song.artist}</h4>
            <p className="card-text">
              Album: {props.song.album}
              <br />
              Genre: {props.song.genre}
              <br />
              Duration: {props.song.duration}
              <br />
              Song ID: {props.song.id}
              <br />
            </p>
          </div>
        </div>
        <div className="col-md-4 d-flex justify-content-center align-items-center">
          <a className="tbn btn-md text-color" href="#">
            See Reviews
          </a>
        </div>
      </div>
    </div>
  );
};
