module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comment", {
    comment: DataTypes.STRING
  }, {
    tableName: "comments",
    timestamps: false
  });

  Comment.associate = models => {
    Comment.belongsTo(models.Post, { foreignKey: "post_id" });
    Comment.belongsTo(models.User, { foreignKey: "user_id" });
  };

  return Comment;
}