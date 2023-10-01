const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const HASH_ROUND = 10;

let playerSchema = mongoose.Schema(
   {
      email: {
         type: String,
         require: [true, "Email pengguna tidak boleh kosong"],
      },
      name: {
         type: String,
         require: [true, "Nama tidak boleh kosong"],
         maxlength: [255, "Nama harus berisi 3-255 karakter"],
         minlength: [3, "Nama harus berisi 3-255 karakter"],
      },
      username: {
         type: String,
         require: [true, "Username tidak boleh kosong"],
         maxlength: [255, "Username harus berisi antara 3-255 karakter"],
         minlength: [3, "Username harus berisi antara 3-255 karakter"],
      },
      password: {
         type: String,
         require: [true, "Kata sandi tidak boleh kosong"],
         maxlength: [255, "Password harus berisi antara 3-255 karakter"],
         minlength: [3, "Password harus berisi antara 3-255 karakter"],
      },
      phoneNumber: {
         type: String,
         require: [true, "Nomor Telepon tidak boleh kosong"],
         maxlength: [13, "Nomor Telepon harus berisi antara 3-255 karakter"],
         minlength: [9, "Nomor Telepon harus berisi antara 3-255 karakter"],
      },
      role: {
         type: String,
         enum: ["admin", "user"],
         default: "user",
      },
      status: {
         type: String,
         enum: ["Y", "N"],
         default: "Y",
      },
      avatar: {
         type: String,
      },
      filename: {
         type: String,
      },
      favorite: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Category",
      },
   },
   { timestamps: true }
);

// Validasi Email
playerSchema.path("email").validate(
   async function (value) {
      try {
         const count = await this.model("Player").countDocuments({
            email: value,
         });
         return !count;
      } catch (err) {
         throw err;
      }
   },
   (attr) => `${attr.value} sudah terdaftar`
);

// Encrypt Password
playerSchema.pre("save", function (next) {
   this.password = bcrypt.hashSync(this.password, HASH_ROUND);
   next();
});

module.exports = mongoose.model("Player", playerSchema);
