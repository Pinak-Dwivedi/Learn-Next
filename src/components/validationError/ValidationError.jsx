export default function ValidationError({ error }) {
  if (error != null) return <span className="text-red-600">{error}</span>;

  return null;
}
