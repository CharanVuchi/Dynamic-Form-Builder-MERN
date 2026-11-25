# API Documentation

## Base URL

```text
http://127.0.0.1:3000/dynamic-form-builder/api/v1
```

The prefix is configured by `BASE_URL`. Replace the host/port for your environment.

## Authentication

Protected endpoints require a JWT:

```http
Authorization: Bearer <token>
Content-Type: application/json
```

Obtain the token from `POST /user/login` and use the `data.token` value. The admin middleware verifies the JWT and requires `role: "admin"`.

Public endpoints do not require a bearer token.

## Common response envelope

Most endpoints use the shared `apiResponse` helper:

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

This is a structural example; actual action/status/description depends on the endpoint. Pagination and supplementary stats are nested inside `meta`.

Common action codes from `server/shared/messages.js`:

| Action | HTTP code | Meaning |
|---:|---:|---|
| 1 | 404 | Not found |
| 2 | 422 | Validation error |
| 3 | 401 | Unauthorized / missing or unverified account |
| 4 | 403 | Forbidden |
| 5 | 500 | Internal server error |
| 7 | 409 | Duplicate record |
| 15 | 401 | Invalid or expired token |
| 16 | 429 | Rate limit exceeded |
| 26 | 422 | No changes to update |
| 27 | 400 | Login failed |
| 1000 | 200 | Success |
| 1001 | 201 | Created |
| 1003 | 200 | Updated |
| 1004 | 200 | Deleted |
| 1010 | 200 | Login success |

## Endpoint summary

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/health` | Public | Health check |
| POST | `/user/login` | Public | Login and receive JWT |
| POST | `/user/register` | Public in current code | Register user (see security note) |
| POST | `/forms` | Admin | Create a form |
| GET | `/forms` | Admin | List/search/filter forms |
| GET | `/forms/:id` | Admin | Read a form by Mongo `_id` or public `formId` |
| PUT | `/forms/:id` | Admin | Update a form |
| DELETE | `/forms/:id` | Admin | Soft-delete a form |
| GET | `/public/forms/:formId` | Public | Read a published form |
| POST | `/public/submissions/forms/:formId/submissions` | Public | Submit answers to a published form |
| POST | `/submissions` | Admin | Create a submission record directly |
| GET | `/submissions` | Admin | List/search/filter submissions |
| GET | `/submissions/:id` | Admin | Read by Mongo `_id` or `submissionId` |
| DELETE | `/submissions/:id` | Admin | Permanently delete a submission |
| GET | `/dashboard` | Admin | Dashboard statistics and recent records |

## 1. Health check

### `GET /health`

No authentication.

Example:

```bash
curl --request GET \
  --url 'http://127.0.0.1:3000/dynamic-form-builder/api/v1/health'
