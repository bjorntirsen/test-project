module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    const error_msg = 'Please login to view this resource.';
    res.render('login', { error_msg });
  },
};
