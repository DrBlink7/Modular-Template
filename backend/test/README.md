# pytest
Run your containers
```bash
docker compose up --build
```
and then launch
```bash
docker compose exec backend /bin/sh -c "PYTHONPATH=/backend pytest -v"
```
if you want to check coverage
```bash
docker compose exec backend /bin/sh -c "PYTHONPATH=/backend pytest --cov=./ --cov-report=term-missing"
```