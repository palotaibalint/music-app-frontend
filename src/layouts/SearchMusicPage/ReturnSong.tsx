import React from "react";
import SongModel from "../../models/SongModel";

export const ReturnSong: React.FC<{ song: SongModel }> = (props) => {
  return (
    <li className="nav-item text-color my-2">
      <a href="#" className="nav-link playlist-item" aria-current="page">
        <div className="row text-color">
          <div className="col"></div>
          <div className="col">
            <p>Number</p>
          </div>
          <div className="col">
            <p>{props.song.title}</p>
          </div>
          <div className="col">
            <p>{props.song.artist}</p>
          </div>
          <div className="col">
            <p>{props.song.album}</p>
          </div>
          <div className="col">
            <p>{props.song.duration}</p>
          </div>
        </div>
      </a>
    </li>
  );
};
