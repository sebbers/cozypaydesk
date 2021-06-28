const asyncHandlers = require('../middleware/async');
const User = require('../models/user');


// @Method: POST
// @Route : api/auth/register 
// @Desc  : Handling the user registration
exports.register = asyncHandlers(async (req, res, next) => {

  // const {name, email, password, role}  = req.body;
  
  // if(!email || !password){
  //   return res.status(400).json({success: false, message: "Please enter all the fields."});
  // }
  
  // let user = await User.findOne({email});
  
  // if(user){
  //   return res.status(400).json({success: false, message: 'User already exists'});
  // }

  // user = await User.create({
  //   name, email, password, role
  // });

  // const accessToken = user.getSignedJwtToken();

  // res.status(200).json({success: true, accessToken, user});

  const body = Object.assign({}, req.body, {
    // Use `type` instead of `pilot-type` for saving to the DB.
    type: req.body['pilot-type'],
    'pilot-type': undefined,
  });

  // Check if we have a logged-in pilot
  let pilot = req.user;
  if (!pilot) {
    try {
      // Try to create and save a new pilot
      pilot = new Pilot(body);
      pilot = await pilot.save()
      // Sign in and redirect to continue the signup process
      req.logIn(pilot, err => {
        if (err) next(err);
        return res.redirect('/pilots/signup');
      });
    } catch (err) {
      // Show an error message to the user
      const errors = Object.keys(err.errors).map(field => err.errors[field].message);
      res.render('signup', { step: 'account', error: errors[0] });
    }
  } 
  else {
    try {
      // Try to update the logged-in pilot using the newly entered profile data
      pilot.set(body);
      // With the created profile, create a Connect account
      try {
        const stripeAccountId = await createStripeAccount(pilot, pilot.type, req.ip);
        pilot.stripeAccountId = stripeAccountId;
      } catch (err) {
        console.log('Error creating Custom connected account: ', err);
        next(err);
      }
      await pilot.save();
      return res.redirect('/pilots/stripe/verify');
    } catch (err) {
      next(err);
    }
  }
}) 


// @Method: POST
// @Route : api/auth/login 
// @Desc  : Logging in the user
exports.login = asyncHandlers(async (req, res, next) => {

  const {email, password}  = req.body;

  if(!email || !password){
    return res.status(400).json({success: false, message: "Please enter all the fields."});
  }
  
  const user = await User.findOne({email}).select('+password');

  if(!user){
    return res.status(404).json({success: false, message: "Invalid Creds.."});
  }

  const isMatch = await user.verifyPassword(password);

  if(!isMatch){
    return res.status(404).json({success: false, message: "Invalid Creds.."});
  }

 const accessToken = user.getSignedJwtToken();
  // console.log({success: true, accessToken, user})
 return res.status(200).json({success: true, accessToken, user});

}) 

// @Method: GET
// @Route : api/auth/me 
// @Desc  : Get the user on load if token available in browser
exports.getMe = asyncHandlers(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  return res.status(200).json({success: true, user});
})
