'use strict';

/**
 * test router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;
const defaultRouter = createCoreRouter('api::test.test');

const customRouter = (innerRouter, extraRoutes = []) => {
  let routes;
  return {
    get prefix() {
      return innerRouter.prefix;
    },
    get routes() {
      if (!routes) routes = innerRouter.routes.concat(extraRoutes);
      return routes;
    },
  };
};

const myExtraRoutes = [  
  {
    method: 'GET',
    path: '/test/:slug',
    handler: 'api::test.test.page',
    config: {
      auth: false,
    },
  }
];


module.exports = customRouter(defaultRouter, myExtraRoutes);

// module.exports = createCoreRouter('api::test.test');
