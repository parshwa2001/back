module.exports = function (sequelize, DataTypes) {
const Border = sequelize.define('border', {
  border_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
    borderName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'countries', 
        key: 'country_id',
      },
    },
    charges : {
      type : DataTypes.INTEGER ,
      allowNull : false , 
      defaultValue : 0 
    },
    route_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'border__routes', 
        key: 'route_id',
      }},
    type : {
      type : DataTypes.ENUM("IN" , "OUT") ,
      allowNull : false , 
      defaultValue : "IN" 
    }
  },{
    timestamps: true,
    underscored: true,
  }); return Border
}