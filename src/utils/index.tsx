
import Axios from "./axios";

let token:any = null;

if (typeof window !== 'undefined') {
    // const userInfo = localStorage.getItem('userInfo');
    // const user = userInfo ? JSON.parse(userInfo) : null;
    // token = user?.access_token;
    token = localStorage.getItem('access_token')
}

export const postWithToken = async (url: string, data: any) => {
    try {
        const response = await Axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const fetchWithToken = async (url: string) => {
    try {
        const response = await Axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};
