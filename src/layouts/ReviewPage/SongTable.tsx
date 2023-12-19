import React from "react";
import { useNavigate } from "react-router-dom";

type SongDetails = {
  title: string;
  artist: string;
  album?: string;
  duration: string;
  clicks: number;
  genres: string[];
  reviewsnumber: number;
  rating: string;
  owner: string | null;
};

const SongTable: React.FC<{ song: SongDetails }> = ({ song }) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (song.owner != null) {
      navigate(`/profile/${song.owner}`);
    }
  };
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
      {song.owner != "No owner associated with this song" ? (
        <h6>
          <strong>Owner:</strong>{" "}
          <span
            onClick={handleProfileClick}
            style={{
              cursor: "pointer",
              color: "white",
              textDecoration: "underline",
            }}
          >
            {song.owner}
          </span>
        </h6>
      ) : (
        <h6>
          <strong>Owner:</strong> No owner associated with this song
        </h6>
      )}
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
