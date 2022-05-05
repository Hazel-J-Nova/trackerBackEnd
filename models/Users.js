const mongoose = require("mongoose");

const Schema = mongoose.Schema;

ImageSchema = new Schema({
  url: String,
  filename: String,
});
ImageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_200");
});
const opts = { toJSON: { virtuals: true } };

const passpordLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    default: "",
  },
  avatar: ImageSchema,
  admin: { type: Boolean, default: false },
  emaiVerified: { type: Boolean, default: false },
  token: { type: String, default: "" },
  timers: [{ type: Schema.Types.ObjectId, ref: "Timers" }],
  reminders: [{ type: Schema.Types.ObjectId, ref: "Reminders" }],
  toDos: [{ type: Schema.Types.ObjectId, ref: "ToDos" }],
  notificationPrefrence: [{ type: String }],
  phoneNumber: { type: String, default: "" },
  discord: { type: String, default: "" },
});

UserSchema.plugin(passpordLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
