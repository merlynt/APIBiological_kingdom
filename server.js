import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import DBConnection from "./config/database.js"; // Se requiere .js
import swaggerUI from 'swagger-ui-express';
import swaggerDocumentation from './swagger.json' with {type: 'json'};
import kingdomRouter from "./routes/kingdomRoute.js"; // Se requiere .js, renombrar
import taxonomyRouter from "./routes/taxonomyRoute.js"; // Se requiere .js, renombrar
import habitatRouter from "./routes/habitatRoute.js"; // Se requiere .js, renombrar
import specieRouter from "./routes/specieRoute.js"; // Se requiere .js, renombrar
import humanRiskRouter from "./routes/human_riskRoute.js"; // Se requiere .js, renombrar

dotenv.config();
DBConnection();

const app = express();

app.use(cors());
app.use(express.json())

// Rutas
// Importante: swaggerUI necesita dos pasos: .serve y .setup. 
// La ruta del endpoint debe iniciar con /
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocumentation));

app.use("/api/kingdom", kingdomRouter);
app.use("/api/taxonomy", taxonomyRouter);
app.use("/api/habitat", habitatRouter);
app.use("/api/specie", specieRouter);
app.use("/api/human_risk", humanRiskRouter);

app.listen(3000, ()=>{
    console.log("server http://localhost:3000");
});