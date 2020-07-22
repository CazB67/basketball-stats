const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StatSchema = new Schema(
    {
    user_id: {type: Schema.Types.ObjectId, ref:"User"},
    threePointerMade: { type: Number},
    threePointerMissed: { type: Number},
    twoPointerMade: { type: Number},
    twoPointerMissed: { type: Number},
    onePointerMade: { type: Number},
    onePointerMissed: { type: Number},
    defRebound: { type: Number},
    offRebound: { type: Number},
    steal: { type: Number},
    assist: { type: Number},
    foul: { type: Number},
    turnover: { type: Number},
    courtTime:{type: String},
    opponent: {type: String},
    opponentScore: {type: Number},
    teamScore: { type: Number},
    finalScore: { type: String}
  
  },
  {timestamps: true}
);

    StatSchema.methods.setFinalScore = function() {
      this.finalScore = `${this.teamScore} - ${this.opponentScore}`;
      return this.finalScore;
    };
    
  
  const Stat = mongoose.model("Stat", StatSchema);
  
  module.exports = Stat;