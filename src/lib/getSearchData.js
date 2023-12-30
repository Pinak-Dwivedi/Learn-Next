export default function getSearchData(req) {
  const searchParams = req.nextUrl.searchParams;

  const search = searchParams.get("q");

  if (search == null || search?.trim() === "") return null;

  return search.trim();
}
