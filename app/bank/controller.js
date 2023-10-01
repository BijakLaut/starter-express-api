const Bank = require("./model");

module.exports = {
   index: async (req, res) => {
      try {
         const alertMessage = req.flash("alertMessage");
         const alertStatus = req.flash("alertStatus");
         const alert = { message: alertMessage, status: alertStatus };

         const banks = await Bank.find();

         res.render("admin/bank/view_bank", {
            name: req.session.user.name,
            title: "StoreGG - Daftar Bank",
            banks,
            alert,
         });
      } catch (error) {
         req.flash("alertMessage", `${error.message}`);
         req.flash("alertStatus", `danger`);
         res.redirect("/bank");
      }
   },
   bankViewCreate: async (req, res) => {
      try {
         res.render("admin/bank/create", {
            name: req.session.user.name,
            title: "StoreGG - Tambah Bank",
         });
      } catch (error) {
         req.flash("alertMessage", `${error.message}`);
         req.flash("alertStatus", `danger`);
         res.redirect("/bank");
      }
   },
   actionCreate: async (req, res) => {
      try {
         const { name, bankName, accountNo } = req.body;
         let bank = await Bank({ name, bankName, noRekening: accountNo });
         await bank.save();

         req.flash("alertMessage", `Berhasil tambah daftar bank`);
         req.flash("alertStatus", `success`);
         res.redirect("/bank");
      } catch (error) {
         req.flash("alertMessage", `${error.message}`);
         req.flash("alertStatus", `danger`);
         res.redirect("/bank");
      }
   },
   bankViewEdit: async (req, res) => {
      try {
         const { id } = req.params;
         const bank = await Bank.findOne({ _id: id });

         res.render("admin/bank/edit", {
            name: req.session.user.name,
            title: "StoreGG - Update Bank",
            bank,
         });
      } catch (error) {
         req.flash("alertMessage", `${error.message}`);
         req.flash("alertStatus", `danger`);
         res.redirect("/bank");
      }
   },
   bankActionEdit: async (req, res) => {
      try {
         const { id } = req.params;
         const { name, bankName, accountNo } = req.body;
         let bank = await Bank.findOneAndUpdate(
            { _id: id },
            { name, bankName, noRekening: accountNo }
         );

         req.flash("alertMessage", `Berhasil memperbarui bank`);
         req.flash("alertStatus", `info`);
         res.redirect("/bank");
      } catch (error) {
         req.flash("alertMessage", `${error.message}`);
         req.flash("alertStatus", `danger`);
         res.redirect("/bank");
      }
   },
   bankActionDelete: async (req, res) => {
      try {
         const { id } = req.params;
         await Bank.findOneAndRemove({ _id: id });

         req.flash("alertMessage", `Berhasil menghapus bank`);
         req.flash("alertStatus", `warning`);
         res.redirect("/bank");
      } catch (error) {
         req.flash("alertMessage", `${error.message}`);
         req.flash("alertStatus", `danger`);
         res.redirect("/bank");
      }
   },
};
