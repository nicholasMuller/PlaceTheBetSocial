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
    <div>
      {dailyLines.map((element) => (
        <ul key={element.id}>
          <li>Teams: {element.teams}</li>
          <li>Home ML: {element.homeML}</li>
          <li>Away ML: {element.awayML}</li>
          <li>Home Spread: {element.homeSpread}</li>
          <li>Away Spread: {element.awaySpread}</li>
          <li>Home Spread Odds: {element.homeSpreadOdds}</li>
          <li>Away Spread Odds: {element.awaySpreadOdds}</li>
          <li>Over/Under: {element.overUnder}</li>
          <li>Over Odds: {element.overOdds}</li>
          <li>Under Odds: {element.underOdds}</li>
        </ul>
      ))}
    </div>
  );
}

export default MlbLines;
