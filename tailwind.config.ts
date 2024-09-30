import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
    content: ["./src/**/*.tsx"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-geist-sans)", ...fontFamily.sans],
            },
            colors: {
                "bg-hero": "#181820",
                "bg-button": "#2a2a32",
                "bg-search": "#343439",
            },
        },
    },
    plugins: [],
} satisfies Config;
