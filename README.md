# AssetVerse 🗂️

AssetVerse is a role-based asset management web application designed to help companies efficiently manage organizational assets and employee allocations.  
The system supports HR and Employee roles with secure authentication, asset assignment workflows, and basic analytics.

---

## 🔗 Live Links
-https://quiet-hotteok-3eb24c.netlify.app

---

## 🧑‍💼 User Roles
### 👤 HR (Admin)
- Add, update, and delete company assets
- Approve or reject employee asset requests
- Assign assets directly to employees
- Manage employees (activate / deactivate)
- View employee list and asset usage
- Upgrade subscription package (Basic / Standard / Premium)
- View analytics dashboard (Recharts)

### 👨‍💻 Employee
- Request available assets
- View assigned assets
- Return returnable assets
- View team members
- View birthday reminders
- Manage personal profile

---

## ✨ Key Features
- 🔐 JWT-based Authentication & Authorization
- 🧾 Role-based Route Protection (HR / Employee)
- 📦 Asset Management with Quantity Tracking
- 🔄 Asset Assignment & Return System
- 👥 Employee Affiliation System (Company-wise)
- 📊 Analytics Dashboard using Recharts
- 🎂 Birthday Reminder System
- 💳 Subscription & Package Limit Logic
- ⚡ Optimized Data Fetching with React Query

---

## 🛠️ Technologies Used

### Frontend
- React.js
- React Router
- React Hook Form
- TanStack React Query
- Axios
- Tailwind CSS
- DaisyUI
- Recharts

### Backend
- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Token)
- Firebase Authentication

---

## 🗃️ Database Collections
- `users`
- `assets`
- `requests`
- `assignedAssets`
- `employeeAffiliation`

---

## 🔐 Authentication Flow
- Firebase Authentication for login/signup
- JWT generated on login
- JWT stored in localStorage
- Protected API routes using JWT middleware
- Role-based access control

---

## 📊 Analytics (HR Dashboard)
- Total Assets
- Assigned vs Available Assets
- Total Employees
- Asset Distribution by Type

---

## 🚀 How to Run Locally
1. Clone the repository  
2. Navigate to the project directory  
3. Install dependencies  
4. Setup environment variables  
5. Start the development server  
