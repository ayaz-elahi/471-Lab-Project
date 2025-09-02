const Wishlist = require('../models/Wishlist');

exports.addToWishlist = async (req, res) => {
    const { productId } = req.body;
    try {
        const wishlist = await Wishlist.findOneAndUpdate(
            { user: req.user.id },
            { $push: { products: productId } },
            { new: true, upsert: true }
        );
        res.status(200).json(wishlist);
    } catch (err) {
        res.status(500).json({ message: "Error adding to wishlist", error: err });
    }
};
