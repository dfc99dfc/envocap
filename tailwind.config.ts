import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/**/*.{ts,tsx}"],
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
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Inter', 'sans-serif'],
        logo: ['Kanit', 'sans-serif'],
      },
      letterSpacing: {
        'logo': '-0.04em',
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // New Agricultural Color System - 3 Main Colors
        agri: {
          // Primary - Dark Green #5BCC6D
          'primary': '#5BCC6D',        
          'primary-light': '#7DD78E',  // Lighter variant
          'primary-dark': '#4AB85B',   // Darker variant
          
          // Secondary - Light Green #B6E460 (replacing brown)
          'secondary': '#B6E460',      
          'secondary-light': '#C7EA7D', // Lighter variant
          'secondary-dark': '#A1D049',  // Darker variant
          
          // Accent - Purple #D6C4FF
          'accent': '#D6C4FF',         
          'accent-light': '#E8DDFF',   
          'accent-dark': '#B29DFF',    
          
          // Supporting colors
          'background': '#F5F7FA',     // Light Gray-Blue
          'surface': '#FFFFFF',        // White
          'text': '#000000',           // Black
          'text-light': '#6B7280',     // Medium Gray
          'success': '#5BCC6D',        // Use primary green for success
          'warning': '#FFA726',        // Keep orange for warnings
          'danger': '#EF5350',         // Danger Red
          'info': '#29B6F6'            // Info Blue
        },
        // Extended Purple Palette
        purple: {
          50: '#FAF8FF',   
          100: '#F3EFFF',  
          200: '#E8DDFF',  // accent-light
          300: '#DCC9FF',  
          400: '#D6C4FF',  // Main purple (accent)
          500: '#B29DFF',  // accent-dark
          600: '#9B7DFF',  
          700: '#8B5CF6',  
          800: '#7C3AED',  
          900: '#6D28D9',  
        },
        // Extended Green Palette
        green: {
          50: '#F0FDF4',   
          100: '#DCFCE7',  
          200: '#BBF7D0',  
          300: '#86EFAC',  
          400: '#B6E460',  // Light green (secondary)
          500: '#5BCC6D',  // Dark green (primary)
          600: '#4AB85B',  
          700: '#15803D',  
          800: '#166534',  
          900: '#14532D',  
        },
        // Keep verdant for backward compatibility
        verdant: {
          50: "hsl(var(--verdant-50))",
          100: "hsl(var(--verdant-100))",
          200: "hsl(var(--verdant-200))",
          300: "hsl(var(--verdant-300))",
          400: "hsl(var(--verdant-400))",
          500: "hsl(var(--verdant-500))",
          600: "hsl(var(--verdant-600))",
          700: "hsl(var(--verdant-700))",
          800: "hsl(var(--verdant-800))",
          900: "hsl(var(--verdant-900))",
          950: "hsl(var(--verdant-950))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
        'glass-hover': '0 8px 32px rgba(0, 0, 0, 0.15)',
        'card': '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 15px rgba(0, 0, 0, 0.1)'
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" }
        },
        "slide-in": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" }
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
