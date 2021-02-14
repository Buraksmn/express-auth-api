require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoute = require("./routes/auth/authRoute");

const server = express();

server.use(bodyParser.json({ limit: "30mb", extended: 30 }));
server.use(bodyParser.urlencoded({ limit: "30mb", extended: 30 }));
server.use(cors());

const PORT = process.env.PORT;
const MONGO_CONN_STR = process.env.MONGO_CONN_STR;

console.log("MONGO_CONN_STR: ", MONGO_CONN_STR);

server.get("/", (req, res) => {
  res.send("sa");
});

server.use("/auth", authRoute);

const conn = mongoose
  .connect(MONGO_CONN_STR, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.listen(PORT, () => {
      // const Cat = mongoose.model("Cat", { name: String });
      // const kitty = new Cat({ name: "Zildjian" });
      // kitty.save().then(() => console.log("meow"));
      console.log("Server Çalıştı");
    });
  })
  .catch((err) => {
    console.log("bir sorunla karşılaşıldı", err);
  });
