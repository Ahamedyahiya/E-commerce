// const User = require("../models/userModel");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const { OAuth2Client } = require("google-auth-library");
// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     if (user.isGoogleUser) {
//       return res.status(400).json({
//         message: "Please login with Google",
//       });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid password" });
//     }

//     const token = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.status(200).json({
//       message: "Login successful",
//       token,
//       user: { id: user._id, name: user.name, email: user.email },
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };



// exports.googleLogin = async (req, res) => {
//   try {
//     const { credential } = req.body; 

//     if (!credential) {
//       return res.status(400).json({ message: "No credential provided" });
//     }

//     const ticket = await client.verifyIdToken({
//       idToken: credential, 
//       audience: process.env.GOOGLE_CLIENT_ID,
//       clockSkewInSeconds: 300, 
//     });

//     const payload = ticket.getPayload();

//     const { name, email, picture } = payload;

//     let user = await User.findOne({ email });

//     if (!user) {
//       user = await User.create({
//         name,
//         email,
//         password: "",
//         avatar: picture,
//         isGoogleUser: true,
//       });
//     }

//     const jwtToken = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.status(200).json({
//       message: "Google login successful",
//       token: jwtToken,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         avatar: user.avatar,
//       },
//     });

//   } catch (error) {
//     console.error("GOOGLE ERROR:", error.message);
//     res.status(401).json({ message: "Invalid Google token" });
//   }
// };








const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isGoogleUser) {
      return res.status(400).json({
        message: "Please login with Google",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // ✅ role add பண்ணோம்
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role  // ✅ role add பண்ணோம்
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ message: "No credential provided" });
    }

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
      clockSkewInSeconds: 300,
    });

    const payload = ticket.getPayload();
    const { name, email, picture } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        password: "",
        avatar: picture,
        isGoogleUser: true,
        role: "user"  // ✅ default user
      });
    }

    // ✅ role add பண்ணோம்
    const jwtToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Google login successful",
      token: jwtToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role  // ✅ role add பண்ணோம்
      },
    });

  } catch (error) {
    console.error("GOOGLE ERROR:", error.message);
    res.status(401).json({ message: "Invalid Google token" });
  }
};













