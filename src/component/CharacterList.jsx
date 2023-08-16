import { EyeIcon } from "@heroicons/react/24/outline";
import { EyeSlashIcon } from "@heroicons/react/24/solid";

function CharacterList({ characters, isLoading, onClick, selectId }) {
  if (isLoading) {
    return (
      <div className="characters-list">
        <h1>data is loading</h1>
      </div>
    );
  }
  return (
    <div className="characters-list">
      {characters.map((item) => (
        <Character
          key={item.id}
          item={item}
          onClick={onClick}
          selectId={selectId}
        >
          <button className="icon red" onClick={() => onClick(item.id)}>
            {item.id === selectId ? <EyeSlashIcon /> : <EyeIcon />}
          </button>
        </Character>
      ))}
    </div>
  );
}

export default CharacterList;

export const Character = ({ item, children }) => {
  return (
    <div className="list__item">
      <img src={item.image} alt={item.name} />
      <CharacterName item={item} />
      <CharacterInfo item={item} />
      {children}
    </div>
  );
};

const CharacterName = ({ item }) => {
  return (
    <h3 className="name">
      <span>{item.gender === "Male" ? "👨" : "👩"}</span>
      <span>{item.name}</span>
    </h3>
  );
};
const CharacterInfo = ({ item }) => {
  return (
    <div className="list-item__info info">
      <span className={`status ${item.status === "Dead" ? "red" : ""}`}></span>
      <span>
        &nbsp;{item.status}-{item.species}
      </span>
    </div>
  );
};
