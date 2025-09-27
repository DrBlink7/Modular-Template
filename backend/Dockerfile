FROM python:3.11-slim

WORKDIR /backend

ENV PYTHONPATH=/backend
ENV PYTHONUNBUFFERED=1

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    postgresql-client \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install uv
RUN pip install uv

# Copy requirements.txt first for better caching
COPY requirements.txt ./

# Install dependencies with uv
RUN uv pip install --system --no-cache -r requirements.txt

# Copy the rest of the application
COPY . .

# Create entrypoint script
RUN echo '#!/bin/sh\nset -e\n\necho "Running database migrations..."\nalembic upgrade head\n\necho "Starting application..."\nexec uvicorn main:app \\\n  --host 0.0.0.0 \\\n  --port 8000 \\\n  --reload \\\n  --reload-dir /backend \\\n  --reload-exclude "*.pyc" \\\n  --reload-exclude "__pycache__" \\\n  --reload-exclude "*.log" \\\n  --reload-exclude "alembic/versions/*.py" \\\n  --timeout-keep-alive 30 \\\n  --timeout-graceful-shutdown 5 \\\n  --limit-concurrency 1000 \\\n  --limit-max-requests 1000' > /entrypoint.sh

RUN chmod +x /entrypoint.sh

# Create app user
RUN useradd -m -s /bin/bash app && chown -R app:app /backend
USER app

EXPOSE 8000

ENTRYPOINT ["/entrypoint.sh"]
