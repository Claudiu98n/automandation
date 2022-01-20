'use strict';

module.exports = {

    async getCars(ctx) {
        const addedCar = await strapi.services['cars-dataset'].find({_limit: -1, _sort: 'created_at:DESC'});

        return addedCar;
    },

    async createCar(ctx) {
        const carsDataset = await strapi.services['cars-dataset'].create(ctx.request.body);

        return carsDataset;
    },

};
