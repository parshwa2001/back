const {
  bookings,
  customers,
  clients,
  drivers,
  driver_documents,
  vehicles,
  border_Routes,
  countries,
} = require("../../model");
const { Op, Model, where } = require("sequelize");
const successResponce = require("../../responses/successResponce");
const errorResponce = require("../../responses/ErrorResponce");
const HandleDbErrors = require("../../validators/dbValidation");
const Booking = bookings;
const CommonValidator = require("../../middleware/validators/CommonValidators");
// Create a new booking
bookings.belongsTo(customers, { foreignKey: "customer_id" });
bookings.belongsTo(clients, { foreignKey: "client_id" });
bookings.belongsTo(drivers, { foreignKey: "driver_id" });
drivers.belongsTo(driver_documents, { foreignKey: "driver_id" });
bookings.belongsTo(border_Routes, { foreignKey: "route_id" });
border_Routes.belongsTo(countries, {
  as: "Booking_destination_Country",
  foreignKey: "destinationCountry",
});
border_Routes.belongsTo(countries, {
  as: "Booking_origin_Country",
  foreignKey: "originCountry",
});
const createBooking = async (req, res) => {
  try {
    // let validate =  CommonValidator(req.body , clientSchema)
    //   if (!validate.validate) {
    //     return errorResponce(res, 422, validate.data , "validation error in Creatbooking fun >>>>>>>>>>>>>>>>>>>>>>>>>>>")
    //   }

    const data = ({
      date,
      route_id,
      client_id,
      route_fare,
      all_border_fare,
      total_ammount,
      ammount_to_driver,
      customer_id,
      driver_id,
      total_ammount
    } = req.body);
    data.new_booking_id = req.body.booking_id;
    delete data.booking_id;
    const newBooking = await Booking.create(data);
    successResponce(res, "bookins is created", newBooking, 201);
  } catch (error) {
    HandleDbErrors(error, res, "");
  }
};

// Get all bookings
const getAllBookings = async (req, res) => {
  try {
    console.log(req.params.query);
    let where = {}
    if (req.query.payment_status) where.payment_status = req.query.payment_status  
    if (req.query.booking_id) where.booking_id = req.query.booking_id  
    const booking = await bookings.findAll({
      where: where,
      include: [
        { model: customers,
          attributes: ["company_name"],
        },
        { model: clients , 
          attributes: ["company_name"], 
        },
        {
          model: drivers,
          attributes: ["name"],
          include: [{ model: driver_documents }],
        },
        {
          model: border_Routes,
          attributes : ["route_name"] ,
          include: [
            {
              model: countries,
              as: "Booking_destination_Country",
              attributes: ["country_name"],
            },
            {
              model: countries,
              as: "Booking_origin_Country",
              attributes: ["country_name"],
            },
          ],
        },
      ],
    }
    );
    booking.length > 0 ? successResponce(res , "all booking" , booking , 200) : errorResponce(res , 404 , "booking not dound" , "")
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a single booking by ID
const getBookingById = async (req, res) => {
  const { id } = req.params.id;
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (booking) {
      res.status(200).json(booking);
    } else {
      errorResponce(res, 404, "", `Booking not found for ${booking_id}`);
      // res.status(404).json({ error: "Booking not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a booking by ID
const updateBookingById = async (req, res) => {
  const { booking_id } = req.params;
  try {
    const [updatedRows] = await Booking.update(req.body, {
      where: { booking_id: booking_id },
    });

    if (updatedRows > 0) {
      res.status(200).json({ message: "Booking updated successfully" });
    } else {
      res.status(404).json({ error: "Booking not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a booking by ID
const deleteBookingById = async (req, res) => {
  const { booking_id } = req.params;
  try {
    const deletedRows = await Booking.destroy({
      where: { booking_id: booking_id },
    });

    if (deletedRows > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Booking not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBookingById,
  deleteBookingById,
};
