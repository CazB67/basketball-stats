const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema(
    {
    name: {type: String, required:false},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    },
    {timestamps: true}
);


//Password hash middleware.
userSchema.pre("save", async function save(next) {
  const user = this;
  if (!user.isModified("password")) {
      return next();
  }

  await bcrypt
        .genSalt(10)
        .then((salt) => {
            return bcrypt.hash(user.password, salt);
        })
        .then((hash) => {
            user.password = hash;
            next();
        })
        .catch((err) => {
            return next(err);
        });
});

userSchema.methods.comparePassword = function comparePassword(
  candidatePassword, cb
) 
  {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        cb(err, isMatch);
    });
};
  
const User = mongoose.model("User", userSchema);
  
module.exports = User;