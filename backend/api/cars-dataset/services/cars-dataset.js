'use strict';

module.exports = {

    async getCars(ctx) {
        const addedCar = await strapi.services['cars-dataset'].find({_limit: -1, _sort: 'created_at:ASC'});

        return addedCar;
    },

    async createCar(ctx) {
        const carsDataset = await strapi.services['cars-dataset'].create(ctx.request.body);

        return carsDataset;
    },

    async coldStartFilter(ctx) {
        const userPreference = await strapi.services['user-preferences'].find({
            user: ctx.state.user.id
        });

        const { startYear, fuelType, startPrice, endPrice, startMileage, endMileage } = userPreference[0];

        let carsDataset = await strapi.services['cars-dataset'].find({_limit: -1});

        carsDataset = carsDataset.filter(car => car.year >= startYear && car.year <= startYear + 5);

        carsDataset = carsDataset.filter(car => car.fuelType === fuelType);

        carsDataset = carsDataset.filter(car => car.price >= startPrice && car.price <= endPrice);

        carsDataset = carsDataset.filter(car => car.mileage >= startMileage && car.price <= endMileage);

        if (carsDataset.length > 5) {
            carsDataset = carsDataset.splice(0, 5);
        }
        
        return carsDataset;
    },

    async getCarById(ctx) {
        const { id } = ctx.query;

        const carDetails = await strapi.services['cars-dataset'].findOne({id});

        return carDetails;
    }

};
