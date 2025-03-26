import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	container: {
  		center: true,
  		padding: '1rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))',
  				'0': 'hsl(var(--accent-0))',
  				'1': 'hsl(var(--accent-1))',
  				'2': 'hsl(var(--accent-2))',
  				'3': 'hsl(var(--accent-3))',
  				'4': 'hsl(var(--accent-4))',
  				'5': 'hsl(var(--accent-5))',
  				'6': 'hsl(var(--accent-6))',
  				'7': 'hsl(var(--accent-7))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			danger: {
  				DEFAULT: 'hsl(var(--danger-background))',
  				foreground: 'hsl(var(--danger-foreground))'
  			},
  			warning: {
  				DEFAULT: 'hsl(var(--warning-background))',
  				foreground: 'hsl(var(--warning-foreground))'
  			},
  			success: {
  				DEFAULT: 'hsl(var(--success-background))',
  				foreground: 'hsl(var(--success-foreground))'
  			},
  			info: {
  				DEFAULT: 'hsl(var(--info-background))',
  				foreground: 'hsl(var(--info-foreground))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		fontSize: {
  			heading1: 'clamp(1.5rem, 1.1053rem + 1.9737vw, 3rem)',
  			heading2: 'clamp(1.25rem, 0.9211rem + 1.6447vw, 2.5rem)',
  			heading3: 'clamp(1.125rem, 0.8947rem + 1.1513vw, 2rem)',
  			heading4: 'clamp(1rem, 0.8026rem + 0.9868vw, 1.75rem)',
  			heading5: 'clamp(0.875rem, 0.7105rem + 0.8224vw, 1.5rem)',
  			heading6: 'clamp(0.75rem, 0.6184rem + 0.6579vw, 1.25rem)'
  		},
  		gridTemplateRows: {
  			siteGrid: 'auto 1fr auto'
  		},
  		lineHeight: {
  			heading1: 'clamp(2rem, 1.6053rem + 1.9737vw, 3.5rem)',
  			heading2: 'clamp(1.75rem, 1.4211rem + 1.6447vw, 3rem)',
  			heading3: 'clamp(1.5rem, 1.2368rem + 1.3158vw, 2.5rem)',
  			heading4: 'clamp(1.375rem, 1.1447rem + 1.1513vw, 2.25rem)',
  			heading5: 'clamp(1.25rem, 1.0526rem + 0.9868vw, 2rem)',
  			heading6: 'clamp(1.125rem, 0.9605rem + 0.8224vw, 1.75rem)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/container-queries"),
  ],
} satisfies Config;
