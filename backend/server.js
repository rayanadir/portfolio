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
require("./config/db");
app.use(express.json());
app.use(require("./routes/routes"))
 
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});