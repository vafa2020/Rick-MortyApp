import { ArrowDownCircleIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export const CharacterDetails = ({ selectId }) => {
  const [character, setCharacter] = useState(null);
  const [episode, setEpisode] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDataCharacter = async () => {
      try {
        const singleCharacter =
          await axios.get(`https://rickandmortyapi.com/api/character/${selectId}
      `);
        setCharacter(singleCharacter.data);
        const dataEpisode = [];
        for (let i = 0; i < singleCharacter.data.episode.length; i++) {
          const data = axios.get(singleCharacter.data.episode[i]);
          dataEpisode.push(data);
        }
        Promise.all(dataEpisode).then((res) => setEpisode(res));
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (selectId !== null) {
      fetchDataCharacter();
    }
  }, [selectId]);

  if (isLoading) {
    return (
      <div style={{ flex: 1, color: "red" }}>
        data isLoading please wait ...
      </div>
    );
  }
  if (character === null && episode === null && selectId === null) {
    return (
      <div style={{ flex: 1, color: "#fff" }}>please select a character</div>
    );
  }
  return (
    <div style={{ flex: "1" }}>
      <div className="character-detail">
        <img className="character-detail__img" src={character.image} />
        <div className="character-detail__info">
          <h3 className="name">
            <span>{character.gender === "Male" ? "👨" : "👩"}</span>
            <span>{character.name}</span>
          </h3>
          <div className="info">
            <span
              className={`status ${character.status === "Dead" ? "red" : ""}`}
            ></span>
            <span>
              &nbsp;{character.status}&nbsp;-&nbsp;{character.species}
            </span>
          </div>
          <div className="location">
            <p>last know location : </p>
            <p>{character.location.name}</p>
          </div>
          <div className="actions">
            <button className="btn btn--primary">Add To Favorite</button>
          </div>
        </div>
      </div>
      <div className="character-episodes">
        <div className="title">
          <h2>List Of Episodes</h2>
          <ArrowDownCircleIcon className="icon" />
        </div>
        <ul>
          {episode?.map((item, index) => (
            <li>
              <div>
                <span>{String(index + 1).padStart(2, "0")}&nbsp;</span>
                <span>{item.data.episode} :&nbsp;</span>
                <span>{item.data.name}</span>
              </div>
              <span className="badge badge--secondary">
                {item.data.air_date}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
