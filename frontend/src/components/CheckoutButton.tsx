import React from "react";

interface CheckoutButtonProps {
  amount: number;
  email: string;
}

export const CheckoutButton: React.FC<CheckoutButtonProps> = ({ amount, email }) => {
  const handlePayment = async () => {
    try {
      const response = await fetch("http://localhost:3000/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, email }),
      });

      const data = await response.json();

      // 👇 Sprawdzamy i przekierowujemy do PayU
      if (data?.redirectUri) {
        window.location.href = data.redirectUri;
      } else {
        alert("Błąd: Brak redirectUri w odpowiedzi z backendu.");
      }
    } catch (err) {
      console.error("Błąd płatności:", err);
      alert("Wystąpił błąd podczas przetwarzania płatności.");
    }
  };

  return (
    <button
      onClick={handlePayment}
      style={{
        backgroundColor: "#27ae60",
        color: "white",
        border: "none",
        padding: "10px 20px",
        borderRadius: "8px",
        fontSize: "16px",
        cursor: "pointer",
        marginTop: "20px"
      }}
    >
      Przejdź do płatności
    </button>
  );
};
