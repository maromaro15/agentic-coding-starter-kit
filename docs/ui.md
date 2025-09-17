# TaskFlow Design System

This document defines the comprehensive design system for TaskFlow, ensuring consistent visual design and user experience across all pages and components.

## Overview

TaskFlow uses a modern, clean design system built on Tailwind CSS with custom CSS variables for theming. The design emphasizes clarity, accessibility, and professional aesthetics.

## Color Palette

### Primary Colors
- **Primary**: `hsl(222.2 84% 4.9%)` - Main brand color for primary actions
- **Primary Foreground**: `hsl(210 40% 98%)` - Text on primary backgrounds
- **Secondary**: `hsl(210 40% 96%)` - Secondary elements
- **Secondary Foreground**: `hsl(222.2 84% 4.9%)` - Text on secondary backgrounds

### Neutral Colors
- **Background**: `hsl(0 0% 100%)` - Main background color
- **Foreground**: `hsl(222.2 84% 4.9%)` - Primary text color
- **Muted**: `hsl(210 40% 96%)` - Muted backgrounds
- **Muted Foreground**: `hsl(215.4 16.3% 46.9%)` - Muted text
- **Card**: `hsl(0 0% 100%)` - Card backgrounds
- **Card Foreground**: `hsl(222.2 84% 4.9%)` - Card text
- **Popover**: `hsl(0 0% 100%)` - Popover backgrounds
- **Popover Foreground**: `hsl(222.2 84% 4.9%)` - Popover text
- **Border**: `hsl(214.3 31.8% 91.4%)` - Border color
- **Input**: `hsl(214.3 31.8% 91.4%)` - Input borders
- **Ring**: `hsl(222.2 84% 4.9%)` - Focus rings

### Status Colors
- **Destructive**: `hsl(0 84.2% 60.2%)` - Error states
- **Destructive Foreground**: `hsl(210 40% 98%)` - Text on destructive backgrounds
- **Success**: `hsl(142.1 76.2% 36.3%)` - Success states
- **Warning**: `hsl(38.4 92.1% 50.2%)` - Warning states
- **Info**: `hsl(199.4 89.1% 48.4%)` - Information states

## Typography

### Font Family
- **Primary Font**: 'Inter', sans-serif - Clean, professional sans-serif for all text
- **Heading Font**: 'Inter', sans-serif - Consistent font for headings
- **Monospace Font**: 'JetBrains Mono', monospace - For code blocks

### Font Weights
- **Light**: 300 - Subtle text, captions
- **Regular**: 400 - Body text, default weight
- **Medium**: 500 - Emphasized text, labels
- **Semibold**: 600 - Headings, important text
- **Bold**: 700 - Strong emphasis, primary headings
- **Extra Bold**: 800 - Special headings, brand elements

### Font Sizes
- **xs**: 0.75rem (12px) - Small captions, metadata
- **sm**: 0.875rem (14px) - Secondary text, labels
- **base**: 1rem (16px) - Body text, default size
- **lg**: 1.125rem (18px) - Large body text
- **xl**: 1.25rem (20px) - Small headings
- **2xl**: 1.5rem (24px) - Medium headings
- **3xl**: 1.875rem (30px) - Large headings
- **4xl**: 2.25rem (36px) - Extra large headings
- **5xl**: 3rem (48px) - Hero text

### Line Heights
- **Tight**: 1.25 - Headings
- **Snug**: 1.375 - Compact text
- **Normal**: 1.5 - Body text, default line height
- **Relaxed**: 1.625 - Comfortable reading for long content
- **Loose**: 2 - Very spacious text

### Text Styling
- **Letter Spacing**: Standard spacing for optimal readability
- **Text Decoration**: Clean underlines for links
- **Text Shadow**: Minimal use, only when necessary for contrast

### Text Colors
- **Primary Text**: `text-foreground` - Main content
- **Secondary Text**: `text-muted-foreground` - Supporting content
- **Accent Text**: `text-primary` - Links and emphasis
- **Gradient Text**: `bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent`

## Spacing

