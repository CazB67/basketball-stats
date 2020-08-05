import axios from 'axios';


export default {
    saveGame: function(gameData, courtTime, opponent,  teamScore, opponentScore) {
        gameData.courtTime = courtTime;
        gameData.opponent = opponent;
        gameData.opponentScore = opponentScore;
        gameData.teamScore = teamScore
        return axios.post("/api/stats/", gameData, {withCredentials: true})
    },
    getSavedStats: function() {
        return axios.get("/api/stats", {withCredentials: true})
    },
    deleteStat: function(id) {
        return axios.delete("/api/stats/" + id, {withCredentials: true})
    },
    getStat: function(id) {
        return axios.get("/api/stats/" + id, {withCredentials: false});
      }
}