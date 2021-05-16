const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const subscriptionSchema = mongoose.Schema({
  userId: { type: ObjectId, ref: 'User', index: true, require: true },
  priceId: String,
  stripeId: String,
  createdAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: [
      'active',
      'inactive',
      'waiting',
      'pending_initial_payment',
      'canceled',
      'trial'
    ]
  }
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
