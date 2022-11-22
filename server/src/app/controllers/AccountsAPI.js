const bcrypt = require('bcrypt');

// models
const { Types, Account, Teacher, Student } = require('../models/Account');
// utils
const { capitalize } = require('../../utils/formatString');

class AccountsAPI {
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

      const valueOfTypes = Object.values(Types);
      if (!valueOfTypes.includes(capitalizedType)) {
        next({
          status: 400,
          msg: `Type of ${capitalizedType} not included. Try the following: ${valueOfTypes.join(
            ', '
          )} instead!`,
        });
        return;
      }

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

      switch (capitalizedType) {
        case Types.teacher:
          account = new Teacher(details);
          break;
        case Types.student:
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
