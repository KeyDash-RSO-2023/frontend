import { useContext, useEffect, useRef } from "react";
import { AppContext } from "../AppProvider/AppProvider";
import "./Statistics.css";
import Graph from "../Graph/Graph";

const Statistics = () => {
  const {
    wpm,
    timeOption,
    languageOption,
    punctuationOption,
    incorrectIndices,
    userInput,
    wpmHistory,
  } = useContext(AppContext);

  const wpmHistoryRef = useRef(wpmHistory);

  useEffect(() => {
    wpmHistoryRef.current = wpmHistory;
  }, [wpmHistory]);
  const acuraccy = (1 - incorrectIndices.size / userInput.length) * 100;
  return (
    <div className="statistics">
      <div className="statistics_column">
        <div className="data">
          <span className="label">wpm</span>
          <span className="value">{wpm.toFixed(0)}</span>
        </div>
        <div className="data">
          <span className="label">acc</span>
          <span className="value">{acuraccy.toFixed(0)}%</span>
        </div>
        <div className="data">
          <span className="label">type</span>
          <span className="value">
            {timeOption}s {punctuationOption ? "@" : ""}
            {languageOption}
          </span>
        </div>
      </div>

      <Graph data={wpmHistoryRef.current} />
    </div>
  );
};

export default Statistics;
