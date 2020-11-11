require("dotenv").config();
const db = require("./models");
const express = require("express");
const app = express();
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const commentRoutes = require('./routes/comment');
const friendRoutes = require("./routes/friend");
const uploadRoutes = require("./routes/upload");
const fileUpload = require('express-fileupload');
const cors = require("cors");

require("./config/passport");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());
app.use(express.static("upload-files"));
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);
app.use("/friends", friendRoutes);
app.use("/uploads", uploadRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running at port ${process.env.PORT}`);
});

db.sequelize.sync().then(() => {
  console.log("Completed Connect And Sync");
});