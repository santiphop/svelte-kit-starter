start:
	docker compose up -d

stop:
	docker compose down

restart:
	make stop
	make start

seed:
	npx prisma db seed

reset:
	npx prisma migrate reset --force

migrate:
	npx prisma migrate dev

generate:
	npx prisma generate
