# Dynamic Form Builder – MERN

A full-stack application for creating configurable forms, publishing them for public access, collecting responses, and managing submissions through an admin workspace.

**Repository:** https://github.com/CharanVuchi/Dynamic-Form-Builder-MERN

## Features

### Admin workspace
- Admin login using username/password and JWT bearer authentication.
- Dashboard cards, recent forms, recent submissions, and seven-day submission activity.
- Create, list, view, update, search, filter, and soft-delete forms.
- Configure form name, description, visibility flags, field labels, keys, placeholders, defaults, required state, validation rules, and options.
- Save forms as `Draft` or `Published`.
- View, search, filter, paginate, inspect, and delete submissions.

### Public form experience
- Retrieve a published form using its public `formId`.
- Render fields dynamically from the saved form definition.
- Submit answers without an admin bearer token.
- Validate submitted values on the backend against the published form definition.

### Supported field types
`text`, `email`, `number`, `phone`, `textarea`, `date`, `select`, `radio`, `checkbox`.

## Technology stack

| Layer | Technologies |
|---|---|
| Frontend | React, Vite, React Router, Redux Toolkit, React Redux |
| UI | Ant Design, Tailwind CSS, Sass, React Icons |
| HTTP | Axios |
| Charts / dates | Chart.js, react-chartjs-2, Day.js |
| Backend | Node.js (ES modules), Express |
| Database | MongoDB, Mongoose |
| Authentication | JSON Web Token, bcrypt |
| Middleware / security | Helmet, CORS, express-rate-limit, Morgan |
| API testing | Postman collection |

## Repository layout

```text
Dynamic-Form-Builder-MERN/
├── client/
│   ├── src/
│   │   ├── components/          # Reusable UI components and dynamic renderer
│   │   ├── hooks/               # Auth and toast hooks
│   │   ├── layouts/             # Public and protected layouts
│   │   ├── pages/               # Login, dashboard, form builder, submissions
│   │   ├── redux/
│   │   │   ├── actions/         # Async API thunks
│   │   │   ├── features/        # Redux slices
│   │   │   └── store.js
│   │   └── utils/               # Field configuration and date helpers
│   └── package.json
├── server/
│   ├── config/                  # MongoDB connection
│   ├── shared/                  # JWT, messages and response helpers
│   ├── src/
│   │   ├── controller/
│   │   ├── middleware/
│   │   ├── repository/
│   │   ├── routes/
│   │   ├── schema/
│   │   └── services/
│   ├── server.js
│   └── package.json
├── docs/
│   ├── ARCHITECTURE.md
│   ├── DATABASE_DESIGN.md
│   └── API_DOCUMENTATION.md
└── postman/
    └── Dynamic-Form-Builder.postman_collection.json
```

## Prerequisites

- Node.js compatible with the installed Vite version.
- npm.
- MongoDB running locally or a reachable MongoDB deployment.
- Postman (optional, for API testing).

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/CharanVuchi/Dynamic-Form-Builder-MERN.git
cd Dynamic-Form-Builder-MERN
```

### 2. Configure the backend

Create `server/.env` locally. Do not commit this file.

```env
PROJECT_NAME=DynamicFormBuilder
NODE_ENV=development

HOST=127.0.0.1
PORT=3000
ORIGIN=http://localhost:5173
METHODS=GET,POST,PUT,DELETE,PATCH,OPTIONS
ALLOWED_HEADERS=Content-Type,Authorization,Cache-Control,Accept,X-Requested-With
BASE_URL=/dynamic-form-builder/api/v1

RATE_LIMIT_MAX_REQUESTS=100
RATE_LIMIT_WINDOW_MS=900000

MONGO_TIMEOUT=5000
MONGO_URI=mongodb://localhost:27017/
MONGO_DB_NAME=DynamicFormBuilder

JWT_SECRET=replace_with_a_long_random_secret
JWT_TOKEN_EXPIRY=30d
```

Use a unique, high-entropy `JWT_SECRET` in every environment. The values above are local-development examples, not production secrets. `ORIGIN` is parsed as a comma-separated list by the server.

### 3. Configure the frontend

Create `client/.env`:

```env
VITE_API_URI=http://127.0.0.1:3000/dynamic-form-builder/api/v1
```

The frontend reads this value in its Axios async thunks.

### 4. Install dependencies

In one terminal:

```bash
cd server
npm install
npm run dev
```

In another terminal:

```bash
cd client
npm install
npm run dev
```

The frontend Vite development server normally runs at `http://localhost:5173`. The backend uses the configured `HOST`, `PORT`, and `BASE_URL`.

### 5. Verify the backend

```http
GET http://127.0.0.1:3000/dynamic-form-builder/api/v1/health
```

A successful health response confirms the Express application is responding. MongoDB connection status is logged by the server at startup.

## Authentication and first admin

Admin endpoints require:

```http
Authorization: Bearer <JWT_TOKEN>
```

The login endpoint is `POST /user/login`. The current user schema has an `admin` role by default and new registrations default to `isVerified: false`. The login repository rejects users who are not verified.

**Important deployment note:** The current code exposes `POST /user/register` publicly, assigns the schema's default `admin` role, and does not provide a verification workflow in the inspected routes. Before deploying, restrict account provisioning to a trusted administrator/seed process, remove or protect public registration, and ensure role assignment cannot be controlled by an untrusted caller. Also ensure login checks `isActive` if inactive accounts must be blocked.

