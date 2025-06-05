import React from 'react';

const AdminPanel = () => {
  const addPart = async () => {
    const newPart = {
      name: "Testowa część z frontu",
      description: "Dodana kliknięciem w panelu administratora",
      price: 123.45,
      stock: 5
    };

    try {
      const response = await fetch("http://localhost:3000/parts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newPart)
      });

      if (response.ok) {
        alert("Część została dodana!");
      } else {
        const error = await response.json();
        alert("Błąd: " + error.message);
      }
    } catch (error) {
      console.error(error);
      alert("Wystąpił błąd przy połączeniu z serwerem");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Panel administratora</h1>
      <button onClick={addPart}>Dodaj testową część</button>
    </div>
  );
};

export default AdminPanel;
