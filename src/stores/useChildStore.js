import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import axios from 'axios';

axios.defaults.withCredentials = true;
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

// 초기 상태
const initialState = {
    point: 0
};

const useChildStore = create(
    persist((set) => ({
        ...initialState,
        checkPoint: async () => {
            try {
                const res = await axios.get(`${SERVER_URL}/api/child/point`);
                set({
                    point: res.data.point
                })
            } catch (err) {
                console.log(err);
                throw err;
            }
        }
    }), {
        name: 'child-storage',
        storage: createJSONStorage(() => sessionStorage)
    })
);

export default useChildStore;