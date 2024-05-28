# Node REST Server

## Overview

This project is structured to support a TypeScript-based application with a clear separation of concerns. It includes controllers, data transfer objects (DTOs), exception handling, interfaces, middleware, models, scripts, services, and utilities.

## Project Structure
```
src
├── controllers
│ ├── api-v1.controller.ts
│ ├── authentication.controller.ts
│ └── users.controller.ts
├── DTO
│ ├── login.dto.ts
│ └── user.dto.ts
├── exeptions
│ ├── generic.exeption.ts
│ └── http.exeption.ts
├── interfaces
│ ├── company.interface.ts
│ ├── controller.interface.ts
│ ├── datum.ts
│ └── user.interace.ts
├── middleware
│ ├── authentication.middleware.ts
│ ├── error.middleware.ts
│ └── validation.middleware.ts
├── models
│ ├── company.model.ts
│ └── user.model.ts
├── scripts
├── services
│ └── store.service.ts
└── utils
└── log-request-details.ts
```

### Controllers

Controllers handle the incoming HTTP requests and return the responses to the client. They often interact with services to perform business logic.

- `api-v1.controller.ts`: Handles API version 1 endpoints.
- `authentication.controller.ts`: Manages user authentication.
- `users.controller.ts`: Manages user-related endpoints.

### DTO (Data Transfer Objects)

DTOs are used to define the shape of data being sent over the network.

- `login.dto.ts`: Defines the structure of the login data.
- `user.dto.ts`: Defines the structure of user data.

### Exceptions

Custom exception handling for the application.

- `generic.exeption.ts`: Generic exceptions.
- `http.exeption.ts`: HTTP-specific exceptions.

### Interfaces

Defines the TypeScript interfaces for various entities and layers of the application.

- `company.interface.ts`: Interface for the company entity.
- `controller.interface.ts`: Interface for controllers.
- `datum.ts`: General data interface.
- `user.interace.ts`: Interface for the user entity.

### Middleware

Middleware functions that process requests before they reach the controllers.

- `authentication.middleware.ts`: Handles authentication.
- `error.middleware.ts`: Manages error handling.
- `validation.middleware.ts`: Validates incoming requests.

### Models

Defines the data models for the application.

- `company.model.ts`: Data model for the company.
- `user.model.ts`: Data model for the user.

### Scripts

Contains various scripts used in the project.

### Services

Business logic and services that interact with the data layer.

- `store.service.ts`: Service for handling store operations.

### Utils

Utility functions used throughout the application.

- `log-request-details.ts`: Utility to log request details.

## Getting Started

### Prerequisites

- Node.js (version 20.X)
- TypeScript

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/projectname.git
   cd node-rest-server
   npm install
   npm run build
   npm run dev
   ```


### License

Distributed under the MIT License. See `LICENSE` for more information.