### Spacing Scale
- **0**: 0px - No spacing
- **1**: 0.25rem (4px) - Minimal spacing
- **2**: 0.5rem (8px) - Small spacing
- **3**: 0.75rem (12px) - Medium-small spacing
- **4**: 1rem (16px) - Medium spacing
- **5**: 1.25rem (20px) - Medium-large spacing
- **6**: 1.5rem (24px) - Large spacing
- **8**: 2rem (32px) - Extra large spacing
- **10**: 2.5rem (40px) - Very large spacing
- **12**: 3rem (48px) - Huge spacing
- **16**: 4rem (64px) - Massive spacing
- **20**: 5rem (80px) - Ultra spacing

### Layout Spacing
- **Container Padding**: `px-4` (16px) on mobile, `px-6` (24px) on desktop
- **Section Spacing**: `py-8` (32px) between major sections
- **Component Spacing**: `space-y-4` (16px) between related components
- **Element Spacing**: `space-y-2` (8px) between related elements
- **Inline Spacing**: `space-x-2` (8px) between inline elements
- **Card Padding**: `p-4` (16px) for card interiors
- **Button Padding**: `px-4 py-2` (16px x 8px) for standard touch targets

### Container Spacing
- **Page Container**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Content Container**: `max-w-4xl mx-auto px-4`
- **Narrow Container**: `max-w-2xl mx-auto px-4`

### Component Spacing
- **Card Padding**: `p-4` (16px) - Standard interior space
- **Button Padding**: `px-4 py-2` (16px x 8px) - Standard touch targets
- **Input Padding**: `px-3 py-2` (12px x 8px) - Standard input padding
- **Section Margins**: `mb-8` (32px) between sections
- **Element Margins**: `mb-4` (16px) between elements

### Layout Spacing
- **Section Gap**: `space-y-8` - Between major sections
- **Component Gap**: `space-y-6` - Between related components
- **Element Gap**: `space-y-4` - Between form elements
- **Inline Gap**: `gap-2` (small), `gap-4` (medium), `gap-6` (large)

## Border Radius

### Radius Scale
- **None**: `rounded-none` (0px) - Sharp corners
- **Small**: `rounded-sm` (2px) - Minimal rounding
- **Default**: `rounded` (4px) - Standard rounding
- **Medium**: `rounded-md` (6px) - Medium rounding
- **Large**: `rounded-lg` (8px) - Large rounding
- **Extra Large**: `rounded-xl` (12px) - Extra large rounding
- **2XL**: `rounded-2xl` (16px) - Very large rounding
- **3XL**: `rounded-3xl` (24px) - Maximum rounding
- **Full**: `rounded-full` - Perfect circle/pill shape

### Component Radius
- **Buttons**: `rounded-md` (6px) - Standard button rounding
- **Cards**: `rounded-lg` (8px) - Standard card rounding
- **Inputs**: `rounded-md` (6px) - Standard input rounding
- **Modals**: `rounded-lg` (8px) - Standard modal rounding
- **Images**: `rounded-md` (6px) - Standard image rounding
- **Avatars**: `rounded-full` - Perfect circles
- **Tags/Badges**: `rounded-full` - Pill-shaped
- **Progress Bars**: `rounded-full` - Smooth progress bars

## Shadows

### Shadow Scale
- **None**: `shadow-none` - No shadow
- **Small**: `shadow-sm` - Subtle shadow (0 1px 2px rgba(0,0,0,0.05))
- **Default**: `shadow` - Standard shadow (0 1px 3px rgba(0,0,0,0.1))
- **Medium**: `shadow-md` - Medium shadow (0 4px 6px rgba(0,0,0,0.07))
- **Large**: `shadow-lg` - Large shadow (0 10px 15px rgba(0,0,0,0.1))
- **Extra Large**: `shadow-xl` - Extra large shadow (0 20px 25px rgba(0,0,0,0.1))
- **2XL**: `shadow-2xl` - Maximum shadow (0 25px 50px rgba(0,0,0,0.15))

