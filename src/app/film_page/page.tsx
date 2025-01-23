export default async function FilmPage({
  searchParams
}: {
  searchParams: {
    id: string;
    title: string;
    year_released: string;
  }
}) {
  const { id, title, year_released } = await searchParams;

  const url = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwODljODM5ZWRhM2VkMWNlMDQwNDVlMGIzNzFkZWRlYiIsIm5iZiI6MTU5MjA0OTIxNy4yMjg5OTk5LCJzdWIiOiI1ZWU0YmU0MWEyMTdjMDAwMjBkMDYyZTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Jaxhn-PnAJDNUW2_4BmbWW6_Zhz62YGabAn0hQVhGrc'
  }
};



  const data = await fetch(url, options)
                      // .then(res => res.json())
                      // .then(data => console.log(data))
                      // .catch(err => console.error(err));

                      // console.log("data", data)
  const details = await data.json()
  const cast = details.cast.slice(0, 5)
  const actors = cast.filter((person) => person.known_for_department === "Acting")
  
  console.log('details', details)
  console.log('cast', cast)
  console.log('actors', actors)

  // add director
  // add run time 
  // add labels 
  // month/year watched 
  // send to db 
  return (
    <>
  <h1>{title} {year_released}</h1>
  <h2>Directed by: {}</h2>
  <h2>Actors:</h2>
  {actors.map((actor) => <p key={actor.cast_id}>{actor.name} as {actor.character}</p>)}
</>
)
}

