import { HeartIcon } from "@heroicons/react/24/outline";
const Navbar = ({ children, onChange, searchValue }) => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">Logo😂</div>
      <input
        className="text-field"
        type="text"
        placeholder="search..."
        onChange={onChange}
        value={searchValue}
      />
      {children}
    </nav>
  );
};

export default Navbar;

export const SearchResult = ({ numOfResult }) => (
  <div className="navbar__result">Found {numOfResult} Characters</div>
);

export const Favourite = ({ numOfResult }) => {
  return (
    <button className="heart">
      <HeartIcon className="icon" />
      <span className="badge">{numOfResult}</span>
    </button>
  );
};
