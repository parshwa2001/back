// routes/countriesRoutes.js
const express = require('express');
const router = express.Router();
const countriesController = require("../controller/location/countryController");
const stateController = require("../controller/location/stateController.js")
const cityController = require("../controller/location/cityController.js")
// Create a new country
const { countries } = require("../model");
const verifyMiddleware = require('../middleware/verifyUniqueMiddlware.js');

const check =  verifyMiddleware(countries)

router.post('/countries', check , countriesController.createCountry);
router.post('/states',   stateController.createState);
router.post('/citys', cityController.CreateCity);

router.get('/states', stateController.getAllState);
router.get('/citys', cityController.getAllCity);
router.get('/countries', countriesController.getAllCountries);
// Get all countries

module.exports = router;
