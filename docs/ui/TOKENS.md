# Design Tokens

This file defines all the core design tokens used throughout TaskFlow's warm and friendly design system.

## Color Palette

### Primary Colors
```css
--primary: hsl(16 85% 60%);           /* Warm coral - main brand color */
--primary-foreground: hsl(0 0% 100%); /* White text on primary */
--primary-light: hsl(16 85% 70%);     /* Lighter coral for hover states */
--primary-dark: hsl(16 85% 50%);      /* Darker coral for active states */
```

### Secondary Colors
```css
--secondary: hsl(25 95% 95%);         /* Soft peach background */
--secondary-foreground: hsl(20 25% 25%); /* Warm dark text on secondary */
--secondary-light: hsl(25 95% 98%);   /* Very light peach */
--secondary-dark: hsl(25 95% 90%);    /* Slightly darker peach */
```

### Accent Colors
```css
--accent-blue: hsl(200 85% 65%);      /* Friendly sky blue */
--accent-green: hsl(140 60% 55%);     /* Soft success green */
--accent-purple: hsl(260 70% 70%);    /* Gentle purple */
--accent-yellow: hsl(45 95% 75%);     /* Warm sunshine yellow */
```

### Neutral Colors
```css
--background: hsl(30 20% 98%);        /* Warm white background */
--foreground: hsl(20 25% 15%);        /* Warm dark text */
--muted: hsl(25 30% 94%);             /* Muted warm background */
--muted-foreground: hsl(20 15% 45%);  /* Muted warm text */
--border: hsl(25 25% 88%);            /* Soft warm borders */
--input: hsl(25 25% 90%);             /* Input field borders */
--ring: hsl(16 85% 60%);              /* Focus ring color */
```

### Card & Surface Colors
```css
--card: hsl(0 0% 100%);               /* Pure white cards */
--card-foreground: hsl(20 25% 15%);   /* Card text color */
--popover: hsl(0 0% 100%);            /* Popover background */
--popover-foreground: hsl(20 25% 15%); /* Popover text */
```

### Mobile Touch Targets
```css
/* Minimum touch target sizes for mobile accessibility */
--touch-target-min: 44px;           /* Minimum 44px for touch targets */
--touch-target-comfortable: 48px;    /* Comfortable touch target size */
--touch-target-large: 56px;          /* Large touch targets for primary actions */
```

### Responsive Spacing Scale
```css
/* Mobile-first spacing that scales up */
--space-mobile-xs: 0.25rem;         /* 1 - 4px */
--space-mobile-sm: 0.5rem;          /* 2 - 8px */
--space-mobile-md: 0.75rem;         /* 3 - 12px */
--space-mobile-lg: 1rem;            /* 4 - 16px */
--space-mobile-xl: 1.5rem;          /* 6 - 24px */

--space-desktop-xs: 0.375rem;       /* 1.5 - 6px */
--space-desktop-sm: 0.75rem;        /* 3 - 12px */
--space-desktop-md: 1rem;           /* 4 - 16px */
--space-desktop-lg: 1.5rem;         /* 6 - 24px */
--space-desktop-xl: 2rem;           /* 8 - 32px */
```

### Typography Scale (Mobile-First)
```css
/* Base mobile sizes */
--text-xs-mobile: 0.75rem;          /* 12px */
--text-sm-mobile: 0.875rem;         /* 14px */
--text-base-mobile: 1rem;           /* 16px - minimum for mobile */
--text-lg-mobile: 1.125rem;         /* 18px */
--text-xl-mobile: 1.25rem;          /* 20px */

/* Desktop scaling */
--text-xs-desktop: 0.75rem;         /* 12px */
--text-sm-desktop: 0.875rem;        /* 14px */
--text-base-desktop: 1rem;          /* 16px */
--text-lg-desktop: 1.125rem;        /* 18px */
--text-xl-desktop: 1.5rem;          /* 24px */
--text-2xl-desktop: 1.875rem;       /* 30px */
--text-3xl-desktop: 2.25rem;        /* 36px */
```

### Button Hover States
```css
/* Primary button hover states with proper contrast */
--primary-hover: hsl(16 85% 50%);         /* Darker coral for light mode hover */
--primary-hover-foreground: hsl(0 0% 100%); /* White text maintains contrast */

/* Secondary button hover states */
--secondary-hover: hsl(25 95% 90%);       /* Slightly darker peach */
--secondary-hover-foreground: hsl(20 25% 25%); /* Maintains dark text contrast */

/* Accent button hover states */
--accent-hover: hsl(25 30% 88%);          /* Muted background hover */
--accent-hover-foreground: hsl(20 25% 15%); /* Dark text for contrast */

/* Ghost button hover states */
--ghost-hover: hsl(25 30% 94%);           /* Light muted hover */
--ghost-hover-foreground: hsl(20 25% 15%); /* Dark text for contrast */

/* Outline button hover states */
--outline-hover: hsl(25 30% 94%);         /* Light background on hover */
--outline-hover-foreground: hsl(20 25% 15%); /* Dark text maintains readability */

/* Destructive button hover states */
--destructive-hover: hsl(0 75% 55%);      /* Darker red for hover */
--destructive-hover-foreground: hsl(0 0% 100%); /* White text for contrast */
```

