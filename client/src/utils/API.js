import axios from 'axios';


export default {
    saveGame: function(gameData, gameTime, opponent,  teamScore, opponentScore) {
        gameData.courtTime = gameTime;
        gameData.opponent = opponent;
        gameData.opponentScore = opponentScore;
        gameData.teamScore = teamScore
        //gameData.user_id =  store.auth.authState.id;
        return axios.post("/api/stats", gameData, {withCredentials: true})
    },
    getSavedStats: function() {
        return axios.get("/api/stats", {withCredentials: true})
    }
}