### Component Shadows
- **Cards**: `shadow-md` with `hover:shadow-lg` - Standard card elevation
- **Buttons**: `shadow-sm` with `hover:shadow-md` - Subtle button depth
- **Modals**: `shadow-2xl` - Modal overlay
- **Dropdowns**: `shadow-lg` - Dropdown separation
- **Images**: `shadow-sm` - Image framing
- **Form Elements**: `shadow-sm` on focus - Focus indication

## Animations

### Transition Timing
- **Fast**: `duration-150` - Quick feedback (hover states)
- **Normal**: `duration-300` - Standard transitions
- **Slow**: `duration-500` - Slow transitions
- **Ease**: `ease-in-out` - Natural acceleration

### Hover Effects
- **Scale**: `hover:scale-105` - Subtle growth
- **Brightness**: `hover:brightness-110` - Brightness increase
- **Transform**: `hover:-translate-y-1` - Subtle lift
- **Color Shift**: Standard color transitions on hover

## Component Patterns

### Buttons

#### Primary Button
```tsx
<Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 font-medium shadow-sm hover:shadow-md transition-all duration-300">
  Primary Action
</Button>
```

#### Secondary Button
```tsx
<Button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md px-4 py-2 font-medium shadow-sm hover:shadow-md transition-all duration-300">
  Secondary Action
</Button>
```

#### Outline Button
```tsx
<Button className="border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md px-4 py-2 font-medium transition-all duration-300">
  Outline Action
</Button>
```

#### Destructive Button
```tsx
<Button className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-md px-4 py-2 font-medium shadow-sm hover:shadow-md transition-all duration-300">
  Delete
</Button>
```

### Cards

#### Basic Card
```tsx
<Card className="bg-card rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 border">
  <CardHeader className="pb-4">
    <CardTitle className="text-xl font-semibold text-card-foreground mb-2">Card Title</CardTitle>
    <CardDescription className="text-muted-foreground">
      A professional card description with clear information.
    </CardDescription>
  </CardHeader>
  <CardContent className="space-y-4">
    <p className="text-card-foreground">Card content goes here with standard spacing.</p>
  </CardContent>
</Card>
```

#### Interactive Card
```tsx
<Card className="bg-card rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer border">
  <CardContent className="space-y-4">
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
        <span className="text-primary-foreground text-sm">Icon</span>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-card-foreground">Interactive Feature</h3>
        <p className="text-muted-foreground text-sm">Hover for interaction</p>
      </div>
    </div>
  </CardContent>
</Card>
```

### Forms

#### Input Field
```tsx
<div className="space-y-2">
  <Label htmlFor="email" className="text-foreground font-medium">
    Email Address
  </Label>
  <Input
    id="email"
    type="email"
    placeholder="Enter your email"
    className="rounded-md border border-input focus:border-ring focus:ring-2 focus:ring-ring/20 px-3 py-2 transition-all duration-300"
  />
</div>
```

#### Form Group
```tsx
<form className="space-y-6 bg-card p-6 rounded-lg shadow-md border">
  <div className="space-y-4">
    <h2 className="text-2xl font-semibold text-card-foreground mb-6">Contact Us</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label className="text-foreground font-medium">First Name</Label>
        <Input className="rounded-md border border-input focus:border-ring px-3 py-2" />
      </div>
      <div className="space-y-2">
        <Label className="text-foreground font-medium">Last Name</Label>
        <Input className="rounded-md border border-input focus:border-ring px-3 py-2" />
      </div>
    </div>
    
    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-md py-2 font-medium shadow-sm hover:shadow-md transition-all duration-300">
      Send Message
    </Button>
  </div>
</form>
```

### Navigation

