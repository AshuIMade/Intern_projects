module.exports = (sequelize, DataTypes) => {
    const UserAPI = sequelize.define('UserAPI', {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      api_key: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      api_secret: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      tableName: 'userapi', // Your actual table name
      timestamps: false,
    });
  
    return UserAPI;
  };