FROM python:3-alpine

WORKDIR /numpy

COPY requirements.txt /numpy/
COPY . /numpy/

RUN pip install --no-cache-dir -r requirements.txt

CMD ["python", "script.py"]
