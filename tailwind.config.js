/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			colors: {
				"sky-blue": {
					DEFAULT: "#E1F2FE",
				},
				purple: {
					DEFAULT: "#350E9E",
				},
				blue: {
					dark: "#2E3A9E",
					focused: "#4756D1",
					hover: "#4D5EE5",
					DEFAULT: "#5466F9",
					secondary: "#7685FA",
					tertiary: "#98A3FB",
					quat: "#BBC3FD",
					quin: "#DDE1FE",
					senary: "#F5F6FF",
					backdrop: "#fafaff",
				},
				black: {
					DEFAULT: "#1F2130",
					secondary: "#41415A",
					tertiary: "#71748C",
					quat: "#B8BAC6",
					quin: "#D5D5DD",
				},
				white: {
					DEFAULT: "#ffff",
					light: "#FAFAFF",
					grey: "#F7F9FC",
				},
				grey: {
					secondary: "#F1F1F4",
					tertiary: "#F6F7F8",
					backdrop: "#F9F9FB",
					DEFAULT: "#E3E3E8",
				},
				error: {
					DEFAULT: "#D20832",
					secondary: "#DB3959",
					tertiary: "#E46B84",
					quat: "#ED9CAC",
					quin: "#F6CED6",
					backdrop: "#FDF6F8",
				},
				success: {
					DEFAULT: "#22B231",
					secondary: "#4EC15A",
					tertiary: "#7AD183",
					quat: "#A7E0AD",
					quin: "#D3F0D6",
					backdrop: "#F7FCF8",
				},
				warning: {
					DEFAULT: "#F07911",
					secondary: "#F39441",
					tertiary: "#F49B4D",
					quat: "#F8BC88",
					quin: "#FBDEC4",
					backdrop: "#FEFAF5",
				},
				info: {
					text: "#139AB7",
					bg: "#F2F6FB",
					DEFAULT: "#139AB7",
					secondary: "#42AEC5",
					tertiary: "#71C2D4",
					quat: "#A1D7E2",
					quin: "#D0EBF1",
					backdrop: "#F7FCFD",
				},
			},
		},
	},
	plugins: [],
};
