import { useContext } from "react";
import "./Timer.css";
import { AppContext } from "../AppProvider/AppProvider";

const Timer = () => {
  const appContext = useContext(AppContext);

  return (
    <div>
      <p className="timer">{appContext.timerValue} s</p>
    </div>
  );
};

export default Timer;
