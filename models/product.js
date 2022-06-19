'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      product.belongsTo(models.user, {
        as: "userin",
        foreignKey: {
          name: "idUser"
        }
      })

      product.hasMany(models.transaction, {
        as: "transaction",
        foreignKey: {
          name: "idProduct"
        }
      })

      product.belongsToMany(models.category, {
        as: "categories",
        through: {
          model: "categoryProduct",
          as: "bridge"
        },
        foreignKey: "idProduct"
      })
    }
  }
  
  product.init({
    image: DataTypes.STRING,
    title: DataTypes.STRING,
    desc: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    idUser: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};