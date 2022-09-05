const router = require('express').Router()
const {
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
  createUser,
} = require('../../controllers/user-controller')

// /api/users
router.route('/').get(getAllUser).post(createUser)

// /api/users/:id
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser)

module.exports = router
