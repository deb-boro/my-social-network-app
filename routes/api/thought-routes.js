const router = require('express').Router()
const {
  getAllThought,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thought-controller')

// /api/thoughts
router.route('/').get(getAllThought).post(createThought)

// /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought)

//  /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction)

// /api/thoughts/<thoughtId>/<reactionId>
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction)

module.exports = router
