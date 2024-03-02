import { create } from "zustand";

// const [selectedConversation, setSelectedConversation] = useState(null)

const useConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) =>
        set({ selectedConversation }),
    message: [],
    setMessage: (message) => set({ message }),
}));

export default useConversation;
