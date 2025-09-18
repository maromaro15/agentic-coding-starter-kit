# Design System Cookbook

This cookbook provides practical examples and patterns for implementing TaskFlow's warm and friendly design system. Use these recipes to build consistent, delightful user experiences.

## Button Patterns

### Primary Button
Use for the main action on a page or in a section. Always implement mobile-first with proper touch targets.

```tsx
<button className="bg-primary hover:bg-primary-dark text-primary-foreground font-medium px-4 py-2 sm:px-6 sm:py-3 rounded-lg transition-all duration-250 hover:scale-102 focus:ring-2 focus:ring-ring focus:ring-offset-2 touch-manipulation min-h-[44px] text-sm sm:text-base">
  Add New Task
</button>
```

**Mobile considerations:**
- Minimum 44px height for touch accessibility
- Responsive padding: `px-4 py-2 sm:px-6 sm:py-3`
- Text scales from `text-sm` to `text-base`
- `touch-manipulation` for better touch response

**When to use:** Creating tasks, saving changes, confirming actions

### Secondary Button
Use for supporting actions or less critical operations.

```tsx
<button className="bg-secondary hover:bg-secondary-dark text-secondary-foreground font-medium px-6 py-3 rounded-lg transition-all duration-250 hover:scale-102 focus:ring-2 focus:ring-ring focus:ring-offset-2">
  Cancel
</button>
```

**When to use:** Cancel actions, secondary navigation, optional features

### Button Hover Effects

Buttons should have accessible hover effects that maintain proper contrast in both light and dark themes. Use our theme-aware hover tokens instead of opacity-based approaches:

```tsx
// ✅ CORRECT: Theme-aware hover states with proper contrast
<Button className="bg-primary text-primary-foreground hover:bg-primary-hover hover:text-primary-hover-foreground transition-colors">
  Primary Action
</Button>

<Button variant="secondary" className="bg-secondary text-secondary-foreground hover:bg-secondary-hover hover:text-secondary-hover-foreground transition-colors">
  Secondary Action
</Button>

<Button variant="ghost" className="hover:bg-ghost-hover hover:text-ghost-hover-foreground transition-colors">
  Ghost Button
</Button>

<Button variant="outline" className="border bg-background hover:bg-outline-hover hover:text-outline-hover-foreground transition-colors">
  Outline Button
</Button>

<Button variant="destructive" className="bg-destructive text-destructive-foreground hover:bg-destructive-hover hover:text-destructive-hover-foreground transition-colors">
  Delete Item
</Button>
```

#### ❌ Avoid These Patterns

```tsx
// ❌ WRONG: Opacity-based hover (poor contrast)
<Button className="bg-primary hover:bg-primary/90">
  Bad Contrast
</Button>

// ❌ WRONG: Hardcoded colors (theme-breaking)
<Button className="hover:bg-blue-500 hover:text-white">
  Theme Breaking
</Button>

// ❌ WRONG: Missing foreground color change
<Button className="bg-primary text-primary-foreground hover:bg-primary-hover">
  Incomplete Hover
</Button>
```

#### Contrast Requirements

- All button hover states must maintain **WCAG AA contrast ratio (4.5:1)** for normal text
- Always specify both background AND foreground colors in hover states
- Use `transition-colors` for smooth color transitions
- Test hover states in both light and dark themes

### Icon Button
Use for compact actions with clear iconography. Ensure adequate touch targets on mobile.

```tsx
<button className="p-2 sm:p-1 rounded-md hover:bg-muted transition-colors duration-250 focus:ring-2 focus:ring-ring focus:ring-offset-2 touch-manipulation h-8 w-8 sm:h-10 sm:w-10">
  <PlusIcon className="w-3 h-3 sm:w-5 sm:h-5 text-foreground" />
</button>
```

**Mobile considerations:**
- Larger padding on mobile: `p-2 sm:p-1`
- Responsive sizing: `h-8 w-8 sm:h-10 sm:w-10`
- Smaller icons on mobile: `w-3 h-3 sm:w-5 sm:h-5`
- `touch-manipulation` for better touch response

