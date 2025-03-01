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

## Example Usage

- You can do all the operations with swagger or postman

### Registering a User

`curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "password123"}'`

### Logging In

  `curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "password123"}'`

- This will return a JWT token like: {"access_token": "eyJhbGciOi..."}

### Get a DID (using the DID ID you received from registration)

  `curl -X GET http://localhost:3000/did/did:example:1234-5678-90`

### Issue a credential (using the JWT token and DIDs)

  `curl -X POST http://localhost:3000/did/credentials \
  -H "Authorization: Bearer eyJhbGciOi..." \
  -H "Content-Type: application/json" \
  -d '{"subjectDid": "did:example:subject-did-id", "claims": {"name": "John Doe", "email": "john@example.com"}}'`

### Verify a credential

  `curl -X GET http://localhost:3000/did/credentials/vc:credential-id/verify`

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
- Create docker compose file for the project