# Frontend Development Patterns - LogWatch Admin

## UI Component Library

### Button Component (`src/components/ui/Button.tsx`)
- Variants: primary (blue), secondary (gray), outline, ghost
- Sizes: sm, md, lg
- Loading state with spinner animation
- Full width option with `fullWidth` prop
- Disabled state handling
- forwardRef for ref forwarding

### Input Component (`src/components/ui/Input.tsx`)
- Label, error message, helper text support
- ARIA attributes for accessibility (aria-invalid, aria-describedby)
- Visual error state with red border and message
- Required field indicator (red asterisk)
- forwardRef for form libraries compatibility
- Auto-generated input IDs from label text

### Card Component (`src/components/ui/Card.tsx`)
- Variants: default (border), outlined (thick border), elevated (shadow)
- Padding options: none, sm, md, lg
- Rounded corners with `rounded-lg`

## Form Patterns

### Client-Side Validation
```typescript
// Pattern: Validate on submit, clear errors on input change
const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

const validateForm = (): boolean => {
  const newErrors: Partial<Record<keyof FormData, string>> = {};
  // validation logic...
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleChange = (field: keyof FormData, value: string) => {
  setFormData(prev => ({ ...prev, [field]: value }));
  if (errors[field]) {
    setErrors(prev => ({ ...prev, [field]: undefined }));
  }
};
```

### Email Validation Regex
```typescript
/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
```

### API Integration Pattern
```typescript
// Pattern: Loading state, error handling, token storage
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string>("");

const handleSubmit = async (data: FormData) => {
  setIsLoading(true);
  setError("");
  try {
    const response = await fetch("/api/endpoint", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message);
    // Success handling...
  } catch (err) {
    setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.");
  } finally {
    setIsLoading(false);
  }
};
```

## Styling Standards

### Color Scheme
- Primary: `blue-600`, hover: `blue-700`, focus: `blue-500`
- Secondary: `gray-600`, hover: `gray-700`
- Error: `red-500` (text), `red-50` (background), `red-200` (border)
- Text: `gray-900` (headings), `gray-700` (body), `gray-600` (muted)

### Spacing
- Form field spacing: `space-y-4`
- Card padding: sm=`p-4`, md=`p-6`, lg=`p-8`
- Input padding: `px-3 py-2`
- Button padding: sm=`px-3 py-1.5`, md=`px-4 py-2`, lg=`px-6 py-3`

### Responsive Breakpoints
- Mobile-first approach (default styles for mobile)
- `sm:` - 640px+
- `md:` - 768px+
- `lg:` - 1024px+

## Layout Patterns

### Auth Layout (`src/app/(auth)/layout.tsx`)
- Centered content with `flex items-center justify-center`
- Full viewport height: `min-h-screen`
- Responsive padding: `px-4 py-12 sm:px-6 lg:px-8`
- Max width container: `max-w-md w-full`
- Background: `bg-gray-50`

## Accessibility Patterns

1. **Form Inputs**
   - Connect labels to inputs with `htmlFor` and `id`
   - Mark required fields with red asterisk
   - Use `aria-invalid` for error states
   - Use `aria-describedby` to connect errors/helper text
   - Provide `role="alert"` on error messages

2. **Loading States**
   - Spinner with `aria-hidden="true"` (decorative)
   - Text alternative: "처리 중..."
   - Disable interactive elements during loading

3. **Focus States**
   - All interactive elements have `focus:ring-2` and `focus:outline-none`
   - Consistent focus ring color within component variants

## TypeScript Patterns

### Component Props Interface
```typescript
export interface ComponentProps extends HTMLAttributes<HTMLElement> {
  // Custom props first
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  // Spread native HTML attributes
}
```

### Form Data Types
```typescript
// Separate interfaces for different forms
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}
```

## File Organization

- UI primitives → `src/components/ui/`
- Feature components → `src/components/features/`
- Type definitions → `src/types/`
- Auth pages → `src/app/(auth)/[page]/`
- API routes → `src/app/api/`

## Import Conventions

Always use `@/*` alias:
```typescript
import { Button } from "@/components/ui/Button";
import { LoginForm } from "@/components/features/LoginForm";
import type { LoginFormData } from "@/types/auth";
```
