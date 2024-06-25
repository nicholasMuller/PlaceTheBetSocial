import React, { useState, useEffect } from "react";
import getMlbDaily from "../utility/lines/mlbDailyList";
import BetButton from "../components/BetButton";
import { gameData } from "../utility/lines/oddsDaily";
import "../index.css"; // Make sure the CSS file is correctly imported

export interface SelectedBet {
  id: string;
  betType: string;
  odds: string;
}

const MlbLines: React.FC = () => {
  const [dailyLines, setDailyLines] = useState<gameData[]>([]);
  const [selectedBets, setSelectedBets] = useState<SelectedBet[]>([]);

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

  const handleBetSelection = (bet: SelectedBet, isSelected: boolean) => {
    setSelectedBets((prev) => {
      if (isSelected) {
        // Add bet
        return [...prev, bet];
      } else {
        // Remove bet
        return prev.filter((b) => !(b.id === bet.id && b.betType === bet.betType && b.odds === bet.odds));
      }
    });
  };

  const handleSubmit = () => {
    console.log("Selected Bets:", selectedBets);
    // You can now send this array to your backend or process it as needed
  };

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
                <BetButton
                  id={element.id}
                  betType="ML"
                  odds={element.homeML}
                  onSelect={(bet, isSelected) => handleBetSelection(bet, isSelected)}
                />
              </div>
              <div className="column col-3">
                <BetButton
                  id={element.id}
                  betType="Run Line"
                  odds={element.homeSpread + "(" + element.homeSpreadOdds + ")"}
                  onSelect={(bet, isSelected) => handleBetSelection(bet, isSelected)}
                />
              </div>
              <div className="column col-3">
                <BetButton
                  id={element.id}
                  betType="Over"
                  odds={element.overUnder + "(" + element.overOdds + ")"}
                  onSelect={(bet, isSelected) => handleBetSelection(bet, isSelected)}
                />
              </div>
            </div>
            <div className="row">
              <p className="column col-3">{awayTeam}</p>
              <div className="column col-3">
                <BetButton
                  id={element.id}
                  betType="ML"
                  odds={element.awayML}
                  onSelect={(bet, isSelected) => handleBetSelection(bet, isSelected)}
                />
              </div>
              <div className="column col-3">
                <BetButton
                  id={element.id}
                  betType="Run Line"
                  odds={element.awaySpread + "(" + element.awaySpreadOdds + ")"}
                  onSelect={(bet, isSelected) => handleBetSelection(bet, isSelected)}
                />
              </div>
              <div className="column col-3">
                <BetButton
                  id={element.id}
                  betType="Under"
                  odds={element.overUnder + "(" + element.underOdds + ")"}
                  onSelect={(bet, isSelected) => handleBetSelection(bet, isSelected)}
                />
              </div>
            </div>
          </div>
        );
      })}
      <button onClick={handleSubmit}>Submit Bets</button>
    </div>
  );
};

export default MlbLines;
