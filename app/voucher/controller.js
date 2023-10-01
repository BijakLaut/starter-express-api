const Voucher = require("./model");
const Category = require("../category/model");
const Nominal = require("../nominal/model");
const path = require("path");
const fs = require("fs");
const config = require("../../config");
const helper = require("../helper");

module.exports = {
   index: async (req, res) => {
      try {
         const alertMessage = req.flash("alertMessage");
         const alertStatus = req.flash("alertStatus");
         const alert = { message: alertMessage, status: alertStatus };

         const voucher = await Voucher.find()
            .populate("category")
            .populate("nominals");

         res.render("admin/voucher/view_voucher", {
            name: req.session.user.name,
            title: "StoreGG - Daftar Voucher",
            voucher,
            alert,
         });
      } catch (error) {
         req.flash("alertMessage", `${error.message}`);
         req.flash("alertStatus", `danger`);
         res.redirect("/voucher");
      }
   },
   viewCreate: async (req, res) => {
      try {
         const categories = await Category.find();
         const nominal = await Nominal.find();

         res.render("admin/voucher/create", {
            name: req.session.user.name,
            title: "StoreGG - Tambah Voucher",
            categories,
            nominal,
            currency: helper.currency,
         });
      } catch (error) {
         req.flash("alertMessage", `${error.message}`);
         req.flash("alertStatus", `danger`);
         res.redirect("/voucher");
      }
   },
   voucherCreate: async (req, res) => {
      try {
         const { name, category, nominal } = req.body;

         if (req.file) {
            let tmp_path = req.file.path;
            let originalExt =
               req.file.originalname.split(".")[
                  req.file.originalname.split(".").length - 1
               ];
            let thumbnail = req.file.filename + "." + originalExt;
            let target_path = path.resolve(
               config.rootPath,
               `public/upload/${thumbnail}`
            );
            const src = fs.createReadStream(tmp_path);
            const dest = fs.createWriteStream(target_path);
            src.pipe(dest);

            src.on("end", async () => {
               try {
                  const voucher = new Voucher({
                     name,
                     thumbnail,
                     category,
                     nominals: nominal,
                  });

                  await voucher.save();

                  req.flash("alertMessage", `Berhasil tambah voucher`);
                  req.flash("alertStatus", `success`);
                  res.redirect("/voucher");
               } catch (error) {
                  req.flash("alertMessage", `${error.message}`);
                  req.flash("alertStatus", `danger`);
                  res.redirect("/voucher");
               }
            });
         } else {
            const voucher = new Voucher({
               name,
               category,
               nominals: nominal,
            });

            await voucher.save();

            req.flash("alertMessage", `Berhasil tambah voucher`);
            req.flash("alertStatus", `success`);
            res.redirect("/voucher");
         }
      } catch (error) {
         req.flash("alertMessage", `${error.message}`);
         req.flash("alertStatus", `danger`);
         res.redirect("/voucher");
      }
   },
   voucherViewEdit: async (req, res) => {
      try {
         const { id } = req.params;
         const categories = await Category.find();
         const nominals = await Nominal.find();
         const voucher = await Voucher.findOne({ _id: id })
            .populate("category")
            .populate("nominals");

         res.render("admin/voucher/edit", {
            name: req.session.user.name,
            title: "StoreGG - Update Voucher",
            voucher,
            nominals,
            categories,
            currency: helper.currency,
         });
      } catch (error) {
         req.flash("alertMessage", `${error.message}`);
         req.flash("alertStatus", `danger`);
         res.redirect("/voucher");
      }
   },
   voucherEdit: async (req, res) => {
      try {
         const { id } = req.params;
         const { name, category, nominal } = req.body;

         if (req.file) {
            let tmp_path = req.file.path;
            let originalExt =
               req.file.originalname.split(".")[
                  req.file.originalname.split(".").length - 1
               ];
            let thumbnail = req.file.filename + "." + originalExt;
            let target_path = path.resolve(
               config.rootPath,
               `public/upload/${thumbnail}`
            );
            const src = fs.createReadStream(tmp_path);
            const dest = fs.createWriteStream(target_path);
            src.pipe(dest);

            src.on("end", async () => {
               try {
                  const voucherLama = await Voucher.findOne({ _id: id });
                  let currentImage = `${config.rootPath}/public/upload/${voucherLama.thumbnail}`;

                  if (fs.existsSync(currentImage)) {
                     fs.unlinkSync(currentImage);
                  }

                  await Voucher.findOneAndUpdate(
                     { _id: id },
                     {
                        name,
                        thumbnail,
                        category,
                        nominals: nominal,
                     }
                  );

                  req.flash("alertMessage", `Berhasil memperbarui voucher`);
                  req.flash("alertStatus", `success`);
                  res.redirect("/voucher");
               } catch (error) {
                  req.flash("alertMessage", `${error.message}`);
                  req.flash("alertStatus", `danger`);
                  res.redirect("/voucher");
               }
            });
         } else {
            await Voucher.findOneAndUpdate(
               { _id: id },
               {
                  name,
                  category,
                  nominals: nominal,
               }
            );

            req.flash("alertMessage", `Berhasil memperbarui voucher`);
            req.flash("alertStatus", `success`);
            res.redirect("/voucher");
         }
      } catch (error) {
         req.flash("alertMessage", `${error.message}`);
         req.flash("alertStatus", `danger`);
         res.redirect("/voucher");
      }
   },
   voucherDelete: async (req, res) => {
      try {
         const { id } = req.params;
         const voucher = await Voucher.findOneAndRemove({ _id: id });

         let currentImage = `${config.rootPath}/public/upload/${voucher.thumbnail}`;

         if (fs.existsSync(currentImage)) {
            fs.unlinkSync(currentImage);
         }

         req.flash("alertMessage", `Berhasil hapus voucher`);
         req.flash("alertStatus", `warning`);
         res.redirect("/voucher");
      } catch (error) {
         req.flash("alertMessage", `${error.message}`);
         req.flash("alertStatus", `danger`);
         res.redirect("/voucher");
      }
   },
   changeStatus: async (req, res) => {
      try {
         const { id } = req.params;
         let voucher = await Voucher.findOne({ _id: id });
         let status = voucher.status == "Y" ? "N" : "Y";

         voucher = await Voucher.findOneAndUpdate({ _id: id }, { status });

         if (status == "Y") {
            req.flash("alertMessage", `Berhasil aktivasi voucher`);
         } else {
            req.flash("alertMessage", `Berhasil deaktivasi voucher`);
         }
         req.flash("alertStatus", `info`);
         res.redirect("/voucher");
      } catch (error) {
         req.flash("alertMessage", `${error.message}`);
         req.flash("alertStatus", `danger`);
         res.redirect("/voucher");
      }
   },
};
