# MERN - Easy Boilerplate for Deployment to Heroku

This project is a simple full-stack boilerplate for easing up the deployment of a full-stack project to heroku.

It uses MERN stack:
- MongoDB
- Express
- React
- NodeJS


### Running in development environment:
 - ```
   npm install
   npm run client-install
   npm run dev
   ```
   
### Deploying into production environment(Heroku):
- Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line)
- ```heroku login```
- ```heroku create```
- ```heroku git:remote -a <HerokuProjectName>```(Replace \<HerokuProjectName> with your heroku project name)
- ```git push heroku master```
   

