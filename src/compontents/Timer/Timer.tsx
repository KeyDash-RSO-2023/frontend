import { useContext } from "react";
import "./Timer.css";
import { AppContext } from "../AppProvider/AppProvider";

const Timer = () => {
  const { timerValue } = useContext(AppContext);

  return (
    <div>
      <p className="timer">{timerValue} s</p>
    </div>
  );
};

export default Timer;
