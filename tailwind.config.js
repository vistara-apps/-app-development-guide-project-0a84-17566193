module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(210 20% 12%)', // Darker background for better contrast
        accent: 'hsl(160 70% 45%)', // Brighter accent for better visibility
        primary: 'hsl(210 90% 50%)', // More vibrant primary color
        surface: 'hsl(210 20% 18%)', // Slightly lighter surface for better distinction
        'text-primary': 'hsl(0 0% 98%)', // Brighter text for better readability
        'text-secondary': 'hsl(0 0% 80%)', // Slightly brighter secondary text
        border: 'hsl(210 20% 28%)', // More visible borders
        error: 'hsl(0 70% 60%)', // Error color
        warning: 'hsl(40 90% 60%)', // Warning color
        success: 'hsl(145 70% 45%)', // Success color
      },
      spacing: {
        '2xs': '2px',
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '20px',
        xl: '24px',
        '2xl': '32px',
        '3xl': '48px',
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '16px',
        xl: '24px',
      },
      boxShadow: {
        card: '0 2px 8px hsla(0,0%,0%,0.15), 0 1px 3px hsla(0,0%,0%,0.1)',
        glow: '0 0 20px hsla(160, 70%, 45%, 0.3)',
        'glow-primary': '0 0 20px hsla(210, 90%, 50%, 0.3)',
        'glow-error': '0 0 20px hsla(0, 70%, 60%, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.25s cubic-bezier(0.22,1,0.36,1)',
        'slide-up': 'slideUp 0.25s cubic-bezier(0.22,1,0.36,1)',
        'slide-down': 'slideDown 0.25s cubic-bezier(0.22,1,0.36,1)',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      },
    },
  },
  plugins: [],
}