#### Header Navigation
```tsx
<header className="bg-background border-b border-border shadow-sm">
  <nav className="max-w-7xl mx-auto px-6 py-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
          <span className="text-primary-foreground font-semibold">T</span>
        </div>
        <span className="text-xl font-semibold text-foreground">TaskFlow</span>
      </div>
      
      <div className="hidden md:flex items-center space-x-6">
        <a href="#" className="text-foreground hover:text-primary font-medium transition-colors duration-300 px-3 py-2 rounded-md hover:bg-accent">
          Dashboard
        </a>
        <a href="#" className="text-foreground hover:text-primary font-medium transition-colors duration-300 px-3 py-2 rounded-md hover:bg-accent">
          Tasks
        </a>
        <a href="#" className="text-foreground hover:text-primary font-medium transition-colors duration-300 px-3 py-2 rounded-md hover:bg-accent">
          Settings
        </a>
      </div>
      
      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-md px-4 py-2 font-medium shadow-sm hover:shadow-md transition-all duration-300">
        Get Started
      </Button>
    </div>
  </nav>
</header>
```

### Status Indicators

#### Priority Badges
```tsx
// High Priority
<Badge className="bg-red-100 text-red-800 border-red-200">High</Badge>

// Medium Priority
<Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Medium</Badge>

// Low Priority
<Badge className="bg-green-100 text-green-800 border-green-200">Low</Badge>
```

#### Stats Display
```tsx
<div className="text-center p-3 bg-muted/50 rounded-lg">
  <div className="text-2xl font-bold text-primary">{value}</div>
  <div className="text-sm text-muted-foreground">{label}</div>
</div>
```

## Layout Patterns

### Page Layout
```tsx
<div className="container mx-auto px-4 py-8">
  <div className="max-w-4xl mx-auto">
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Page Title</h1>
        <p className="text-muted-foreground mt-2">Page description</p>
      </div>
      <Button>Primary Action</Button>
    </div>
    {/* Page content */}
  </div>
</div>
```

### Hero Section
```tsx
<section className="container mx-auto px-4 py-16 text-center">
  <div className="max-w-4xl mx-auto">
    <div className="flex items-center justify-center gap-3 mb-6">
      <div className="p-3 rounded-full bg-primary/10">
        <Icon className="h-8 w-8 text-primary" />
      </div>
      <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
        Hero Title
      </h1>
    </div>
    <p className="text-2xl text-muted-foreground mb-4">Subtitle</p>
    <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">Description</p>
  </div>
</section>
```

## Interactive States

### Hover States
- **Buttons**: `hover:bg-primary/90`, `hover:shadow-lg`
- **Cards**: `hover:shadow-xl transition-shadow`
- **Links**: `hover:text-primary transition-colors`

### Focus States
- **Form Elements**: `focus-visible:ring-ring/50 focus-visible:ring-[3px]`
- **Buttons**: `focus-visible:border-ring`

### Loading States
```tsx
<div className="flex items-center justify-center min-h-[400px]">
  <Loader2 className="h-8 w-8 animate-spin" />
</div>
```

### Empty States
```tsx
<div className="text-center py-12">
  <Icon className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
  <h3 className="text-lg font-semibold mb-2">Empty State Title</h3>
  <p className="text-muted-foreground mb-6">Empty state description</p>
  <Button>Call to Action</Button>
</div>
```

## Accessibility Guidelines

- Use semantic HTML elements
- Maintain proper heading hierarchy (h1 → h2 → h3)
- Ensure sufficient color contrast (4.5:1 minimum)
- Provide focus indicators for keyboard navigation
- Use descriptive alt text for images
- Include proper ARIA labels where needed

## Dark Mode Support

All components automatically support dark mode through CSS variables. The design system uses semantic color tokens that adapt to the current theme.

## Implementation Notes

1. **Consistency**: Always use the defined color tokens and spacing scale
2. **Responsiveness**: Use responsive utilities (`md:`, `lg:`) for different screen sizes
3. **Performance**: Leverage Tailwind's utility classes for optimal CSS bundle size
4. **Maintainability**: Update this document when adding new patterns or components

## Component Checklist

When creating or updating components, ensure they follow:

- [ ] Use semantic color tokens (not hardcoded colors)
- [ ] Follow the typography scale
- [ ] Use consistent spacing from the spacing system
- [ ] Include proper hover and focus states
- [ ] Support dark mode automatically
- [ ] Are responsive across device sizes
- [ ] Follow accessibility guidelines
- [ ] Match the established visual patterns