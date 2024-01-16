import { useEffect, useState } from "react";
import "./Report.css";
import { fetchReports, fetchReportsByUser } from "../../services/fetchReports";
import Graph from "../Graph/Graph";

const Report = () => {
  const [data, setData] = useState(null);
  const [wpm, setWpm] = useState([]);
  const [acuraccy, setAcuraccy] = useState([]);
  const [avgWpm, setAvgWpm] = useState(0);
  const [avgAccuracy, setAvgAccuracy] = useState(0);
  const [sumLength, setSumLength] = useState(0);
  const [sumGames, setSumGames] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [session] = useState(JSON.parse(localStorage.getItem("session")));

  const convertTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
  
    return `${month}.${day}`;
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedData = await fetchReportsByUser(session.userId);
        setData(fetchedData.reportsByUser);

        let wpm_temp = [];
        let acuraccy_temp = [];
        let avgWpm_temp = 0;
        let avgAccuracy_temp = 0;
        let games_played = 0;
        let length = 0;

        fetchedData.reportsByUser.forEach((report) => {
          wpm_temp.push({date: convertTimestamp(report.endTime), wpm:report.wpm});
          acuraccy_temp.push({date: convertTimestamp(report.endTime), wpm:report.accuracy});
          avgWpm_temp += report.wpm;
          avgAccuracy_temp += report.accuracy;
          games_played += 1;
          length += report.length;
        });
        
        setWpm(wpm_temp);
        setAcuraccy(acuraccy_temp);
        setAvgWpm(avgWpm_temp/fetchedData.reportsByUser.length);
        setAvgAccuracy(avgAccuracy_temp/fetchedData.reportsByUser.length * 100);
        setSumLength(length);
        setSumGames(games_played);


        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="profile-data">
      <h1>Report</h1>

      <div className="graph-container">
        <div className="graph">
          <span className="value graph_title">
            WPM over time
          </span>
          <Graph time_data={wpm} int={true} type="profile" />
          <div className="data">
            <span className="label">avg wpm:</span>
            <span className="value">
              {avgWpm.toFixed(0)}
            </span>
          </div>

          <div className="data">
            <span className="label">games played:</span>
            <span className="value">
              {sumGames}
            </span>
          </div>
        </div>
        <div className="graph">
          <span className="value graph_title">
            Accuracy over time
          </span>
          <Graph time_data={acuraccy} int={false} type="profile" />
          <div className="data">
            <span className="label">games played:</span>
            <span className="value">
              {avgAccuracy.toFixed(0) + "%"}
            </span>
          </div>

          <div className="data">
            <span className="label">total length:</span>
            <span className="value">
              {sumLength}
            </span>
          </div>
        </div>
      </div>
      
    </div>

  );
};

export default Report;
