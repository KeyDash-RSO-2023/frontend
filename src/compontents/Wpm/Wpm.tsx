import { useContext } from "react";
import "./Wpm.css";
import { AppContext } from "../AppProvider/AppProvider";

const Wpm = () => {
  const appContext = useContext(AppContext);
  return (
    <div>
      <p className="wpm">{Math.round(appContext.wpm)} wpm</p>
    </div>
  );
};

export default Wpm;
