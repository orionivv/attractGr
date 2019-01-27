const Koa = require('koa');
const http = require('http');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');

const ProxyTestData = require('./routes/testData.js');

const app = new Koa();
const router = new Router();

app.proxy = true;
app.server = http.createServer(app.callback());

app.listen = (...args) => {
  app.server.listen.call(app.server, ...args);
  return app.server;
};
app.use(cors());
app.use(bodyParser());
app.use(router.routes());

app.use(ProxyTestData.routes());

app.listen(3000, () => {
  console.log(`Listening on: localhost:3000`);
});
