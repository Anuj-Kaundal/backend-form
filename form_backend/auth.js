function AuthenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    console.log(authHeader);
    if (!authHeader) {
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    // Expecting: "Bearer <token>"
    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Invalid token format." });
    }

    jwt.verify(token,'shhhhh', (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or Expired Token." });
        }

        req.user = user; // Attach user data to request
        next();
    });
}

module.exports = AuthenticateToken;