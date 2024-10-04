const CrudRepository = require('./crud-repository');
const { Flight, Airplane, Airport, City } = require('../models');
const { where, col } = require('sequelize');


class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight);
    }

    async getAllFlights(filter, sort){
        const response= await Flight.findAll({
            where: filter,
            order: sort,
            include: [
                {
                    model: Airplane,
                    required: true,
                    as: 'airplaneDetails',
                },
                {
                    model: Airport,
                    required: true,
                    on: {
                        col1: where(col('Flight.departureAirportId'), '=', col('departureAirportDetails.code'))
                    },
                    as: 'departureAirportDetails',
                    include: {
                        model: City,
                        required: true,
                    }
                },
                {
                    model: Airport,
                    required: true,
                    on: {
                        col1: where(col('Flight.arrivalAirportId'), '=', col('arrivalAirportDetails.code'))
                    },
                    as: 'arrivalAirportDetails',
                    include: {
                        model: City,
                        required: true,
                    }
                }
            ]
        });
        return response; 
    }
}
module.exports = FlightRepository;