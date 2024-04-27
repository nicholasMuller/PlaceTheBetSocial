async function getMlbDaily() {
  export interface gameData{
    id: String
    teams: String
    homeML: String
    awayML: String
    homeSpread: String
    awaySpread: String
    homeSpreadOdds: String
    awaySpreadOdds: String
    over: String
    under: String
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
  // console.log("result is: ", JSON.stringify(result));
  var newGameData : gameData;
  result.forEach(element =>{
  })
  }
}

export default getMlbDaily;
