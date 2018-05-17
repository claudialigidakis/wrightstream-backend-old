# WrightStream (Back-end)
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
