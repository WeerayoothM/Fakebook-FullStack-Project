module.exports = (sequelize, DataTypes) => {
  const Friend = sequelize.define("Friend", {
    status: DataTypes.ENUM("FRIEND", "PENDING")
  });

  Friend.associate = models => {
    Friend.belongsTo(models.User, { foreignKey: "request_to_id" });
    Friend.belongsTo(models.User, { foreignKey: "request_by_id" });
  };

  return Friend;
}