FROM python:3.12

WORKDIR /backend

COPY ./requirements.txt /backend/requirements.txt

# --no-cache-dir: キャッシュを利用しない
# --upgrade: pipのアップグレード
RUN pip install --no-cache-dir --upgrade -r /backend/requirements.txt

COPY ./ /backend

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]