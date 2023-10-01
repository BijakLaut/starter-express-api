const mongoose = require("mongoose");

let nominalSchema = mongoose.Schema(
   {
      coinQuantity: {
         type: Number,
         default: 0,
      },

      coinName: {
         type: String,
         require: [true, "Nama Koin tidak boleh kosong"],
      },
      price: {
         type: Number,
         default: 0,
      },
   },
   { timestamps: true }
);

module.exports = mongoose.model("Nominal", nominalSchema);

// voucher[i].name
// voucher[i].status
// voucher[i].thumbnail
// voucher[i].category
// voucher[i].nominal
// voucher[i].user
