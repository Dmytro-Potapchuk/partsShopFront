import axios from "axios";
import { API_URL } from "../config/apiConfig.ts";
import { getToken } from "./authService.ts";

export interface Part {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl?: string; // jeśli dodajesz zdjęcia
}

// Pobranie tokena dla autoryzacji
const getAuthHeaders = () => {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// Pobierz wszystkie części
export const fetchParts = async () => {
    const response = await axios.get<Part[]>(API_URL, {
        headers: getAuthHeaders(),
    });
    return response.data;
};

// Alias dla fetchParts — używany np. w PartList.tsx
export const getParts = fetchParts;

// Dodaj nową część (tylko admin)
export const addPart = async (part: Omit<Part, "id">) => {
    const response = await axios.post<Part>(API_URL, part, {
        headers: getAuthHeaders(),
    });
    return response.data;
};

// Aktualizuj część (tylko admin)
export const updatePart = async (id: number, updateData: Partial<Part>) => {
    const response = await axios.put<Part>(`${API_URL}/${id}`, updateData, {
        headers: getAuthHeaders(),
    });
    return response.data;
};

// Usuń część (tylko admin)
export const deletePart = async (id: number) => {
    await axios.delete(`${API_URL}/${id}`, {
        headers: getAuthHeaders(),
    });
};

// Kup część (klient/admin)
export const purchasePart = async (id: number, quantity: number) => {
    const response = await axios.post<Part>(
        `${API_URL}/${id}/purchase`,
        { quantity },
        { headers: getAuthHeaders() }
    );
    return response.data;
};
