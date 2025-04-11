export default interface TodoTypes {
    id: number;
    description: string;
    completed: boolean;
    date?: string; // Fecha de finalización (opcional)
}