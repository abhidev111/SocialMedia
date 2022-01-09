const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const _ = require('lodash');



module.exports.userProfile = (req, res, next) => {
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: "User record not found" });

            else
                return res.status(200).json({ status: true, user: _.pick(user, ["userName", "fullName", "profilePicture", "description", "followers.length", "following.length"]) });

        }
    )
}

module.exports.updateProfile = async (req, res) => {
    if (req.params.id == req._id) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (error) {
                return res.status(500).json(error);
            }
        }
        try {
            const user = await User.findByIdAndUpdate({ _id: req._id },
                {
                    $set: req.body
                })
            res.status(200).json("Account updated successfully");
        } catch (error) {

        }
    }
    else
        return res.status(403).json("U can update only your account")
}

module.exports.deleteProfile = async (req, res) => {
    if (req.params.id == req._id) {
        try {
            const user = await User.deleteOne({ _id: req._id })
            res.status(200).json("Account deleted successfully");
        } catch (error) {
            res.status(500).json(error)
        }
    }
    else
        return res.status(403).json("U can delete only your account")
}

module.exports.viewOtherAcc = async (req, res) => {
    try {
        User.findOne({ _id: req.params.id },
            (err, user) => {
                if (!user)
                    return res.status(404).json({ status: false, message: "User record not found" });

                else
                    return res.status(200).json({ status: true, user: _.pick(user, ["userName", "fullName", "profilePicture", "description", "followers.length", "following.length"]) });
            }
        )
    } catch (error) {
        res.end(error)
    }
}

module.exports.addFollowers = async (req, res) => {
    if (req._id !== req.body.id) {
        try {
            const userToFollow = await User.findById(req.body.id);
            const currentUser = await User.findById({ _id: req._id })
            if (!currentUser.following.includes(req.body.id)) {
                await userToFollow.updateOne({ $push: { followers: req._id } })
                await currentUser.updateOne({ $push: { following: req.body.id } })
                res.status(200).json("Follower added successfully")
            }
            else {
                res.status(403).json("You already follow this user")
            }
        } catch (error) {
            res.status(500).json(error)
            console.log(error)
        }
    }
    else {
        res.status(403).send("u can't follow urself :(")
    }
}

module.exports.removeFollowers = async (req, res) => {
    if (req._id !== req.body.id) {
        try {
            const userToUnFollow = await User.findById(req.body.id);
            const currentUser = await User.findById({ _id: req._id })
            if (currentUser.following.includes(req.body.id)) {
                await userToUnFollow.updateOne({ $pull: { followers: req._id } })
                await currentUser.updateOne({ $pull: { following: req.body.id } })
                res.status(200).json("Unfollowes successfully")
            }
            else {
                res.status(403).json("You are not followin this person")
            }
        } catch (error) {
            res.status(500).json(error)
            console.log(error)
        }
    }
    else {
        res.status(403).send("u can't unfollow urself :(")
    }
}