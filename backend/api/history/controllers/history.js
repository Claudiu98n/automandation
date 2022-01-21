'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {

    async addToHistory(ctx) {
        let result = await strapi.services['history'].addToHistory(ctx);
        return result; 
    },

    async historyFilter(ctx) {
        let result = await strapi.services['history'].historyFilter(ctx);
        return result; 
    },

};