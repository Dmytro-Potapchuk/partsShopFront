import axios from "axios";
import {API_URL} from "../config/apiConfig.ts";



export interface Part {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
}

// Получить все запчасти
export const fetchParts = async () => {
    const response = await axios.get<Part[]>(API_URL);
    return response.data;
};

// Добавить новую запчасть
export const addPart = async (part: Omit<Part, "id">) => {
    const response = await axios.post<Part>(API_URL, part);
    return response.data;
};

// Обновить запчасть
export const updatePart = async (id: number, updateData: Partial<Part>) => {
    const response = await axios.put<Part>(`${API_URL}/${id}`, updateData);
    return response.data;
};

// Удалить запчасть
export const deletePart = async (id: number) => {
    await axios.delete(`${API_URL}/${id}`);
};

// Купить запчасть (уменьшает stock)
export const purchasePart = async (id: number, quantity: number) => {
    const response = await axios.post<Part>(`${API_URL}/${id}/purchase`, { quantity });
    return response.data;
};
