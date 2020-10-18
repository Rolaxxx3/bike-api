const express = require('express');
const router = express.Router();
const Bike = require('../models/Bike');
const ObjectIdValidator = new RegExp("^[0-9a-fA-F]{24}$");
const errorHandler = require("../utils/errorHandler");

router.get('/', async (req, res, next) => {
  try {
    const bikes = await Bike.find({});
    res.send(bikes);
    next();
  } catch (e) {
    errorHandler(res, "Something went wrong", 500)
    next();
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    if (!ObjectIdValidator.test(req.params.id)) {
      errorHandler(res, "Invalid bike id", 400);
      next();
    }
    const bike = await Bike.find({_id: req.params.id});
    res.send(bike);
    next();
  } catch (e) {
    errorHandler(res, "Something went wrong", 500)
    next();
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    if (!ObjectIdValidator.test(req.params.id)) {
      errorHandler(res, "Invalid bike id", 400);
      next();
    }
    await Bike.findByIdAndDelete({_id: req.params.id});
    res.sendStatus(200);
  } catch (e) {
    errorHandler(res, "Something went wrong", 500)
    next();
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name,  rent } = req.body;
    const { price, end_date, start_date } = rent;
    const bike = new Bike({
      name,
      rent: {
        price: price || 0,
        end_date: Date(end_date) || Date.now(),
        start_date: Date(start_date) || Date.now(),
      }
    });
    await bike.save();
    res.sendStatus(201);
    next();
  } catch (e) {
    errorHandler(res, "Invalid request data", 400);
    next();
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    if (!ObjectIdValidator.test(req.params.id)) {
      errorHandler(res, "Invalid bike id", 400);
      next();
    }
    const { name,  rent = {} } = req.body;
    const { price, end_date, start_date } = rent;
    const bike = await Bike.findById(req.params.id).exec();
    if (bike) {
      await bike.updateOne({
        name: name || bike.name,
        rent: {
          price: price || bike.rent.price,
          end_date: end_date || bike.rent.end_date,
          start_date: start_date || bike.rent.start_date,
        }
      });
      res.sendStatus(200);
      next();
    } else {
      errorHandler(res, "Bike with this id not found", 404)
      next();
    }
  } catch (e) {
    console.log(e.message);
    errorHandler(res, "Something went wrong", 500)
    next();
  }
});

module.exports = router;
