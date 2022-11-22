const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');

const Types = {
  administrator: 'Administrator',
  teacher: 'Teacher',
  student: 'Student',
};

const Account = new Schema(
  {
    account_code: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, default: '' },
    refreshToken: { type: String, default: null },
    roles: { type: [String], default: [] },
  },
  {
    timestamps: true,
    discriminatorKey: 'type',
  }
);
const Base = mongoose.model('Account', Account);

const Administrator = Base.discriminator(Types.administrator, new Schema({}));

const Teacher = Base.discriminator(Types.teacher, new Schema({}));

const Student = Base.discriminator(Types.student, new Schema({}));

Account.plugin(mongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  deletedByType: {
    name: { type: String },
  },
  overrideMethods: true,
});

module.exports = {
  Types,
  Account: Base,
  Administrator,
  Teacher,
  Student,
};
