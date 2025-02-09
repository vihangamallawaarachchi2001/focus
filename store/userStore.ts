import { create } from "zustand";

export type User = {
  name: string;
  email: string;
  password: string;
};

type Store = {
  user: User | null;
  setUser: (user: User) => void;
  removeUser: () => void;
};

const useStore = create<Store>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  removeUser: () => set({ user: null }),
}));

export default useStore; 
