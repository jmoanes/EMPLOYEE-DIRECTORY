# 🔐 Authentication Guide

## Overview

The Employee Management System now includes a complete authentication system with role-based access control. **Only admin users can access the employee dashboard.**

---

## 🎯 Key Features

### ✅ Authentication
- **Sign Up** - Create new accounts with email and password
- **Sign In** - Secure login with credential validation
- **Sign Out** - Logout and clear session
- **Session Persistence** - Stay logged in across browser sessions

### 👥 User Roles
- **Admin** - Full access to employee dashboard
- **User** - No dashboard access (blocked with access denied page)

### 🛡️ Security
- Password validation (minimum 6 characters)
- Email format validation
- Protected routes
- Role-based authorization
- localStorage-based session management

---

## 🚀 Getting Started

### Demo Credentials

Two demo accounts are pre-created for testing:

**Admin Account (Full Access):**
- Email: `admin@demo.com`
- Password: `admin123`
- Can access the dashboard ✅

**User Account (No Access):**
- Email: `user@demo.com`
- Password: `user123`
- Cannot access dashboard ❌

---

## 📝 Sign Up Flow

### Creating a New Account

1. **Open the app** at `http://localhost:5173`
2. You'll see the **Sign In** page
3. Click **"Sign Up"** at the bottom
4. Fill in the form:
   - **Email Address**: Must be valid format (e.g., john@example.com)
   - **Password**: Minimum 6 characters
   - **Confirm Password**: Must match password
   - **Role**: Select either "Admin" or "User"

5. Click **"✨ Create Account"**
6. Success! You'll see a confirmation message
7. **Switch to Sign In** mode automatically
8. Enter your credentials to sign in

