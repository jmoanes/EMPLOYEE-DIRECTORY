#  Employee Management System - React CRUD App

A complete CRUD (Create, Read, Update, Delete) web application built with React and modern JavaScript.

##  Features

### Authentication & Authorization
-  **User Sign Up** - Create new accounts with email and password
-  **User Sign In** - Secure login with validation
-  **Admin-Only Access** - Only admin users can view the employee dashboard
-  **Sign Out** - Secure logout functionality
-  **Protected Routes** - Dashboard protected from unauthorized access
-  **Session Persistence** - Stay logged in across browser sessions
-  **User Roles** - Admin and User role support

### Core CRUD Operations
- **Create**: Add new employees with form validation
- **Read**: View all employees in a beautiful table with statistics
- **Update**: Edit existing employee information
- **Delete**: Remove employees with confirmation dialog

### Additional Features
-  **Authentication System** - Sign up, sign in, and role-based access
-  **Admin Dashboard** - Only admin users can access employee management
-  **User Profile Display** - Shows logged-in user info and role
-  **Logout Functionality** - Secure sign out from any page
-  Real-time statistics dashboard
-  Data persistence using localStorage
-  Form validation with error messages
-  Beautiful gradient UI design
-  Fully responsive (mobile & desktop)
-  Success/error alert notifications
-  Unique ID generation for each employee
- 🎨 Modern, clean CSS styling
- 🚀 React Router for navigation
- 🔍 **Search & Filter** - Real-time search across all fields
- 🔄 **Sort Columns** - Click any column header to sort
- 📥 **Export to CSV** - Download employee data
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 📄 **Pagination** - Handle large datasets efficiently (5/10/25/50/100 per page)
- ☑️ **Bulk Delete** - Select and delete multiple employees at once
- 📤 **Import from CSV** - Upload employee data from CSV files
- 🖨️ **Print View** - Printer-friendly employee list

## 📋 Employee Fields

Each employee has the following fields:
- **Name** (required)
- **Email** (required, validated)
- **Role** (required) - Developer, Designer, Manager, HR, Sales, Marketing, Support
- **Department** (required) - Engineering, Design, Management, Human Resources, Sales, Marketing, Customer Support

## 🛠️ Tech Stack

- **React 19** - UI Library with functional components
- **React Hooks** - useState, useEffect for state management
- **React Router** - Client-side routing
- **Vite** - Fast build tool and dev server
- **LocalStorage** - Data persistence
- **CSS3** - Custom styling with gradients and animations

## 📁 Project Structure

```
employee-crud-app/
├── src/
│   ├── components/
│   │   ├── EmployeeForm.jsx    # Form for adding/editing employees
│   │   ├── EmployeeList.jsx    # Table displaying all employees
│   │   ├── Alert.jsx           # Alert notification component
│   │   ├── Stats.jsx           # Statistics dashboard
│   │   ├── SearchBar.jsx       # Search and export functionality
│   │   ├── DarkModeToggle.jsx  # Dark mode toggle button
│   │   ├── Pagination.jsx      # Pagination controls
│   │   ├── BulkActions.jsx     # Bulk selection and delete
│   │   ├── ImportCSV.jsx       # CSV import functionality
│   │   ├── AuthForm.jsx        # Authentication form (sign up/in)
│   │   └── ProtectedRoute.jsx  # Route protection component
│   ├── contexts/
│   │   └── AuthContext.jsx     # Authentication context provider
│   ├── pages/
│   │   ├── EmployeeCRUD.jsx    # Main CRUD page
│   │   └── AuthPage.jsx        # Authentication page
│   ├── App.jsx                 # App router and layout
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── public/
├── index.html
├── vite.config.js
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd employee-crud-app
```

2. Install dependencies (already done):
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit:
```
http://localhost:5173
```

5. You'll be redirected to the authentication page. Use demo credentials:
   - **Admin**: admin@demo.com / admin123
   - **User**: user@demo.com / user123

## 📖 Usage

### Authentication

