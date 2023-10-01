function currency(nominal) {
   const idr = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
   });

   return idr.format(nominal);
}

module.exports = { currency };
