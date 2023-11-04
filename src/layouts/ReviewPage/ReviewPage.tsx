import { useEffect, useState } from "react";
import MainHeader from "../HomePage/components/mainpage/MainHeader";
import { Footer } from "../NavBarAndFooter/Footer";
import ReviewSong from "./ReviewSong";
import SongModel from "../../models/SongModel";
import LoadingScreen from "../../utils/LoadingPage";

type SongProps = {
  id: number;
};

export const ReviewPage: React.FC<SongProps> = ({ id }) => {
  const [song, setSong] = useState<SongModel | null>(null);
  useEffect(() => {
    const songId = id;
    const apiUrl = `http://localhost:8081/api/songs/${songId}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data: SongModel) => {
        setSong(data);
      })
      .catch((error) => {
        console.error("Error fetching song:", error);
      });
  }, [id]);

  return (
    <div className="col-sm-9 background-main d-flex flex-column justify-content-between">
      <MainHeader />
      <div className="flex-fill">
        {song ? <ReviewSong song={song} /> : <LoadingScreen />}
      </div>
      <Footer />
    </div>
  );
};
