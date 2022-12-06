const mongoose = require('mongoose');
const moment = require('moment');

// models
const { Question } = require('../models/Question');
const Room = require('../models/Room');

class RoomsAPI {
  // [GET] /rooms/closest
  async findClosest(req, res, next) {
    try {
      const result = await Room.aggregate([
        { $sort: { start_time: -1 } },
        { $limit: 1 },
        {
          $lookup: {
            from: 'accounts',
            localField: 'supervisor',
            foreignField: '_id',
            as: 'supervisor',
          },
        },
        {
          $lookup: {
            from: 'questions',
            localField: 'questions',
            foreignField: '_id',
            as: 'questions',
          },
        },
        {
          $project: {
            supervisor: {
              password: 0,
              refreshToken: 0,
            },
          },
        },
      ]);
      const room = result[0];
      res.status(200).json(room);
    } catch (error) {
      console.error(error);
      next({ status: 500, msg: error.message });
    }
  }

  // [GET] /rooms
  async findAll(req, res, next) {
    try {
      const rooms = await Room.find({}).populate('questions');
      res.status(200).json({
        data: rooms,
      });
    } catch (error) {
      console.error(error);
      next({ status: 500, msg: error.message });
    }
  }

  // [POST] /rooms
  /*
    title: String,
    [description]: String,
    start_time: Date,
    exam_time: String (hh:mm:ss),
    supervisor: [account._id],
  */
  async create(req, res, next) {
    try {
      const { supervisor, start_time } = req.body;

      if (supervisor) {
        req.body.supervisor = supervisor.map((supervisor) => mongoose.Types.ObjectId(supervisor));
      }
      req.body.start_time = moment(start_time).add(7, 'h');
      const questions = await Question.find({});
      req.body.questions = questions;

      const room = new Room(req.body);
      await room.save();

      res.status(201).json({
        msg: 'Insert room successfully!',
        room,
      });
    } catch (error) {
      console.error(error);
      next({ status: 500, msg: error.message });
    }
  }

  // [PUT] /rooms/:_id
  /*
    title: String,
    [description]: String,
    start_time: Date,
    exam_time: String (hh:mm:ss),
    supervisor: [account._id],
  */
  async update(req, res, next) {
    try {
      let { _id } = req.params;
      _id = mongoose.Types.ObjectId(_id);
      const { supervisor } = req.body;

      if (supervisor) {
        req.body.supervisor = supervisor.map((supervisor) => mongoose.Types.ObjectId(supervisor));
      }

      const room = await Room.findByIdAndUpdate(_id, req.body, {
        new: true,
      });

      res.status(201).json({
        msg: 'Edit room successfully!',
        room,
      });
    } catch (error) {
      console.error(error);
      next({ status: 500, msg: error.message });
    }
  }
}

module.exports = new RoomsAPI();
