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
    totalRebounds: {type: Number},
    area1Made: {type: Number},
    area2Made: {type: Number},
    area3Made: {type: Number},
    area4Made: {type: Number},
    area5Made: {type: Number},
    area6Made: {type: Number},
    area7Made: {type: Number},
    area8Made: {type: Number},
    area9Made: {type: Number},
    area10Made: {type: Number},
    area11Made: {type: Number},
    area12Made: {type: Number},
    area13Made: {type: Number},
    area14Made: {type: Number},
    area15Made: {type: Number},
    area16Made: {type: Number},
    area1Missed: {type: Number},
    area2Missed: {type: Number},
    area3Missed: {type: Number},
    area4Missed: {type: Number},
    area5Missed: {type: Number},
    area6Missed: {type: Number},
    area7Missed: {type: Number},
    area8Missed: {type: Number},
    area9Missed: {type: Number},
    area10Missed: {type: Number},
    area11Missed: {type: Number},
    area12Missed: {type: Number},
    area13Missed: {type: Number},
    area14Missed: {type: Number},
    area15Missed: {type: Number},
    area16Missed: {type: Number}
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