# TaskFlow Design System

Welcome to TaskFlow's warm and friendly design system! 🌟

This design system creates a **warm, welcoming, and playful** experience that makes task management feel approachable and enjoyable. Built with React, Tailwind CSS, and shadcn/ui components.

## 🎨 Design Philosophy

TaskFlow believes that productivity tools should feel supportive, not overwhelming. Our design system emphasizes:

- **Warmth** - Coral and peach colors create an inviting atmosphere
- **Friendliness** - Rounded corners and gentle shadows soften the interface
- **Playfulness** - Delightful micro-interactions make completing tasks satisfying
- **Accessibility** - Everyone should be able to use TaskFlow effectively

## 📚 Documentation Structure

### [🎯 PRINCIPLES.md](./PRINCIPLES.md)
The foundation of our design system. Read this first to understand our design philosophy, core principles, and the emotional goals we're trying to achieve.

**Key topics:**
- Core design philosophy (warm, friendly, playful)
- Visual language guidelines
- Accessibility requirements
- Component behavior standards

### [🎨 TOKENS.md](./TOKENS.md)
All the design tokens (colors, typography, spacing, etc.) that power our visual consistency.

**Key topics:**
- Color palette (coral primary, peach secondary, accent colors)
- Typography scale and font families
- Spacing system (8px grid)
- Border radius, shadows, and animations

### [👨‍🍳 COOKBOOK.md](./COOKBOOK.md)
Practical recipes and code examples for implementing common UI patterns with mobile-first responsive design.

**Key topics:**
- Button patterns (primary, secondary, icon) with mobile touch targets
- Mobile-first responsive patterns and layouts
- Touch target guidelines and accessibility
- Typography scaling and spacing patterns
- Form components optimized for mobile and desktop
- Card layouts (task cards, project cards)
- Loading states and feedback patterns

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install tailwindcss @tailwindcss/forms
npm install @radix-ui/react-* # For shadcn/ui components
```

### 2. Mobile-First Implementation
Always start with mobile design and scale up:

```tsx
// ✅ CORRECT: Mobile-first approach
<button className="h-8 w-8 p-2 text-sm sm:h-10 sm:w-10 sm:p-1 sm:text-base touch-manipulation">
  <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
</button>

// ✅ CORRECT: Responsive layout
<div className="flex flex-col gap-3 p-3 sm:flex-row sm:gap-4 sm:p-6">
  <div className="w-full sm:w-48">
    <Input className="h-10 text-sm sm:h-12 sm:text-base" />
  </div>
</div>
```

### 3. Key Principles to Follow
- **Touch targets**: Minimum 44px height for interactive elements
- **Progressive enhancement**: Start mobile, enhance for desktop
- **Content prioritization**: Hide less critical content on mobile
- **Readable text**: 16px minimum on mobile, scale up for desktop
- **Touch optimization**: Add `touch-manipulation` to interactive elements

### 2. Configure Tailwind
Add our design tokens to your `tailwind.config.js`:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'hsl(16 85% 60%)',
        'primary-foreground': 'hsl(0 0% 100%)',
        secondary: 'hsl(25 95% 95%)',
        'secondary-foreground': 'hsl(20 25% 25%)',
        // ... see TOKENS.md for complete palette
      },
      borderRadius: {
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    }
  }
}
```

### 3. Use Our Components
```tsx
import { Button } from '@/components/ui/button'

function AddTaskButton() {
  return (
    <Button className="bg-primary hover:bg-primary-dark text-primary-foreground">
      Add New Task
    </Button>
  )
}
```

## 🎨 Color Palette Overview

### Primary Colors
- **Coral** (`hsl(16 85% 60%)`) - Main brand color, energetic and optimistic
- **Peach** (`hsl(25 95% 95%)`) - Soft backgrounds, nurturing and calm

### Accent Colors
- **Sky Blue** (`hsl(200 85% 65%)`) - Information and links
- **Soft Green** (`hsl(140 60% 55%)`) - Success states
- **Gentle Purple** (`hsl(260 70% 70%)`) - Special features
- **Warm Yellow** (`hsl(45 95% 75%)`) - Warnings and highlights

## 🧩 Component Library

