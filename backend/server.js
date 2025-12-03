import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import DBConnection from "./config/database.js";
import swaggerUI from 'swagger-ui-express';
import swaggerDocumentation from './swagger.json' with {type: 'json'};
import kingdomRouter from "./routes/kingdomRoute.js"; 
import taxonomyRouter from "./routes/taxonomyRoute.js"; 
import habitatRouter from "./routes/habitatRoute.js"; 
import specieRouter from "./routes/specieRoute.js"; 
import humanRiskRouter from "./routes/human_riskRoute.js";

dotenv.config();
DBConnection();

const app = express();

app.use(cors());
app.use(express.json());

// Configurar Swagger dinámicamente según el entorno
const swaggerConfig = {
  ...swaggerDocumentation,
  host: process.env.SWAGGER_HOST || 'localhost:3000',
  schemes: process.env.NODE_ENV === 'production' ? ['https'] : ['http']
};

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerConfig));

app.use("/api/kingdom", kingdomRouter);
app.use("/api/taxonomy", taxonomyRouter);
app.use("/api/habitat", habitatRouter);
app.use("/api/specie", specieRouter);
app.use("/api/human_risk", humanRiskRouter);

// Ruta raíz para verificar que la API está funcionando
app.get('/', (req, res) => {
    res.json({ 
        message: "API is running on Vercel",
        documentation: "/doc",
        endpoints: {
            kingdom: "/api/kingdom",
            taxonomy: "/api/taxonomy",
            habitat: "/api/habitat",
            specie: "/api/specie",
            human_risk: "/api/human_risk"
        }
    });
});

// Para desarrollo local
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

// Exportar la app para Vercel (IMPORTANTE)
export default app;