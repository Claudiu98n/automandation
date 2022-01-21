'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {

    async insertPreference(ctx) {
        const result = await strapi.services['user-preferences'].insertPreference(ctx);
        return result;
    },

};
