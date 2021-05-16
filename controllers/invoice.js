const User = require('../models/User');

exports.list = async (req, res) => {
  try {
    const {
      page,
      skip,
      limit,
      search,
      orderBy,
    } = req.query;

    const { orderDirection } = req.query;

    let match = {};
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
      match = searchOr;
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

    const total = await User.count({});

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