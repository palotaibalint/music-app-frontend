import React, { useEffect, useState } from "react";
import SongModel from "../../models/SongModel";
import { SearchSong } from "./SearchSong";
import { Pagination } from "../../utils/Pagination";

function Search() {
  const [search, setSearch] = useState("");
  const [searchUrl, setSearchUrl] = useState("");
  const [songs, setSongs] = useState<SongModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [songsPerPage, setSongsPerPage] = useState(6);
  const [totalAmountOfSongs, setTotalAmountOfSongs] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchSongs = async () => {
      const baseUrl: string = "http://localhost:8081/api/songs";
      let url: string = "";

      if (searchUrl === "") {
        url = `${baseUrl}?page=${currentPage - 1}&size=${songsPerPage}`;
      } else {
        url = baseUrl + searchUrl;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const responseJson = await response.json();
      const responseData = responseJson._embedded.songs;

      setTotalAmountOfSongs(responseJson.page.totalElements);
      setTotalPages(responseJson.page.totalPages);

      const loadedSongs: SongModel[] = [];

      for (const key in responseData) {
        loadedSongs.push({
          id: responseData[key].id,
          title: responseData[key].title,
          artist: responseData[key].artist,
          album: responseData[key].album,
          genre: responseData[key].genre,
          duration: responseData[key].duration,
          img: responseData[key].img,
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
  }, [currentPage, searchUrl]);

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

  const searchHandleChange = () => {
    if (search === "") {
      setSearchUrl("");
    } else {
      setSearchUrl(
        `/search/findByTitleContaining?title=${search}&page=0&size=${songsPerPage}`
      );
    }
  };

  const indexOfLastSong: number = currentPage * songsPerPage;
  const indexOfFirstSong: number = indexOfLastSong - songsPerPage;
  let lastItem =
    songsPerPage * currentPage <= totalAmountOfSongs
      ? songsPerPage * currentPage
      : totalAmountOfSongs;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
                aria-labeledby="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="btn  btn-outline-success"
                onClick={() => searchHandleChange()}
              >
                Search
              </button>
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
                Category
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    Pop
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Rock
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    HipHop/Rap
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    EDM
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Country
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Classical
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {totalAmountOfSongs > 0 ? (
          <>
            <div className="mt-3">
              <h5>Number of results: ({totalAmountOfSongs})</h5>
            </div>
            <p>
              {indexOfFirstSong + 1} to {lastItem} of {totalAmountOfSongs}{" "}
              items:
            </p>

            {songs.map((song) => (
              <SearchSong song={song} key={song.id} />
            ))}
          </>
        ) : (
          <div className="m-5">
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
