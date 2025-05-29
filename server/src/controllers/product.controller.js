import Product from "../model/product.model.js";
import asyncWrapper from "../utils/asyncWrapper.js";

// @route   GET /api/products
// @desc    Get paginated list of products
export const getProducts = asyncWrapper(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    
    const products = await Product.find()
        .skip(skip)
        .limit(Number(limit))
    
    const totalProducts = await Product.countDocuments();
    
    res.status(200).json({
        products,
        totalPages: Math.ceil(totalProducts / limit),
        currentPage: Number(page),
    });
});