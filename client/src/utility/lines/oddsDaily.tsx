interface gameData {
  id: string;
  teams: string;
  homeML: string;
  awayML: string;
  homeSpread: string;
  awaySpread: string;
  homeSpreadOdds: string;
  awaySpreadOdds: string;
  overUnder: string;
  overOdds: string;
  underOdds: string;
}

async function oddsDaily(url: string) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
  const result = await response.json();
  //   console.log(JSON.stringify(result));
  const newGameData = {} as gameData;
  newGameData.id = result["id"];
  newGameData.teams = result["shortName"];
  getOdds(newGameData, result["competitions"][0]["odds"]["$ref"]);
  return newGameData;
}

async function getOdds(newGameData: gameData, url: string) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
  const result = await response.json();

  newGameData.homeML = result["items"][0]["homeTeamOdds"]["moneyLine"];
  newGameData.awayML = result["items"][0]["awayTeamOdds"]["moneyLine"];
  newGameData.homeSpread =
    result["items"][0]["homeTeamOdds"]["open"]["pointSpread"]["american"];
  newGameData.awaySpread =
    result["items"][0]["awayTeamOdds"]["open"]["pointSpread"]["american"];
  newGameData.homeSpreadOdds =
    result["items"][0]["homeTeamOdds"]["open"]["spread"]["american"];
  newGameData.awaySpreadOdds =
    result["items"][0]["awayTeamOdds"]["open"]["spread"]["american"];
  newGameData.overUnder = result["items"][0]["overUnder"];
  newGameData.overOdds = result["items"][0]["overOdds"];
  newGameData.underOdds = result["items"][0]["underOdds"];
}

export default oddsDaily;
