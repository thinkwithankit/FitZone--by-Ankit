import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {
  initDatabase,
  getDbMode,
  getPlans,
  getTrainers,
  getClasses,
  createMember,
  getMembers,
  bookClass,
  createInquiry,
  subscribeNewsletter,
  getReviews,
  getStats
} from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health & Status
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    appName: 'FitZone Gym API',
    database: getDbMode(),
    timestamp: new Date().toISOString()
  });
});

// Stats
app.get('/api/stats', async (req, res) => {
  try {
    const stats = await getStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Plans
app.get('/api/plans', async (req, res) => {
  try {
    const plans = await getPlans();
    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Trainers
app.get('/api/trainers', async (req, res) => {
  try {
    const trainers = await getTrainers();
    res.json(trainers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Classes & Timetable
app.get('/api/classes', async (req, res) => {
  try {
    const { day, category } = req.query;
    const classes = await getClasses(day, category);
    res.json(classes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Book a Class Slot
app.post('/api/bookings', async (req, res) => {
  try {
    const { class_id, class_title, member_name, member_email, member_phone, booking_date, time_slot } = req.body;
    if (!class_id || !member_name || !member_email) {
      return res.status(400).json({ error: 'Class ID, member name, and email are required.' });
    }
    const booking = await bookClass({
      class_id: parseInt(class_id),
      class_title,
      member_name,
      member_email,
      member_phone,
      booking_date,
      time_slot
    });
    res.status(201).json({ success: true, message: 'Class slot successfully booked!', booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Join / Register New Member
app.post('/api/members', async (req, res) => {
  try {
    const { full_name, email, phone, plan, billing_cycle, amount_paid, payment_method } = req.body;
    if (!full_name || !email || !plan) {
      return res.status(400).json({ error: 'Full name, email, and plan are required.' });
    }
    const member = await createMember({
      full_name,
      email,
      phone,
      plan,
      billing_cycle,
      amount_paid,
      payment_method
    });
    res.status(201).json({ success: true, message: 'Welcome to FitZone! Membership activated.', member });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Members (Admin view)
app.get('/api/members', async (req, res) => {
  try {
    const members = await getMembers();
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Contact / Inquiries
app.post('/api/inquiries', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }
    const inquiry = await createInquiry({ name, email, phone, subject, message });
    res.status(201).json({ success: true, message: 'Inquiry submitted. A trainer will contact you shortly!', inquiry });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Newsletter Subscription
app.post('/api/newsletter', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email address is required.' });
    }
    const result = await subscribeNewsletter(email);
    res.json({ success: true, message: 'Subscribed to FitZone newsletter!', result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Reviews / Testimonials
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await getReviews();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start Server
async function start() {
  await initDatabase();
  app.listen(PORT, () => {
    console.log(`===============================================`);
    console.log(`🚀 FitZone API Server running on http://localhost:${PORT}`);
    console.log(`📊 Mode: ${getDbMode().toUpperCase()} Storage Engine`);
    console.log(`===============================================`);
  });
}

start();
