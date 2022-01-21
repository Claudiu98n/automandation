'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {

    async insertPreference(ctx) {
        await strapi.services['user-preferences'].create({
            ...ctx.request.body,
            user: ctx.state.user.id
        });

        return true;
    }

};
