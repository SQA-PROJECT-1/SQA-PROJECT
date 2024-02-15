/**
 * Imports the Product model from the productModel file.
 * @const {Object}
 */
const Product = require('../../models/productModel')

/**
 * Imports the User model from the userModel file.
 * @const {Object}
 */
const User = require('../../models/userModel')

/**
 * Retrieves statistics and information of products and users for the admin dashboard.
 * @async
 * @function adminDashboard
 * @param {Object} req - The request object sent.
 * @param {Object} res - The response object used to send data back.
 * @returns {Promise<void>} A Promise that resolves when the dashboard data is successfully retrieved and sent, or rejects if an error occurs.
 * @throws {Error} If an error occurs during the retrieval or processing of dashboard data.
 */
const adminDashboard = async (req, res) => {
    try {
       
        const countOverallProducts = await Product.find().countDocuments();
        
       
        const productsByCategory = await Product.aggregate([
            { $group: { _id: "$productCategory", count: { $sum: 1 } } }
        ]);

       
        const productsBySubcategory = await Product.aggregate([
            { $group: { _id: "$productSubcategory", count: { $sum: 1 }, products: { $push: "$$ROOT" } } }
        ]);

      
        const productsByBrand = await Product.aggregate([
            { $group: { _id: "$productBrandName", count: { $sum: 1 }, products: { $push: "$$ROOT" } } }
        ]);

   
        const formattedCategories = productsByCategory.map(category => ({
            /**
             * The name of the product category.
             * @type {string}
             */
            name: category._id,

            /**
             * The number of products within this category.
             * @type {number}
             */
            count: category.count,

            /**
             * Array of products grouped under this category.
             * @type {Object[]}
             */
            products: productsBySubcategory.filter(subcategory => subcategory.products[0].productCategory === category._id)
        }));

      
        const formattedBrands = productsByBrand.map(brand => ({
            /**
             * The name of the brand.
             * @type {string}
             */
            name: brand._id,
            
            /**
             * The number of products associated with this brand.
             * @type {number}
             */
            count: brand.count,

            /**
             * Array of products associated with this brand.
             * @type {Object[]}
             */
            products: brand.products
        }));

      
        const countTotalUsers = await User.find().countDocuments();

        
        return res.status(200).json({
            countOverallProducts,
            formattedCategories,
            formattedBrands,
            countTotalUsers
        });
    } catch (error) {
        
        console.error("Error in adminDashboard:", error);
        res.status(500).json("Internal server error");
        throw error;
    }
}

module.exports = { adminDashboard };