#### Sign Up
1. Click "Sign Up" on the auth page
2. Enter email and password (min 6 characters)
3. Confirm password
4. **Select role**: Admin or User
5. Click "✨ Create Account"
6. You'll be prompted to sign in

⚠️ **Important**: Only users with the **Admin** role can access the employee dashboard!

#### Sign In
1. Enter your email and password
2. Click "🚀 Sign In"
3. If you're an admin, you'll be redirected to the dashboard
4. If you're a regular user, you'll see an "Access Denied" message

#### Demo Accounts
Two demo accounts are pre-created:
- **Admin**: admin@demo.com / admin123 (Full access)
- **User**: user@demo.com / user123 (No dashboard access)

#### Sign Out
- Click the "🚪 Sign Out" button in the top-right corner of the dashboard
- Confirm logout in the dialog
- You'll be redirected to the sign-in page
- Your session will be cleared

### Managing Employees (Admin Only)

### Adding an Employee
1. Fill in all required fields (Name, Email, Role, Department)
2. Click "➕ Add Employee"
3. See success notification
4. New employee appears in the table

### Editing an Employee
1. Click "✏️ Edit" button on any employee row
2. Form populates with employee data
3. Modify the fields
4. Click "💾 Update Employee"
5. See success notification

### Deleting an Employee
1. Click "🗑️ Delete" button on any employee row
2. Confirm deletion in the dialog
3. Employee is removed
4. See success notification

### Data Persistence
- All data is automatically saved to localStorage
- Data persists across browser sessions
- Dark mode preference is saved
- No backend required

### Search & Filter
- Real-time search across all fields
- Search by name, email, role, or department
- Shows "No results" message when no matches found
- Clear button to reset search

### Sorting
- Click any column header to sort
- Toggle between ascending and descending order
- Visual indicators show current sort direction
- Sort by: Name, Email, Role, or Department

### Export to CSV
- Download all employee data as CSV file
- Includes filtered results if search is active
- File named with current date
- Opens save dialog in browser

### Dark Mode
- Toggle button in top-right corner
- Smooth theme transition
- Preference saved to localStorage
- Optimized colors for readability

### Pagination
- Configurable items per page (5, 10, 25, 50, 100)
- Navigate with first/previous/next/last buttons
- Direct page number navigation
- Shows current page and total items
- Automatically resets to page 1 when searching

### Bulk Delete
- Click "☑️ Bulk Select" to enable bulk mode
- Checkboxes appear in the table
- Select individual employees or select all
- Delete multiple employees at once
- Visual indication of selected rows
- Confirmation dialog before deletion

### Import from CSV
- Click " Import CSV" button
- Select a CSV file with employee data
- Format: Name, Email, Role, Department
- Automatically generates unique IDs
- Shows success message with import count
- Example CSV format:
  ```
  Name,Email,Role,Department
  "John Doe","john@example.com","Developer","Engineering"
  "Jane Smith","jane@example.com","Designer","Design"
  ```

### Print View
- Click "🖨️ Print" button
- Opens browser print dialog
- Clean, printer-friendly layout
- Removes all interactive elements
- Shows only employee table with borders

##  Styling

The app features:
- Beautiful gradient backgrounds
- Smooth animations and transitions
- Hover effects on interactive elements
- Responsive grid layouts
- Clean and modern UI
- Color-coded alerts and badges

## 📱 Responsive Design

The app is fully responsive with breakpoints for:
- Desktop (> 768px)
- Tablet (768px - 480px)
- Mobile (< 480px)

##  State Management

- Uses React's `useState` hook for local state
- `useEffect` for side effects (localStorage sync)
- Props for component communication
- No external state management library needed

##  Optional Enhancements

### Firebase Integration (Not included, but easy to add)

To add Firebase:
1. Install Firebase: `npm install firebase`
2. Create Firebase config
3. Replace localStorage operations with Firestore operations
4. Enable real-time sync

##  Contributing

Feel free to fork this project and submit pull requests!

##  License

MIT License - feel free to use this project for learning or production.

##  Author

Built with  using React and modern JavaScript

---

**Happy Coding! **
