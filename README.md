# Decentralized Identity (DID) Demo with NestJS

This project demonstrates a simplified implementation of Decentralized Identity (DID) concepts using NestJS. It allows users to create digital identities, issue verifiable credentials, and verify those credentials.

## What is Decentralized Identity?

Decentralized Identity (DID) is an approach to identity management that gives individuals control over their digital identities without relying on a central authority. Key components include:

- **DIDs (Decentralized Identifiers)**: Unique identifiers controlled by the identity owner
- **Verifiable Credentials**: Digital certificates or claims about a person that can be cryptographically verified
- **Self-Sovereign Identity**: The principle that users should own and control their identity data

## Features

- User registration and authentication
- DID creation and management
- Issuance of verifiable credentials
- Verification of credentials using cryptographic signatures

## API Endpoints

### Authentication

- `POST /auth/register` - Register a new user and create their DID
- `POST /auth/login` - Authenticate a user and receive a JWT token

### DID Operations

- `GET /did/:didId` - Get a DID document
- `POST /did/credentials` - Issue a verifiable credential (requires authentication)
- `GET /did/credentials/:credentialId/verify` - Verify a credential

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm

### Installation

1. Clone the repository
2. Run `npm install`
3. Start the server with `npm run start:dev`
4. Access the Swagger documentation at http://localhost:3000/api

## Security Considerations

This is a simplified demo and has several limitations:

- Credentials are stored in-memory and not persisted
- Password storage is not secure (no hashing)
- JWT secret is hardcoded
- No revocation mechanism for credentials

In a production environment, these issues would need to be addressed.

## Future Enhancements

- Integration with blockchain for DID registration
- Support for different credential types
- Selective disclosure of claims
- Credential revocation mechanisms
- Dockerizing the whole project
