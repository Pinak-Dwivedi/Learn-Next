export default function Hamburger({ handleNavOpen }) {
  return (
    <button
      className="absolute right-6 top-[1.1rem] text-lg md:hidden"
      onClick={handleNavOpen}
    >
      &#9776;
    </button>
  );
}
