# (Clean architecture) Front End Technical Test

This project is developed with [Next.js](https://nextjs.org) using a Domain-Driven Design (DDD) architecture.

## Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

## Environment Setup

1. Clone the repository
2. Install dependencies:
```bash
yarn install
```

3. Create a `.env` file in the project root with the following variables:
```env
NEXT_PUBLIC_API_URL="https://reqres.in/api"
NEXT_PUBLIC_ENCRYPTION_KEY="ezjllOXzhNB2l8jAsjbAhpvXVQ7RpQDk"
NEXT_PUBLIC_API_KEY="reqres-free-v1"
```

## Login

[Get list of allowed users](https://reqres.in/api-docs/#/default/get_users)
Example: 
email: george.bluth@reqres.in
password: 123456

## Available Scripts

### Development
```bash
yarn dev
```
Starts the development server at [http://localhost:3000](http://localhost:3000)

### Unit Testing
```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage
```

### Storybook
```bash
# Start Storybook
yarn storybook

# Build Storybook
yarn build-storybook
```

### Linting
```bash
yarn lint

# Fix formatting errors automatically
yarn lint:fix
```

## Documentation

For more details about the architecture, design decisions, and implemented strategies, please check:

- [Technical Documentation](./TECHNICAL_DOCUMENTATION.MD) - Detailed technical overview
- [Requirements](./REQUIREMENT.md) - Project requirements and specifications

## Main Technologies

- Next.js 14
- React 18
- TypeScript
- Redux Toolkit
- Styled Components
- Vitest
- Storybook
- Tailwind CSS
