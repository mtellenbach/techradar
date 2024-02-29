# Technology-Radar
## Prerequisites
- node and npm installed on your computer
- Create and login to a MongoDB-Instance (e.g. at https://cloud.mongodb.com/)
- Manually create the collections `organisations` and `users`
- Manually create your first organisation and it's sysadmin inside the collection

You can use the following Documents:
```Organisation
{"_id":{"$oid":"65df63cd1354f2b4c480d4ec"},"organisation_id":"9d9340cb-2279-42b8-8993-85e0465bf14e","name":"SysAdmin","__v":{"$numberInt":"0"}}
```

User: admin; 
Password: admin
```sysadmin
{"_id":{"$oid":"65db3b733effdf9bff597a43"},"user_id":"720390fa-435e-447a-8acd-416488e45f52","username":"admin","password":"$2b$10$jD3yaVthIdghIRtDpesrceERL7pSuYlKvgtaMrj1U6SRetVlwIjYy","email":"admin@admin.com","role":"sysadmin","created_at":{"$date":{"$numberLong":"1708866403800"}},"__v":{"$numberInt":"0"},"organisation_id":{"$oid":"65db3ec3dc0b895efad0b940"}}
```


### .env
1. Go to `/backend`
2. Copy the `.env.example`-File and save it as `.env`
3. Change the values inside the freshly created `.env`-File

```
SECRET_KEY=<secret_key>

SALT_ROUNDS=<number_of_salt_rounds>

MONGODB_URI=mongodb://<your_mongo_db_uri>
```

## Start up
### Backend
1. Open the terminal and change the directory to `backend`
2. Run `npm i` to install all required Node.js-Packages
3. Run `nodemon start` to start the application at http://localhost:3000

If you wish to test the API-calls, you can import the file `Insomnia.json` (for Insomnia: https://insomnia.rest/) or follow this instruction to import the json to Postman: https://learning.postman.com/docs/getting-started/importing-and-exporting/importing-from-insomnia/.

### Frontend
1. Open the terminal and change the directory to `frontend`
2. Run `npm i` to install all required Node.js-Packages
3. Create `environment.ts` inside `frontend/src/environments/` with following contents:
```
export const environment = {
    // Store backend URL here like this:
    apiUrl: 'http://localhost:3000'
};
```
3. Run `ng serve` to start the application at http://localhost:4200
4. Open http://localhost:4200 inside your browser

If the prerequisites are all set up like mentioned above, 
you can now login with your freshly created user.