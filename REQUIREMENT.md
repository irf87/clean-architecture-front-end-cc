# Frontend Technical Test

## General Objective

Develop a web application that allows users to authenticate, manage tasks through a Trello-style board with drag-and-drop functionality, and ensure data persistence.

## **Mandatory Technical Requirements**

### 1. Technologies and Tools

* **Next.js** for application development (senior level required).
* **TypeScript** for static typing throughout the code.
* **Redux (Redux Toolkit)** for efficient global state management.
* **Styled Components** for UI presentation and design.
* **Custom Eslint** for code quality and consistency.
* **React Testing Library** and **Jest** for unit and integration tests (minimum 50% code coverage).
* **ReqRes API** ([https://reqres.in](https://reqres.in)) for authentication and mock data.
* **Encryption** for sensitive data in localStorage and sessionStorage.

### 2. Application Features

#### **Authentication**

* Use the ReqRes API for login.
* Session persistence even after page reload.
* Automatic redirect to the task board after authentication.
* Dynamic key-based verification generated on the frontend and validated on the backend (simulated).
* Store the authentication token encrypted in localStorage.
* Include random response delays to simulate network latency.

#### **Task Management (Trello-style)**

* Task board with drag-and-drop functionality.
* Multiple columns with configurable statuses (e.g., "Pending", "In Progress", "Completed").
* Add, edit, and delete tasks.
* Prevent duplicate task names.
* Confirm before deleting a task.
* Persistent task storage by user, even after logout.
* Generate unique task IDs manually using a combination of date, user, and encrypted hash.
* Validate special characters in task names before accepting them (backend validation required).

#### **Advanced Data Management**

* Implement a favorites system to mark tasks as important.
* Persistent favorites and tasks per user.
* Implement a custom in-memory cache to reduce global state access.
* Serialize and compress data before storing it in localStorage or sending to the backend.

### **Submission Requirements**

1. **Source Code**

   * Push the code to a public GitHub repository.
   * Include clear README.md instructions for local setup and execution.

2. **Documentation**

   * Brief project structure overview.
   * Key design decisions.
   * Explanation of data persistence.
   * Detailed description of unique ID generation and custom caching.
   * Justification for using advanced data structures for task management.

3. **Testing**

   * Minimum 50% code coverage with unit and integration tests.
   * Tests for authentication, task management, and data persistence.
   * Include custom mocks and data integrity validations.
   * Add tests with random data and state mutations to ensure stability.

### **Evaluation Criteria**

* Correct implementation of authentication and session management.
* Full task board functionality with drag-and-drop.
* Efficient use of Redux and TypeScript.
* Well-structured tests with at least 50% coverage.
* Clean code
* Clear and detailed documentation.
* Proper use of advanced data structures, unique IDs, and custom caching.
* Secure data and authentication handling.
