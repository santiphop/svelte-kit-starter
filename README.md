# SvelteKit Starter

(Almost) Everything you need to build a Svelte project.

## Starting a project

```bash
# start docker
make start

# run seed
make seed

# or drop all tables and run seed
make reset
```

## Developing

Once you've started docker and installed dependencies with `pnpm install`, start a development server:

```bash
# this will start local development server and prisma studio
pnpm dev
```

To visit local development server:
http://localhost:5143

To visit prisma studio server:
http://localhost:5555

If you want to edit database structure, edit `prisma/schema.prisma`, migrate new database:

```bash
make migrate # and name the migration file
```

Reload schema and generate ERD markdown,
output file path `prisma/ERD.md`:

```bash
make generate
```

Format your code config with prettier in `.prettierrc`, run formatter:

```bash
pnpm format
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

| Environment   | PORT |
| ------------- | ---- |
| local dev     | 5143 |
| local build   | 4143 |
| docker build  | 3000 |
| prisma studio | 5555 |
