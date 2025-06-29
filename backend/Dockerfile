FROM python:3.11.13-slim-bullseye

ENV PYTHONUNBUFFERED 1

COPY ./requirements.txt /tmp/requirements.txt
COPY ./requirements.dev.txt /tmp/requirements.dev.txt
COPY ./scripts /scripts
COPY ./app /app
WORKDIR /app
ARG DEV

RUN python -m venv /py && \
    /py/bin/pip install --upgrade pip && \
    apt-get update &&\
    apt-get install -y libpq-dev gcc redis curl gnupg wget &&\
    wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add - &&\
    touch /etc/apt/sources.list.d/pgdg.list &&\
    sh -c 'echo "deb https://apt.postgresql.org/pub/repos/apt bullseye-pgdg main" >> /etc/apt/sources.list.d/pgdg.list' &&\
    apt-get update && \
    # apt-get install -y postgresql-client-13 && \
    /py/bin/pip install -r /tmp/requirements.txt && \
    if [ $DEV = "true" ]; \
    then /py/bin/pip install -r /tmp/requirements.dev.txt && \
    apt-get install -y vim ; \
    fi && \
    rm -rf /tmp && \
    adduser \
        --disabled-password \
        --gecos '' \
        django-user && \
    chown -R django-user:django-user /app /py /home/django-user &&\
    if [ $DEV = "true" ]; \
    then mkdir /tmp && chown -R django-user:django-user /tmp; \
    mkdir -p /home/django-user/.vscode-server/bin ; \
    chown -R django-user:django-user /home/django-user/ ; \
    fi && \
    # メディアファイルの保存場所を作成
    mkdir -p /vol/web/media && \
    mkdir -p /vol/web/static && \

    # 実行ユーザーを作成する
    chown -R django-user:django-user /vol/ && \
    chown -R django-user:django-user /scripts/ && \
    chmod -R 755 /vol && \
    chmod -R 755 /scripts
    # rm -rf /app/notebooks/*

ENV PATH="/scripts:/py/bin:$PATH"

USER django-user

VOLUME /vol/web

CMD ["/scripts/run.sh"]
