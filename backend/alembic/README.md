# alembic
Generic single-database configuration.

## migration
Run your containers
```bash
docker compose up --build
```
and then create and launch the migrations
```bash
docker compose exec backend alembic revision --autogenerate -m "nome migration"
docker compose exec backend alembic upgrade head
```
to revert/downgrade
```bash
docker compose exec backend alembic downgrade <revision_id>
docker compose exec backend alembic downgrade -1
```