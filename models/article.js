const mongoose = require('mongoose');
const linkValidator = require('../utils/linkValidator');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  text: {
    type: String,
    required: true,
  },

  date: {
    type: String,
    required: true,
  },

  source: {
    type: String,
    required: true,
    validate: {
      validator: (link) => linkValidator(link),
      message: (props) => `${props.value} is not a valid link. `,
    },
  },

  link: {
    type: String,
    required: true,
    validate: {
      validator: (link) => linkValidator(link),
      message: (props) => `${props.value} is not a valid link. `,
    },
  },

  image: {
    type: String,
    required: true,
    validate: {
      validator: (link) => linkValidator(link),
      message: (props) => `${props.value} is not a valid link. `,
    },
  },

  owner: {
    type: 'ObjectId',
    required: true,
    // in order to database won't be returned this field by default
    // select: false,
  },

});

module.exports = mongoose.model('article', articleSchema);
