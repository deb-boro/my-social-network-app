const router = require('express').Router()
const {
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
  createUser,
  addFriend,
  removeFriend,
} = require('../../controllers/user-controller')

// /api/users
router.route('/').get(getAllUser).post(createUser)

// /api/users/:userId
router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser)

//  /api/users/:userId/friends
router.route('/:userId/friends').post(addFriend)

//  /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').delete(removeFriend)

module.exports = router