### ⚠️ Important Notes
- **Admin role** gives full access to the dashboard
- **User role** will show "Access Denied" when trying to access dashboard
- Email must be unique (can't register same email twice)
- All data is stored in browser localStorage

---

## 🔑 Sign In Flow

### Logging Into Your Account

1. **Open the app** at `http://localhost:5173`
2. Enter your credentials:
   - **Email**: Your registered email
   - **Password**: Your password

3. Click **"🚀 Sign In"**

### What Happens Next?

**If you're an Admin:**
- ✅ Redirected to the employee dashboard
- ✅ See your email and role in the header
- ✅ Full access to all CRUD operations

**If you're a User:**
- ❌ See "Access Denied" page
- ❌ Message: "You need admin privileges to access this page"
- ❌ Cannot view or manage employees

### Error Handling
- **Invalid email or password**: Shows error alert
- **User doesn't exist**: Shows error alert
- **Email format invalid**: Shows validation error

---

## 🚪 Sign Out

### Logging Out

1. **Click** the "🚪 Sign Out" button in the top-right corner
2. **Confirm** in the dialog
3. **Redirected** to the sign-in page
4. **Session cleared** from localStorage

---

## 🛠️ Technical Details

### Authentication Flow

```
1. User visits app
   ↓
2. App checks localStorage for "currentUser"
   ↓
3a. If found → Auto-login → Check role
3b. If not found → Show auth page
   ↓
4. Admin role → Dashboard access ✅
   User role → Access denied ❌
```

### Data Storage

**Users Database** (`localStorage.users`):
```json
[
  {
    "id": "unique-id",
    "email": "admin@demo.com",
    "password": "admin123",
    "role": "admin",
    "createdAt": "2025-10-23T..."
  }
]
```

**Current Session** (`localStorage.currentUser`):
```json
{
  "id": "unique-id",
  "email": "admin@demo.com",
  "role": "admin"
}
```

### Components

**AuthContext.jsx** - Manages authentication state
- `signup()` - Create new user
- `signin()` - Login user
- `signout()` - Logout user
- `isAdmin()` - Check if current user is admin
- `currentUser` - Current logged-in user

**AuthForm.jsx** - Sign up/in form UI
- Email and password fields
- Role selection (signup only)
- Form validation
- Toggle between modes

**ProtectedRoute.jsx** - Route protection
- Blocks unauthenticated users
- Blocks non-admin users from dashboard
- Shows access denied page

**AuthPage.jsx** - Authentication page
- Handles sign up and sign in
- Shows demo credentials
- Manages form state

---

## 🔒 Security Considerations

### Current Implementation (Development)
- ⚠️ Passwords stored in **plain text** in localStorage
- ⚠️ Client-side only (no backend)
- ⚠️ No password hashing
- ✅ Good for development and learning

### Production Recommendations
- ✅ Use a backend API (Node.js, Firebase, etc.)
- ✅ Hash passwords with bcrypt
- ✅ Use JWT tokens for sessions
- ✅ Implement HTTPS only
- ✅ Add rate limiting
- ✅ Add CSRF protection
- ✅ Use secure cookies
- ✅ Add password reset functionality

---

## 🎨 UI/UX Features

### Authentication Page
- Beautiful gradient background
- Centered card layout
- Smooth animations
- Clear error messages
- Demo credentials displayed
- Easy mode switching

### Dashboard Header
- User badge showing:
  - 👑 Icon for admin
  - 👤 Icon for user
  - Email address
  - User role
- Sign out button
- Responsive layout

### Access Denied Page
- Clear error message
- Shows current user info
- Option to sign in as different user
- Animated warning icon

---

## 📱 Responsive Design

All authentication pages are fully responsive:
- Mobile (< 480px)
- Tablet (480px - 768px)
- Desktop (> 768px)

---

## 🧪 Testing the System

### Test Case 1: Admin Access
1. Sign in as: `admin@demo.com` / `admin123`
2. ✅ Should see dashboard
3. ✅ Can manage employees
4. ✅ Can sign out

### Test Case 2: User Blocked
1. Sign in as: `user@demo.com` / `user123`
2. ❌ Should see "Access Denied"
3. ✅ Can sign out and try different account

### Test Case 3: New Admin
1. Sign up with new email
2. Select "Admin" role
3. Sign in with credentials
4. ✅ Should have full access

### Test Case 4: Session Persistence
1. Sign in as admin
2. Close browser
3. Reopen browser to `http://localhost:5173`
4. ✅ Should still be logged in

### Test Case 5: Sign Out
1. Sign in as any user
2. Click "Sign Out"
3. ✅ Redirected to auth page
4. ✅ Session cleared

---

## 🔧 Customization

### Change Default Roles
Edit `src/components/AuthForm.jsx`:
```jsx
<select name="role" value={formData.role} onChange={handleChange}>
  <option value="user">User</option>
  <option value="admin">Admin</option>
  <option value="manager">Manager</option> // Add new role
</select>
```

### Add More Demo Users
Edit `src/pages/AuthPage.jsx`:
```jsx
const demoUsers = [
  // Add more demo users here
  {
    id: 'demo-manager-1',
    email: 'manager@demo.com',
    password: 'manager123',
    role: 'manager',
    createdAt: new Date().toISOString()
  }
];
```

### Customize Access Control
Edit `src/components/ProtectedRoute.jsx`:
```jsx
// Allow multiple roles
if (requireAdmin && !['admin', 'manager'].includes(currentUser.role)) {
  return <AccessDenied />;
}
```

---

## 🚨 Troubleshooting

### Problem: Can't sign in
**Solution**: 
- Check email/password spelling
- Try demo credentials
- Clear localStorage and try again

### Problem: Stuck on access denied
**Solution**:
- Sign out
- Sign in with admin account
- Check role in user badge

### Problem: Session not persisting
**Solution**:
- Check browser localStorage is enabled
- Don't use incognito/private mode
- Clear cache and try again

### Problem: Can't create account
**Solution**:
- Check email is valid format
- Password must be 6+ characters
- Email must be unique
- Passwords must match

---

## 📚 Code Examples

### Check if User is Admin
```jsx
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { isAdmin } = useAuth();
  
  if (isAdmin()) {
    // Show admin content
  }
}
```

### Get Current User
```jsx
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { currentUser } = useAuth();
  
  return <p>Welcome, {currentUser.email}!</p>;
}
```

### Protect a Component
```jsx
import ProtectedRoute from './components/ProtectedRoute';

<ProtectedRoute requireAdmin={true}>
  <AdminOnlyComponent />
</ProtectedRoute>
```

---

## ✅ Best Practices

1. **Always validate input** - Check email format and password strength
2. **Confirm actions** - Use dialogs for sign out
3. **Show clear feedback** - Success and error messages
4. **Persist sessions** - Save to localStorage
5. **Handle errors gracefully** - User-friendly error messages
6. **Test all scenarios** - Admin, user, and edge cases

---

## 🎉 Summary

Your app now has a **complete authentication system**:
- ✅ Sign up with role selection
- ✅ Sign in with validation
- ✅ Admin-only dashboard access
- ✅ Session persistence
- ✅ Secure sign out
- ✅ Beautiful UI
- ✅ Full error handling

**Ready to use!** 🚀
