import React from "react";

type SongDetails = {
  title: string;
  artist: string;
  album?: string;
  duration: string;
  clicks: number;
  genres: string[];
  reviewsnumber: number;
  rating: string;
};

const SongTable: React.FC<{ song: SongDetails }> = ({ song }) => {
  return (
    <div
      className="text-color"
      style={{ marginLeft: "20px", marginTop: "20px" }}
    >
      <h3>
        <strong>Title:</strong> {song.title}
      </h3>
      <h4>
        <strong>Artist:</strong> {song.artist}
      </h4>
      <h5>
        <strong>Album:</strong> {song.album}
      </h5>
      <h6>
        <strong>Duration:</strong> {song.duration}
      </h6>
      {song.genres && (
        <p>
          <strong>Genres:</strong> {song.genres.join(", ")}
        </p>
      )}
      <p>
        <strong>Visited:</strong> {song.clicks} times
      </p>
      <p>
        <strong>Number of reviews:</strong> {song.reviewsnumber}
      </p>
    </div>
  );
};

export default SongTable;
