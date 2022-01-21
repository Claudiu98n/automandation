'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {

    async addToHistory(ctx) {
        const history = await strapi.services['history'].find({_limit: -1});

        let usersHistory = [];

        if (history.length > 0) {
            usersHistory = history.filter(el => el.users_permissions_user.id === ctx.state.user.id);
        }

        if (usersHistory.length > 0) {
            let carsIds = usersHistory[0].cars_datasets.map(car => car.id);

            await strapi.services['history'].update(
                { users_permissions_user: ctx.state.user.id }, 
                { cars_datasets: [...carsIds, ctx.request.body.carId] }
            );
        } else {
            await strapi.services['history'].create({
                users_permissions_user: ctx.state.user.id,
                cars_datasets: ctx.request.body.carId
            })
        }

        return true;
    }

};
