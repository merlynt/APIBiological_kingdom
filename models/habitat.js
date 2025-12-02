import mongoose from "mongoose";

const HabitatSchema = new mongoose.Schema({
  ecosystem: {
    type: String,
    required: true,
  },
  climate: {
    type: String,
    required: true,
  },
  temperature: {
    type: String,
    required: true,
  },
  soil_type: {
    type: String,
    required: true,
  },
  predominant_vegetation: {
    type: String,
    required: true,
  },
});

const Habitat = mongoose.model("Habitat", HabitatSchema);

export default Habitat;
