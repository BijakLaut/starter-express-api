const mongoose = require("mongoose");

let transactionSchema = mongoose.Schema(
   {
      historyVoucherTopup: {
         gameName: {
            type: String,
            require: [true, "Nama Game tidak boleh kosong"],
         },
         category: {
            type: String,
            require: [true, "Kategori tidak boleh kosong"],
         },
         thumbnail: { type: String },
         coinName: {
            type: String,
            require: [true, "Nama Koin tidak boleh kosong"],
         },
         coinQuantity: {
            type: String,
            require: [true, "Jumlah Koin tidak boleh kosong"],
         },
         price: { type: Number },
      },
      historyPayment: {
         name: {
            type: String,
            require: [true, "Nama tidak boleh kosong"],
         },
         type: {
            type: String,
            require: [true, "Tipe Pembayaran tidak boleh kosong"],
         },
         bankName: {
            type: String,
            require: [true, "Nama Bank tidak boleh kosong"],
         },
         accountNo: {
            type: String,
            require: [true, "Nomor Rekening tidak boleh kosong"],
         },
      },
      name: {
         type: String,
         require: [true, "Nama Pengguna tidak boleh kosong"],
         maxlength: [255, "Panjang Nama harus di antara 3-255 karakter"],
         minlength: [3, "Panjang Nama harus di antara 3-255 karakter"],
      },
      userAccount: {
         type: String,
         require: [true, "Nama Akun tidak boleh kosong"],
         maxlength: [255, "Panjang Nama Akun harus di antara 3-255 karakter"],
         minlength: [3, "Panjang Nama Akun harus di antara 3-255 karakter"],
      },
      tax: {
         type: Number,
         default: 0,
      },
      value: {
         type: Number,
         default: 0,
      },
      status: {
         type: String,
         enum: ["pending", "success", "failed"],
         default: "pending",
      },
      player: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Player",
      },

      historyUser: {
         name: {
            type: String,
            require: [true, "Nama pemain tidak boleh kosong"],
         },
         phoneNumber: {
            type: Number,
            require: [true, "Nomor telepon tidak boleh kosong"],
            maxlength: [
               14,
               "Panjang Nomor telepon harus di antara 9 - 14 karakter",
            ],
            minlength: [
               9,
               "Panjang Nomor telepon harus di antara 9 - 14 karakter",
            ],
         },
      },
      category: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Category",
      },
      user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
      },
   },
   { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
