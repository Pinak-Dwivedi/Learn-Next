export default function getPaginationData(req, recordsPerPage) {
  const searchParams = req.nextUrl.searchParams;

  let page = searchParams.get("page");

  if (Number(page) === 0 || isNaN(Number(page))) {
    page = 1;
  } else {
    page = parseInt(page);
  }

  let offSet = (page - 1) * recordsPerPage;

  return {
    recordsPerPage,
    offSet,
  };
}
