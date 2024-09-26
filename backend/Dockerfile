FROM python:3-alpine

WORKDIR /backend

COPY requirements.txt /backend/
COPY . /backend/

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000

CMD ["python", "app.py"]
