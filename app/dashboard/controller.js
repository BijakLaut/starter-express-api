const Player = require("../player/model");
const Category = require("../category/model");
const Transaction = require("../transaction/model");
const Voucher = require("../voucher/model");

module.exports = {
   index: async (req, res) => {
      try {
         const transaction = await Transaction.countDocuments();
         const voucher = await Voucher.countDocuments();
         const player = await Player.countDocuments();
         const category = await Category.countDocuments();

         res.render("admin/dashboard/view_dashboard", {
            title: "Dashboard StoreGG",
            name: req.session.user.name,
            count: {
               transaction,
               voucher,
               category,
               player,
            },
         });
      } catch (error) {
         console.log(error);
      }
   },
};
