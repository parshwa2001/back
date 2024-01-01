const { string } = require("joi");

module.exports = function (sequelize, DataTypes) {
  const Booking = sequelize.define(
    "bookings",
    {
      booking_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      new_booking_id : {
        type : DataTypes.STRING
      },
      date : DataTypes.DATE ,
      // Customer Details
      customer_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "customers", // Assuming your States model is defined elsewhere
          key: "customer_id",
        },
      },
      customerCreditLimit: DataTypes.FLOAT,
      customerCreditUsed: DataTypes.FLOAT,
      customerCreditBalance: {
        type: DataTypes.VIRTUAL,
        get() {
          return this.customerCreditLimit - this.customerCreditUsed;
        },
      },

      // Client Details
      client_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "clients", // Assuming your States model is defined elsewhere
          key: "client_id",
        },
      },
      // Route Details
      route_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "border__routes",
          key: "route_id",
        },
      },
      route_fare: DataTypes.FLOAT,
      all_border_fare: DataTypes.FLOAT,
      total_ammount: {
        type: DataTypes.FLOAT,
        allowNull : false
      },

      // Driver Details
      driver_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "drivers", // Assuming your States model is defined elsewhere
          key: "driver_id",
        },
      },

      // truckType: DataTypes.STRING,
      // truckRegistrationStatus: DataTypes.STRING,
      // driverPassportStatus: DataTypes.STRING,
      // driverIdCardStatus: DataTypes.STRING,
      // driverLicenseStatus: DataTypes.STRING,

      // // Document Details
      // documentExpiryDate: DataTypes.DATE,

      // Additional Booking Details
      payment_status : {
        type : DataTypes.STRING , 
        allowNull : false , 
        defaultValue : "unpaid" 
      },
      remarkOnDriver: {
        type : DataTypes.STRING , 
        allowNull : true , 
        defaultValue : "Goods"
      },
      all_border_fare : DataTypes.FLOAT ,
      ammount_to_driver: DataTypes.FLOAT,
    },
    {
      timestamps: true,
      underscored: true,
    }
  );
  return Booking;
};
