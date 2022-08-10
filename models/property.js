const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const propertySchema = new mongoose.Schema(
  {
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
    constructionquality: {
            type: Number,
            default: 3
    },
    maintenance: {
            type: Number,
            default: 3
    },
    amenities: {
            type: Number,
            default: 3
    },
    cleanliness: {
            type: Number,
            default: 3
    },
    locality: {
            type: Number,
            default: 3
    },
    complaintsettlement: {
            type: Number,
            default: 3
    },
    maintenancecharge: {
            type: Number,
            default: 3
    },
    watersupply: {
            type: Number,
            default: 3
    },
    liftquality: {
            type: Number,
            default: 3
    },
    friendlyneigbour: {
            type: Number,
            default: 3
    },
    starone: {
        type: Number,
        default: 3
    },
    startwo: {
        type: Number,
        default: 2
    },
    starthree: {
        type: Number,
        default: 3
    },
    starfour: {
        type: Number,
        default: 5
    },
    starfive: {
        type: Number,
        default: 4
    },
    overallrating: {
      type: Number,
      default: 4
    },
    reviews: [
      {
        postedBy: {
          type: ObjectId,
          ref: 'User'
        },
        userName: {
            type: String,
        },
        userEmail: {
          type: String,
        },
        reviewComment: {
            type: String,
        },
        rating: {
            type: Number,
            default: 3
        },
        date: {
          type: Date,
          default: Date.now
        }
      }
    ],
    tags: [{ type: ObjectId, ref: 'Tag', required: true }],
    postedBy: {
      type: ObjectId,
      ref: 'User'
    }
  },
  
  { timestamps: true },
)

module.exports = mongoose.model('Property', propertySchema)
