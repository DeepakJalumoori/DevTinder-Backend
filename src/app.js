const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const requestRouter = require("./routes/request");
const profileRouter = require("./routes/profile");
const userRouter = require("./routes/user");
const cors = require("cors");
const http = require("http");
const initializeSocket = require("./utils/socket");
const chatRouter = require("./routes/chat");


require('dotenv').config();


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type"]
  })
);
app.use(express.json());
app.use(cookieParser());


app.use("/",authRouter);
app.use("/",requestRouter);
app.use("/",profileRouter);
app.use("/",userRouter);
app.use("/", chatRouter);

const server = http.createServer(app);
initializeSocket(server);


connectDB().then(() => {
  console.log("Database connection established...");
  server.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT + "!!!");
  });
})
.catch((err) => {
  console.log("Something went wrong!!!!");
  console.error(err);
});



