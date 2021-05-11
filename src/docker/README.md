# docker

## CentOS7 へのインストール

### docker

https://docs.docker.com/engine/install/centos/  を参考に

Uninstall old versions 以前にインストールしていなければこれは必要なし。
SET UP THE REPOSITORY　そして INSTALL DOCKER ENGINE　と行う。

```
systemctl start docker
systemctl enable docker
```
usermod -aG docker (ユーザ名)　でそのユーザーがdockerを起動できる。

### docker-compose

https://docs.docker.com/compose/install/ を参照に次のコマンドで

```
curl -L "https://github.com/docker/compose/releases/download/1.29.1/docker-compose-$(uname -s)-(uname -m)" -o /usr/local/bin/docker-compose

chmod +x /usr/local/bin/docker-compose
```