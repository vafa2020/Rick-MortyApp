import { CharacterDetails } from "./component/CharacterDetails";
import CharacterList, { Character } from "./component/CharacterList";
import Navbar, { Favourite, SearchResult } from "./component/Navbar";
import { useState } from "react";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./App.css";
import axios from "axios";
import { Modal } from "./component/Modal";

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [selectId, setSelectId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [favorite, setFavorite] = useState(
    JSON.parse(localStorage.getItem("Favorites")) || []
  );
  useEffect(() => {
    localStorage.setItem("Favorites", JSON.stringify(favorite));
  }, [favorite]);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/?name=${searchValue}`,
          { signal }
        );
        toast.success("data is ok");
        setCharacters(data.results.slice(0, 5));
      } catch (error) {
        if (error.name === "CanceledError") {
          console.log("abort");
        }
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    return () => {
      controller.abort();
    };
  }, [searchValue]);

  const selectHandler = async (id) => {
    setSelectId(id);
  };

  const searchHandler = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const onAddFavoriteHandler = (newFavorite) => {
    setFavorite((prevFav) => [...prevFav, newFavorite]);
  };
  const addedToFavorite = favorite.map((item) => item.id).includes(selectId);
  return (
    <div className="app">
      <Navbar onChange={searchHandler} searchValue={searchValue}>
        <SearchResult numOfResult={characters.length} />
        <Favourite
          favorite={favorite}
          setFavorite={setFavorite}
          setOpenModal={setOpenModal}
          openModal={openModal}
        />
      </Navbar>
      <Main>
        <CharacterList
          characters={characters}
          isLoading={isLoading}
          onClick={selectHandler}
          selectId={selectId}
        />
        <CharacterDetails
          selectId={selectId}
          onAddFavorite={onAddFavoriteHandler}
          addedToFavorite={addedToFavorite}
        />
      </Main>
      <Toaster />
    </div>
  );
}

export default App;

const Main = ({ children }) => {
  return <div className="main">{children}</div>;
};
