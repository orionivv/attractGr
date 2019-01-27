const Router = require('koa-router');

const categoryMock = require('../mocks/category');
const cityMock = require('../mocks/city');
const dataMock = require('../mocks/data');

const router = new Router({
  prefix: '/testData'
});

router.get('/category', async ctx => {
  ctx.body = {
    category: categoryMock
  };
});

router.get('/city', async ctx => {
  ctx.body = {
    city: cityMock
  };
});

router.get('/data', async ctx => {
  ctx.body = {
    data: dataMock
  };
});

module.exports = router;
