import axios from 'axios';

export default {
    saveGame: function(gameData) {
        console.log(gameData.foul);
        return axios.post("/api/stats", gameData)
    }
}