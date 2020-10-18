# bike-api
### Simple api for test task
##### Route /bikes GET, POST
##### Route /bikes/:id GET, DELETE, PATCH

### How to use it as application
* You shold have node.js v10.0.0+/npm 5.8.0+ on your PC
* Install node_modules "npm i"
* Start production "npm start", developer edition "npm dev"

### How to use it as docker container

* You should add container rolaxxx3/bike-api:tagname to your docker-compose file

#### Avaible environment

* NODE_ENV
* PORT
* MONGODB_URI

#### Requirements

* [Docker 17.06.0+](https://www.docker.com/get-started)
* [Compose 3.0+](https://docs.docker.com/compose/install/)