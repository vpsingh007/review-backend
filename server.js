const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const { expressCspHeader, INLINE, NONE, SELF } = require('express-csp-header');
// bring routes
const blogRoutes = require('./routes/blog');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const tagRoutes = require('./routes/tag');
const formRoutes = require('./routes/form');
const propertyRoutes = require('./routes/property');

// app
const app = express();

// db
mongoose
    .connect(process.env.DATABASE_CLOUD, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => console.log('DB connected'))
    .catch(err => {
        console.log(err);
    });

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(expressCspHeader({
    directives: {
        'default-src': [SELF, 'http://localhost:3000', 'https://review-data-frontend.herokuapp.com'],
        'script-src': [SELF, INLINE, 'http://localhost:3000', 'https://review-data-frontend.herokuapp.com'],
        'style-src': [SELF, 'http://localhost:3000', 'https://review-data-frontend.herokuapp.com'],
        'img-src': ['data:', 'http://localhost:3000', 'https://review-data-frontend.herokuapp.com'],
        'worker-src': [NONE],
        'block-all-mixed-content': true
    }
}));

// cors
if (process.env.NODE_ENV === 'production') {
    app.use(cors({ origin: `${process.env.CLIENT_CLOUD_URL}` }));
}
if (process.env.NODE_ENV === 'development') {
    app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}
// routes middleware
app.use('/api', blogRoutes);
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', tagRoutes);
app.use('/api', formRoutes);
app.use('/api', propertyRoutes);

// port
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
