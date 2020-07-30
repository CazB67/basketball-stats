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
    courtTime:{type: Number},
    opponent: {type: String},
    opponentScore: {type: Number},
    teamScore: { type: Number},
    finalScore: { type: String},
    totalPoints: {type: Number},
    totalRebounds: {type: Number}
  },
  {timestamps: true}
);

    StatSchema.methods.setFinalScore = function() {
      this.finalScore = `${this.teamScore} - ${this.opponentScore}`;
      return this.finalScore;
    };

    StatSchema.methods.setTotalPoints = function() {
      this.totalPoints = (this.threePointerMade * 3) + (this.twoPointerMade * 2)+ (this.onePointerMade) ;
      return this.totalPoints;
    };

    StatSchema.methods.setTotalRebounds = function() {
      this.totalRebounds = (this.offRebound) + (this.defRebound);
      return this.totalRebounds;
    };
    
// we want to load the user resource in a virtual field
// to be populated later on
 StatSchema.virtual('user', {
   ref: "User",
   localField: 'user_id',
   foreignField: '_id',
   justOne: true
 })

  const Stat = mongoose.model("Stat", StatSchema);
  
  module.exports = Stat;