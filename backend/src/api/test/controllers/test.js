'use strict';

/**
 * test controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::test.test', ({strapi}) => ({    
    page: async (ctx) => {
      const slug = ctx.params['slug'];
      const entry = await strapi.db.query('api::test.test').findOne({ // uid syntax: 'api::api-name.content-type-name'
        where: { slug },
        populate: {
          seo: true,
        },
      });
      console.log(entry);
      return entry
    }
}));