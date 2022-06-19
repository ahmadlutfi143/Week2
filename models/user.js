'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.hasOne(models.profile, {
        as: "profile",
        foreignKey: {
          name: "idUser"
        } 
      })

      user.hasMany(models.product, {
        as: 'userProduct',
        foreignKey: {
          name: 'idUser'
        }
      })

      user.hasMany(models.transaction, {
        as: 'transaction',
        foreignKey: {
          name: 'idBuyer'
        }
      })
    }
  }
  
  user.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    status: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};