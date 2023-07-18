# Laundry-Cloud-Server

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `POST /googleLogin`
- `GET /stores`
- `GET /types`


Routes below need authentication:


- `POST /mystores`
- `GET /myheroes`
- `GET /productService/:idStore`
- `GET /transactions`
- `GET /stores/create`
- `POST /products/:idStore`
- `POST /transactions/:idProduct`
- `DELETE /delete/stores/:idStore`
- `PUT /stores/:idStore`
- `POST /generate-midtrans-token/:idProduct`


&nbsp;

## 1. POST /register

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string"
}
```



&nbsp;

## 2. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```



&nbsp;

## 3. GET /stores

Description:
- Get all Stores from Database

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "name": "String",
    "imageUrl": "String",
    "location": "String"
  },
  {
    "id"...
  },
  ...
]
```

&nbsp;

## 4. Get /mystores

Description:
- GET data my stores by id user

Request:

- headers:

```json
{
  "access_token": "string"
}
```


&nbsp;


# API Documentation