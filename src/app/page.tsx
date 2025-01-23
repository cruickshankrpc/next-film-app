"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const url =
    "https://api.themoviedb.org/3/search/movie?query=matrix&include_adult=false&language=en-US&page=1";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwODljODM5ZWRhM2VkMWNlMDQwNDVlMGIzNzFkZWRlYiIsIm5iZiI6MTU5MjA0OTIxNy4yMjg5OTk5LCJzdWIiOiI1ZWU0YmU0MWEyMTdjMDAwMjBkMDYyZTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Jaxhn-PnAJDNUW2_4BmbWW6_Zhz62YGabAn0hQVhGrc",
    },
  };

  const [filmData, setFilmData] = useState([]);

  const [search, setSearch] = useState("");

  const getFilmData = () => {
    fetch(url, options)
      .then((res) => res.json())
      .then((json) => setFilmData(json.results))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getFilmData();
  }, [search]);

  // console.log(filmData[0]?.["original_title"]);

  const debounce = (callback, wait) => {
    let timeoutId = null;
    return (...args) => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        callback(...args);
      }, wait);
    };
  }

  const handleSearch = debounce((event) => {
    const input = document.getElementById("input");
    const inputValue = input?.value;
    console.log('inputValue', inputValue)
    

  }, 500);
  console.log(search)

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>FILM DB</h1>
        <input 
          id="input"
          placeholder="Search for a film"
          onChange={(event) => handleSearch(event)}
          ></input>
        <h2>Result: {filmData[0]?.["original_title"] || "None found"}</h2>
      </main>
    </div>
  );
}
