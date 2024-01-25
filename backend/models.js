const mongoose = require('mongoose')
const {Schema} = require('mongoose')
const expressSchema = new mongoose.Schema({
    productName: String,
    productID: {
        type: Number,
        unique: true, // Ensure uniqueness
        required: true
    },
    images: [String],
    href: Schema.Types.Mixed

})

expressSchema.statics.createItem = async function(item) {
    try {
        const model = this; // 'this' refers to the model

        const product = await model.create(item); // Use the model to create a new document
        return {
            status: "Success",
            item: product
        };
    } catch (error) {
        return {
            status: "Failure",
            errMsg: ("Error creating Ali Express Item:", error)
        };
    }
};

expressSchema.statics.fetchItem = async function(itemID) {
    try {
        const model = this; // 'this' refers to the model

        // Find the item based on the provided itemID
        const item = await model.findOne({ productID: itemID });

        if (!item) {
           throw new Error("Couldn't find item")
        }
        return {
            status: "Success",
            item: item
        };
    } catch (error) {
        return {
            status: "Failure",
            errMsg: ("Error fetching item:", error)
        };
    }
};

const amazonSchema = new mongoose.Schema({
    productName: String,
    asin: {
        type: Schema.Types.Mixed,
        unique: true, // Ensure uniqueness
        required: true
    },
    images: [String],
    href: Schema.Types.Mixed
})

const aliModel = mongoose.model('Ali-Item', expressSchema)
const amazonModel = mongoose.model('AmazonItem', expressSchema)

module.exports = {aliModel , amazonModel}
