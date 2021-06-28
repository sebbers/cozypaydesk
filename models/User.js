const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const Invoice = require('./invoice');

// Use native promises.
mongoose.Promise = global.Promise;

// Define the Invoice schema.
const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  role: { type: String, default: 'user', enum: ['user', 'admin', 'client'] },

  firstName: String,
  lastName: String,
  address: String,
  postalCode: String,
  city: String,
  state: { type: String}, 
  country: { type: String, default: 'US' },
  created: { type: Date, default: Date.now },
  // rocket: {
  //   model: String,
  //   license: String,
  //   color: String
  // },
  businessName: String,

  // Stripe account ID to send payments obtained with Stripe Connect.
  stripeAccountId: String,

  // Has this pilot been verified by Stripe?
  stripeVerified: { type: Boolean, default: false }
});

// Return a pilot name for display.
UserSchema.methods.displayName = function() {
  // if (this.type === 'company') {
  //   return this.businessName;
  // } else {
  //   return `${this.firstName} ${this.lastName}`;
  // }
  return `${this.firstName} ${this.lastName}`;
};

// List rides of the past week for the pilot.
UserSchema.methods.listRecentInvoices = function() {
  const weekAgo = Date.now() - (7*24*60*60*1000);
  return Invoice.find({ user: this, created: { $gte: weekAgo } })
    .populate('client')
    .sort({ created: -1 })
    .exec();
};

// Generate a password hash (with an auto-generated salt for simplicity here).
UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, 8);
};

// Check if the password is valid by comparing with the stored hash.
UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

// Get the first fully onboarded user.
UserSchema.statics.getFirstOnboarded = function() {
  return User.findOne({ stripeAccountId: { $ne: null }, role: 'user' })
    .sort({ created: 1 })
    .exec();
};

// Get the latest fully onboarded user.
UserSchema.statics.getLatestOnboarded = function() {
  return User.findOne({ stripeAccountId: { $ne: null }, role: 'user' })
    .sort({ created: -1 })
    .exec();
};

// Make sure the email has not been used.
UserSchema.path('email').validate({
  isAsync: true,
  validator: function(email, callback) {
    const User = mongoose.model('User');
    // Check only when it is a new pilot or when the email has been modified.
    if (this.isNew || this.isModified('email')) {
      User.find({ email: email }).exec(function(err, pilots) {
        callback(!err && pilots.length === 0);
      });
    } else {
      callback(true);
    }
  },
  message: 'This email already exists. Please try to log in instead.',
});

// Pre-save hook to ensure consistency.
UserSchema.pre('save', function(next) {
  // // Make sure certain fields are blank depending on the pilot type.
  // if (this.isModified('type')) {
  //   if (this.type === 'individual') {
  //     this.businessName = null;
  //   } else {
  //     this.firstName = null;
  //     this.lastName = null;
  //   }
  // }
  // Make sure the password is hashed before being stored.
  if (this.isModified('password')) {
    this.password = this.generateHash(this.password);
  }
  next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;