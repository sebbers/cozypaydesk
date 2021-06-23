const { ObjectId } = require('mongodb');
const Customer = require('../models/Customer');
const User = require('../models/User');
const asyncHandlers = require('../middleware/async');

// @Method: POST
// @Route : api/auth/register 
// @Desc  : Handling the user registration
exports.create = asyncHandlers(async (req, res, next) => {

  const { firstName, lastName, email } = req.body;
  const { user } = req;
  console.log('USER')
  console.log(user)
  
  if(!email || !firstName || !lastName){
    return res.status(400).json({success: false, message: "Please enter all the fields."});
  }
  
  let customer = await Customer.findOne({ email, userId: ObjectId(user.id) });
  
  if(customer){
    return res.status(400).json({success: false, message: 'Customer already exists'});
  }

  customer = await Customer.create({
    firstName, lastName, email, userId: ObjectId(user.id)
  });

  // const accessToken = user.getSignedJwtToken();

  // res.status(200).json({success: true, accessToken, user});

  res.status(200).json({success: true, customer});
}) 

exports.list = async (req, res) => {
  try {

    // let page = 1;
    // let skip = 0;
    // let limit = 25;
    // let search = '';
    // let orderBy = 'name';
    // let orderDirection = -1;
    // ({ page, skip, limit, search, orderBy, orderDirection } = req.query);

    // console.log({ page, skip, limit, search, orderBy, orderDirection })
    const {
      page = 1,
      skip = 0,
      limit = 25,
      search = '',
      orderBy = 'name',
      orderDirection = -1
    } = req.query;

    // const { orderDirection } = req.query;

    let match = {
      userId: ObjectId(req.user.id)
    };
    let searchOr = {};
    const sort = {};

    if (search) {
      searchOr = {
        $or: [
          { firstname: { $regex: search, $options: 'i' } },
          { lastname: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
        ],
      };
      match = { ...match, searchOr };
    }
    
    if (orderBy && orderDirection) {
      if (orderBy === 'name') {
        sort.firstname = parseInt(orderDirection);
        sort.lastname = parseInt(orderDirection);
        sort.email = parseInt(orderDirection);
      } else if (orderBy === 'money_spent') {
        sort.money_spent = parseInt(orderDirection);
      } else if (orderBy === 'plan') {
        sort.planName = parseInt(orderDirection);
      } else {
        sort[orderBy] = parseInt(orderDirection);
      }
    }

    const data = await User.aggregate([
      { $match: match },
      {
        $lookup: {
          from: 'invoice',
          localField: '_id',
          foreignField: 'userId',
          as: 'user_invoice',
        },
      },
      { $addFields: { money_spent: { $sum: '$user_invoice.amountPaid' } } },
      { $sort: sort },
      { $skip: parseInt(skip) },
      { $limit: parseInt(limit) },
    ]);

    const total = await User.count(match);

    return res.status(200).json({
      data,
      page,
      total,
    });
  } catch (error) {
    console.log('error', error.message);
    return res.json({ error: error.message });
  }
};