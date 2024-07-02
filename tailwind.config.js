/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
        "./node_modules/flowbite/**/*.js",
        "./pages/**/*.{js,jsx}",
        "./components/**/*.{js,jsx}",
        "./app/**/*.{js,jsx}",
        "./src/**/*.{js,jsx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                main: {
                    100: "#DEF7FA",
                    200: "#BFECF5",
                    300: "#97D1E1",
                    400: "#73ADC4",
                    500: "#477F9D",
                    600: "#336487",
                    700: "#234C71",
                    800: "#16365B",
                    900: "#0D264B",
                },
                roman: {
                    50: "#fef2f2",
                    100: "#fde3e3",
                    200: "#fccccc",
                    300: "#f9a8a9",
                    400: "#f37677",
                    500: "#ea5455",
                    600: "#d52d2e",
                    700: "#b32223",
                    800: "#942021",
                    900: "#7b2122",
                    950: "#430c0c",
                },
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [
        require("tailwindcss-animate"),
        require("@tailwindcss/forms"),
        require("flowbite/plugin"),
    ],
};
