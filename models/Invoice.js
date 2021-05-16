const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const invoiceSchema = mongoose.Schema({
  stripeId: String,
  userId: { type: ObjectId, ref: 'User', index: true },
  customerId: { type: ObjectId, ref: 'Customer', index: true },
  createdAt: {
    type: Date,
    default: Date.now 
  },  
  amountDue: Number,
  amountPaid: Number,
  amountRemaining: Number,
  attemptCount: Number,
  attempted: Boolean,
  billingReason: String,
  charge: String,
  currency: String,
  customer: String,
  metadata: Object,
  periodEnd: Number,
  periodStart: Number,
  status: String,
  subscription: String,
  subtotal: Number,
  total: Number,
  dueDate: Number,
  nextPaymentAttempt: Number,
  paid: Boolean,

});

module.exports = mongoose.model('Invoice', invoiceSchema);
