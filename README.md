# WrightStream (Back-end)
Deployed version: http://wrightstream.com/
Back-end for https://github.com/wrightaim/wrightstream

### Installation
- Fork and clone
- `npm install`
- Add your own .env file with a `SECRET` environment variable

### Database Setup
- Make sure you have PostgreSQL
- Create a database on your local called `wrightstream_dev`
- `npm run knex migrate:latest`
- `npm run knex seed:run`

### Postman Documentation
Routes: https://documenter.getpostman.com/view/4516090/RW8FFmFf#7d87909f-4bf7-4710-a4d0-01c143a4194d
