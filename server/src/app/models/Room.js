const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');

const Room = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  start_time: { type: Date, required: true },
  exam_time: { type: String, required: true },
  supervisor: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Account' }],
  questions: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Question' }],
});

Room.plugin(mongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  deletedByType: {
    name: { type: String },
  },
  overrideMethods: true,
});

module.exports = mongoose.model('Room', Room);
