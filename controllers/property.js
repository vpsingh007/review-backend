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
// Validation
const validatePostInput = require('../validation/post');

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
    // });

    // req.body.tags.map((tagname) => {
    //   let tagString = tagname.toLowerCase().replace(/^\s+|\s+$/gm,'');
    //   Tags.findOne({ name: tagString }).then(tag => {
    //     if (!tag) {
    //       let TagsNames = new Tags({
    //         name: tagString
    //       });
    //       TagsNames.save().then((tagname) => {null});
    //     }
    //   });
    // });
    // Profile.findOne({user: req.user.id}).then(profile => {
    //   profile.questions = profile.questions + 1;
    //   profile.save().then((profile) => {null});
    // });

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
            res.json(data);
        });
};

exports.read = (req, res) => {
    const slug = req.params.slug.toLowerCase();
    Property.findOne({ slug })
        .populate('reviews', '_id name slug')
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: errorHandler(err)
                });
            }
            res.json(data);
        });
};

// //
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