**When to use:** Quick actions, toolbar buttons, compact interfaces

## Mobile-First Responsive Patterns

### Touch Target Guidelines
All interactive elements must meet minimum touch target requirements:

```tsx
// ✅ CORRECT: Proper mobile touch targets
<button className="h-8 w-8 sm:h-10 sm:w-10 p-2 sm:p-1 touch-manipulation">
  <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
</button>

// ✅ CORRECT: Checkbox with proper sizing
<Checkbox className="h-5 w-5 sm:h-6 sm:w-6 touch-manipulation" />

// ❌ WRONG: Too small for mobile
<button className="h-6 w-6 p-1">
  <Icon className="w-4 h-4" />
</button>
```

### Responsive Spacing Patterns
Use consistent spacing patterns that scale from mobile to desktop:

```tsx
// Container spacing
<div className="p-3 sm:p-6 space-y-3 sm:space-y-4">
  
// Grid gaps
<div className="grid gap-3 sm:gap-6">
  
// Flex gaps
<div className="flex gap-1.5 sm:gap-2">
  
// Element margins
<div className="mb-1 sm:mb-2">
```

### Typography Scaling
Text should be readable on mobile and scale appropriately:

```tsx
// Headings
<h1 className="text-xl sm:text-3xl font-bold">
<h2 className="text-lg sm:text-2xl font-semibold">
<h3 className="text-base sm:text-lg font-medium">

// Body text
<p className="text-sm sm:text-base">
<span className="text-xs sm:text-sm">

// Labels and captions
<label className="text-xs sm:text-sm font-medium">
```

### Layout Patterns
Common responsive layout patterns:

```tsx
// Stack on mobile, row on desktop
<div className="flex flex-col sm:flex-row gap-3 sm:gap-4">

// Full width on mobile, constrained on desktop
<div className="w-full sm:w-48">

// Hide on mobile, show on desktop
<span className="hidden sm:inline">Desktop only text</span>

// Show on mobile, hide on desktop
<span className="sm:hidden">Mobile only text</span>

// Abbreviated on mobile, full on desktop
<span className="hidden xs:inline">Full Label</span>
<span className="xs:hidden">Short</span>
```

### Form Elements
Mobile-optimized form patterns:

```tsx
// Input fields
<Input className="h-10 sm:h-12 text-sm sm:text-base px-3 sm:px-4" />

// Select dropdowns
<Select>
  <SelectTrigger className="w-full sm:w-48 h-9 sm:h-10 text-sm sm:text-base">
    <SelectValue />
  </SelectTrigger>
</Select>

// Textarea
<Textarea className="min-h-[80px] sm:min-h-[100px] text-sm sm:text-base p-3 sm:p-4" />
```

## Card Patterns

### Task Card
The foundation of todo list items with warm, friendly styling.

```tsx
<div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-250 hover:scale-101">
  <div className="flex items-start gap-4">
    <input 
      type="checkbox" 
      className="mt-1 w-5 h-5 rounded border-2 border-border focus:ring-2 focus:ring-ring"
    />
    <div className="flex-1">
      <h3 className="font-medium text-card-foreground mb-2">Task Title</h3>
      <p className="text-muted-foreground text-sm mb-3">Task description goes here</p>
      <div className="flex items-center gap-2">
        <span className="px-2 py-1 bg-accent-blue/10 text-accent-blue text-xs rounded-full">
          High Priority
        </span>
        <span className="text-muted-foreground text-xs">Due: Tomorrow</span>
      </div>
    </div>
  </div>
</div>
```

### Project Card
For grouping related tasks or displaying project information.

