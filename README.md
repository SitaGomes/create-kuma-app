# Kuma Template Documentation 🐻

Welcome to the Kuma template! This template provides you with a production-ready structure for your fullstack project, featuring a NestJS backend and a Next.js frontend. This guide will help you understand the structure and get started quickly.

## Project Structure

The template is organized into two main directories:

```
template/
├── backend/     # NestJS backend application
└── frontend/    # Next.js frontend application
```

## Backend (NestJS)

The backend is built with [NestJS](https://nestjs.com/), a progressive Node.js framework for building efficient and scalable server-side applications.

### Structure

```
backend/
├── src/                 # Source code
│   ├── app.module.ts    # Main application module
│   ├── main.ts          # Application entry point
│   ├── auth/            # Authentication related code
│   ├── data/            # Data models and repositories
│   ├── functions/       # Utility functions
│   ├── lib/             # Libraries and external service integrations
│   ├── public/          # Public assets
│   └── utils/           # Utility classes and helpers
├── test/                # Test files
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── nest-cli.json        # NestJS CLI configuration
```

### Key Features

- **Authentication** - Built-in authentication system with JWT and Passport
- **Database Integration** - Ready for Prisma ORM integration
- **Email Services** - Configured with Nodemailer for email functionality
- **Firebase Integration** - Support for Firebase services
- **Validation** - Uses class-validator for input validation
- **Testing** - Jest setup for unit and E2E testing

### Available Scripts

- `npm run dev` or `npm run dev:backend` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Lint the codebase
- `npm run test` - Run tests

## Frontend (Next.js)

The frontend is built with [Next.js](https://nextjs.org/), a React framework for production that provides features like server-side rendering and static site generation.

### Structure

```
frontend/
├── src/                 # Source code
│   ├── app/             # Next.js App Router pages
│   ├── components/      # React components
│   ├── constants/       # Constants and configuration
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility libraries
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Utility functions
├── public/              # Static assets
├── package.json         # Dependencies and scripts
├── next.config.ts       # Next.js configuration
├── tailwind.config.ts   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

### Key Features

- **Modern React** - Uses the latest React and Next.js features
- **Authentication** - Integrated with NextAuth.js for authentication
- **UI Components** - Uses Radix UI primitives for accessible components
- **Styling** - Configured with Tailwind CSS for styling
- **Form Handling** - Set up with React Hook Form and Zod for validation
- **State Management** - Simple and efficient state management with React hooks
- **API Integration** - Axios for API requests
- **Notifications** - React Toastify for user notifications

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Lint the codebase

## Getting Started

After creating your project with `npx create-kuma-project <projectName>`, you'll have this template structure ready to use.

1. Navigate to your project directory:

   ```bash
   cd <projectName>
   ```

2. Install dependencies for both backend and frontend:

   ```bash
   # In the project root
   npm install
   # Or if using workspaces
   npm install --workspaces
   ```

3. Start the development servers:

   ```bash
   # Start both frontend and backend
   npm run dev

   # Or start them separately
   npm run dev --workspace=frontend
   npm run dev --workspace=backend
   ```

4. Your application is now running:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:3001

## Customization

Feel free to modify the template to suit your needs. Here are some common customizations:

- Update the database configuration in the backend
- Customize the authentication flow for your application
- Add new components to the frontend
- Configure environment variables for different environments

## Need Help?

If you have any questions or need assistance, please open an issue on the [GitHub repository](https://github.com/sitagomes/create-kuma-app).

---

Created with ♥ by [Sita Gomes](https://www.github.com/sitagomes)
