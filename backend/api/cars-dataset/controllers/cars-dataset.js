'use strict';

module.exports = {

    async getCars(ctx) {
        let result = await strapi.services['cars-dataset'].getCars(ctx);
        return result; 
    },

    async createCar(ctx) {
        let result = await strapi.services['cars-dataset'].createCar(ctx);
        return result; 
    },

    async coldStartFilter(ctx) {
        const result = await strapi.services['cars-dataset'].coldStartFilter(ctx);
        return result;
    },

};
