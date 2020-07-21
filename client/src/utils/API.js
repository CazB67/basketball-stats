import axios from 'axios';

export default {
    saveGame: function(gameData, gameTime, opponent,  teamScore, opponentScore) {
        //let x = gameData;
        console.log(teamScore +" ____________");
        console.log(opponentScore +" ____________");
        gameData.courtTime = gameTime;
        gameData.opponent = opponent;
        gameData.opponentScore = opponentScore;
        gameData.teamScore = teamScore
        //console.log(x.gameTimeTest + "--------------");
        //console.log(gameData.foul);
        return axios.post("/api/stats", gameData)
    }
}