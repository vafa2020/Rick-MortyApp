import { HeartIcon } from "@heroicons/react/24/outline";
import { Character } from "./CharacterList";
import { Modal } from "./Modal";
import { TrashIcon } from "@heroicons/react/24/solid";
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

export const Favourite = ({
  setFavorite,
  favorite,
  setOpenModal,
  openModal,
}) => {
  const deleteHandler = (id) => {
    if (favorite.length === 1) {
      setOpenModal(false);
    }
    const afterDelete = favorite.filter((item) => item.id !== id);
    setFavorite(afterDelete);
  };
  return (
    <>
      {openModal && (
        <Modal title={"hi dear"} setOpenModal={setOpenModal}>
          {favorite.map((item) => (
            <Character key={item.id} item={item}>
              <button
                className="icon red"
                onClick={() => deleteHandler(item.id)}
              >
                <TrashIcon />
              </button>
            </Character>
          ))}
        </Modal>
      )}
      <button className="heart" onClick={() => setOpenModal(true)}>
        <HeartIcon className="icon" />
        <span className="badge">{favorite.length}</span>
      </button>
    </>
  );
};
