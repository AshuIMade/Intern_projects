module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Bill', {
    bill_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    bill_desc: {
      type: DataTypes.STRING,
      allowNull: false
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: true
    },
    amount_due: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    customer_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    partial_pay_allowed: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    confirmation_code: {
      type: DataTypes.STRING,
      allowNull: true
    },
    uploader: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {  
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW 
    },
    file_name: {  
      type: DataTypes.STRING,
      allowNull: false 
    }
  }, {
    tableName: 'bills', 
    timestamps: false
  });
};
