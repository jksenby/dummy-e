# VmKkr

To start a local server on port 4200, use the command:
```
npm start
```

To run in a docker container, use the following commands one at a time
```
docker build -t angular-app .
docker run -p 3000:4200 angular-app
```
The project will open at `localhost:3000`
