const mongoose = require("mongoose");

let userSchema = mongoose.Schema(
   {
      email: {
         type: String,
         require: [true, "Email pengguna tidak boleh kosong"],
      },
      name: {
         type: String,
         require: [true, "Nama pengguna tidak boleh kosong"],
      },
      password: {
         type: String,
         require: [true, "Kata sandi tidak boleh kosong"],
      },
      phoneNumber: {
         type: String,
         require: [true, "Nomor telepon tidak boleh kosong"],
      },
      role: {
         type: String,
         enum: ["admin", "user"],
         default: "admin",
      },
      status: {
         type: String,
         enum: ["Y", "N"],
         default: "Y",
      },
   },
   { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
