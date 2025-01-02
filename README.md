![University Management System](https://res.cloudinary.com/dcyupktj6/image/upload/v1735803168/dxe6n9nsyoduu2e7mv3j.png)

## **Overview**

This project is a comprehensive backend solution designed to streamline the management of university operations. Built using **Node.js**, **Express**, and **MongoDB**, it offers a robust, scalable, and secure platform for handling user management, academic administration, enrollment processes, and more. It provides seamless integration and flexibility, ensuring efficiency for universities of all sizes.

---

## **Features**

### **1. User Management**

- **Role-Based Access Control (RBAC):**
  - Supports predefined roles: **superAdmin**, **admin**, **faculty**, and **student**.
- **User Operations:**
  - Comprehensive user management, including creation, updating, and deletion of user accounts.
- **Authentication & Security:**
  - Advanced security with **JWT (JSON Web Token)** authentication.
  - Features password change and reset functionalities to ensure user convenience and security.

### **2. Academic Management**

- **Department and Faculty Management:**
  - Perform CRUD operations for academic departments and faculty members.
- **Semester Management:**
  - Efficiently manage academic semesters with validation of semester codes and names to avoid conflicts.
- **Course Management:**
  - Add, update, and delete courses.
  - Assign and unassign faculties for specific courses dynamically.

### **3. Enrollment and Registration**

- **Student Enrollment:**
  - Enroll students into courses with automated checks for prerequisites and seat availability.
- **Semester Registrations:**
  - Manage semester registration statuses: **UPCOMING**, **ONGOING**, and **ENDED** for real-time tracking.
- **Course Marks Management:**
  - Faculties can update and manage students' course marks with ease.
- **Student Portal:**
  - Students can access their enrolled courses, academic performance, and progress in a user-friendly interface.

### **4. Error Handling and Validation**

- **Error Handling:**
  - Custom error messages for various scenarios, including validation, duplication, and authorization errors.
- **Data Validation:**
  - Leverages **Zod** to validate incoming requests, ensuring data consistency and integrity.

---

## **Technologies Used**

### **Core Technologies**

- **Node.js**
- **Express.js**
- **MongoDB**

### **Additional Libraries & Tools**

- **Zod:** Advanced request validation.
- **JWT:** Secure and efficient user authentication.
- **Mongoose:** Object Data Modeling (ODM) library for MongoDB.
- **Bcrypt:** Ensures password security through robust hashing.
- **Helmet & CORS:** Enhances security by setting HTTP headers and managing cross-origin requests.

---

## **Installation**

### **Prerequisites**

- Node.js (v18+)
- MongoDB

### **Steps to Install**

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/university-management-backend.git
   cd university-management-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     PORT=5000
     MONGO_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret
     ```
4. Start the server:
   ```bash
   npm start
   ```
5. Visit the application at `http://localhost:5000`.

---

## **API Documentation**

### **Authentication**

- **POST** `/api/auth/login`: Authenticate a user and generate a JWT token.
- **POST** `/api/auth/change-password`: Allow users to update their passwords.
- **POST** `/api/auth/refresh-token`: Refresh expired JWT tokens.
- **POST** `/api/auth/forget-password`: Send a password reset link to the user's registered email.
- **POST** `/api/auth/reset-password`: Reset user passwords using the reset link.

### **User Management**

- **POST** `/api/users/create-student`: Create a new student (Admin access required).
- **POST** `/api/users/create-faculty`: Create a new faculty member (Admin access required).
- **POST** `/api/users/create-admin`: Create a new admin (SuperAdmin access required).
- **GET** `/api/users/me`: Fetch details of the currently logged-in user.
- **PATCH** `/api/users/change-status/:id`: Update user status (Admin/SuperAdmin access required).
- **GET** `/api/users`: Retrieve all users (SuperAdmin access required).

### **Academic Management**

- **POST** `/api/academic-departments/create-academic-department`: Add a new academic department.
- **GET** `/api/academic-departments`: Fetch all academic departments.
- **POST** `/api/academic-faculties/create-academic-faculty`: Add a new academic faculty.
- **GET** `/api/academic-faculties`: Fetch all academic faculties.
- **POST** `/api/academic-semesters/create-academic-semester`: Add a new academic semester.
- **GET** `/api/academic-semesters`: Fetch all academic semesters.

### **Course Management**

- **POST** `/api/courses/create-course`: Add a new course.
- **GET** `/api/courses`: Fetch all courses.
- **PATCH** `/api/courses/:id`: Update course details.
- **DELETE** `/api/courses/:id`: Delete a course.
- **PUT** `/api/courses/:id/assign-faculties`: Assign faculty members to a course.
- **DELETE** `/api/courses/:id/remove-faculties`: Remove faculty members from a course.

### **Enrollment and Registration**

- **POST** `/api/enrolled-courses/create-enrolled-course`: Enroll a student in a course.
- **PATCH** `/api/enrolled-courses/update-enrolled-course-marks`: Update student course marks.
- **GET** `/api/enrolled-courses/my-enrolled-courses`: Fetch enrolled courses of the current student.
- **POST** `/api/semester-registrations/create-semester-registration`: Create semester registrations.
- **GET** `/api/semester-registrations`: Fetch all semester registrations.

### **Offered Courses**

- **POST** `/api/offered-courses/create-offered-course`: Add a new offered course.
- **GET** `/api/offered-courses`: Retrieve all offered courses.
- **GET** `/api/offered-courses/my-offered-courses`: Fetch offered courses for the current student.
- **PATCH** `/api/offered-courses/:id`: Update offered course details.
- **DELETE** `/api/offered-courses/:id`: Remove an offered course.

---

## **Project Structure**

```plaintext
university-management-backend/
├── src/
│   ├── app/
│   │   ├── config/
│   │   ├── errors/
│   │   ├── interfaces/
│   │   ├── middlewares/
│   │   ├── modules/
│   │   │   ├── academicDepartment/
│   │   │   ├── academicFaculty/
│   │   │   ├── academicSemester/
│   │   │   ├── admin/
│   │   │   ├── auth/
│   │   │   ├── course/
│   │   │   ├── enrolledCourse/
│   │   │   ├── faculty/
│   │   │   ├── offeredCourse/
│   │   │   ├── semesterRegistration/
│   │   │   ├── student/
│   │   │   └── user/
│   │   ├── routes/
│   │   ├── utils/
│   ├── server.ts
│   └── app.ts
├── uploads/
├── .env
├── package.json
└── README.md
```

---

## **Contributing**

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request for review.

---

## **Live URL**
**Click Here to Visit the Live URL of the Project:** https://university-server-shakilofficials-projects-7b0e9e4a.vercel.app

---
## **License**

This project is licensed under the [MIT License](LICENSE).

---

## **Contact**

For queries, suggestions, or feedback, feel free to reach out:

- **Email:** mrshakilhossain@outlook.com
- **GitHub:** [ShakilOfficial](https://github.com/ShakilOfficial)
- **LinkedIn:** [Shakil Hossain](https://www.linkedin.com/in/md-shakilhossain)

---
