export interface Message {
    id?: string | number;
    text: string;
    role: 'user' | 'bot';
    page?: number;
}