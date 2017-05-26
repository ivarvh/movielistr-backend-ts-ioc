# MovieListr Backend with NodeJS

## Why 
This project was a test for me to see how far JS has come along to be actually used for a backend. A few years ago I also created a backend for a small application in NodeJS with regular old javascript (I did not have a lot of experience with javascript then), but I really hated it. Now with typescript, I wanted to give it another chance.

## Technologies used:

### For the application

* [Typescript](https://www.typescriptlang.org/)
* [typescript-ioc](https://www.npmjs.com/package/typescript-ioc)
* [typeorm](https://www.npmjs.com/package/typeorm)
* [docker](https://www.docker.com/)
* [koa](https://www.npmjs.com/package/koa)

### For testing

* [ts-mockito](https://www.npmjs.com/package/ts-mockito)
* [mocha](https://www.npmjs.com/package/mocha)
* [sinon](https://www.npmjs.com/package/sinon)

I also make a lot of use of the new async/await syntax.

## To get it up and running:

1. Run `yarn install`
2. Run `docker-compose up`, this will run the container for the mysql db.
3. Run `docker ps` to find the name of the docker container.
4. Run `docker exec -i -t <docker-container-name> /bin/bash` to open a bash in the container.
5. Run `mysql -u root -p` and fill in the password 'root'.
6. Run the sql scripts in the db-scripts folder to create the correct tables and fill them with dummy data.
7. Run `npm run build` to compile the typescript into the dist folder.
8. Run `node dist/index.js` to run the application.

You can now use postman to do requests to [http://localhost:3000](http://localhost:3000). For full URL's, check the classes in the src/routes folder.


