import { useContext } from "react";
import { AppContext, GameState } from "../AppProvider/AppProvider";
import retry from "../../assets/continue.svg";
import "./Retry.css";

const Retry = () => {
  const { setGameState } = useContext(AppContext);
  const handleClick = () => {
    setGameState(GameState.READY);
  };
  return <img className="retry" src={retry} onClick={handleClick} />;
};

export default Retry;
