async function getMlbDaily() {
  interface gameData {
    id: string;
    teams: string;
    homeML: string;
    awayML: string;
    homeSpread: string;
    awaySpread: string;
    homeSpreadOdds: string;
    awaySpreadOdds: string;
    over: string;
    under: string;
  }

  const response = await fetch(
    "http://sports.core.api.espn.com/v2/sports/baseball/leagues/mlb/events?lang=en&region=us",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );
  const result = await response.json();
  const numberOfGames = result["items"].length;
  // let newGameData: gameData;
  for (let i = 0; i < numberOfGames; i++) {
    console.log(JSON.stringify(result["items"][i]["$ref"]));
  }
}

export default getMlbDaily;
