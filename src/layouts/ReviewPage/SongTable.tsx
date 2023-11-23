import React from "react";

type SongDetails = {
  title: string;
  artist: string;
  album?: string;
  duration: string;
  clicks: number;
  genre?: string;
  reviewsnumber: number;
  rating: string;
};

const SongTable: React.FC<{ song: SongDetails }> = ({ song }) => {
  return (
    <table className="table table-info table-borderless table-hover">
      <tbody>
        <tr>
          <td className="col-3">Title:</td>
          <td>
            <strong style={{ fontSize: "1.2em" }}>{song.title}</strong>
          </td>
        </tr>
        <tr>
          <td className="col-3">Artist:</td>
          <td>
            <strong style={{ fontSize: "1.2em" }}>{song.artist}</strong>
          </td>
        </tr>
        <tr>
          <td className="col-3">Album:</td>
          <td>
            <strong style={{ fontSize: "1.2em" }}>{song.album}</strong>
          </td>
        </tr>
        <tr>
          <td className="col-3">Type:</td>
          <td>
            <strong style={{ fontSize: "1.2em" }}>{song.duration}</strong>
          </td>
        </tr>
        {song.genre && (
          <tr>
            <td className="col-3">Genre:</td>
            <td>
              <strong style={{ fontSize: "1.2em" }}>{song.genre}</strong>
            </td>
          </tr>
        )}
        <tr>
          <td className="col-3">Released:</td>
          <td>
            <strong style={{ fontSize: "1.2em" }}>{song.clicks}</strong>
          </td>
        </tr>
        <tr>
          <td className="col-3">Number of reviews:</td>
          <td>
            <strong style={{ fontSize: "1.2em" }}>{song.reviewsnumber}</strong>
          </td>
        </tr>
        <tr>
          <td className="col-3">Rating:</td>
          <td>
            <strong style={{ fontSize: "1.2em" }}>{song.rating}</strong>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default SongTable;
