const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const propertySchema = new mongoose.Schema(
  {
    createdBy: {
      type: ObjectId,
      ref: 'User'
    },
    propertyname: {
      type: String,
      trim: true,
      min: 3,
      max: 160,
    },
    slug: {
      type: String,
      unique: true,
      index: true
    },
    sector: {
        type: String
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    pincode: {
        type: String,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    totalreviews: {
        type: Number,
        default: 0
    },
    reviews: [{
        postedBy: {
          type: ObjectId,
          ref: 'User',
        },
        place: {
            type: String,
        },
        consquality: {
          type: String,
          default: "Average"
        },
        positive: {
          type: String,
        },
        negative: {
            type: String,
        },
        date: {
          type: Date,
          default: Date.now,
        },
    }], 
    constructionquality: {
            type: Number,
            default: 0
    },
    maintenance: {
            type: Number,
            default: 0
    },
    amenities: {
            type: Number,
            default: 0
    },
    cleanliness: {
            type: Number,
            default: 0
    },
    locality: {
            type: Number,
            default: 0
    },
    complaintsettlement: {
            type: Number,
            default: 0
    },
    maintenancecharge: {
            type: Number,
            default: 0
    },
    watersupply: {
            type: Number,
            default: 0
    },
    liftquality: {
            type: Number,
            default: 0
    },
    friendlyneigbour: {
            type: Number,
            default: 0
    },
    starone: {
        type: Number,
        default: 0
    },
    startwo: {
        type: Number,
        default: 0
    },
    starthree: {
        type: Number,
        default: 0
    },
    starfour: {
        type: Number,
        default: 0
    },
    starfive: {
        type: Number,
        default: 0
    },
    categories: [{ type: ObjectId, ref: 'Category', required: true }],
    tags: [{ type: ObjectId, ref: 'Tag', required: true }],
  },
  { timestamps: true },
)

module.exports = mongoose.model('Property', propertySchema)
