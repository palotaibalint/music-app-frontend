import React, { useState, useEffect, ChangeEvent } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import SongModel from "../../models/SongModel";
import ReviewModel from "../../models/ReviewModel";
import { UserSong } from "./UserSong";
import UploadSong from "../../utils/UploadSong";
import { StarsReview } from "../../utils/StarsReview";
import SeeMessagesButton from "./Messages/SeeMessagesButton";
import SendMessageButton from "./Messages/SendMessageButton";
import defaultAvatar from "../../Images/7190932.png";
import ImageModal from "./ImageModal";

interface UserProps {
  username: string | undefined;
}

interface UserInfo {
  name: string;
  email: string;
  profilePicUrl?: string;
}

export const User: React.FC<UserProps> = ({ username }) => {
  const [httpError, setHttpError] = useState<string | null>(null);
  const [songs, setSongs] = useState<SongModel[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [reviewSongs, setReviewSongs] = useState<{ [key: number]: SongModel }>(
    {}
  );

  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();
  const [showImageModal, setShowImageModal] = useState(false);
  const [profilePicUrl, setProfilePicUrl] = useState("");

  const handleProfilePicUrlChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProfilePicUrl(event.target.value);
  };

  const handleProfilePicSubmit = async () => {
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
      const response = await fetch(
        `http://localhost:8081/api/users/private/update-profile-pic?username=${username}&url=${profilePicUrl}`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Failed to update profile picture");
      }

      const updatedUserInfo = await response.json();

      setUserInfo((prevState) => {
        if (prevState === null) return null;

        return {
          ...prevState,
          profilePicUrl: updatedUserInfo.profilePicUrl,
        };
      });
    } catch (error) {
      console.error("Error updating profile picture:", error);
    }
  };

  const fetchUserSongs = async () => {
    if (isAuthenticated && username) {
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

        const userUrl = `http://localhost:8081/api/users/private/user-songs?username=${username}`;
        const responseUser = await fetch(userUrl, requestOptions);

        if (!responseUser.ok) {
          throw new Error("Something went wrong!");
        }

        const responseData = await responseUser.json();
        const loadedSongs: SongModel[] = responseData.map((songData: any) => ({
          title: songData.title,
          artist: songData.artist,
          album: songData.album,
          genres: songData.genres,
          duration: songData.duration,
          link: songData.link,
          img: songData.img,
          clicks: songData.clicks,
          id: songData.song_id,
        }));

        setSongs(loadedSongs);
      } catch (error) {
        setHttpError((error as Error).message);
      }
    }
  };

  const fetchUserInfo = async () => {
    if (isAuthenticated && username) {
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

        const response = await fetch(
          `http://localhost:8081/api/users/private/user?username=${username}`,
          requestOptions
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user info");
        }

        const data = await response.json();
        setUserInfo({
          name: data.username,
          email: data.email,
          profilePicUrl: data.img,
        });
      } catch (error) {
        if (error instanceof Error) {
          setHttpError(error.message);
        } else {
          setHttpError("An unexpected error occurred");
        }
      }
    }
  };

  const renderDate = (dateString: string) => {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "Invalid date";
    }

    const longMonth = date.toLocaleString("en-us", { month: "long" });
    const dateDay = date.getDate();
    const dateYear = date.getFullYear();

    return `${longMonth} ${dateDay}, ${dateYear}`;
  };

  const fetchUserReviews = async () => {
    if (isAuthenticated && username) {
      try {
        const accessToken = await getAccessTokenSilently();
        const requestOptions = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };

        const response = await fetch(
          `http://localhost:8081/api/reviews/private/user/latest?username=${username}`,
          requestOptions
        );

        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }

        const responseDataJson = await response.json();
        const responseData = responseDataJson.content;
        const loadedReviews: ReviewModel[] = [];

        for (const key in responseData) {
          loadedReviews.push({
            id: responseData[key].id,
            userEmail: responseData[key].userEmail,
            userName: responseData[key].userName,
            date: responseData[key].date,
            rating: responseData[key].rating,
            song_id: responseData[key].songId,
            reviewTitle: responseData[key].reviewTitle,
            reviewDescription: responseData[key].reviewDescription,
          });
        }

        setReviews(loadedReviews);
      } catch (error) {
        setHttpError((error as Error).message);
      }
    }
  };

  const fetchSongInfo = async (id: number) => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/songs/public/with-id?id=${id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching song:", error);
      return "Unknown Song";
    }
  };

  const fetchAllSongInfo = async () => {
    const newSongsInfo = { ...reviewSongs };
    for (const review of reviews) {
      try {
        const songInfo = await fetchSongInfo(review.song_id);

        if (typeof songInfo === "object" && songInfo !== null) {
          newSongsInfo[review.song_id] = {
            title: songInfo.title,
            artist: songInfo.artist,
            album: songInfo.album,
            genres: songInfo.genres,
            duration: songInfo.duration,
            img: songInfo.img,
            clicks: songInfo.clicks,
            id: songInfo.song_id,
            owner: songInfo.owner,
          };
        } else {
          console.error("Invalid song data received:", songInfo);
        }
      } catch (error) {
        console.error("Error fetching song info:", error);
      }
    }

    setReviewSongs(newSongsInfo);
  };

  useEffect(() => {
    if (isAuthenticated && username) {
      fetchUserSongs();
      fetchUserInfo();
      fetchUserReviews();
    }
  }, [username, isAuthenticated, getAccessTokenSilently]);

  useEffect(() => {
    if (reviews.length > 0) {
      fetchAllSongInfo();
    }
  }, [reviews]);

  if (httpError) {
    return <div>Error: {httpError}</div>;
  }

  const renderReviews = () => (
    <div>
      {reviews.map((review, index) => (
        <div
          key={review.id}
          style={{
            marginLeft: "40px",
            marginTop: index === 0 ? "40px" : "60px",
          }}
        >
          <div className="col-md-10">
            <div
              className="row align-items-center"
              style={{ marginTop: "30px" }}
            >
              <div className="col-auto">
                {reviewSongs[review.song_id] ? (
                  <img
                    src={reviewSongs[review.song_id].img}
                    alt={`${reviewSongs[review.song_id].title} cover`}
                    style={{ width: "150px", height: "150px" }}
                  />
                ) : (
                  <div style={{ width: "150px", height: "150px" }}>
                    Loading image...
                  </div>
                )}
              </div>
              <div className="col h4 text-color" style={{ marginTop: "0px" }}>
                {reviewSongs[review.song_id] ? (
                  <>
                    <div style={{ fontWeight: "bold" }}>
                      {reviewSongs[review.song_id].title}
                    </div>
                    <h5>{reviewSongs[review.song_id].artist}</h5>
                  </>
                ) : (
                  <div>Loading...</div>
                )}
              </div>
            </div>
          </div>
          <div className="col" style={{ marginTop: "30px" }}>
            <StarsReview Rating={review.rating} size={30}></StarsReview>
          </div>
          <h3
            className="text-color"
            style={{
              marginTop: "30px",
              wordWrap: "break-word",
              fontSize: "1.5rem",
            }}
          >
            {review.reviewTitle}
          </h3>
          <div className="row">
            <div
              className="col h5 text-color"
              style={{ wordWrap: "break-word", fontSize: "1.2rem" }}
            >
              {review.reviewDescription}
            </div>
          </div>
          <div className="row">
            <div className="col text-color h5">
              {renderDate(review.date.toString())}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex-fill d-flex justify-content-center align-items-center">
      <div className="container">
        <h1 className="text-color" style={{ marginTop: "20px" }}>
          Profile
        </h1>
        {userInfo && (
          <>
            <div className="d-flex justify-content-start align-items-center mb-3">
              <div className="text-center" style={{ marginRight: "20px" }}>
                <img
                  src={userInfo.profilePicUrl || defaultAvatar}
                  alt="Profile"
                  className="img-fluid rounded-circle"
                  style={{
                    width: "150px",
                    height: "150px",
                    filter: userInfo.profilePicUrl ? "none" : "invert(100%)",
                  }}
                />
              </div>
              <div>
                <p className="text-color" style={{ fontSize: "1.5em" }}>
                  <i
                    className="bi bi-person-fill"
                    style={{ marginRight: "10px" }}
                  ></i>
                  <strong>Name:</strong> {userInfo.name}
                </p>
                <p className="text-color" style={{ fontSize: "1.5em" }}>
                  <i
                    className="bi bi-envelope-fill"
                    style={{ marginRight: "10px" }}
                  ></i>
                  <strong>Email:</strong> {userInfo.email}
                </p>
              </div>
            </div>
            <div className="d-flex justify-content-start mt-2">
              <button
                onClick={() => setShowImageModal(true)}
                className="btn btn-primary"
                style={{ marginRight: "30px" }}
              >
                Upload Picture
              </button>
              {username === user?.nickname && (
                <>
                  <SeeMessagesButton />
                  <div style={{ marginLeft: "10px" }}>
                    <UploadSong />
                  </div>
                </>
              )}
              {username != user?.nickname && (
                <SendMessageButton username={username} />
              )}
            </div>
            <ImageModal
              show={showImageModal}
              onClose={() => setShowImageModal(false)}
              onImageSubmit={handleProfilePicSubmit}
              onImageUrlChange={handleProfilePicUrlChange}
            />
          </>
        )}

        {reviews.length > 0 ? (
          <>
            <h2 className="text-color" style={{ marginTop: "20px" }}>
              Latest reviews
            </h2>
            {renderReviews()}
          </>
        ) : (
          <>
            <h2 className="text-color" style={{ marginTop: "20px" }}>
              Latest reviews
            </h2>
            <div className="text-center" style={{ marginTop: "100px" }}>
              <h3 className="text-color">You have no reviews.</h3>
            </div>
          </>
        )}

        {songs.length > 0 ? (
          <>
            <h2 className="text-color" style={{ marginTop: "20px" }}>
              Uploaded songs
            </h2>
            <div className="mt-3 text-color">
              <h5>Number of songs: ({songs.length})</h5>
            </div>
            {songs.map((song) => (
              <UserSong
                song={song}
                username={username}
                key={song.id}
                onDelete={fetchUserSongs}
              />
            ))}
          </>
        ) : (
          <>
            <h2 className="text-color" style={{ marginTop: "20px" }}>
              Uploaded songs
            </h2>
            <div className="text-center" style={{ marginTop: "100px" }}>
              <h3 className="text-color">You have no songs uploaded.</h3>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default User;
