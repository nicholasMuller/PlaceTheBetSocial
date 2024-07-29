import oddsDaily from "./oddsDaily";
async function getMlbDaily() {
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
  const dailyLines = [];
  for (let i = 0; i < numberOfGames; i++) {
    if(result["items"][i]["$ref"]){
      dailyLines.push(await oddsDaily(result["items"][i]["$ref"]));
    }
  }
  return dailyLines;
}

export default getMlbDaily;
