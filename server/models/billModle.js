module.exports = (sequelize, DataTypes) => {
  
  const Bill = sequelize.define("Bill", {
    bill_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    bill_desc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true, 
      },
    },
    amount_due: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    customer_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    partial_pay_allowed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true, // Ensure the value follows the email format
      },
    },
  });

  return Bill;
};
