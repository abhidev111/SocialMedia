const User = require('../models/user.model');
const _ = require('lodash');



module.exports.userProfile = (req, res, next) => {
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: "User record not found" });

            else
                return res.status(200).json({ status: true, user: _.pick(user, ["userName", "fullName", "profilePicture", "followers.length", "following.length"]) });

        }
    )
}