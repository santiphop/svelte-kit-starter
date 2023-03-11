start:
	docker compose up -d

stop:
	docker compose down

seed:
	npx prisma db seed

reset:
	npx prisma migrate reset --force

migrate:
	npx prisma migrate dev
