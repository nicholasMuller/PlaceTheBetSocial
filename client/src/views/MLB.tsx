import React, { useState, useEffect } from "react";
import getMlbDaily, { MlbDailyLine } from "../utility/lines/mlbDailyList";
import BetButton from "../components/BetButton";
import "../index.css"; // Make sure the CSS file is correctly imported

const MlbLines: React.FC = () => {
  const [dailyLines, setDailyLines] = useState<MlbDailyLine[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lines = await getMlbDaily();
        setDailyLines(lines);
      } catch (error) {
        console.error("Error fetching MLB daily lines:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid-container">
      {dailyLines.map((element) => {
        const [awayTeam, homeTeam] = element.teams.split(" @ ");

        if (
          !element.homeML ||
          !element.homeSpread ||
          !element.homeSpreadOdds ||
          !element.overUnder ||
          !element.overOdds ||
          !element.awayML ||
          !element.awaySpread ||
          !element.awaySpreadOdds ||
          !element.underOdds
        ) {
          return null; // Skip rendering this game
        }

        return (
          <div key={element.id} className="grid-item">
            <div className="headerRow">
              <div className="headerColumn col-3"></div>
              <div className="headerColumn col-3">ML</div>
              <div className="headerColumn col-3">Run Line</div>
              <div className="headerColumn col-3">Over/Under</div>
            </div>
            <div className="row">
              <p className="column col-3">{homeTeam}</p>
              <div className="column col-3">
                <BetButton bet={element.homeML} />
              </div>
              <div className="column col-3">
                <BetButton
                  bet={element.homeSpread + "(" + element.homeSpreadOdds + ")"}
                />
              </div>
              <div className="column col-3">
                <BetButton
                  bet={"O " + element.overUnder + "(" + element.overOdds + ")"}
                />
              </div>
            </div>
            <div className="row">
              <p className="column col-3">{awayTeam}</p>
              <div className="column col-3">
                <BetButton bet={element.awayML} />
              </div>
              <div className="column col-3">
                <BetButton
                  bet={element.awaySpread + "(" + element.awaySpreadOdds + ")"}
                />
              </div>
              <div className="column col-3">
                <BetButton
                  bet={"U " + element.overUnder + "(" + element.underOdds + ")"}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MlbLines;
