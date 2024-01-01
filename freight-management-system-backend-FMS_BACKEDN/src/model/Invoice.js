module.exports = function (sequelize, DataTypes) {
    const Invoice = sequelize.define('invoices', 
    {
        invoice_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        customer_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'customers',
            key: 'customer_id'
          }
        },
        invoiceNumber: {
          type: DataTypes.STRING,
          allowNull: false
        },
        booking_id: {
          type: DataTypes.INTEGER,
          references: {
            model: 'bookings',
            key: 'booking_id',
          },
        },
        invoiceDate: {
          type: DataTypes.DATE,
          allowNull: false
        },
        issueDate: {
          type: DataTypes.DATE,
          allowNull: false
        },
        dueDate: {
          type: DataTypes.DATE,
          allowNull: false
        },
        totalAmount: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false
        },
        received: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false
        },
        balanceAmount: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false
        },
        payToDriver: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false
        },
        paidToDriver: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false
        },
        driverBalance: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false
        },
        documentStatus: {
          type: DataTypes.STRING,
          allowNull: false
        },
        trackingStatusPopup: {
          type: DataTypes.STRING
        },
        consignmentDocumentStatus: {
          type: DataTypes.STRING
        },
      },{
        timestamps: true,
        underscored: true,
      }
      ); return Invoice 
};
