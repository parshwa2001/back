const CommonValidator = require("../../middleware/validators/CommonValidators");
const { states , countries } = require("../../model");
const { statesJoiSchema } = require("../../validators/JoiSchema");
const HandleDbErrors = require("../../validators/dbValidation");

states.belongsTo(countries, {
  foreignKey: 'country_id', // This is the column in the State model that will reference the primary key in the Country model
  allowNull: false, // State must have a country
});

 const createState = async (req, res) => {
  try {
    let validate =  CommonValidator(req.body , statesJoiSchema ) 
    if (!validate.validate) {
      return res.send(validate.data)
    }
    const newStates = await states.create(req.body);
    return res.status(201).json(newStates.dataValues);
  } catch (error) {
    await HandleDbErrors(error , res)
  }
};

// Get all state
 const getAllState = async (req, res) => {
  try {
    
    const AllStates = await states.findAll({
      include: [
        {
          model: countries,
          as: 'country', // Rename the result key to 'states'
          attributes: ['country_name'], // Specify the attributes you want to retrieve
        },
      ],
    });
    return res.status(200).json(AllStates);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {createState , getAllState}