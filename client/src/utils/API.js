import axios from 'axios';


export default {
    saveGame: function(gameData, gameTime, opponent,  teamScore, opponentScore) {
        gameData.courtTime = gameTime;
        gameData.opponent = opponent;
        gameData.opponentScore = opponentScore;
        gameData.teamScore = teamScore
        //gameData.user_id =  store.auth.authState.id;
        return axios.post("http://localhost:3001/api/stats", gameData, {withCredentials: true})
    },
    getSavedStats: function() {
        return axios.get("http://localhost:3001/api/stats", {withCredentials: true})
    }
}