## Backend

Python backend, copy .env.example vars in .env file and fill its vars.
It will run (by default) on 8000 port.

You can use alembic and launch migrations or uncomment this line
```py
 user_models.Base.metadata.create_all(bind=engine) enable this if you don't want to use migrations
```
in main and use create_all instead if in dev environment.

Swagger can be found on [here](http://localhost:8000/docs#)

Alembic docs can be found on [here](/backend/alembic/README.md)

Test docs can be found on [here](/backend/test/README.md)