const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');

const Services = {
  manage: 'manage',
  client: 'client',
};

const Types = {
  [Services.manage]: {
    administrator: 'Administrator',
    teacher: 'Teacher',
  },
  [Services.client]: {
    student: 'Student',
  },
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

const Administrator = Base.discriminator(Types.manage.administrator, new Schema({}));

const Teacher = Base.discriminator(Types.manage.teacher, new Schema({}));

const Student = Base.discriminator(Types.client.student, new Schema({}));

Account.plugin(mongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  deletedByType: {
    name: { type: String },
  },
  overrideMethods: true,
});

module.exports = {
  Services,
  Types,
  Account: Base,
  Administrator,
  Teacher,
  Student,
};
