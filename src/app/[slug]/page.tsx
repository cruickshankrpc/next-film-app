// export default async function Page({
//   params, searchParams
// }: {
//   params: Promise<{  slug: string }>
// }) {
//   const slug = (await params).slug
//   console.log('searchParams', searchParams.search) // Logs "search"

//   return <div>My Post: {slug}</div>
// }

export default async function Page ({ params, searchParams }: { params: Promise<{  slug: string }>, searchParams: object }){
  console.log(searchParams.search) // Logs "search"

  return (
    <div>New Page: {searchParams.search}</div>
  )
}

