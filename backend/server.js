const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));


// get driver connection
//const dbo = require("./config/db");
require("./config/db");
app.use(express.json());
// call only once
app.use(require("./routes/user.routes"))
//app.use(require("./routes/conversation.routes"))
 
app.listen(port, () => {
  // perform a database connection when server starts
  /*dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });*/
  console.log(`Server is running on port: ${port}`);
});