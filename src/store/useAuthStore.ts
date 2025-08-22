import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  username: string;
};

type Actions = {
  setUsername: (username: string) => void;
};

export const useAuthStore = create<State & Actions>()(
  persist(
    (set) => ({
      username: "",
      setUsername: (username: string) => set({ username }),
    }),
    {
      name: "authStore",
    }
  )
);
