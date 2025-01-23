export default function FilmPage({
  searchParams
}: {
  searchParams: {
    id: string;
    title: string;
    year_released: string;
  }
}) {
  // query for cast, director, 
  return (
  <div>{searchParams.title} {searchParams.year_released}</div>
  
)}

