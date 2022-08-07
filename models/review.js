const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema

const reviewSchema = new mongoose.Schema(
    {
        postedBy: {
            type: ObjectId,
            ref: 'User',
        },
        propertyId: {
            type: String,
        },
        propertyname: {
            type: String,
            trim: true,
        },
        reviewTitle: {
            type: String,
        },
        reviewComment: {
            type: String,
        },
        rating: {
            type: Number,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Review', reviewSchema);
