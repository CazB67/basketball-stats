const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const statSchema = new Schema(
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
    teamScore: { type: Number}
    },
    {timestamps: true}
);
  
  const Stat = mongoose.model("Stat", statSchema);
  
  module.exports = Stat;