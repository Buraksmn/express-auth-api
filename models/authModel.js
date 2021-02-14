const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// * register  ve login için ortak model
// * ayrı modellerden aynı collectionlara baglantı yapamadım araştırılacak.

const authenticationModel = new Schema({
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
});

const authenticationSC = mongoose.model("users", authenticationModel);
module.exports = { authenticationSC };
