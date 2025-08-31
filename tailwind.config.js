module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(210 25% 15%)',
        accent: 'hsl(140 60% 40%)',
        primary: 'hsl(210 80% 45%)',
        surface: 'hsl(210 25% 20%)',
        'text-primary': 'hsl(0 0% 95%)',
        'text-secondary': 'hsl(0 0% 75%)',
        border: 'hsl(210 25% 25%)',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '20px',
        xl: '24px',
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '16px',
      },
      boxShadow: {
        card: '0 1px 3px hsla(0,0%,0%,0.2), 0 1px 2px hsla(0,0%,0%,0.06)',
        glow: '0 0 20px hsla(140, 60%, 40%, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.25s cubic-bezier(0.22,1,0.36,1)',
        'slide-up': 'slideUp 0.25s cubic-bezier(0.22,1,0.36,1)',
        'slide-down': 'slideDown 0.25s cubic-bezier(0.22,1,0.36,1)',
      },
    },
  },
  plugins: [],
}
