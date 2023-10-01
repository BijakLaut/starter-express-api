const Payment = require("./model");
const Bank = require("../bank/model");

module.exports = {
   index: async (req, res) => {
      try {
         const alertMessage = req.flash("alertMessage");
         const alertStatus = req.flash("alertStatus");
         const alert = { message: alertMessage, status: alertStatus };

         const payments = await Payment.find().populate("banks");

         res.render("admin/payment/view_payment", {
            name: req.session.user.name,
            title: "StoreGG - Daftar Pembayaran",
            payments,
            alert,
         });
      } catch (error) {
         req.flash("alertMessage", `${error.message}`);
         req.flash("alertStatus", `danger`);
         res.redirect("/payment");
      }
   },
   paymentViewCreate: async (req, res) => {
      try {
         const banks = await Bank.find();
         res.render("admin/payment/create", {
            name: req.session.user.name,
            title: "StoreGG - Tambah Pembayaran",
            banks,
         });
      } catch (error) {
         req.flash("alertMessage", `${error.message}`);
         req.flash("alertStatus", `danger`);
         res.redirect("/payment");
      }
   },
   paymentActionCreate: async (req, res) => {
      try {
         const { paymentType, bank } = req.body;
         let payment = await Payment({ paymentType, bank });
         await payment.save();

         req.flash("alertMessage", `Berhasil menambah tipe pembayaran`);
         req.flash("alertStatus", `success`);
         res.redirect("/payment");
      } catch (error) {
         req.flash("alertMessage", `${error.message}`);
         req.flash("alertStatus", `danger`);
         res.redirect("/payment");
      }
   },
   paymentViewEdit: async (req, res) => {
      try {
         const { id } = req.params;
         const payment = await Payment.findOne({ _id: id }).populate("banks");

         res.render("admin/payment/edit", {
            name: req.session.user.name,
            title: "StoreGG - Update Pembayaran",
            payment,
         });
      } catch (error) {
         req.flash("alertMessage", `${error.message}`);
         req.flash("alertStatus", `danger`);
         res.redirect("/payment");
      }
   },
   paymentActionEdit: async (req, res) => {
      try {
         const { id } = req.params;
         const { paymentType, bank } = req.body;

         await Payment.findOneAndUpdate({ _id: id }, { paymentType, bank });

         req.flash("alertMessage", `Berhasil memperbarui jenis pembayaran`);
         req.flash("alertStatus", `info`);
         res.redirect("/payment");
      } catch (error) {
         req.flash("alertMessage", `${error.message}`);
         req.flash("alertStatus", `danger`);
         res.redirect("/payment");
      }
   },
   paymentActionDelete: async (req, res) => {
      try {
         const { id } = req.params;
         await Payment.findOneAndRemove({ _id: id });

         req.flash("alertMessage", `Berhasil menghapus jenis pembayaran`);
         req.flash("alertStatus", `warning`);
         res.redirect("/payment");
      } catch (error) {
         req.flash("alertMessage", `${error.message}`);
         req.flash("alertStatus", `danger`);
         res.redirect("/payment");
      }
   },
   changeStatus: async (req, res) => {
      try {
         const { id } = req.params;
         let payment = await Payment.findOne({ _id: id });
         let status = payment.status == "Y" ? "N" : "Y";

         await Payment.findOneAndUpdate({ _id: id }, { status });

         if (status == "Y") {
            req.flash("alertMessage", `Berhasil aktivasi payment`);
         } else {
            req.flash("alertMessage", `Berhasil deaktivasi payment`);
         }
         req.flash("alertStatus", `info`);
         res.redirect("/payment");
      } catch (error) {
         req.flash("alertMessage", `${error.message}`);
         req.flash("alertStatus", `danger`);
         res.redirect("/payment");
      }
   },
};
