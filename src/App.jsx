import { CharacterDetails } from "./component/CharacterDetails";
import CharacterList from "./component/CharacterList";
import Navbar, { SearchResult } from "./component/Navbar";
import { useState } from "react";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./App.css";

function App() {
  const [characters, setCharacters] = useState([]);
  const [selectId, setSelectId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://rickandmortyapi.com/api/character/?name=${searchValue}`
        );
        // console.log(res.ok);
        if (!res.ok) {
          throw new Error("data is failed");
        }
        const data = await res.json();
        toast.success("data is ok");

        setCharacters(data.results.slice(0, 5));
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [searchValue]);

  const selectHandler = async (id) => {
    setSelectId(id);
  };

  const searchHandler = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  return (
    <div className="app">
      <Navbar onChange={searchHandler} searchValue={searchValue}>
        <SearchResult numOfResult={characters.length} />
      </Navbar>
      <Main>
        <CharacterList
          characters={characters}
          isLoading={isLoading}
          onClick={selectHandler}
          selectId={selectId}
        />
        <CharacterDetails selectId={selectId} />
      </Main>
      <Toaster />
    </div>
  );
}

export default App;

const Main = ({ children }) => {
  return <div className="main">{children}</div>;
};
