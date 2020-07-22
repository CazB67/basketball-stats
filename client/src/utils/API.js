import axios from 'axios';

export default {
    saveGame: function(gameData, gameTime, opponent,  teamScore, opponentScore) {
        gameData.courtTime = gameTime;
        gameData.opponent = opponent;
        gameData.opponentScore = opponentScore;
        gameData.teamScore = teamScore
        return axios.post("/api/stats", gameData)
    },
    getSavedStats: function() {
        return axios.get("/api/stats")
    }
}