import React, { useEffect, useState } from "react";
import { getParts } from "../services/partsService";

interface Part {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl?: string;
}

export const PartsList: React.FC = () => {
  const [parts, setParts] = useState<Part[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [cart, setCart] = useState<Part[]>([]);

  useEffect(() => {
    const fetchParts = async () => {
      const data = await getParts();
      setParts(data);
    };
    fetchParts();
  }, []);

  const addToCart = (part: Part) => {
    setCart((prev) => [...prev, part]);
  };

  const filteredParts = parts.filter((part) =>
    part.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedParts = [...filteredParts].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "priceAsc") return a.price - b.price;
    if (sortBy === "priceDesc") return b.price - a.price;
    return 0;
  });

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>Dostępne części</h2>

      <input
        type="text"
        placeholder="Wyszukaj część..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: "8px", borderRadius: "8px", marginBottom: "10px", width: "100%" }}
      />

      <select
        onChange={(e) => setSortBy(e.target.value)}
        value={sortBy}
        style={{ padding: "8px", borderRadius: "8px", marginBottom: "20px", width: "100%" }}
      >
        <option value="">Sortuj</option>
        <option value="name">Nazwa A-Z</option>
        <option value="priceAsc">Cena rosnąco</option>
        <option value="priceDesc">Cena malejąco</option>
      </select>

      {sortedParts.map((part) => (
        <div
          key={part.id}
          style={{
            display: "flex",
            gap: "16px",
            padding: "12px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            marginBottom: "12px",
            alignItems: "center",
            background: "rgba(255, 255, 255, 0.05)",
          }}
        >
          {part.imageUrl && (
            <img
              src={part.imageUrl}
              alt={part.name}
              style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "8px" }}
            />
          )}
          <div style={{ flex: 1 }}>
            <h3 style={{ margin: 0 }}>{part.name}</h3>
            <p style={{ margin: "4px 0" }}>{part.description}</p>
            <strong>{Number(part.price).toFixed(2)} zł</strong>
          </div>
          <button
            onClick={() => addToCart(part)}
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              background: "#3498db",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Dodaj do koszyka
          </button>
        </div>
      ))}

      {cart.length > 0 && (
        <div style={{ marginTop: "40px", borderTop: "1px solid #999", paddingTop: "20px" }}>
          <h3>Koszyk</h3>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>{item.name} - {item.price.toFixed(2)} zł</li>
            ))}
          </ul>
          <strong>
            Razem: {cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)} zł
          </strong>
        </div>
      )}
    </div>
  );
};
