const Blog = require('../models/blog');
const Property = require('../models/property');
const Tag = require('../models/tag');
const User = require('../models/user');
const formidable = require('formidable');
const slugify = require('slugify');
const stripHtml = require('string-strip-html');
const _ = require('lodash');
const { errorHandler } = require('../helpers/dbErrorHandler');
const fs = require('fs');
const { smartTrim } = require('../helpers/blog');
const reader = require('xlsx')
const readXlsxFile = require('read-excel-file/node');
// Validation
const validatePostInput = require('../validation/post');

// const prpertySchema = {
//     'PropertyName': {
//         prop: 'PropertyName',
//         type: String
//     },
//     'Sector': {
//         prop: 'Sector',
//         type: String
//     },
//     'City': {
//         prop: 'City',
//         type: String
//     },
//     'State': {
//         prop: 'State',
//         type: String
//     },
//     'Pincode': {
//         prop: 'Pincode',
//         type: String
//     }
// }

// @route   POST api/posts
// @desc    Create post
// @access  Private
// router.post(
//     '/',
//     passport.authenticate('jwt', { session: false }),
//     (req, res) => {
      
//   );

exports.create = (req, res) => {
    console.log("Coming Payload...........", req.user);
    // const { errors, isValid } = validatePostInput(req.body);
  

    // if (!isValid) {
    //   return res.status(400).json(errors);
    // }
    // let tagsArray = uniqueArray(req.body.tags);

    let newPost = new Property();
    newPost.propertyname= req.body.propertyname;
    newPost.sector = req.body.sector;
    newPost.city = req.body.city;
    newPost.slug = slugify(req.body.propertyname).toLowerCase();
    
    newPost.save()
      .then(post => res.json(post))
      .catch(err => res.status(401).json({ message: 'Server facing some error to add your post' }));
//   }

    // let form = new formidable.IncomingForm();
    // form.keepExtensions = true;
    // form.parse(req, (err, fields, files) => {
        

    //     let blog = new Blog();
    //     blog.title = title;
    //     blog.body = body;
    //     blog.excerpt = smartTrim(body, 320, ' ', ' ...');
    //     blog.slug = slugify(title).toLowerCase();
    //     blog.mtitle = `${title} | ${process.env.APP_NAME}`;
    //     blog.mdesc = stripHtml(body.substring(0, 160));
    //     blog.postedBy = req.user._id;
    //     // categories and tags
    //     let arrayOfCategories = categories && categories.split(',');
    //     let arrayOfTags = tags && tags.split(',');


    //     blog.save((err, result) => {
    //         if (err) {
    //             return res.status(400).json({
    //                 error: errorHandler(err)
    //             });
    //         }
    //         // res.json(result);
    //         Blog.findByIdAndUpdate(result._id, { $push: { categories: arrayOfCategories } }, { new: true }).exec(
    //             (err, result) => {
    //                 if (err) {
    //                     return res.status(400).json({
    //                         error: errorHandler(err)
    //                     });
    //                 } else {
    //                     Blog.findByIdAndUpdate(result._id, { $push: { tags: arrayOfTags } }, { new: true }).exec(
    //                         (err, result) => {
    //                             if (err) {
    //                                 return res.status(400).json({
    //                                     error: errorHandler(err)
    //                                 });
    //                             } else {
    //                                 res.json(result);
    //                             }
    //                         }
    //                     );
    //                 }
    //             }
    //         );
    //     });
    // });
};

// list, all properties

exports.list = (req, res) => {
    Property.find({})
        .populate('reviews', '_id name slug')
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: errorHandler(err)
                });
            }
            console.log(data.length)
            res.json(data);
        });
};



exports.read = (req, res) => {
    const slug = req.params.slug.toLowerCase();
    console.log("slug...", slug)
    Property.findOne({ slug })
        .populate('reviews', '_id name slug')
        .exec((err, data) => {
            console.log("data from DB.", data)
            if (err) {
                // console.log("Error...", err)
                return res.status(400).json({
                    error: {message: "No record found for this property"}
                });
            }
            if (data === undefined || data === null) {
                // console.log("Error...", err)
                return res.json({ property: {} });
            } else {
                console.log("DATA....", data)
                res.json({ property: data });
            }
            // console.log("slug...", slug)
            
            
        });
}

// exports.read = (req, res) => {
//     const slug = req.params.slug.toLowerCase();
//     console.log("Slug..", slug)
//     Property.findOne({ slug })
//         .populate('reviews', '_id name slug')
//         .exec((err, data) => {
//             if (err) {
//                 return res.status(401).json({ message: 'No Data found for this property' })
//             }
//             console.log(data)
//             return res.status(200).json(data);
//         });
//     };


    // Add all properties from excel file
    // var workbook = reader.readFile('properties.xlsx');
    // var sheet_name_list = workbook.SheetNames;
    // var xlData = reader.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    //     console.log("Full Data..", xlData);

    // for (i = 1; i < xlData.length; i++) {
    //     console.log(xlData[i]);

    //     let newPost = new Property();
    // newPost.propertyname= xlData[i].PropertyName;
    // newPost.sector =xlData[i].Sector;
    // newPost.city = xlData[i].City;
    // newPost.slug = slugify(xlData[i].PropertyName).toLowerCase();
    // newPost.save()
    // }
        


// exports.listSearch = (req, res) => {
//     console.log(req.query);
//     const { search } = req.query;
//     if (search) {
//         Blog.find(
//             {
//                 $or: [{ title: { $regex: search, $options: 'i' } }, { body: { $regex: search, $options: 'i' } }]
//             },
//             (err, blogs) => {
//                 if (err) {
//                     return res.status(400).json({
//                         error: errorHandler(err)
//                     });
//                 }
//                 console.log("Search Blogs...", blogs)
//                 res.json(blogs);
//             }
//         ).select('-photo -body');
//     }
// };

// exports.listByUser = (req, res) => {
//     User.findOne({ username: req.params.username }).exec((err, user) => {
//         if (err) {
//             return res.status(400).json({
//                 error: errorHandler(err)
//             });
//         }
//         let userId = user._id;
//         Blog.find({ postedBy: userId })
//             .populate('categories', '_id name slug')
//             .populate('tags', '_id name slug')
//             .populate('postedBy', '_id name username')
//             .select('_id title slug postedBy createdAt updatedAt')
//             .exec((err, data) => {
//                 if (err) {
//                     return res.status(400).json({
//                         error: errorHandler(err)
//                     });
//                 }
//                 res.json(data);
//             });
//     });
// };

exports.update = (req, res) => {
    const slug = req.params.slug.toLowerCase();

    Property.findOne({ slug }).exec((err, property) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        const { userName, userEmail, reviewComment, rating } = req.body;
        // console.log("before push..", req.body)
        property.reviews.push({
            userName: userName,
            userEmail: userEmail,
            reviewComment: reviewComment,
            rating: rating
        });

        // console.log("after push..", property)

        property.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            // result.photo = undefined;
            setTimeout(() => {
                res.json(result);
            }, 2000)
            // res.json(result);
        });
    });
};