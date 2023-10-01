const Transaction = require("./model");
const { currency } = require("../helper");

module.exports = {
   index: async (req, res) => {
      try {
         const alertMessage = req.flash("alertMessage");
         const alertStatus = req.flash("alertStatus");
         const alert = { message: alertMessage, status: alertStatus };

         const transactions = await Transaction.find().populate("player");

         res.render("admin/transaction/view_transaction", {
            name: req.session.user.name,
            title: "StoreGG - Daftar Transaksi",
            transactions,
            alert,
            currency,
         });
      } catch (error) {
         req.flash("alertMessage", `${error.message}`);
         req.flash("alertStatus", `danger`);
         res.redirect("/transaction");
      }
   },
   actionStatus: async (req, res) => {
      try {
         const { id, status } = req.body;
         await Transaction.findOneAndUpdate({ _id: id }, { status });

         req.flash("alertMessage", `Berhasil mengubah status`);
         req.flash("alertStatus", `info`);
         res.redirect("/transaction");
      } catch (error) {
         req.flash("alertMessage", `${error.message}`);
         req.flash("alertStatus", `danger`);
         res.redirect("/transaction");
      }
   },
};
