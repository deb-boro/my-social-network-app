const router = require('express').Router()
const {
  addThought,
  removeThought,
  addReply,
  removeReply,
} = require('../../controllers/thought-controller')

//set up GET all and POST at /api/thoughts
router.route('/').post(addThought)

// /api/thoughts/<userId>/<thoughtId>
router.route('/:userId/:thoughtId').put(addReply).delete(removeComment)

// reply id
router.route('/:pizzaId/:commentId/:replyId').delete(removeReply)

module.exports = router
