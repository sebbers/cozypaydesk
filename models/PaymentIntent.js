const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const paymentIntentSchema = mongoose.Schema({
  stripeId: String,
  userId: { type: ObjectId, ref: 'User', index: true },
  customerId: { type: ObjectId, ref: 'Customer', index: true },
  createdAt: {
    type: Date,
    default: Date.now 
  },  
  amount: Number,
  amountCapturable: Number,
  amountReceived: Number,
  attemptCount: Number,
  customer: String,
  metadata: Object,
  status: String
});

module.exports = mongoose.model('PaymentIntent', paymentIntentSchema);
