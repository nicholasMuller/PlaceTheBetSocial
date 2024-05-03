import React, { useState, useEffect } from "react";
import getMlbDaily, { MlbDailyLine } from "../utility/lines/mlbDailyList";

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
        gridTemplateColumns: "repeat(2, 1fr)",
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
            className="teamOdds"
            key={element.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header row */}
            <div
              className="headerRow"
              style={{
                marginBottom: "10px",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <div></div> {/* Empty cell */}
              <div>ML</div>
              <div>Run Line</div>
              <div>Over/Under</div>
            </div>
            <div
              style={{
                marginBottom: "10px",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <h5>{homeTeam}</h5>
              <button>{element.homeML}</button>
              <button>
                {element.homeSpread} ({element.homeSpreadOdds})
              </button>
              <button>
                O {element.overUnder} ({element.overOdds})
              </button>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
              }}
            >
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
