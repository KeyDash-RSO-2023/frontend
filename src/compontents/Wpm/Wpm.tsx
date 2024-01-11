import { useContext } from "react";
import "./Wpm.css";
import { AppContext } from "../AppProvider/AppProvider";

const Wpm = () => {
  const { wpm } = useContext(AppContext);
  return (
    <div>
      <p className="wpm">{Math.round(wpm)} wpm</p>
    </div>
  );
};

export default Wpm;
