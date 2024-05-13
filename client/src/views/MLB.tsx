import React, { useState, useEffect } from "react";
import getMlbDaily, { MlbDailyLine } from "../utility/lines/mlbDailyList";
import BetButton from "../components/BetButton";

function MlbLines() {
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
    <div
      style={{
        display: "grid",
        gridTemplateRows: "repeat(2, 1fr)",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "30px",
      }}
    >
      {dailyLines.map((element) => {
        const [awayTeam, homeTeam] = element.teams.split(" @ ");

        // Check if any required fields are missing or empty
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
          <div
            key={element.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header row */}

            <div className="mlbTable">
              <div></div> {/* Empty cell */}
              <div>ML</div>
              <div>Run Line</div>
              <div>Over/Under</div>
            </div>
            <div className="mlbTable">
              <h5>{homeTeam}</h5>
              <BetButton bet={element.homeML} />
              <BetButton
                bet={element.homeSpread + "(" + element.homeSpreadOdds + ")"}
              />
              <BetButton
                bet={"O" + element.overUnder + "(" + element.overOdds + ")"}
              />
            </div>
            <div className="mlbTable">
              <h5>{awayTeam}</h5>
              <button>{element.awayML}</button>
              <button>
                {element.awaySpread} ({element.awaySpreadOdds})
              </button>
              <button>
                U {element.overUnder} ({element.underOdds})
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MlbLines;
