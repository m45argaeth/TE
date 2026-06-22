import type { Config } from "tailwindcss"

const config: Config = {
	darkMode: ["class"],
	content: [
		"./app/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./lib/**/*.{ts,tsx}",
	],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			fontFamily: {
				sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
				mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
			},
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"fade-up": {
					from: { opacity: "0", transform: "translateY(12px)" },
					to: { opacity: "1", transform: "translateY(0)" },
				},
				"fade-in": {
					from: { opacity: "0" },
					to: { opacity: "1" },
				},
				"token-pop": {
					"0%": { opacity: "0", transform: "translateY(8px) scale(0.92)" },
					"60%": { transform: "translateY(-2px) scale(1.03)" },
					"100%": { opacity: "1", transform: "translateY(0) scale(1)" },
				},
				"shimmer": {
					"100%": { transform: "translateX(100%)" },
				},
				"float": {
					"0%, 100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-6px)" },
				},
				"gradient-pan": {
					"0%, 100%": { backgroundPosition: "0% 50%" },
					"50%": { backgroundPosition: "100% 50%" },
				},
			},
			animation: {
				"fade-up": "fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
				"fade-in": "fade-in 0.6s ease both",
				"token-pop": "token-pop 0.45s cubic-bezier(0.16, 1, 0.3, 1) both",
				"shimmer": "shimmer 1.6s infinite",
				"float": "float 6s ease-in-out infinite",
				"gradient-pan": "gradient-pan 8s ease infinite",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
}

export default config
