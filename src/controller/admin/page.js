const Page = require("../../models/page.js");

exports.createPage = (req, res) => {
   const { banners, products } = req.files;

   if (banners.length > 0) {
      req.body.banners = banners.map((banner, index) => ({
         img: `${process.env.API}/public/${banner.filename}`,
         nabigateTo: `/bannerClicked?categoryId=${req.body.category}&type=${req.body.type}`,
      }));
   }
   if (products.length > 0) {
      req.body.products = products.map((product, index) => ({
         img: `${process.env.API}/public/${product.filename}`,
         nabigateTo: `/productClicked?categoryId=${req.body.category}&type=${req.body.type}`,
      }));
   }

   res.status(200).json({ body: req.body });
};
