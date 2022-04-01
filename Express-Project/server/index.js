const express = require('express');
const cors = require('cors');
const corsOptions ={
  origin:'*', 
  optionSuccessStatus:200
}
const mongoose = require('mongoose');
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
require('dotenv').config();
const app = express();
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan("combined"));
app.use(cookieParser());
const port = process.env.PORT || 4000;
const connectDB = async () =>{
  try {
    await mongoose.connect(process.env.MONGODB_URI,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("Connect database successfully!!")
  } catch (error) {
    console.error("Connect database failed!!")
  }
}
connectDB();
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})