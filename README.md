Log your daily activity with React & Node  - MERN stack application example. Uses mongoDB (MongoLabs) with CRUD functionality. You can use this project and build on top of it. It also demonstrates token based auth with JWT.



Working example of this app can be seen here (heroku): https://daily-logger-react-node.herokuapp.com/
You can register and login, add logs and search archive by date.

App only serves as a POC example so it lacks UX components like feedback/validation. Will be added eventually.

Sample user username/password: 

username: user

password: password

To run bundled application (frontend/backend) type:

- npm run build

- npm run start


NPM script in package.json takes care that frontend files are copied to over to static folder which is served by Express. Check out package.josn scripts to run frontend/backend sepearately in dev mode (live reload).

Same app build with Angular / Spring Boot (java) backend here: https://github.com/kle-pra/daily-logger-spring-boot and Angular/Node here: https://github.com/kle-pra/daily-logger-node

