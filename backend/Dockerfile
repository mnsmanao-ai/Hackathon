FROM python:3.12-slim

WORKDIR /app

COPY test_mysql.py /app/

RUN pip install --no-cache-dir pymysql cryptography

CMD ["python", "test_mysql.py"]
