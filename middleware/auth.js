const auth = (req, res, next) => {
	if (req.session.key) {
		next();
	} else {
		return res.status(403).send({
			message: "Not session provided.",
		});
	}
};

modules.exports = auth;