```

Current implementation returns a small health JSON object. Its `env` property is currently hard-coded to `LOCAL`.

## 2. User authentication

### `POST /user/login`

No authentication.

Request:

```json
{
  "userName": "admin",
  "password": "your-password"
}
```

Success response `data` includes:

```json
{
  "uid": "user-uuid",
  "userName": "admin",
  "fullName": "",
  "isVerified": true,
  "token": "<jwt>"
}
```

The JWT payload contains `uid`, `userName`, and `role`. Login rejects missing users, incorrect passwords, and users whose `isVerified` flag is false. The current login code does not check `isActive`.

### `POST /user/register`

No authentication in the current route configuration.

Request:

```json
{
  "userName": "admin",
  "password": "your-password"
}
```

The repository creates a User; schema defaults include `role: "admin"` and `isVerified: false`. The new account therefore cannot log in until verified. There is no verification endpoint in the supplied route tree.

**Security warning:** Do not expose this registration behavior as-is in production. Restrict registration/account provisioning and assign roles only through trusted server-side administration.

## 3. Admin form management

All `/forms` endpoints below require an admin JWT.

### `POST /forms` – create

Request:

```json
{
  "name": "Customer Registration",
  "description": "Register customer details",
  "showName": true,
  "showDescription": true,
  "status": "Draft",
  "fields": [
    {
      "id": "field-1",
      "type": "text",
      "label": "Full Name",
      "fieldKey": "fullName",
      "placeholder": "Enter your name",
      "defaultValue": "",
      "required": true,
      "validation": {}
    },
    {
      "id": "field-2",
      "type": "email",
      "label": "Email",
      "fieldKey": "email",
      "placeholder": "Enter email",
      "defaultValue": "",
      "required": true,
      "validation": {}
    },
    {
      "id": "field-3",
      "type": "select",
      "label": "Department",
      "fieldKey": "department",
      "required": true,
      "options": [
        { "label": "Engineering", "value": "engineering" },
        { "label": "Sales", "value": "sales" }
      ],
      "validation": {}
    }
  ]
}
```

Supported status values: `Draft`, `Published`.

Supported field types: `text`, `email`, `number`, `phone`, `textarea`, `date`, `select`, `radio`, `checkbox`.

Field key rules: starts with a letter; remaining characters may be letters, digits or underscores; keys must be unique within the form. The service normalizes `key` as an alias for `fieldKey`, and assigns `order` based on array position.

Choice fields require at least one option with non-empty unique values. Validation configuration may include `minLength`, `maxLength`, `min`, `max`, `minDate`, `maxDate`, and `pattern`, depending on field type.

### `GET /forms` – list

Query parameters:

| Parameter | Type | Default | Notes |
|---|---|---:|---|
| `page` | number | 1 | Minimum 1 |
| `limit` | number | 10 | Clamped to 1–100 |
| `search` | string | empty | Case-insensitive form name or `formId` search |
| `status` | string | — | `Draft` or `Published` |

Example:

```http
GET /forms?page=1&limit=10&search=customer&status=Published
```

The response `data` is an array containing `id`, `_id`, `formId`, `name`, `status`, field count, `submissions`, `createdAt`, and `updatedAt`. **Current code returns `submissions: 0` in this list response.** Pagination is available at `meta.pagination`.

### `GET /forms/:id` – read

`:id` can be the MongoDB document `_id` or the public `formId`. The result is restricted to the authenticated creator and non-deleted forms.

### `PUT /forms/:id` – update

Send only the properties to update. If `fields` is supplied, the complete field array is normalized and replaces the existing array.

Example:

```json
{
  "name": "Updated Customer Registration",
  "description": "Updated description",
  "fields": [
    {
      "id": "field-2",
      "type": "email",
      "label": "Email",
      "fieldKey": "email",
      "required": true
    },
    {
      "id": "field-1",
      "type": "text",
      "label": "Full Name",
      "fieldKey": "fullName",
      "required": true
    }
  ]
}
```

The array order becomes the stored `order` sequence.

### `DELETE /forms/:id` – soft delete

Marks `isDeleted: true`; it does not physically remove the Form document. The endpoint returns the form's internal ID and public `formId`.

### Publication behavior

There is a `publishForm_controller` and matching service/repository function in source code, but **no publish-specific route is registered** in `server/src/routes/form.js`. To publish through the currently mounted API, create or update a form with `"status": "Published"`. Only published, non-deleted forms are exposed by the public form endpoint.

## 4. Public form

### `GET /public/forms/:formId`

No authentication.

Example:

```http
GET /public/forms/FC-6FC65AD2
```

Returns the public form's `formId`, `name`, `description`, `showName`, `showDescription`, `fields`, and `status`, only when the form is `Published` and not soft-deleted.

The public identifier is the generated `FC-...` value, not the MongoDB `_id`.

## 5. Public submission

### `POST /public/submissions/forms/:formId/submissions`

No authentication.

The request body is the values object keyed by each field's `fieldKey`; do not wrap it in a `values` property.

Example:

```json
{
  "fullName": "Alex Johnson",
  "email": "alex@example.com",
  "department": "engineering"
}
```

The backend:
1. Finds a published, non-deleted form by `formId`.
2. Rejects unknown submitted field keys.
3. Validates required fields and configured type-specific rules.
4. Maps the field labels and submitted values into answer records.
5. Generates a `SUB-...` submission identifier and creates the submission.

The `submittedBy` summary is derived from `fullName`, `name`, or `attendeeName`, falling back to `Anonymous`. The email summary is read from `email`; mobile summary is read from `mobile` or `phone`.

## 6. Admin submission management

All `/submissions` endpoints require an admin JWT.

### `GET /submissions` – list

Query parameters:

| Parameter | Type | Notes |
|---|---|---|
| `page` | number | Defaults to 1 |
| `limit` | number | Defaults to 10; maximum 100 |
| `formId` | string | Filter by public form ID |
| `status` | string | `New` or `Reviewed` |
| `search` | string | Searches submission ID, form name, submitter, email and mobile |

Example:

```http
GET /submissions?page=1&limit=10&formId=FC-6FC65AD2&status=New&search=alex
```

Response `data` contains submission identifiers, form details, submitter summary, status, answers and creation time. `meta.pagination` contains `total`, `page`, `limit`, and `totalPages`. `meta.additional.stats` contains `totalCount`, `newCount`, and `formsWithRecords`.

### `POST /submissions` – direct/admin creation

This route exists in the current server. It directly creates a submission from the supplied record; it does not run the public form-definition validation flow.

Example:

```json
{
  "formId": "FC-6FC65AD2",
  "formName": "Customer Registration",
  "submittedBy": "Alex Johnson",
  "email": "alex@example.com",
  "mobile": "9876543210",
  "status": "New",
  "answers": [
    { "label": "Full Name", "value": "Alex Johnson" },
    { "label": "Email", "value": "alex@example.com" }
  ]
}
```

`submissionId` may be omitted; the repository generates one.

### `GET /submissions/:id` – read

`:id` may be the MongoDB `_id` or generated `submissionId`.

### `DELETE /submissions/:id` – delete

Physically deletes the matching Submission document.

## 7. Dashboard

### `GET /dashboard`

Admin JWT required.

Returns:
- `cards`: total forms, total submissions, active (published) forms, total users.
- `submissionAnalytics`: labels and values for the last seven days.
- `recentForms`: up to five recently updated forms, including per-form submission counts.
- `recentSubmissions`: up to five newest submissions.

Current dashboard queries are not scoped to the authenticated user's UID.

## 8. Validation behavior

The server validates the dynamic form definition and submission data independently of the client.

| Field type | Backend checks |
|---|---|
| `text`, `textarea` | String type; configured min/max length; optional regex |
| `email` | Email pattern; configured length; optional regex |
| `phone` | Phone character/length pattern; configured length; optional regex |
| `number` | Finite numeric value and configured min/max |
| `date` | `YYYY-MM-DD` date and configured min/max date |
| `select`, `radio` | Submitted value must match a configured option |
| `checkbox` | Value must be an array and every item must match a configured option |

All fields also honor `required`. Unknown keys are rejected. Empty optional fields are skipped.

## 9. Postman variables

The included collection defines:
- `baseUrl`: API base URL including `/dynamic-form-builder/api/v1`.
- `token`: JWT from the login response.
- `formId`: public `FC-...` identifier.
- `formMongoId`: MongoDB `_id` used for admin form endpoints.
- `submissionId`: MongoDB `_id` or generated `SUB-...` identifier.

The supplied Postman YAML export had an empty `baseUrl` and two public request URLs that did not match the mounted route paths. The JSON collection included with this documentation uses the paths defined in Express.
