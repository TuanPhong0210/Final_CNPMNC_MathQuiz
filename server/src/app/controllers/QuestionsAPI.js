// models
const { Types, Question } = require('../models/Question');

class QuestionsAPI {
  // [GET] /questions
  async findAll(req, res, next) {
    try {
      const questions = await Question.find({});
      res.status(200).json(questions);
    } catch (error) {
      console.error(error);
      next({ status: 500, msg: error.message });
    }
  }

  // [POST] /questions
  /*
    content: String,
    [type]: String Enum ['SINGLE', 'MULTIPLE', 'TEXT']
    options: Mixed,
    value: String
  */
  async create(req, res, next) {
    try {
      const { type } = req.body;
      const typeUpperCase = type ? type.toUpperCase() : undefined;

      if (typeUpperCase && !Types.includes(typeUpperCase)) {
        next({
          status: 400,
          msg: `Type of ${typeUpperCase} not included. Try the following: ${Types.join(
            ', '
          )} instead!`,
        });
        return;
      }

      const question = new Question({
        ...req.body,
        type: typeUpperCase,
      });
      await question.save();

      res.status(201).json({
        msg: 'Insert question successfully!',
        question,
      });
    } catch (error) {
      console.error(error);
      next({ status: 500, msg: error.message });
    }
  }
}

module.exports = new QuestionsAPI();
