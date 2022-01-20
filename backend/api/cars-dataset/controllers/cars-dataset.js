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

};
