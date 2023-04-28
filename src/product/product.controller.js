// layer untuk handle req dan res
// handle validasi body
const express = require("express");
const prisma = require("../db");
const {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProductById,
  editProductById,
} = require("./product.service");

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await getAllProducts();

  res.send(products);
});

router.get("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await getProductById(parseInt(productId));
    res.send(product);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const newProductData = req.body;

    const product = await createProduct(newProductData);

    res.send({
      message: "Data Berhasil dibuat",
      data: product,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const productId = req.params.id;

    await deleteProductById(parseInt(productId));

    res.send("Produk Berhasil Dihapus");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  const productId = req.params.id;
  const productData = req.body;

  if (
    !(
      productData.name &&
      productData.price &&
      productData.description &&
      productData.image
    )
  ) {
    return res.status(400).send("fields Missing");
  }

  const product = await editProductById(parseInt(productId), productData);

  res.send({
    message: "data berhasil diubah",
    data: product,
  });
});

router.patch("/products/:id", async (res, req) => {
  try {
    const productId = req.params.id;
    const productData = req.body;

    const product = await editProductById(parseInt(productId), productData);

    res.send({
      message: "data berhasil diubah",
      data: product,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
