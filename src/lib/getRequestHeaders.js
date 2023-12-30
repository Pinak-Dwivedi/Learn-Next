export default function getRequestHeaders(cookies) {
  if (cookies != null)
    return {
      Authorization: `Bearer ${cookies.get("token")?.value}`,
    };

  return {};
}
