import { create } from "zustand";

const initialState = {
    toasts: []
}
const useToastStore = create((set) => ({
    ...initialState,

    showToast: (message, type = 'info') => {
        const id = Date.now();
        set(prev => ({
            toasts: [...prev.toasts, { id, message, type }]
        }));
        
        setTimeout(() => {
            set(prev => ({
                toasts: prev.toasts.filter(toast => (id != toast.id))
            }))
        }, 3000);
    }
}));

export default useToastStore;