```tsx
<div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-250">
  <div className="flex items-center gap-3 mb-4">
    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
      <FolderIcon className="w-5 h-5 text-primary" />
    </div>
    <div>
      <h3 className="font-semibold text-card-foreground">Project Name</h3>
      <p className="text-muted-foreground text-sm">12 tasks remaining</p>
    </div>
  </div>
  <div className="w-full bg-muted rounded-full h-2 mb-3">
    <div className="bg-primary h-2 rounded-full" style={{width: '65%'}}></div>
  </div>
  <p className="text-muted-foreground text-sm">65% complete</p>
</div>
```

## Form Patterns

### Input Field
Warm, accessible input styling with proper focus states.

```tsx
<div className="space-y-2">
  <label className="text-sm font-medium text-foreground">Task Title</label>
  <input 
    type="text"
    className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 transition-colors duration-250"
    placeholder="What needs to be done?"
  />
</div>
```

### Textarea
For longer form content like task descriptions.

```tsx
<div className="space-y-2">
  <label className="text-sm font-medium text-foreground">Description</label>
  <textarea 
    rows={4}
    className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 transition-colors duration-250 resize-none"
    placeholder="Add more details about this task..."
  />
</div>
```

### Select Dropdown
Styled select elements that match the design system.

```tsx
<div className="space-y-2">
  <label className="text-sm font-medium text-foreground">Priority</label>
  <select className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 transition-colors duration-250">
    <option value="low">Low Priority</option>
    <option value="medium">Medium Priority</option>
    <option value="high">High Priority</option>
  </select>
</div>
```

## Layout Patterns

### Page Header
Consistent header pattern for main pages.

```tsx
<header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
  <div className="container mx-auto px-6 py-4">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">My Tasks</h1>
        <p className="text-muted-foreground">Manage your daily tasks and projects</p>
      </div>
      <button className="bg-primary hover:bg-primary-dark text-primary-foreground font-medium px-4 py-2 rounded-lg transition-colors duration-250">
        Add Task
      </button>
    </div>
  </div>
</header>
```

### Sidebar Navigation
Warm, friendly navigation with clear active states.

```tsx
<nav className="w-64 bg-secondary/50 border-r border-border p-6">
  <div className="space-y-2">
    <a href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary text-primary-foreground font-medium">
      <HomeIcon className="w-5 h-5" />
      Dashboard
    </a>
    <a href="/tasks" className="flex items-center gap-3 px-3 py-2 rounded-lg text-foreground hover:bg-muted transition-colors duration-250">
      <CheckSquareIcon className="w-5 h-5" />
      My Tasks
    </a>
    <a href="/projects" className="flex items-center gap-3 px-3 py-2 rounded-lg text-foreground hover:bg-muted transition-colors duration-250">
      <FolderIcon className="w-5 h-5" />
      Projects
    </a>
  </div>
</nav>
```

## Status & Feedback Patterns

### Loading States
Friendly loading indicators that reduce anxiety.

```tsx
// Spinner Loading
<div className="flex items-center justify-center p-8">
  <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
</div>

// Skeleton Loading for Cards
<div className="bg-card border border-border rounded-lg p-6 animate-pulse">
  <div className="flex items-start gap-4">
    <div className="w-5 h-5 bg-muted rounded"></div>
    <div className="flex-1 space-y-2">
      <div className="h-4 bg-muted rounded w-3/4"></div>
      <div className="h-3 bg-muted rounded w-1/2"></div>
    </div>
  </div>
</div>
```

### Success Messages
Celebratory feedback for completed actions.

```tsx
<div className="flex items-center gap-3 p-4 bg-success/10 border border-success/20 rounded-lg">
  <CheckCircleIcon className="w-5 h-5 text-success" />
  <p className="text-success font-medium">Task completed successfully! 🎉</p>
</div>
```

### Error Messages
Helpful, non-punitive error feedback.

```tsx
<div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
  <AlertCircleIcon className="w-5 h-5 text-destructive" />
  <div>
    <p className="text-destructive font-medium">Oops! Something went wrong</p>
    <p className="text-destructive/80 text-sm">Please check your connection and try again.</p>
  </div>
</div>
```

### Warning Messages
Gentle warnings that guide users.

