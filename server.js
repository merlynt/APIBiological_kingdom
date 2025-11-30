const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const DBConnection = require("./config/database");

dotenv.config();
DBConnection();

const app = express();
app.use(cors());
app.use(express.json())

//rutas

app.use("/api/kingdom", require("./routes/kingdomRoute"));
app.use("/api/taxonomy", require("./routes/taxonomyRoute"));
app.use("/api/habitat", require("./routes/habitatRoute"));
app.use("/api/specie", require("./routes/specieRoute"));
app.use("/api/human_risk", require("./routes/human_riskRoute"));

app.listen(3000, ()=>{
    console.log("server http://localhost:3000")
})