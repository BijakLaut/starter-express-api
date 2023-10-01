const Nominal = require("./model");

module.exports = {
   index: async (req, res) => {
      try {
         const alertMessage = req.flash("alertMessage");
         const alertStatus = req.flash("alertStatus");
         const alert = { message: alertMessage, status: alertStatus };

         const nominal = await Nominal.find();

         res.render("admin/nominal/view_nominal", {
            name: req.session.user.name,
            title: "StoreGG - Daftar Nominal",
            nominal,
            alert,
         });
      } catch (error) {
         req.flash("alertMessage", `${error.message}`);
         req.flash("alertStatus", `danger`);
         res.redirect("/nominal");
      }
   },
   viewCreate: async (req, res) => {
      try {
         res.render("admin/nominal/create", {
            name: req.session.user.name,
            title: "StoreGG - Tambah Nominal",
         });
      } catch (error) {
         req.flash("alertMessage", `${error.message}`);
         req.flash("alertStatus", `danger`);
         res.redirect("/nominal");
      }
   },
   nominalCreate: async (req, res) => {
      try {
         const { coinName, coinQuantity, price } = req.body;
         let nominal = await Nominal({ coinName, coinQuantity, price });
         await nominal.save();

         req.flash("alertMessage", `Berhasil tambah nominal`);
         req.flash("alertStatus", `success`);
         res.redirect("/nominal");
      } catch (error) {
         req.flash("alertMessage", `${error.message}`);
         req.flash("alertStatus", `danger`);
         res.redirect("/nominal");
      }
   },
   nominalViewEdit: async (req, res) => {
      try {
         const { id } = req.params;
         const nominal = await Nominal.findOne({ _id: id });
         console.log(nominal);

         res.render("admin/nominal/edit", {
            name: req.session.user.name,
            title: "StoreGG - Update Nominal",
            nominal,
         });
      } catch (error) {
         req.flash("alertMessage", `${error.message}`);
         req.flash("alertStatus", `danger`);
         res.redirect("/nominal");
      }
   },
   nominalEdit: async (req, res) => {
      try {
         const { id } = req.params;
         const { coinName, coinQuantity, price } = req.body;
         let nominal = await Nominal.findOneAndUpdate(
            { _id: id },
            { coinName, coinQuantity, price }
         );

         req.flash("alertMessage", `Berhasil ubah item`);
         req.flash("alertStatus", `info`);
         res.redirect("/nominal");
      } catch (error) {
         req.flash("alertMessage", `${error.message}`);
         req.flash("alertStatus", `danger`);
         res.redirect("/nominal");
      }
   },
   itemDelete: async (req, res) => {
      try {
         const { id } = req.params;
         let nominal = await Nominal.findOneAndRemove({ _id: id });

         req.flash("alertMessage", `Berhasil hapus item`);
         req.flash("alertStatus", `warning`);
         res.redirect("/nominal");
      } catch (error) {
         req.flash("alertMessage", `${error.message}`);
         req.flash("alertStatus", `danger`);
         res.redirect("/nominal");
      }
   },
};
