const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

//Register User
exports.registerUser = async (req, res) => {

    const { fullName, username, email, password, profileImageUrl } = req.body;
    //Validation Chek for Missing  fileds 
    if (!fullName || !username || !email || !password) {
        return res.status(400).json({ message: " All fileld are required" });
    }

    //Validation : Check username fromat;
    //Allows alphnumeric character and hypends onaly 
    const usernameRegex = /^[a-zA-Z0-9-]+$/;
    if (!usernameRegex.test(username)) {
        return res.status(400).json({
            message:
                "Invalid username. Onaly alphanumberic characters and hyphens are allowed. NO space are permitted.",
        });
    }

    try {
        //check if the email are exist
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res
                .status(400)
                .json({ message: "Username not available. Try another one." })
        }
        const user = await User.create({
            fullName,
            username,
            email,
            password,
            profileImageUrl,
        });
        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });

    } catch (err) {
        res
            .status(500)
            .json({ message: "Error registering user", error: err.message });
    }
}

//login  User
exports.loginUser = async (req, res) => {

    const { email, password, } = req.body;
    //Validation Chek for Missing  fileds 
    if (!email || !password) {
        return res.status(400).json({ message: " All fileld are required" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "user is not found" });
        }

        const passwordCompare = await bcrypt.compare(req.body.password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "password is not found" });
        }
        res
            .status(200)
            .json({
                id: user._id,
                user: {
                    ...user.toObject(),
                    totalPollsCreated: 0,
                    totalPollsVotes: 0,
                    totalPollsBookmarked: 0,
                },
                token: generateToken(user._id),
            });
    } catch (err) {
        res
            .status(500)
            .json({ message: "Error registering user", error: err.message });
    }
};

//Get User inFo
exports.getUserInfo = async (req, res) => {

    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(400).json({ error: "user is not found" });
        }

        //Add the new Attribute to the respose

        const userInfo = {
            ...user.toObject(),
            totalPollsCreated: 0,
            totalPollsVotes: 0,
            totalPollsBookmarked: 0,
        };
        res.status(200).json(userInfo);
    } catch (err) {
        res
            .status(500)
            .json({ message: "Error get info", error: err.message })

    }
}