```tsx
<div className="flex items-center gap-3 p-4 bg-warning/10 border border-warning/20 rounded-lg">
  <AlertTriangleIcon className="w-5 h-5 text-warning" />
  <p className="text-warning font-medium">This task is overdue. Consider updating the due date.</p>
</div>
```

## Interactive Patterns

### Hover Effects
Subtle, delightful hover states that provide feedback.

```css
/* Scale hover for buttons and cards */
.hover-scale {
  transition: transform 250ms ease-in-out;
}
.hover-scale:hover {
  transform: scale(1.02);
}

/* Color shift hover for interactive elements */
.hover-lift {
  transition: box-shadow 250ms ease-in-out, transform 250ms ease-in-out;
}
.hover-lift:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}
```

### Focus States
Clear, accessible focus indicators.

```css
.focus-ring {
  focus:outline-none;
  focus:ring-2;
  focus:ring-ring;
  focus:ring-offset-2;
  focus:ring-offset-background;
}
```

## Responsive Patterns

### Mobile-First Cards
Cards that adapt gracefully to smaller screens.

```tsx
<div className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-sm">
  <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
    <input type="checkbox" className="w-5 h-5 rounded border-2 border-border" />
    <div className="flex-1 min-w-0">
      <h3 className="font-medium text-card-foreground mb-2 truncate">Task Title</h3>
      <p className="text-muted-foreground text-sm mb-3 line-clamp-2">Task description</p>
      <div className="flex flex-wrap items-center gap-2">
        <span className="px-2 py-1 bg-accent-blue/10 text-accent-blue text-xs rounded-full">
          Priority
        </span>
      </div>
    </div>
  </div>
</div>
```

### Responsive Navigation
Navigation that collapses appropriately on mobile.

```tsx
<nav className="flex flex-col md:flex-row gap-2 md:gap-4">
  <a href="/dashboard" className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-center md:text-left">
    Dashboard
  </a>
  <a href="/tasks" className="px-4 py-2 rounded-lg text-foreground hover:bg-muted text-center md:text-left">
    Tasks
  </a>
</nav>
```

## Animation Patterns

### Smooth Transitions
All interactive elements should have smooth transitions.

```css
/* Standard transition for most elements */
.transition-standard {
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* Fast transition for hover states */
.transition-fast {
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* Slow transition for layout changes */
.transition-slow {
  transition: all 350ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Micro-interactions
Delightful small animations that enhance the experience.

```tsx
// Checkbox with smooth check animation
<input 
  type="checkbox" 
  className="w-5 h-5 rounded border-2 border-border checked:bg-primary checked:border-primary transition-all duration-250 focus:ring-2 focus:ring-ring"
/>

// Button with gentle press effect
<button className="transform active:scale-95 transition-transform duration-150">
  Click me
</button>
```

## Accessibility Patterns

### Screen Reader Support
Proper ARIA labels and semantic HTML.

```tsx
<button 
  aria-label="Mark task as complete"
  className="p-2 rounded-md hover:bg-muted"
>
  <CheckIcon className="w-4 h-4" />
</button>

<div role="alert" aria-live="polite">
  Task saved successfully
</div>
```

### Keyboard Navigation
Ensure all interactive elements are keyboard accessible.

```tsx
<div 
  tabIndex={0}
  role="button"
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
  className="focus:ring-2 focus:ring-ring focus:ring-offset-2"
>
  Interactive card content
</div>
```

## Best Practices

### Do's ✅
- Use consistent spacing from the 8px grid system
- Implement smooth transitions for all interactive elements
- Provide clear feedback for all user actions
- Test with keyboard navigation and screen readers
- Use semantic HTML elements
- Follow the established color palette

### Don'ts ❌
- Don't use harsh transitions or jarring animations
- Don't forget focus states for interactive elements
- Don't use colors outside the defined palette
- Don't create interactions without proper feedback
- Don't ignore mobile responsiveness
- Don't sacrifice accessibility for visual appeal