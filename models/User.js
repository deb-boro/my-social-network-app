const { Schema, model } = require('mongoose')

const userSchema = new Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      required: true,
      //validate: [validateEmail, 'Please fill a valid email address'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email address',
      ],
    },

    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],

    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  },
)

//Schema Settings..//Create a virtual called friendCount that retrieves the length of the user's friends array //field on query...
userSchema.virtual('friendCount').get(function () {
  return this.friends.reduce(
    (total, friend) => total + friend.friends.length + 1,
    0,
  )
})

const User = model('User', userSchema)
// export the User model
module.exports = User