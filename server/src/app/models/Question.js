const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');

const Types = ['SINGLE', 'MULTIPLE', 'TEXT'];

const Question = new Schema({
  content: { type: String, required: true },
  type: { type: String, enum: Types, default: Types[0] },
  options: { type: Schema.Types.Mixed, required: true },
  value: { type: String, required: true },
});

Question.plugin(mongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  deletedByType: {
    name: { type: String },
  },
  overrideMethods: true,
});

module.exports = {
  Types,
  Question: mongoose.model('Question', Question),
};
