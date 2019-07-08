const Entry = require('../models/entry');

exports.list = (req, res, next) => {
	console.log('come in list method **************************');
  const page = req.page;
  //Entry.getRange(page.from, page.to, (err, entries) => {
  Entry.getRange(0, -1, (err, entries) => {
  	console.log("**************entries:"+entries);
    if (err) return next(err);
    res.render('entries', {
      title: 'Entries',
      entries: entries,
    });
  });
};

exports.submit = (req, res, next) => {
  const data = req.body.entry;  
  const entry = new Entry({
    username: res.locals.user.name,
    title: data.title,
    body: data.body
  });
  /*entry.save((err) => {
    if (err) return next(err);
    res.redirect('/entries');
  });*/
  entry.save((err) => {
    if (err) return next(err);
    if (req.remoteUser) {
      res.json({ message: 'Entry added.' });
    } else {
      res.redirect('/entries');
    }
  });
};

exports.form = (req, res) => {
  res.render('post', { title: 'Post' });
};