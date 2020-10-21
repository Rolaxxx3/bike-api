const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const BikeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    type: {
        type: Number,
        required: true,
        min: 0,
        max: 7,
    },
    _id: {
        type: ObjectId,
        required: true,
        unique : true,
    },
    rent: {
        price: {
            type: Number,
            min: 0,
            max: Number.MAX_SAFE_INTEGER,
            required: true,
        },
        end_date: {
            type: Date,
            min: Date.now(),
            required: false,
        },
        start_date: {
            type: Date,
            min: Date.now(),
            required: false,
        },
    },
}, {
    versionKey: false,
});

const Bike = mongoose.model('Bike', BikeSchema);

module.exports = Bike;
