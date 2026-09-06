const jwt = require("jsonwebtoken");

const secret = "B@tman_2004";

function createTokenForUser(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        profileImageUrl: user.profileImageUrl,
        role: user.role,
    }

    const token = jwt.sign(payload, secret);
    return token;
}

function validateToken(token) {
  if (!token) return null;

    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
}

module.exports = {
    createTokenForUser,
    validateToken,
}