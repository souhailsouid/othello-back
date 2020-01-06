
/* eslint-disable no-undef */
const mongoose = require('mongoose')

const GameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  savePositions: {
    type: String

  },

  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Game = mongoose.model('game', GameSchema)
