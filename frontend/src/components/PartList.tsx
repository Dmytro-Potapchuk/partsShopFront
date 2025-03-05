import { useEffect, useState } from "react";
import { deletePart, fetchParts, Part, purchasePart } from "../services/partsService.ts";

export const PartsList: React.FC = () => {
    const [parts, setParts] = useState<Part[]>([]);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState<string | null>(null); // Nowe: przechowujemy rolę użytkownika

    const loadParts = async () => {
        try {
            const data = await fetchParts();
            setParts(data);
        } catch (error) {
            console.error("Error fetching parts:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const userRole = localStorage.getItem("role"); // Pobiera rolę użytkownika
        setRole(userRole);
        loadParts();
    }, []);

    const handleDelete = async (id: number) => {
        await deletePart(id);
        loadParts();
    };

    const handlePurchase = async (id: number) => {
        await purchasePart(id, 1);
        loadParts();
    };


    return (
        <div>
            <h2>Parts List</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {parts.map((part) => (
                        <li key={part.id}>
                            {part.name} - ${part.price} ({part.stock} in stock)

                            {/* Każdy może kupować */}
                            {role === "client" || role === "admin" ? (
                                <button onClick={() => handlePurchase(part.id)}>Buy</button>
                            ) : null}

                            {/* Tylko admin może usuwać i aktualizować */}
                            {role === "admin" ? (
                                <>
                                    <button onClick={() => handleDelete(part.id)}>Delete</button>
                                    <button onClick={() => console.log("Update", part.id)}>Update</button>
                                </>
                            ) : null}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
