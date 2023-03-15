# SvelteKit Starter

(Almost) Everything you need to build a Svelte project.

## Starting a project

Make sure you have your `.env` file setup.
```bash
# copy from the example environment file
cp .env.example .env
```

Run Database and Minio in docker environment
```bash
make start
```

## Developing

(Optional) Before start develop the app:
```bash
# create seed data
make seed

# or drop all tables and create seed data
make reset
```

Once you've started docker and installed dependencies with `pnpm install`, start a development server:
```bash
# this will start local development server and prisma studio
pnpm dev
```

To visit local development server:
http://localhost:5143

To visit prisma studio server:
http://localhost:5555

### Migration

If you want to edit database structure, edit `prisma/schema.prisma`,
generate migration file:
```bash
make g-migration # and name the migration file
```

Reload schema and generate ERD markdown into `prisma/ERD.md`:
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
http://localhost:4143

### Docker

To create a production version of your app in Docker environment:
```bash
make docker-app
```

## Ports
| Environment   | PORT |
| ------------- | ---- |
| docker build  | 3000 |
| local build   | 4143 |
| local dev     | 5143 |
| postgres      | 5432 |
| prisma studio | 5555 |
| minio console | 9001 |
