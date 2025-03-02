import React, { useState } from "react";
import { addPart, updatePart } from "../services/partsService.ts";

export const PartForm: React.FC<{ onPartAdded: () => void }> = ({ onPartAdded }) => {
    const [part, setPart] = useState({ name: "", description: "", price: "", stock: "" });
    const [editingId, setEditingId] = useState<number | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPart({ ...part, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = { ...part, price: Number(part.price), stock: Number(part.stock) };

        if (editingId) {
            await updatePart(editingId, data);
        } else {
            await addPart(data);
        }

        setPart({ name: "", description: "", price: "", stock: "" });
        setEditingId(null);
        onPartAdded();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" value={part.name} onChange={handleChange} placeholder="Name" required />
            <input name="description" value={part.description} onChange={handleChange} placeholder="Description" />
            <input name="price" value={part.price} onChange={handleChange} type="number" placeholder="Price" required />
            <input name="stock" value={part.stock} onChange={handleChange} type="number" placeholder="Stock" required />
            <button type="submit">{editingId ? "Update" : "Add"} Part</button>
        </form>
    );
};
