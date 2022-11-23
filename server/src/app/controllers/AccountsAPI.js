const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// models
const { Services, Types, Account, Administrator, Teacher, Student } = require('../models/Account');
// utils
const { generateToken } = require('../../utils/jwt');
const { capitalize } = require('../../utils/formatString');

class AccountsAPI {
  // [GET] /accounts/verify/:type
  async verify(req, res, next) {
    try {
      const { service } = req.params;
      const serviceLowerCase = service.toLowerCase();

      const isPassed = req.account._id && req.account.service === serviceLowerCase;

      res.status(200).json(isPassed);
    } catch (error) {
      console.error(error);
      next({ status: 500, msg: error.message });
    }
  }

  // [GET] /accounts/profile
  async getProfile(req, res, next) {
    try {
      let { _id } = req.account;
      _id = mongoose.Types.ObjectId(_id);

      const profile = await Account.findOne({ _id }).select('-password -refreshToken');

      const dependentDetails = {};
      const type = profile.type;
      const { manage, client } = Services;
      switch (type) {
        case Types[manage].administrator:
          break;
        case Types[manage].teacher:
          break;
        case Types[client].student:
          break;
        default:
          break;
      }

      res.status(200).json({
        profile,
        ...dependentDetails,
      });
    } catch (error) {
      console.error(error);
      next({ status: 500, msg: error.message });
    }
  }

  // [POST] /accounts/login
  /*
		account_code: String,
    password: String,
    service: String,
	*/
  async login(req, res, next) {
    try {
      const { account_code, password, service } = req.body;
      const serviceLowerCase = service.toLowerCase();

      const valueOfServices = Object.values(Services);
      if (!valueOfServices.includes(serviceLowerCase)) {
        next({ status: 400, msg: `Service is invalid.` });
        return;
      }

      const account = await Account.findOne({ account_code }).select('name password');
      if (!account) {
        next({ status: 400, msg: 'Account not found!' });
        return;
      }

      const isRightPassword = await bcrypt.compare(password, account.password);
      if (!isRightPassword) {
        next({ status: 400, msg: 'Log in information is incorrect!' });
        return;
      }

      const { _id, name } = account;
      const tokens = generateToken({ _id, name, service: serviceLowerCase });
      const { refreshToken } = tokens;
      account.refreshToken = refreshToken;
      await account.save();

      res.status(200).json({
        name,
        tokens,
      });
    } catch (error) {
      console.error(error);
      next({ status: 500, msg: error.message });
    }
  }

  // [POST] /accounts
  /*
		account_type: String,
		account_code: String,
		password: String,
		passwordConfirm: String,
		[name]: String,
		[roles]: [String],
	*/
  async create(req, res, next) {
    try {
      const { account_type, account_code, password, passwordConfirm } = req.body;
      const capitalizedType = capitalize(account_type);

      const accountExisted = await Account.findOne({ account_code });
      if (accountExisted) {
        next({ status: 400, msg: 'Account existed!' });
        return;
      }

      if (password !== passwordConfirm) {
        next({ status: 400, msg: 'Password not sync!' });
        return;
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      let account = null;
      const details = {
        ...req.body,
        password: hashedPassword,
      };

      const { manage, client } = Services;
      switch (capitalizedType) {
        case Types[manage].administrator:
          account = new Administrator(details);
          break;
        case Types[manage].teacher:
          account = new Teacher(details);
          break;
        case Types[client].student:
          account = new Student(details);
          break;
        default:
          next({ status: 400, msg: `Unable to resolve, type of ${capitalizedType} not matched!` });
          return;
      }
      await account.save();

      res.status(201).json({
        msg: 'Create account successfully!',
        account,
      });
    } catch (error) {
      console.error(error);
      next({ status: 500, msg: error.message });
    }
  }
}

module.exports = new AccountsAPI();
