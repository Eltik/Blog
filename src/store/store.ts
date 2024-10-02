import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "~/types";

export const useUserData = create(
    persist(
        (set) => ({
            user: {},
            setUser: (user: User) => set({ user }),
        }),
        {
            name: "userData",
        },
    ),
);
