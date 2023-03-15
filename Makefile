start:
	docker compose up -d svelte-kit-db svelte-kit-minio createbuckets

stop:
	docker compose down

restart:
	make stop
	make start

docker-app:
	docker compose up -d --build svelte-kit-app

seed:
	npx prisma db seed

reset:
	npx prisma migrate reset --force

g-migration:
	npx prisma migrate dev

generate:
	npx prisma generate
