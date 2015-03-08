![logo](https://camo.githubusercontent.com/db4a0850e7aa9d14cbc5692c0f7646ad0defed83/687474703a2f2f6e706265652e6d652f6173736574732f696d616765732f6c6f676f2e737667)

# NPB
Blog, portfolio, & ramblings.

## The Stack

### Backend
- iojs 1.1.0
- postgres 9.3.5
- knex for database interactions
- koa
- passport

### Frontend
- React
- Flux
- Superagent




Start postgres database:
pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start

Create user:
createuser username

create db:
createdb -Ousername -Eutf8 database_name

USER:
nick

Reseed:
psql -U nick -d npb.com_dev -f /Users/npb/Dropbox/npb.prod.dump.sql

Initialize test DB
====
psql -U nick -d npb.com_test -f /Users/npb/Dropbox/npb.test.sql

### Dev Database
npb.com_dev

### Create a user
node --harmony ./lib/create_user {password}

Connect on the command line:
psql -U username database_name

## VPS Dependencies

[PM2](https://github.com/Unitech/pm2) for process management:  

`$ npm install pm2 -g`

Then start the server:

`$ pm2 start start.js`



### Tests
We're using generators here, so tests are using gulp-mocha-co and the gulp 
commands must be run with the harmony flag.  So to run the tests, just run 
the following command: 

`npm test`

This will set the node env to "testing," set the `--harmony` flag, start the 
server, and run the "test" gulp task.
