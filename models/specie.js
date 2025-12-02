import mongoose from "mongoose";

const specieSchema = new mongoose.Schema({
  kingdom_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Kingdom',
    required: true
  },

  taxonomy_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Taxonomy',
    required: true
  },

  scientific_name: {
    type: String,
    required: true
  },

  common_name: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  diet: {
    type: String,
    required: true
  },

  conservation_status: {
    type: String,
    required: true
  },

  habitat_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Habitat',
    required: true
  },

  naturalPredators: {
    predator_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    vulnerability_rating: {
      type: String,
      enum: ['low', 'medium', 'high'],
      required: true
    },
    prey_defense: {
      type: String,
      required: true
    }
  },

  geographic_distribution: {
    continents: [String],
    countries: [String],
    regions: [String]
  },

  image_url: {
    type: String,
    required: true
  }
});

const Specie = mongoose.model('Specie', specieSchema);

export default Specie;
