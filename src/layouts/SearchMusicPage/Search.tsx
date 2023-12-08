import React, { useEffect, useState } from "react";
import SongModel from "../../models/SongModel";
import { SearchSong } from "./SearchSong";
import { Pagination } from "../../utils/Pagination";

function Search() {
  const [search, setSearch] = useState("");
  const [searchUrl] = useState("");
  const [searchBy, setSearchBy] = useState("title");
  const [songs, setSongs] = useState<SongModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [songsPerPage] = useState(15);
  const [totalAmountOfSongs, setTotalAmountOfSongs] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const handleSearchByChange = (newSearchBy: string) => {
    setSearchBy(newSearchBy);
    setCurrentPage(1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  useEffect(() => {
    const fetchSongs = async () => {
      const baseUrl: string = "http://localhost:8081/api/songs/public";
      let url: string = "";

      if (searchBy === "title") {
        url = `${baseUrl}/search/title?title=${search.toLowerCase()}&page=${
          currentPage - 1
        }&size=${songsPerPage}`;
      } else if (searchBy === "artist") {
        url = `${baseUrl}/search/artist?artist=${search.toLowerCase()}&page=${
          currentPage - 1
        }&size=${songsPerPage}`;
      } else if (searchBy === "album") {
        url = `${baseUrl}/search/album?album=${search.toLowerCase()}&page=${
          currentPage - 1
        }&size=${songsPerPage}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Search request failed!");
      }
      const responseJson = await response.json();
      const responseData = responseJson.content;

      // Set total amount of songs and total pages
      setTotalAmountOfSongs(responseJson.totalElements);
      setTotalPages(responseJson.totalPages);

      console.log("Total Pages:", responseData.totalPages); // Log totalPages

      const loadedSongs: SongModel[] = [];

      for (const key in responseData) {
        loadedSongs.push({
          title: responseData[key].title,
          artist: responseData[key].artist,
          album: responseData[key].album,
          genres: responseData[key].genres,
          duration: responseData[key].duration,
          img: responseData[key].img,
          clicks: responseData[key].clicks,
          id: responseData[key].song_id,
        });
      }
      setSongs(loadedSongs);
      setIsLoading(false);
    };

    fetchSongs().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
    window.scrollTo(0, 0);
  }, [currentPage, searchBy, search, songsPerPage, searchUrl]);

  if (isLoading) {
    return (
      <div className="container m-5">
        <p>Loading...</p>
      </div>
    );
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  const indexOfLastSong: number = currentPage * songsPerPage;
  const indexOfFirstSong: number = indexOfLastSong - songsPerPage;
  let lastItem = Math.min(indexOfLastSong, totalAmountOfSongs);

  const paginate = (pageNumber: number) => {
    if (pageNumber < 1) {
      setCurrentPage(1);
    } else if (pageNumber > totalPages) {
      setCurrentPage(totalPages);
    } else {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="container">
      <div>
        <div className="row mt-5">
          <div className="col-6">
            <div className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search..."
                aria-labelledby="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="col-4">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Search by {searchBy}
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => handleSearchByChange("title")}
                  >
                    Title
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => handleSearchByChange("artist")}
                  >
                    Artist
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => handleSearchByChange("album")}
                  >
                    Album
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {totalAmountOfSongs > 0 ? (
          <>
            <div className="mt-3 text-color">
              <h5>Number of results: ({totalAmountOfSongs})</h5>
            </div>
            <p className="text-color">
              {indexOfFirstSong + 1} to {lastItem} of {totalAmountOfSongs}{" "}
              items:
            </p>

            {songs.map((song) => (
              <SearchSong song={song} key={song.id} />
            ))}
          </>
        ) : (
          <div className="m-5 text-color">
            <h3>We could not find any songs that match the criteria.</h3>
          </div>
        )}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={paginate}
          />
        )}
      </div>
    </div>
  );
}

export default Search;
