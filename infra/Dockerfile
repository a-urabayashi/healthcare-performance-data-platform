# 基本イメージとしてAlpine Linuxを使用
FROM alpine:latest

# Terraformのバージョンを指定
ARG TERRAFORM_VERSION="1.12.0"

# 必要なパッケージのインストールとTerraformのダウンロード・インストール
RUN apk add --update curl && \
    curl -O https://releases.hashicorp.com/terraform/${TERRAFORM_VERSION}/terraform_${TERRAFORM_VERSION}_linux_arm64.zip && \
    unzip terraform_${TERRAFORM_VERSION}_linux_arm64.zip -d /usr/local/bin && \
    rm terraform_${TERRAFORM_VERSION}_linux_arm64.zip

# コンテナ起動時にTerraformを実行
ENTRYPOINT ["terraform"]