### Core Components
- **Buttons** - Primary, secondary, and icon variants
- **Cards** - Task cards, project cards, info cards
- **Forms** - Inputs, textareas, selects, checkboxes
- **Navigation** - Headers, sidebars, breadcrumbs
- **Feedback** - Loading states, success/error messages

### Layout Components
- **Containers** - Page wrappers with consistent spacing
- **Grids** - Responsive layouts for task lists
- **Headers** - Page headers with actions
- **Sidebars** - Navigation and filtering

## 📱 Responsive Design

Our design system is **mobile-first** with these breakpoints:

- **sm**: 640px - Small tablets
- **md**: 768px - Tablets
- **lg**: 1024px - Small desktops
- **xl**: 1280px - Large desktops
- **2xl**: 1536px - Extra large screens

### Key Responsive Patterns
- Touch-friendly 44px minimum tap targets
- Collapsible navigation on mobile
- Stacked layouts on smaller screens
- Readable 16px minimum font size

## ♿ Accessibility

We're committed to WCAG AA compliance:

- **Color contrast** - 4.5:1 minimum for all text
- **Keyboard navigation** - All interactive elements accessible
- **Screen readers** - Proper ARIA labels and semantic HTML
- **Focus indicators** - Clear, visible focus states

### Testing Checklist
- [ ] Tab through all interactive elements
- [ ] Test with screen reader (NVDA, JAWS, VoiceOver)
- [ ] Verify color contrast ratios
- [ ] Check focus indicators are visible

## 🎭 Animation & Interactions

### Transition Timing
- **Fast** (150ms) - Hover states, button presses
- **Normal** (250ms) - Most UI transitions
- **Slow** (350ms) - Layout changes, page transitions

### Micro-interactions
- Gentle scaling on hover (1.02x)
- Smooth color transitions
- Satisfying checkbox animations
- Celebratory success states

## 🛠️ Development Guidelines

### File Organization
```
src/
├── components/
│   ├── ui/           # shadcn/ui base components
│   ├── task/         # Task-specific components
│   └── layout/       # Layout components
├── styles/
│   └── globals.css   # Global styles and CSS variables
└── lib/
    └── utils.ts      # Utility functions
```

### Naming Conventions
- **Components** - PascalCase (`TaskCard`, `AddTaskButton`)
- **Props** - camelCase (`isCompleted`, `onTaskUpdate`)
- **CSS Classes** - Tailwind utilities preferred
- **Files** - kebab-case (`task-card.tsx`, `add-task-button.tsx`)

### Code Style
```tsx
// ✅ Good - Clear, semantic component
function TaskCard({ task, onComplete, onEdit }) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-250">
      <h3 className="font-medium text-card-foreground mb-2">{task.title}</h3>
      <p className="text-muted-foreground text-sm mb-4">{task.description}</p>
      <div className="flex gap-2">
        <Button onClick={onComplete} variant="primary">Complete</Button>
        <Button onClick={onEdit} variant="secondary">Edit</Button>
      </div>
    </div>
  )
}
```

## 🔄 Updates & Versioning

### Design System Updates
- **Major** - Breaking changes to tokens or component APIs
- **Minor** - New components or non-breaking enhancements
- **Patch** - Bug fixes and small improvements

### Staying Updated
1. Watch this repository for changes
2. Review changelog for breaking changes
3. Test updates in a staging environment
4. Update gradually across your application

## 🤝 Contributing

### Proposing Changes
1. Open an issue describing the problem or enhancement
2. Discuss the approach with the team
3. Create a pull request with your changes
4. Include examples and documentation updates

### Design Reviews
All changes go through design review to ensure:
- Consistency with design principles
- Accessibility compliance
- Cross-browser compatibility
- Mobile responsiveness

## 📞 Support & Resources

### Getting Help
- **Design Questions** - Check PRINCIPLES.md first
- **Implementation Help** - See COOKBOOK.md examples
- **Token Values** - Reference TOKENS.md
- **Bug Reports** - Open a GitHub issue

### External Resources
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Inter Font Family](https://rsms.me/inter/)

---

## 🎉 Ready to Build?

Start with our [PRINCIPLES.md](./PRINCIPLES.md) to understand the philosophy, then dive into [COOKBOOK.md](./COOKBOOK.md) for practical examples. Remember: we're building more than just an interface—we're creating an experience that makes people feel good about getting things done! ✨