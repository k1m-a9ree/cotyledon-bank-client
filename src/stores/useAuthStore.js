import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import axios from 'axios';

axios.defaults.withCredentials = true;
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

// 초기 상태
const initialState = {
    user: null,
    isLoggedIn: false
};

const useAuthStore = create(
    persist((set) => ({
        ...initialState,
        login: async (userid, password) => {
            try {
                const res = await axios.post(
                    `${SERVER_URL}/api/auth/login`,
                    { user: { userid, password } }
                );

                const { user } = res.data;
                
                set({
                    user: user,
                    isLoggedIn: true
                });

            } catch (err) {
                if (import.meta.env.VITE_ENV !== 'production') {
                    console.log(err);
                }
                throw err;
            }
        },
        logout: async () => {
            try {
                await axios.post(`${SERVER_URL}/api/auth/logout`);
            } catch (err) {
                if (import.meta.env.VITE_ENV !== 'production') {
                    console.log(err);
                }
                throw err;
            } finally {
                set(initialState);
            }
        }
    }), {
        name: 'auth-storage',
        storage: createJSONStorage(() => sessionStorage)
    })
);

export default useAuthStore;