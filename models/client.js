const config = require('../config');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Use native promises.
mongoose.Promise = global.Promise;

// Define the Client schema.
const ClientSchema = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: String,
  lastName: String,
  created: { type: Date, default: Date.now },

  // Stripe customer ID storing the payment sources.
  stripeCustomerId: String
});

// Return a client name for display.
ClientSchema.methods.displayName = function() {
  return `${this.firstName} ${this.lastName.charAt(0)}.`;
};

// Get the latest passenger.
ClientSchema.statics.getLatest = async function() {
  try {
    // Count all the passengers.
    const count = await Passenger.countDocuments().exec();
    if (count === 0) {
      // Create default passengers.
      await Passenger.insertDefaultPassengers();
    }
    // Return latest passenger.
    return Passenger.findOne()
      .sort({ created: -1 })
      .exec();
  } catch (err) {
    console.log(err);
  }
};

// Find a random client.
ClientSchema.statics.getRandom = async function() {
  try {
    // Count all the clients.
    const count = await Client.countDocuments().exec();
    if (count === 0) {
      // Create default clients.
      await Client.insertDefaultClients();
    }
    // Returns a document after skipping a random amount.
    const random = Math.floor(Math.random() * count);
    return Client.findOne().skip(random).exec();
  } catch (err) {
    console.log(err);
  }
};

// Create a few default clients for the platform to simulate invoices.
ClientSchema.statics.insertDefaultClients = async function() {
  try {
    const data = [{
      firstName: 'Jenny',
      lastName: 'Rosen',
      email: 'jenny.rosen@example.com'
    }, {
      firstName: 'Kathleen',
      lastName: 'Banks',
      email: 'kathleen.banks@example.com'
    }, {
      firstName: 'Victoria',
      lastName: 'Thompson',
      email: 'victoria.thompson@example.com'
    }, {
      firstName: 'Ruth',
      lastName: 'Hamilton',
      email: 'ruth.hamilton@example.com'
    }, {
      firstName: 'Emma',
      lastName: 'Lane',
      email: 'emma.lane@example.com'
    }];
    for (let object of data) {
      const client = new Client(object);
      // Create a Stripe account for each of the clients.
      const customer = await stripe.customers.create({
        email: client.email,
        description: client.displayName()
      });
      client.stripeCustomerId = customer.id;
      await client.save();
    }
  } catch (err) {
    console.log(err);
  }
};

const Client = mongoose.model('Client', ClientSchema);

module.exports = Client;
