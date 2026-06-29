function getHome(req, res) {
  res.render("home", { user: req.user });
}

module.exports = { getHome };
