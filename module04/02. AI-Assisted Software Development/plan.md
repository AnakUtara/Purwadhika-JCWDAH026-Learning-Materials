# Product Management Dashboard - Implementation Plan

## Goal

Build a full-stack Product Management Dashboard using a TypeScript monorepo with:

- Express API server
- Prisma ORM with Neon Postgres
- Vite + React + TypeScript client
- Tailwind CSS + shadcn/ui components
- React Router + Axios

## Monorepo Structure

- root: workspace scripts and shared docs
- server: REST API + Prisma schema + layered architecture
- client: dashboard UI and CRUD flows

## Environment Keys

Server `.env` must include:

- `DATABASE_URL`
- `DIRECT_URL`

Connection strings will be injected manually.

## Product Model

Fields:

- `id`
- `name`
- `sku`
- `category`
- `price`
- `stock`
- `status`

## Backend Architecture

Use layered architecture:

- routes
- controllers
- services
- repositories

CRUD endpoints:

- `GET /api/v1/products`
- `GET /api/v1/products/:id`
- `POST /api/v1/products`
- `PATCH /api/v1/products/:id`
- `DELETE /api/v1/products/:id`

## Frontend Scope

- Dashboard page
- Products table
- Add Product modal
- Edit Product modal
- Delete action with confirmation
- Client form handling with Formik and Yup validation
- Separate client validation layer for product forms

## Implementation Sequence

1. Scaffold root workspaces and scripts.
2. Configure server TypeScript + Express app and middleware.
3. Configure Prisma schema, migration flow, and env wiring.
4. Implement layered Product CRUD backend.
5. Scaffold client routing, Axios service layer, and UI shell.
6. Build table and add/edit/delete flows with Formik + Yup form handling and a separate validation layer.
7. Wire frontend to backend and verify end-to-end behavior.
