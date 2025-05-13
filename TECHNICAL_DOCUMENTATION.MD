# Frontend Technical Documentation

## Project Architecture

### Domain-Driven Design (DDD) Structure

```
src/
└── domains/
    ├── auth/
    │   ├── application/    # Use cases and business logic
    │   ├── domain/        # Entities and interfaces
    │   └── infrastructure/ # External services and implementations
    └── task/
        ├── application/    # Use cases and business logic
        ├── domain/        # Entities and interfaces
        └── infrastructure/ # External services and implementations
```

### Key Benefits of DDD and Screaming Architecture

* **Clear Separation**: Each domain (auth, task) is isolated, making maintenance and evolution easier.
* **Low Coupling**: Domains are independent with their own business rules, reducing dependencies.
* **Scalability**: Easy to add new domains without affecting existing ones.
* **Testability**: Clear layer separation makes unit and integration testing straightforward.

## Testing Strategy

* **Isolated Testing**: Each domain can be tested independently.
* **Maintainable Tests**: Test structure mirrors code structure.
* **Comprehensive Coverage**: Dedicated tests for each domain layer.

## Design Decisions

* **Architecture**: DDD + Screaming Architecture for clear separation of concerns.
* **Styling**: Styled Components with Tailwind CSS for organized and reusable styles.
* **Component Design**: Atomic Design for better reusability and consistency.
* **Documentation**: Storybook for design system documentation.

## Data Management

### Storage
* **LocalStorage** for:
  * User authentication data
  * Task data

### State Management
* **Redux** with two main slices:
  * `authSlice`: Authentication state
  * `taskSlice`: Task state

### Data Persistence
* **Middleware** for automatic storage:
  * `authMiddleware`: User data persistence
  * `taskMiddleware`: Task data persistence

## Security

* **Data Encryption**:
  * Uses CryptoJS for token encryption
  * Encryption key stored in environment variables

## Data Structures

* Hierarchical task structure
* User-specific task sets
* Task metadata includes:
  * Unique ID
  * Creation date
  * Update date
  * Status
  * Favorite status

## Data Loading

* Tasks load from localStorage on startup
* User session verification and restoration
* Authentication token decryption

## Repository Pattern

* **Interfaces**:
  * `ITaskRepository`
  * `AuthRepository`
* **Implementation**:
  * `ReduxTaskRepositoryImpl`

## Automatic Synchronization

Tasks sync to localStorage on:
* Creation
* Updates
* Deletion
* Favorite status changes
* State changes

## ID Generation

* **Dynamic Keys** (`generateDynamicKey`):
  * 6-digit code with timestamp
  * Base64 encoded
  * 15-minute expiration

* **Task IDs** (`generateTaskId`):
  * Combines timestamp, user ID, and random string
  * SHA-256 hash truncated to 8 characters

## SOLID Principles

* **Single Responsibility**: Each class has one purpose
* **Open/Closed**: Extensible without modifying core code
* **Liskov Substitution**: Implementations maintain interface contracts
* **Interface Segregation**: Small, focused interfaces
* **Dependency Inversion**: High-level modules depend on abstractions

