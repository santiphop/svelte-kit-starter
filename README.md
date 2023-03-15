# SvelteKit Starter

(Almost) Everything you need to build a Svelte project.

## Starting a project

Make sure you have your `.env` file setup.
```bash
# copy from the example environment file
cp .env.example .env
```

Run Database and MinIO in **Docker** environment,
then apply migrations to sync Database with your *schema*
```bash
make start

make migrate
```

## Developing

(Optional) Before start develop the app:
```bash
# create seed data
make seed

# or drop all tables and create seed data
make reset
```

Once you've started docker and installed dependencies with [pnpm](https://pnpm.io/installation).
Run command `pnpm install`, then start a development server:
```bash
# this will start local development server and prisma studio
pnpm dev
```

To visit local development server:
<http://localhost:5143>

To visit prisma studio server:
<http://localhost:5555>

### Migration

If you want to edit database structure, edit `prisma/schema.prisma`,
generate new migration file:
```bash
make migrate
# Enter a name for the new migration: <migration_name>
```

Generate *Prisma Client* and generate *ER Diagram* into `prisma/ERD.md`:
```bash
make generate
```

### Formatter & Linter
Format your code config with prettier in `.prettierrc`, run formatter:
```bash
pnpm format
```

Lint your code config with eslint in `.eslintrc.cjs`, run linter:
```bash
pnpm lint
```

## Building

To create a production version of your app:
```bash
pnpm build

# preview the production build
pnpm preview
```

To visit local built server:
<http://localhost:4143>

### Docker

To create a production version of your app in **Docker** environment:
```bash
make docker-app
```

## Ports
| Environment   | Port |
| ------------- | ---- |
| docker build  | 3000 |
| local build   | 4143 |
| local dev     | 5143 |
| postgres      | 5432 |
| prisma studio | 5555 |
| minio console | 9001 |
