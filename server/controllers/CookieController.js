const cookieController = {};

cookieController.setSSIDCookie = async (req, res, next) => {
  const { userId } = res.locals;
  // res.cookie('ssid', `${id}`);
  // res.locals.id = id;
  // console.log(' SetSSIDCOOKIE', res.locals.id);

  res.cookie('loggedIn', `${userId}`, {
    maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    sameSite: 'strict',
    path: '/',
  });

  console.log('cookie has been baked');
  return next();
};
cookieController.setOauthCookie =  (req, res, next) => {
  console.log('now attempting to create cookie:')
  const { id } = req.user; // get user ID from req.user.id
  res.cookie('loggedIn', `${id}`, {
    httpOnly: false,
    maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    
  });
  console.log('Cookie has been set: loggedIn=', id);
   next();
};
module.exports = cookieController;
