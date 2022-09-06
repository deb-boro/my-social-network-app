const { Thought, User } = require('../models')

const thoughtController = {
  addThought({ params, body }, res) {
    console.log(body)
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true },
        )
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' })
          return
        }
        res.json(dbUserData)
      })
      .catch((err) => res.json(err))
  },

  // get all thoughts
  getAllThought(req, res) {
    Thought.find({})
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err)
        res.status(400).json(err)
      })
  },
  // get one thought by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .then((dbThoughtData) => {
        // If no thought is found, send 404
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' })
          return
        }
        res.json(dbThoughtData)
      })
      .catch((err) => {
        console.log(err)
        res.status(400).json(err)
      })
  },
  // create Thought
  createThought({ body }, res) {
    Thought.create(body)
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.status(400).json(err))
  },
  // update Thought by id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' })
          return
        }
        res.json(dbThoughtData)
      })
      .catch((err) => res.status(400).json(err))
  },

  // delete user
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No Thought found with this id!' })
          return
        }
        res.json(dbThoughtData)
      })
      .catch((err) => res.status(400).json(err))
  },

  //add reaction
  addReaction({ params, body }, res) {
    console.log(body)
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true },
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No Thought found with this id!' })
          return
        }
        res.json(dbThoughtData)
      })
      .catch((err) => res.json(err))
  },

  //Remove Reaction
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true },
    )
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.json(err))
  },
}
module.exports = thoughtController
