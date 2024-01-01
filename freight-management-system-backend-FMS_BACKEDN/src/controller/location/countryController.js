const CommonValidator = require("../../middleware/validators/CommonValidators");
const { countries, states, citys } = require("../../model");
const countriesWithStates = require("../../util/service/filterData");
const { countriesJoiSchema } = require("../../validators/JoiSchema");
const HandleDbErrors = require("../../validators/dbValidation")

countries.hasMany(states, {
  foreignKey: 'country_id',
  // onDelete: 'CASCADE', // Optional: Define the behavior on deletion
});

states.hasMany(citys, {
  foreignKey: 'state_id',
  // onDelete: 'CASCADE', // Optional: Define the behavior on deletion
});


 const createCountry = async (req, res) => {
  try {
    const { country_name } = req.body;
    let validate =  CommonValidator(req.body , countriesJoiSchema ) 
    if (!validate.validate) {
      return res.send(validate.data)
    }
    const newCountry = await countries.create(req.body);

    return res.status(201).json(newCountry.dataValues);
  } catch (error) {
    console.error(error);
    await HandleDbErrors(error , res)
    
  }
};

// Get all countries
 const getAllCountries = async (req, res) => {
  try {
    const Countries = await countries.findAll({
      include: [
        {
          model: states,
          as: 'states', // Rename the result key to 'states'
          attributes: ['state_name'], // Specify the attributes you want to retrieve
        include : [{
          model : citys,
          attributes : ["city_name"]
        }]
        },
      ],
    });
    // const formatData = countriesWithStates(Countries)
    return res.status(200).json(Countries);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {createCountry , getAllCountries}