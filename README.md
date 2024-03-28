Teste Backend - Think

## Tecnologias Utilizadas

- [Docker](https://www.docker.com/)
- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)

## Se for executar com docker, instalar

- [Docker](https://www.docker.com/)

## Executando o projeto com docker

1. Clone o repositório:

```bash
git clone https://github.com/INTLSavio/iot-api.git && cd iot-api
```

2. Adicione o .env na raíz do projeto

```bash
DATABASE_HOST=
DATABASE_PORT=
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_NAME=

SECRET_AUTH=

PORT=
```

3. Buildar e executar os containeres

```bash
docker compose up -d --build
```

## Se for executar sem docker, instalar

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)

## Executando o projeto sem docker

1. Clone o repositório:

```bash
git clone https://github.com/INTLSavio/iot-api.git && cd iot-api
```

2. Instale todas as depencências

```bash
yarn
```

3. Adicione o .env na raíz do projeto

```bash
DATABASE_HOST=
DATABASE_PORT=
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_NAME=

SECRET_AUTH=

PORT=
```

4. Rode o projeto

```bash
yarn start:dev
```
