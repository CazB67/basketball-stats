const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const statSchema = new Schema(
    {
    user_id: {type: Schema.Types.ObjectId, ref:"User"},
    three_point_made: { type: Number},
    three_point_missed: { type: Number},
    two_point_made: { type: Number},
    two_point_missed: { type: Number},
    one_point_made: { type: Number},
    one_point_missed: { type: Number},
    def_rebound: { type: Number},
    off_rebound: { type: Number},
    steal: { type: Number},
    assist: { type: Number},
    foul: { type: Number},
    turnover: { type: Number},
    court_time:{type: Number}
    },
    {timestamps: true}
);
  
  const Stat = mongoose.model("Stat", statSchema);
  
  module.exports = Stat;