### Status Colors
```css
--success: hsl(140 60% 55%);          /* Success state */
--success-foreground: hsl(0 0% 100%); /* Text on success */
--warning: hsl(35 90% 65%);           /* Warning state */
--warning-foreground: hsl(20 25% 15%); /* Text on warning */
--destructive: hsl(0 75% 65%);        /* Error/delete state */
--destructive-foreground: hsl(0 0% 100%); /* Text on destructive */
--info: hsl(200 85% 65%);             /* Information state */
--info-foreground: hsl(0 0% 100%);    /* Text on info */
```

## Dark Mode Tokens

### Dark Mode Button Hover States
```css
/* Dark mode hover states with enhanced contrast */
--primary-hover-dark: hsl(16 85% 70%);    /* Lighter coral for dark mode hover */
--primary-hover-foreground-dark: hsl(20 15% 8%); /* Dark text for contrast */

/* Secondary button hover states in dark mode */
--secondary-hover-dark: hsl(20 15% 18%);  /* Lighter dark background */
--secondary-hover-foreground-dark: hsl(30 20% 95%); /* Light text for contrast */

/* Accent button hover states in dark mode */
--accent-hover-dark: hsl(200 85% 75%);    /* Brighter accent for visibility */
--accent-hover-foreground-dark: hsl(20 15% 8%); /* Dark text for contrast */

/* Ghost button hover states in dark mode */
--ghost-hover-dark: hsl(20 15% 18%);      /* Subtle dark hover */
--ghost-hover-foreground-dark: hsl(30 20% 95%); /* Light text for readability */

/* Outline button hover states in dark mode */
--outline-hover-dark: hsl(20 15% 18%);    /* Dark background on hover */
--outline-hover-foreground-dark: hsl(30 20% 95%); /* Light text for contrast */

/* Destructive button hover states in dark mode */
--destructive-hover-dark: hsl(0 75% 75%); /* Brighter red for dark mode */
--destructive-hover-foreground-dark: hsl(20 15% 8%); /* Dark text for contrast */
```

## Typography

### Font Families
```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-heading: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
```

### Font Sizes
```css
--text-xs: 0.75rem;     /* 12px - Small labels */
--text-sm: 0.875rem;    /* 14px - Body text small */
--text-base: 1rem;      /* 16px - Default body text */
--text-lg: 1.125rem;    /* 18px - Large body text */
--text-xl: 1.25rem;     /* 20px - Small headings */
--text-2xl: 1.5rem;     /* 24px - Medium headings */
--text-3xl: 1.875rem;   /* 30px - Large headings */
--text-4xl: 2.25rem;    /* 36px - Extra large headings */
```

### Font Weights
```css
--font-light: 300;      /* Light text */
--font-normal: 400;     /* Regular body text */
--font-medium: 500;     /* Emphasized text */
--font-semibold: 600;   /* Headings */
--font-bold: 700;       /* Strong emphasis */
```

### Line Heights
```css
--leading-tight: 1.25;  /* Tight line height for headings */
--leading-normal: 1.5;  /* Normal line height for body */
--leading-relaxed: 1.75; /* Relaxed line height for reading */
```

## Spacing

### Base Spacing Scale
```css
--space-0: 0;           /* 0px */
--space-1: 0.25rem;     /* 4px */
--space-2: 0.5rem;      /* 8px */
--space-3: 0.75rem;     /* 12px */
--space-4: 1rem;        /* 16px */
--space-5: 1.25rem;     /* 20px */
--space-6: 1.5rem;      /* 24px */
--space-8: 2rem;        /* 32px */
--space-10: 2.5rem;     /* 40px */
--space-12: 3rem;       /* 48px */
--space-16: 4rem;       /* 64px */
--space-20: 5rem;       /* 80px */
--space-24: 6rem;       /* 96px */
```

## Border Radius

### Rounded Corners
```css
--radius-none: 0;       /* No rounding */
--radius-sm: 0.25rem;   /* 4px - Small elements */
--radius-md: 0.5rem;    /* 8px - Default rounding */
--radius-lg: 0.75rem;   /* 12px - Cards, buttons */
--radius-xl: 1rem;      /* 16px - Large elements */
--radius-2xl: 1.5rem;   /* 24px - Very large elements */
--radius-full: 9999px;  /* Fully rounded (pills) */
```

## Shadows

### Box Shadows
```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
```

## Animation

### Transitions
```css
--transition-fast: 150ms ease-in-out;
--transition-normal: 250ms ease-in-out;
--transition-slow: 350ms ease-in-out;
```

### Easing Functions
```css
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

## Breakpoints

### Responsive Breakpoints
```css
--breakpoint-sm: 640px;   /* Small devices */
--breakpoint-md: 768px;   /* Medium devices */
--breakpoint-lg: 1024px;  /* Large devices */
--breakpoint-xl: 1280px;  /* Extra large devices */
--breakpoint-2xl: 1536px; /* 2X large devices */
```