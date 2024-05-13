const product = require("../models/Product");

function transformProductWithSymbols(product) {
  const { symbols, ...rest } = product.toObject();

  const formattedSymbols = symbols.map((symbolRef) => ({
    symbol: symbolRef.symbolId,
    position: symbolRef.position,
  }));

  return { ...rest, symbols: formattedSymbols };
}

exports.createProduct = async (req, res) => {
  try {
    const { stoneId, droppedSymbols, textOnPlate, dateOnPlate, price } =
      req.body;

    const symbols = droppedSymbols.map((droppedSymbol) => ({
      symbolId: droppedSymbol.symbol._id,
      position: droppedSymbol.position,
    }));

    const newProduct = new Product({
      stone: stoneId,
      symbols,
      textOnPlate,
      dateOnPlate,
      price,
    });

    await newProduct.save();

    const populatedProduct = await Product.findById(newProduct._id)
      .populate("stone")
      .populate({
        path: "symbols.symbolId",
        model: "Symbol",
      });

    res.status(201).send(transformProductWithSymbols(populatedProduct));
  } catch (error) {
    res.status(400).send({ message: "Error creating product", error });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).populate("stone").populate({
      path: "symbols.symbolId",
      model: "Symbol",
    });

    const transformedProducts = products.map(transformProductWithSymbols);

    res.status(200).send(transformedProducts);
  } catch (error) {
    res.status(500).send({ message: "Error fetching products", error });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id).populate("stone").populate({
      path: "symbols.symbolId",
      model: "Symbol",
      select: "alt type price url",
    });

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.status(200).send(transformProductWithSymbols(product));
  } catch (error) {
    res.status(500).send({ message: "Error fetching product", error });
  }
};
