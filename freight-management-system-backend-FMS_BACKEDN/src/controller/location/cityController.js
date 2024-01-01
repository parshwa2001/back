const CommonValidator = require("../../middleware/validators/CommonValidators");
const { citys, states, countries } = require("../../model");
const { cityJoiSchema } = require("../../validators/JoiSchema");
const HandleDbErrors = require("../../validators/dbValidation");

citys.belongsTo(states, {
  foreignKey: 'state_id', // This is the column in the State model that will reference the primary key in the Country model
  allowNull: false, // State must have a country
});

const CreateCity = async (req, res) => {
  try {
    let validate =  CommonValidator(req.body , cityJoiSchema ) 
    if (!validate.validate) {
      return res.send(validate.data)
    }
    const newcity = await citys.create(req.body);
    return res.status(201).json(newcity.dataValues);
  } catch (error) {
    console.error(error);
    await HandleDbErrors(error , res)
    // return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllCity = async (req, res) => {
  try {
    const getAllCity = await citys.findAll({
      include: [
        {
          model: states,
          // as: 'states', // Rename the result key to 'states'
          attributes: ['state_name'], // Specify the attributes you want to retrieve,
          include : [{
            model : countries, 
          attributes : ["country_name"]
          }]
        },
      ],
    });

    return res.status(200).json(getAllCity);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { CreateCity, getAllCity };
