import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import axios from 'axios';

axios.defaults.withCredentials = true;
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

// 초기 상태
const initialState = {
    point: 0,
    stage: 0
};

const useChildStore = create(
    persist((set) => ({
        ...initialState,
        checkPoint: async () => {
            try {
                const res = await axios.get(`${SERVER_URL}/api/child/point`);
                set(prev => ({
                    ...prev,
                    point: res.data.point
                })
                )
            } catch (err) {
                if (import.meta.env.VITE_ENV !== 'production') {
                    console.log(err);
                }
                throw err;
            }
        },
        checkStage: async () => {
            try {
                const res = await axios.get(`${SERVER_URL}/api/child/stage`);
                set(prev => ({
                    ...prev,
                    stage: res.data.stage
                })
                )
            } catch (err) {
                if (import.meta.env.VITE_ENV !== 'production') {
                    console.log(err);
                }
                throw err;
            }
        }
    }), {
        name: 'child-storage',
        storage: createJSONStorage(() => sessionStorage)
    })
);

export default useChildStore;