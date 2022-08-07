const Review = require('../models/review');
const Property = require('../models/property');
const slugify = require('slugify');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.create = (req, res) => {
    const { propertyId, propertyname, reviewTitle, reviewComment, rating } = req.body;
    // let slug = slugify(name).toLowerCase();
    // console.log("REVIEW BODY", req.body);
    // res.status(200).json(req.body); 

    // let tag = new Tag({ name, slug });
    let review = new Review({propertyId, propertyname, reviewTitle, reviewComment, rating})

    review.save((err, data) => {
        if (err) {
            console.log(err);
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data); 
    });
};

// exports.list = (req, res) => {
//     Tag.find({}).exec((err, data) => {
//         if (err) {
//             return res.status(400).json({
//                 error: errorHandler(err)
//             });
//         }
//         res.json(data);
//     });
// };

// exports.read = (req, res) => {
//     const slug = req.params.slug.toLowerCase();

//     Tag.findOne({ slug }).exec((err, tag) => {
//         if (err) {
//             return res.status(400).json({
//                 error: 'Tag not found'
//             });
//         }
       
//         // res.json(tag);
//         Blog.find({ tags: tag })
//             .populate('categories', '_id name slug')
//             .populate('tags', '_id name slug')
//             .populate('postedBy', '_id name')
//             .select('_id title slug excerpt categories tags postedBy createdAt updatedAt')
//             .exec((err, data) => {
//                 if (err) {
//                     return res.status(400).json({
//                         error: errorHandler(err)
//                     });
//                 }
//                 console.log(tag)
//                 res.json({ tag: tag, blogs: data });
//             });
//     });
// };

// exports.remove = (req, res) => {
//     const slug = req.params.slug.toLowerCase();

//     Tag.findOneAndRemove({ slug }).exec((err, data) => {
//         if (err) {
//             return res.status(400).json({
//                 error: errorHandler(err)
//             });
//         }
//         res.json({
//             message: 'Tag deleted successfully'
//         });
//     });
// };
