import { useState, useEffect } from "react";

const SpeciesSection = () => {
  const [species, setSpecies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/specie")
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener los datos");
        return res.json();
      })
      .then((data) => {
        setSpecies(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando especies...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section id="species" className="py-24">
      <div className="container mx-auto px-6">
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-12">
          Especies que puedes encontrar
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {species.map((item, index) => (
            <div
              key={item.id || index}
              className="group relative rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/30 transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.image_url || "/placeholder.png"}
                  alt={item.common_name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80" />

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-heading font-semibold text-lg">
                  {item.common_name}
                </h3>
                <p className="text-sm text-muted-foreground">{item.kingdom_id.scientific_name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpeciesSection;
