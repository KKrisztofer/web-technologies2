# Web technológiák 2 beadandó

**Kerekes Krisztofer**  
**TRNA8A**

**Használt technológiák:**
- Node.js
- MySQL (wampserver)
- TypeORM
- Angular
- Bootstrap

**Adatbázis létrehozása:**
```sql
CREATE DATABASE webshop CHARACTER SET utf8 COLLATE utf8_hungarian_ci;
```

**Felhasználó hozzáadása:**
```sql
INSERT INTO user(`id`, `username`, `password`) VALUES ('1','username','password');
```

**Indítás:**
- Backend: `npm run start:server`
- Frontend: `npm run start:client`