module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define("Like", {

    }, {
        tableName: "likes",
        timestamps: false
    })

    Like.associate = models => {
        Like.belongsTo(models.User, { foreignKey: "user_id" })
        Like.belongsTo(models.Post, { foreignKey: "post_id" })
    }
    return Like;
}