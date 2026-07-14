exports.register = async (req, res) => {

    res.json({
        message: "Register API Ready"
    });

};

exports.login = async (req, res) => {

    res.json({
        message: "Login API Ready"
    });

};

exports.logout = (req, res) => {

    req.session.destroy(() => {

        res.json({
            message: "Logged Out"
        });

    });

};