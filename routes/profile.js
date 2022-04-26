const router = require("express").Router();
const Profile = require("../models/Profile");
const verifyToken = require("../middlewares/verifyToken");
const User = require("../models/User");

router.post("/profile",verifyToken, async (req, res) => {
  const { bio, age } = req.body;
  try {

    let profile = await Profile.findOne({ user: req.user._id });
    
      if (!profile) {
        let profile = await Profile.create({
          bio,
          age,
        });
        res
          .status(200)
          .json({ status: true, msg: "Profile created", data: profile });
      }
     else {
         res.status(400).json({status : true , msg : "Profile exists"})
     }
  } catch (err) {
    res.status(500).json({ status: false, msg: err });
  }
});




module.exports = router;
