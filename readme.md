# JSON-SERVER With Authorization JWT

## Run dev

```
npm run dev
```

## Start server


```
npm run server
```

## Insomnia
Para testar vc pode carregar o ambiente da pasta `./insomnia/` em aplicativo Insomnia.


## Rotas

### Login
POST http://localhost:3001/login
body: 
```json
{
  "email": "admin@admin.com",
  "password": "admin"
}
``` 

## Resource USER (CRUD)
> use authorization bearer  

GET http://localhost:3001/users?q=  
GET http://localhost:3001/users/{id}  
POST http://localhost:3001/users   
PUT http://localhost:3001/users/{id}    
DELETE http://localhost:3001/users/{id}    


