import {useEffect, useState} from "react";
import {deletePart, fetchParts, Part, purchasePart} from "../services/partsService.ts";


export const PartsList: React.FC = () => {
    const [parts, setParts] = useState<Part[]>([]);
    const [loading, setLoading] = useState(true);

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
        loadParts();
    }, []);

    const handleDelete = async (id: number) => {
        await deletePart(id);
        loadParts(); // Обновить список
    };

    const handlePurchase = async (id: number) => {
        await purchasePart(id, 1); // Покупаем 1 шт.
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
                            <button onClick={() => handlePurchase(part.id)}>Buy</button>
                            <button onClick={() => handleDelete(part.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
