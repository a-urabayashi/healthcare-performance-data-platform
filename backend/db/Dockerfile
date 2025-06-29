FROM postgres:13-bullseye

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    ca-certificates git make gcc build-essential postgresql-server-dev-13 && \
    rm -rf /var/lib/apt/lists/*

RUN cd /tmp && \
    git clone --branch v0.5.1 https://github.com/pgvector/pgvector.git && \
    cd pgvector && \
    make && \
    make install && \
    cd / && rm -rf /tmp/pgvector