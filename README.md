## To get started for the first time

- DB may take a while to boot up. Restart the container
  `docker restart <APP_NAME>`

```
docker pull mkallies/nfl_rushings:v1 // May need to pull if your image is out of date
// Root directory
docker-compose up -d

// New terminal
cd front
npm install
npm run start
```

Go to http://localhost:8000