## API reference

The complete route and payload reference is in [docs/API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md).

Base URL:

```text
http://127.0.0.1:3000/dynamic-form-builder/api/v1
```

Main route groups:

| Group | Purpose | Authentication |
|---|---|---|
| `/health` | Health check | No |
| `/user` | Login and registration | No |
| `/forms` | Admin form management | Admin JWT |
| `/public/forms` | Read a published form | No |
| `/submissions` | Admin submission management | Admin JWT |
| `/public/submissions` | Public form submission | No |
| `/dashboard` | Dashboard metrics | Admin JWT |

## Form field definition

The backend normalizes incoming `key` or `fieldKey` into `fieldKey`. The stored field object includes:

```json
{
  "id": "field-1",
  "type": "text",
  "label": "Full Name",
  "fieldKey": "fullName",
  "placeholder": "Enter your name",
  "defaultValue": "",
  "required": true,
  "order": 0,
  "validation": {}
}
```

Choice fields (`select`, `radio`, `checkbox`) use an `options` array:

```json
"options": [
  { "label": "Option A", "value": "option_a" },
  { "label": "Option B", "value": "option_b" }
]
```

The form's `fields` array is normalized in its submitted order; each field receives its sequential `order` index.

## Response format

Most API endpoints use the shared response helper. The response envelope includes `action`, `code`, `data`, `error`, `meta`, `status`, and `success`.

A successful response is shaped like:

```json
{
  "action": 1000,
  "code": 200,
  "data": {},
  "error": null,
  "meta": {
    "additional": null,
    "environment": "development",
    "pagination": null,
    "timestamp": "2026-01-01T00:00:00.000Z"
  },
  "status": "PASSED",
  "success": {
    "code": 200,
    "status": "SUCCESS",
    "desc": "Your request was completed successfully!"
  }
}
```

The timestamp and example values above are illustrative. For list endpoints, pagination and additional statistics are placed under `meta`.

## Validation

The backend validates form definitions and public submission values. It checks:
- Supported field types, labels, valid unique field keys.
- Choice field options and duplicate option values.
- Minimum/maximum configuration consistency.
- Required fields and unexpected submission keys.
- Email and phone formats, numeric bounds, string length, regex patterns, date bounds, and allowed choice values.

Frontend validation improves usability, but the backend is the authoritative validation layer.

## Scalability and security notes

Implemented:
- Pagination for form and submission lists, with a maximum page size of 100.
- MongoDB indexes for common form and submission lookup patterns.
- Parallel dashboard count/read operations and aggregation for submission analytics.
- JWT authentication and admin-role middleware for admin route groups.
- Password hashing with bcrypt (12 salt rounds).
- Helmet, CORS configuration, request rate limiting, and server-side validation.

Not implemented in the inspected source:
- A background job/queue for email or heavy processing.
- A distributed cache.
- A separate analytics store or load-test proof for 50k+ forms / 10m+ submissions.
- Automated test coverage (the server `test` script is currently a placeholder).

These are potential next steps, not claims of current production capacity. See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for current limitations and [docs/DATABASE_DESIGN.md](docs/DATABASE_DESIGN.md) for indexes.

## Postman

Import `postman/Dynamic-Form-Builder.postman_collection.json` into Postman.

Set the collection variables:
- `baseUrl`: `http://127.0.0.1:3000/dynamic-form-builder/api/v1`
- `token`: JWT returned by login.
- `formId`: public form identifier such as `FC-XXXXXXXX`.
- `formMongoId`: MongoDB `_id` for admin form read/update/delete.
- `submissionId`: submission identifier or MongoDB `_id`.

Run **Login** first, then copy the returned `data.token` into the `token` variable. The collection uses the exact public route prefixes mounted by the backend.

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Database design](docs/DATABASE_DESIGN.md)
- [API documentation](docs/API_DOCUMENTATION.md)

## Known implementation notes

These points are documented from the inspected source and should be considered before production use:

1. `publishForm_controller` and its service/repository implementation exist, but no publish-specific route is mounted. A form can currently be created or updated with `status: "Published"` using the regular form endpoints.
2. The Postman YAML export supplied with the project had several incomplete or mismatched URLs and an empty `baseUrl` environment value. The included JSON collection corrects the paths to match the Express routes.
3. Form list/get/update/delete operations scope records to the authenticated user's `createdBy` UID. Submission list/read/delete and dashboard aggregate queries are not scoped by owner in the current repository implementation.
4. The form list response currently sets each form's `submissions` count to `0`; the dashboard computes actual counts separately.
5. Public registration is enabled, the schema defaults the role to `admin`, and verification is required for login. Account provisioning should be hardened before deployment.
6. `isActive` exists in the user schema, but the current login query does not reject inactive users.
7. Submission `answers.value` is declared as a string in the Mongoose schema, while checkbox values are arrays at validation time. Confirm/adjust this representation if multi-select checkbox answers must be preserved reliably.
8. The health endpoint currently returns the literal environment label `LOCAL`; it does not derive that field from `NODE_ENV`.

## License

No project license was present in the supplied repository snapshot. Add a license file if you intend to distribute the project under a specific license.
