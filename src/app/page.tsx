"use client";

import { useEffect, useState } from "react";
import { debounce, sliceYear } from './utils/helpers';
import Link from "next/link";

// useContext wrapper to carry filmData to filmPage

export default function Home() {
  const [filmData, setFilmData] = useState([]);
  const [searchStr, setSearch] = useState("");
  const [searchedFilmObj, setSearchedFilmObj] = useState({})

  const handleSearch = debounce((event) => {
    const input = document.getElementById("input");
    const inputValue = input?.value;
    setSearch(inputValue)
  }, 500);

  const url =
    `https://api.themoviedb.org/3/search/movie?query=${searchStr}&include_adult=false&language=en-US&page=1`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwODljODM5ZWRhM2VkMWNlMDQwNDVlMGIzNzFkZWRlYiIsIm5iZiI6MTU5MjA0OTIxNy4yMjg5OTk5LCJzdWIiOiI1ZWU0YmU0MWEyMTdjMDAwMjBkMDYyZTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Jaxhn-PnAJDNUW2_4BmbWW6_Zhz62YGabAn0hQVhGrc",
    },
  };

  const getFilmData = () => {
    fetch(url, options)
      .then((res) => res.json())
      .then((data) => setFilmData(data.results.slice(0, 5)))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getFilmData();
  }, [searchStr]);

  console.log(filmData[0]
    // ?.["original_title"]
  );


  console.log('searchValue', searchStr)


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>FILM DB</h1>
        <input 
          id="input"
          placeholder="Search for a film"
          onChange={(event) => handleSearch(event)}
          ></input>
        <h2>Results:  </h2>
        {filmData && filmData.length > 0 ? (filmData.map((film, i) =>  
        <Link 
          key={i}
          href={{
            pathname: `/${film.original_title}`,
            query: {
              search: film
            }
          }}>
          {`${film.original_title}, ${sliceYear(film.release_date)}`}
        </Link>
        ))
        : <p>None found</p>
        }
       
      </main>
    </div>
  );
}
