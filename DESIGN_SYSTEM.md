# Portfolio Design System

## 🎨 Unified Visual Language

### Color Palette
- **Primary Background**: `#0a0a0f` (Deep midnight)
- **Secondary Background**: Transparent with glassmorphism
- **Accent Colors**:
  - Cyan: `#00ffff` / `#00f0ff`
  - Magenta: `#ff0080` / `#ff00e5`
  - Purple: `#8b00ff` / `#7b61ff`

### Typography
- **Display Font**: 'Syne', 'Orbitron' (Headers)
- **Body Font**: 'Space Mono', 'Inter Tight' (Content)
- **Code Font**: 'SF Mono', 'Fira Code' (Technical elements)

## 🌊 Consistent Background System

All sections now use:
1. **Transparent base** - Allows global animated background to show through
2. **Subtle gradient overlays** - Radial gradients with 8% opacity
3. **Animated mesh** - 15s rotation and scale animation
4. **Grid pattern** - Optional subtle grid for depth

### Section Structure
```css
.section {
  background: transparent;
  position: relative;
  isolation: isolate;
}

.section::before {
  /* Animated gradient mesh */
  background:
    radial-gradient(circle at 20% 30%, rgba(0, 255, 255, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(255, 0, 128, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(139, 0, 255, 0.05) 0%, transparent 60%);
  animation: gradientMeshShift 15s ease-in-out infinite;
}
```

## 🎭 3D Effects & Animations

### Card Hover States
- **Transform**: `translateY(-12px) rotateX(2deg) scale(1.02)`
- **Transition**: `0.4s cubic-bezier(0.4, 0, 0.2, 1)`
- **Shadow**: Multi-layered with glow effects
- **Border**: Animated gradient border on hover

### Glassmorphism
- **Background**: `rgba(17, 34, 64, 0.4)`
- **Backdrop Filter**: `blur(20px)`
- **Border**: `1px solid rgba(100, 255, 218, 0.1)`

## 📱 Performance Optimizations

### Mobile (< 768px)
- Reduced animation complexity
- Disabled heavy gradients
- Hardware acceleration: `transform: translateZ(0)`
- Simplified hover states

### Desktop
- Full 3D transforms
- Complex gradient animations
- Mouse-tracking effects
- Particle systems

## 🎯 Component Patterns

### Project Cards
- Image header (220px height)
- Glassmorphic content area
- Tech stack badges with hover effects
- Gradient border on hover
- Mouse-tracking glow effect

### Experience Timeline
- Alternating left/right layout (desktop)
- Vertical stack (mobile)
- Glowing center line
- Semiconductor chip-inspired design
- IC pin decorations

### Certifications
- Fixed height cards (483px)
- Horizontal scroll on mobile
- PCB trace grid pattern
- Image-based headers
- LinkedIn integration

## 🚀 Animation Keyframes

### Gradient Mesh Shift
```css
@keyframes gradientMeshShift {
  0%, 100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
  50% {
    transform: scale(1.1) rotate(5deg);
    opacity: 0.8;
  }
}
```

### Title Flow
```css
@keyframes sectionTitleFlow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

## 🎨 Gradient System

### Primary Gradient
```css
linear-gradient(135deg, #00ffff, #ff0080)
```

### Title Gradient
```css
linear-gradient(90deg,
  var(--color-accent-cyan) 0%,
  var(--color-accent-purple) 50%,
  var(--color-accent-magenta) 100%)
```

### Border Gradient
```css
linear-gradient(135deg,
  rgba(0, 240, 255, 0.3),
  rgba(123, 97, 255, 0.2),
  rgba(255, 0, 229, 0.3))
```

## 🔧 Best Practices

1. **Always use CSS variables** from `variables.css`
2. **Maintain z-index hierarchy**: Background (0) → Content (1) → Overlays (2)
3. **Use `will-change`** sparingly for animated elements
4. **Implement `@media (prefers-reduced-motion)`** for accessibility
5. **Test on mobile** - animations should be simplified
6. **Use `isolation: isolate`** for stacking contexts
7. **Prefer `backdrop-filter`** over solid backgrounds

## 📊 Spacing Scale (8px grid)

- `--space-1`: 8px
- `--space-2`: 16px
- `--space-3`: 24px
- `--space-4`: 32px
- `--space-6`: 48px
- `--space-8`: 64px
- `--space-12`: 96px

## 🎯 Consistency Checklist

- ✅ All sections use transparent backgrounds
- ✅ Consistent gradient mesh animations
- ✅ Unified color palette
- ✅ Matching typography system
- ✅ Standardized card hover effects
- ✅ Mobile-optimized animations
- ✅ Glassmorphism throughout
- ✅ Consistent spacing scale
