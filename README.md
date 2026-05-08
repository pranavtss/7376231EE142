# Campus Hiring Evaluation - Frontend

A comprehensive React application for the Campus Hiring Evaluation system. Built with React, TypeScript, Vite, and Tailwind CSS.

## 🎯 Features

- ✅ **User Authentication** - Secure login and registration
- ✅ **Role-Based Access** - Protected routes and pages
- ✅ **Multi-Stage Evaluation** - Interactive quiz system with timer
- ✅ **Notification System** - Real-time updates and alerts
- ✅ **Responsive Design** - Works on all devices
- ✅ **TypeScript** - Full type safety
- ✅ **State Management** - Zustand for global state
- ✅ **API Integration** - Axios with interceptors

## 📁 Project Structure

```
src/
├── pages/              # Page components
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Dashboard.tsx
│   ├── Evaluation.tsx
│   ├── Terms.tsx
│   └── Notifications.tsx
├── components/         # Reusable components
│   └── common.tsx
├── services/          # API services
│   ├── apiClient.ts
│   ├── authService.ts
│   ├── evaluationService.ts
│   └── notificationService.ts
├── context/           # State management
│   └── store.ts
├── hooks/            # Custom hooks
│   └── useCustomHooks.ts
├── types/            # TypeScript types
│   └── index.ts
├── utils/            # Utility functions
│   └── helpers.ts
├── App.tsx           # Main app with routing
├── main.tsx          # Entry point
└── index.css         # Global styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# Update API URL in .env.local
VITE_API_URL=http://localhost:8000/api
```

### Development

```bash
npm run dev
```

Server runs on `http://localhost:3000`

### Build

```bash
npm run build
```

Production build created in `dist/` folder

### Linting

```bash
npm run lint
npm run lint:fix
npm run format
```

## 🔑 Key Pages

### 1. **Login** (`/login`)
- Email and password authentication
- Access code verification
- Server-side validation

### 2. **Register** (`/register`)
- User registration form
- Email validation
- Password strength validation
- Terms & conditions agreement

### 3. **Dashboard** (`/dashboard`)
- User profile information
- Evaluation status
- Recent notifications
- Quick stats

### 4. **Evaluation** (`/evaluation`)
- Multi-stage quiz system
- Timer for each question
- Progress tracking
- Auto-submit on time expiry
- Navigation between questions

### 5. **Notifications** (`/notifications`)
- Notification list
- Mark as read
- Delete notifications
- Filter by status

### 6. **Terms** (`/terms`)
- Terms and conditions
- Important disclaimers
- Evaluation guidelines

## 🔐 Authentication Flow

1. User registers with email, password, and college details
2. User logs in with email and password
3. JWT token is stored in localStorage
4. Token is added to all API requests automatically
5. On token expiry, user is redirected to login

## 🛠️ API Integration

### Base URL
```
http://localhost:8000/api
```

### Authentication Header
```
Authorization: Bearer {token}
```

### Key Endpoints

**Authentication:**
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/validate-code` - Validate access code

**Evaluation:**
- `GET /evaluation/current` - Get evaluation
- `GET /evaluation/stages/{id}` - Get stage details
- `POST /evaluation/stages/{id}/submit` - Submit responses
- `GET /evaluation/results` - Get results

**Notifications:**
- `GET /notifications` - Get all notifications
- `PUT /notifications/{id}/read` - Mark as read
- `DELETE /notifications/{id}` - Delete notification

## 🎨 Component Library

### Common Components

**Button**
```tsx
<Button variant="primary" size="md" isLoading={false} fullWidth={false}>
  Click me
</Button>
```

**Input**
```tsx
<Input
  label="Email"
  type="email"
  placeholder="user@example.com"
  error="Invalid email"
  helperText="Enter a valid email"
/>
```

**Card**
```tsx
<Card>
  <h1>Card Content</h1>
</Card>
```

**Alert**
```tsx
<Alert
  type="success"
  title="Success"
  message="Operation completed"
  onClose={() => {}}
/>
```

## 📦 State Management

Using Zustand for global state:

```tsx
// Auth Store
const { user, isAuthenticated, setUser, logout } = useAuthStore();

// Notification Store
const { notifications, addNotification, clearAll } = useNotificationStore();
```

## 🔄 Custom Hooks

**useAuth** - Access authentication state and methods
```tsx
const { user, isAuthenticated, logout } = useAuth();
```

**useLocalStorage** - Persist data in localStorage
```tsx
const [value, setValue] = useLocalStorage('key', initialValue);
```

**useTimer** - Timer hook for countdowns
```tsx
const seconds = useTimer(300, () => console.log('Time up!'));
```

## 📋 Utility Functions

- `classNames()` - Conditional class names
- `formatDate()` - Format dates
- `formatTime()` - Format seconds to MM:SS
- `validateEmail()` - Email validation
- `validatePassword()` - Password strength validation

## 🌐 Environment Variables

Create `.env.local`:
```
VITE_API_URL=http://localhost:8000/api
```

## 🔒 Security Features

- JWT token-based authentication
- Protected routes with ProtectedRoute component
- Password strength validation
- CORS configured
- Automatic token refresh on 401
- XSS protection with React

## 📱 Responsive Design

- Mobile-first approach
- Tailwind CSS responsive classes
- Flexible grid layouts
- Mobile-optimized forms

## 🎓 Best Practices

1. **Type Safety** - All components typed with TypeScript
2. **Error Handling** - Try-catch blocks and error states
3. **Loading States** - Proper loading indicators
4. **Validation** - Client-side form validation
5. **Composition** - Reusable components
6. **Code Organization** - Clear folder structure

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

## 📝 Development Tips

1. **API Testing** - Use Postman or Thunder Client
2. **State Debugging** - React DevTools Extension
3. **Network Inspection** - Browser DevTools Network tab
4. **Component Testing** - Add console.logs for debugging
5. **Type Checking** - Run `tsc --noEmit` to check types

## 🐛 Troubleshooting

**CORS Issues:**
- Update API URL in vite.config.ts proxy
- Ensure backend has CORS enabled

**Token Expiry:**
- Token automatically removed on 401
- User redirected to login

**API Not Responding:**
- Check if backend is running
- Verify API URL in .env.local
- Check network tab in DevTools

## 📞 Support

For issues or questions, contact the development team.

## 📄 License

MIT License - Feel free to use this project for learning and development.

---

**Access Code:** uKaJfm

**Important:** Keep all credentials and access codes secure!
