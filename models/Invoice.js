const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Use native promises.
mongoose.Promise = global.Promise;

// Define the Ride schema.
const InvoiceSchema = new Schema({
  user: { type : Schema.ObjectId, ref : 'User', required: true },
  client: { type : Schema.ObjectId, ref : 'Client', required: true },
  // origin: { type: [Number], index: '2d', sparse: true, default: [37.7765030, -122.3920385] },
  // destination: { type: [Number], index: '2d', sparse: true, default: [37.8199286, -122.4782551] },
  // pickupTime: { type: Date, default: Date.now },
  // dropoffTime: { type: Date, default: new Date((new Date).getTime() + Math.floor(10 * Math.random()) * 60000) },
  amount: Number,
  currency: { type: String, default: 'usd' },
  created: { type: Date, default: Date.now },

  // Stripe Payment Intent ID corresponding to this ride.
  stripePaymentIntentId: String
});

// Return the ride amount for the user after collecting 20% platform fees.
InvoiceSchema.methods.amountForUser = function() {
  return parseInt(this.amount * 0.8);
};

const Invoice = mongoose.model('Invoice', InvoiceSchema);

module.exports = Invoice;
