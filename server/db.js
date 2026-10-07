import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');
const LOCAL_STORE_FILE = path.join(DATA_DIR, 'fitzone_store.json');

// Initial seed data exactly matching the reference image and gym features
const INITIAL_SEED = {
  plans: [
    {
      id: 1,
      name: "Basic Plan",
      slug: "basic",
      monthly_price: 999,
      yearly_price: 9990,
      currency: "₹",
      is_popular: false,
      description: "Ideal for beginners starting their fitness routine.",
      features: [
        "Gym Access",
        "Basic Training Plan",
        "Locker Facility",
        "Community Support"
      ]
    },
    {
      id: 2,
      name: "Premium Plan",
      slug: "premium",
      monthly_price: 1499,
      yearly_price: 14990,
      currency: "₹",
      is_popular: true,
      description: "Best balance of coaching, nutrition and facilities.",
      features: [
        "Gym Access",
        "Personal Training (2 sessions)",
        "Diet Plan",
        "Locker Facility",
        "Community Support"
      ]
    },
    {
      id: 3,
      name: "Pro Plan",
      slug: "pro",
      monthly_price: 1999,
      yearly_price: 19990,
      currency: "₹",
      is_popular: false,
      description: "Complete elite coaching with 24/7 dedicated support.",
      features: [
        "All Premium Features",
        "Unlimited Personal Training",
        "Advanced Training Plan",
        "Nutrition Consultation",
        "Priority Support"
      ]
    }
  ],
  trainers: [
    {
      id: 1,
      name: "Rahul Sharma",
      specialty: "Strength & Conditioning",
      experience_years: 7,
      bio: "Certified CSCS strength coach specializing in hypertrophy, Olympic lifts, and athletic power development.",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=600&auto=format&fit=crop&q=80",
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
      linkedin: "https://linkedin.com",
      certifications: "NSCA-CSCS, ACE Fitness Specialist"
    },
    {
      id: 2,
      name: "Priya Mehta",
      specialty: "Yoga & Wellness",
      experience_years: 6,
      bio: "Master yogi and mindfulness practitioner helping athletes develop mobility, core stability, and mental clarity.",
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80",
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
      linkedin: "https://linkedin.com",
      certifications: "RYT-500 Yoga Alliance, Posture Specialist"
    },
    {
      id: 3,
      name: "Aman Verma",
      specialty: "CrossFit Expert",
      experience_years: 8,
      bio: "CrossFit Level 3 trainer who pushes members beyond mental limits with high-intensity metabolic conditioning.",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80",
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
      linkedin: "https://linkedin.com",
      certifications: "CrossFit-L3, Kettlebell Master"
    },
    {
      id: 4,
      name: "Neha Singh",
      specialty: "Cardio & Fitness",
      experience_years: 5,
      bio: "High-energy endurance specialist focusing on HIIT, aerobic capacity, VO2 max optimization, and fat shred.",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=600&auto=format&fit=crop&q=80",
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
      linkedin: "https://linkedin.com",
      certifications: "NASM-CPT, Spin Master Instructor"
    }
  ],
  classes: [
    { id: 1, title: "Iron Forge Strength", category: "Strength", trainer_name: "Rahul Sharma", day_of_week: "Monday", time_slot: "06:00 AM - 07:15 AM", capacity: 20, booked_count: 14, intensity: "High" },
    { id: 2, title: "Metabolic HIIT Blast", category: "Cardio", trainer_name: "Neha Singh", day_of_week: "Monday", time_slot: "07:30 AM - 08:30 AM", capacity: 25, booked_count: 21, intensity: "Extreme" },
    { id: 3, title: "CrossFit WOD Titan", category: "CrossFit", trainer_name: "Aman Verma", day_of_week: "Tuesday", time_slot: "06:00 PM - 07:00 PM", capacity: 18, booked_count: 16, intensity: "Extreme" },
    { id: 4, title: "Vinyasa Flow & Restore", category: "Yoga", trainer_name: "Priya Mehta", day_of_week: "Wednesday", time_slot: "07:00 AM - 08:00 AM", capacity: 20, booked_count: 11, intensity: "Medium" },
    { id: 5, title: "Deadlift & Powerlifting Clinic", category: "Strength", trainer_name: "Rahul Sharma", day_of_week: "Thursday", time_slot: "06:30 PM - 07:45 PM", capacity: 15, booked_count: 13, intensity: "High" },
    { id: 6, title: "Cardio Shred Interval", category: "Cardio", trainer_name: "Neha Singh", day_of_week: "Friday", time_slot: "07:00 AM - 08:00 AM", capacity: 25, booked_count: 18, intensity: "High" },
    { id: 7, title: "Saturday Spartan Circuit", category: "CrossFit", trainer_name: "Aman Verma", day_of_week: "Saturday", time_slot: "09:00 AM - 10:30 AM", capacity: 30, booked_count: 27, intensity: "Extreme" }
  ],
  members: [
    {
      id: 1,
      membership_code: "FZ-MEM-1001",
      full_name: "Aditya Roy",
      email: "aditya.roy@example.com",
      phone: "+91 98711 22334",
      plan: "Premium Plan",
      billing_cycle: "monthly",
      amount_paid: 1499,
      payment_method: "UPI",
      start_date: "2026-09-01",
      expiry_date: "2026-10-01",
      status: "active",
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      membership_code: "FZ-MEM-1002",
      full_name: "Ananya Deshmukh",
      email: "ananya.d@example.com",
      phone: "+91 98123 45678",
      plan: "Pro Plan",
      billing_cycle: "yearly",
      amount_paid: 19990,
      payment_method: "Credit Card",
      start_date: "2026-08-15",
      expiry_date: "2027-08-15",
      status: "active",
      created_at: new Date().toISOString()
    }
  ],
  reviews: [
    {
      id: 1,
      member_name: "Amit Kumar",
      role_or_title: "Strength Member",
      rating: 5,
      comment: "Amazing environment, professional trainers and great results!",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      created_at: "2026-09-10"
    },
    {
      id: 2,
      member_name: "Sneha Patel",
      role_or_title: "Yoga & HIIT Member",
      rating: 5,
      comment: "FitZone has completely transformed my fitness journey. Highly recommended!",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      created_at: "2026-09-15"
    },
    {
      id: 3,
      member_name: "Vikram Singh",
      role_or_title: "CrossFit Athlete",
      rating: 5,
      comment: "Best gym in the city with modern equipment and great support.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      created_at: "2026-09-20"
    }
  ],
  inquiries: [
    {
      id: 1,
      name: "Rohan Kapoor",
      email: "rohan@example.com",
      phone: "+91 99887 66554",
      subject: "Personal Training Consultation",
      message: "Interested in 1-on-1 coaching for powerlifting with Rahul Sharma.",
      status: "new",
      created_at: new Date().toISOString()
    }
  ],
  subscribers: [
    { id: 1, email: "fitnesslover@gmail.com", subscribed_at: new Date().toISOString() }
  ],
  bookings: [
    {
      id: 1,
      booking_code: "BK-FZ-781",
      class_id: 1,
      class_title: "Iron Forge Strength",
      member_name: "Aditya Roy",
      member_email: "aditya.roy@example.com",
      member_phone: "+91 98711 22334",
      booking_date: "2026-10-02",
      time_slot: "06:00 AM - 07:15 AM",
      status: "confirmed",
      created_at: new Date().toISOString()
    }
  ]
};

let dbMode = 'fallback'; // 'mysql' or 'fallback'
let mysqlPool = null;

// File store helper
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(LOCAL_STORE_FILE)) {
    fs.writeFileSync(LOCAL_STORE_FILE, JSON.stringify(INITIAL_SEED, null, 2), 'utf-8');
  }
}

function readLocalStore() {
  ensureDataDir();
  try {
    const raw = fs.readFileSync(LOCAL_STORE_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_SEED;
  }
}

function writeLocalStore(data) {
  ensureDataDir();
  fs.writeFileSync(LOCAL_STORE_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// Database Initialization
export async function initDatabase() {
  const host = process.env.DB_HOST || 'localhost';
  const user = process.env.DB_USER || 'root';
  const password = process.env.DB_PASSWORD || '';
  const port = parseInt(process.env.DB_PORT || '3306');
  const database = process.env.DB_NAME || 'fitzone_db';

  try {
    console.log(`[FitZone DB] Connecting to MySQL at ${host}:${port} as ${user}...`);
    const adminConn = await mysql.createConnection({
      host,
      user,
      password,
      port,
      connectTimeout: 4000
    });

    await adminConn.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    await adminConn.end();

    mysqlPool = mysql.createPool({
      host,
      user,
      password,
      database,
      port,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    // Run table initialization
    await mysqlPool.query(`
      CREATE TABLE IF NOT EXISTS plans (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        slug VARCHAR(50) NOT NULL UNIQUE,
        monthly_price INT NOT NULL,
        yearly_price INT NOT NULL,
        currency VARCHAR(10) DEFAULT '₹',
        is_popular BOOLEAN DEFAULT FALSE,
        description VARCHAR(255),
        features JSON NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await mysqlPool.query(`
      CREATE TABLE IF NOT EXISTS trainers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        specialty VARCHAR(100) NOT NULL,
        experience_years INT DEFAULT 5,
        bio TEXT,
        rating DECIMAL(2, 1) DEFAULT 4.9,
        image VARCHAR(255),
        instagram VARCHAR(255),
        facebook VARCHAR(255),
        linkedin VARCHAR(255),
        certifications VARCHAR(255)
      );
    `);

    await mysqlPool.query(`
      CREATE TABLE IF NOT EXISTS classes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        category VARCHAR(50) NOT NULL,
        trainer_name VARCHAR(100) NOT NULL,
        day_of_week VARCHAR(20) NOT NULL,
        time_slot VARCHAR(50) NOT NULL,
        capacity INT DEFAULT 20,
        booked_count INT DEFAULT 0,
        intensity VARCHAR(20) DEFAULT 'High'
      );
    `);

    await mysqlPool.query(`
      CREATE TABLE IF NOT EXISTS members (
        id INT AUTO_INCREMENT PRIMARY KEY,
        membership_code VARCHAR(30) UNIQUE NOT NULL,
        full_name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        phone VARCHAR(20) NOT NULL,
        plan VARCHAR(50) NOT NULL,
        billing_cycle VARCHAR(20) DEFAULT 'monthly',
        amount_paid DECIMAL(10, 2) NOT NULL,
        payment_method VARCHAR(50) DEFAULT 'UPI',
        start_date DATE NOT NULL,
        expiry_date DATE NOT NULL,
        status VARCHAR(20) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await mysqlPool.query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id INT AUTO_INCREMENT PRIMARY KEY,
        member_name VARCHAR(100) NOT NULL,
        role_or_title VARCHAR(100) DEFAULT 'FitZone Member',
        rating INT DEFAULT 5,
        comment TEXT NOT NULL,
        avatar VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await mysqlPool.query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        booking_code VARCHAR(30) UNIQUE NOT NULL,
        class_id INT,
        class_title VARCHAR(100) NOT NULL,
        member_name VARCHAR(100) NOT NULL,
        member_email VARCHAR(100) NOT NULL,
        member_phone VARCHAR(20) NOT NULL,
        booking_date DATE NOT NULL,
        time_slot VARCHAR(50) NOT NULL,
        status VARCHAR(20) DEFAULT 'confirmed',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await mysqlPool.query(`
      CREATE TABLE IF NOT EXISTS inquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        subject VARCHAR(150),
        message TEXT NOT NULL,
        status VARCHAR(20) DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await mysqlPool.query(`
      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(100) UNIQUE NOT NULL,
        subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Check if plans already seeded
    const [existingPlans] = await mysqlPool.query('SELECT COUNT(*) as count FROM plans');
    if (existingPlans[0].count === 0) {
      for (const p of INITIAL_SEED.plans) {
        await mysqlPool.query(
          'INSERT INTO plans (name, slug, monthly_price, yearly_price, currency, is_popular, description, features) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [p.name, p.slug, p.monthly_price, p.yearly_price, p.currency, p.is_popular, p.description, JSON.stringify(p.features)]
        );
      }
      for (const t of INITIAL_SEED.trainers) {
        await mysqlPool.query(
          'INSERT INTO trainers (name, specialty, experience_years, bio, rating, image, instagram, facebook, linkedin, certifications) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [t.name, t.specialty, t.experience_years, t.bio, t.rating, t.image, t.instagram, t.facebook, t.linkedin, t.certifications]
        );
      }
      for (const c of INITIAL_SEED.classes) {
        await mysqlPool.query(
          'INSERT INTO classes (title, category, trainer_name, day_of_week, time_slot, capacity, booked_count, intensity) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [c.title, c.category, c.trainer_name, c.day_of_week, c.time_slot, c.capacity, c.booked_count, c.intensity]
        );
      }
      for (const r of INITIAL_SEED.reviews) {
        await mysqlPool.query(
          'INSERT INTO reviews (member_name, role_or_title, rating, comment, avatar) VALUES (?, ?, ?, ?, ?)',
          [r.member_name, r.role_or_title, r.rating, r.comment, r.avatar]
        );
      }
      for (const m of INITIAL_SEED.members) {
        await mysqlPool.query(
          'INSERT INTO members (membership_code, full_name, email, phone, plan, billing_cycle, amount_paid, payment_method, start_date, expiry_date, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [m.membership_code, m.full_name, m.email, m.phone, m.plan, m.billing_cycle, m.amount_paid, m.payment_method, m.start_date, m.expiry_date, m.status]
        );
      }
      console.log('[FitZone DB] MySQL initialized and seeded successfully!');
    }

    dbMode = 'mysql';
    console.log('[FitZone DB] Connected to MySQL successfully. Storage Mode: MYSQL');
    return { mode: 'mysql' };
  } catch (error) {
    console.warn(`[FitZone DB] Notice: Could not connect to MySQL server (${error.message}).`);
    console.log('[FitZone DB] Activating resilient Local Data Store. All endpoints will function 100% reliably.');
    console.log('[FitZone DB] To link your live MySQL server, set correct DB_PASSWORD in server/.env.');
    dbMode = 'fallback';
    ensureDataDir();
    return { mode: 'fallback', reason: error.message };
  }
}

export function getDbMode() {
  return dbMode;
}

// Data Access Methods
export async function getPlans() {
  if (dbMode === 'mysql') {
    const [rows] = await mysqlPool.query('SELECT * FROM plans ORDER BY id ASC');
    return rows.map(r => ({
      ...r,
      features: typeof r.features === 'string' ? JSON.parse(r.features) : r.features,
      is_popular: Boolean(r.is_popular)
    }));
  }
  return readLocalStore().plans;
}

export async function getTrainers() {
  if (dbMode === 'mysql') {
    const [rows] = await mysqlPool.query('SELECT * FROM trainers ORDER BY id ASC');
    return rows;
  }
  return readLocalStore().trainers;
}

export async function getClasses(day, category) {
  if (dbMode === 'mysql') {
    let sql = 'SELECT * FROM classes WHERE 1=1';
    const params = [];
    if (day && day !== 'All') {
      sql += ' AND day_of_week = ?';
      params.push(day);
    }
    if (category && category !== 'All') {
      sql += ' AND category = ?';
      params.push(category);
    }
    sql += ' ORDER BY id ASC';
    const [rows] = await mysqlPool.query(sql, params);
    return rows;
  }
  let list = readLocalStore().classes;
  if (day && day !== 'All') list = list.filter(c => c.day_of_week === day);
  if (category && category !== 'All') list = list.filter(c => c.category.toLowerCase() === category.toLowerCase());
  return list;
}

export async function createMember(memberData) {
  const code = 'FZ-' + Math.floor(100000 + Math.random() * 900000);
  const now = new Date();
  const startDate = now.toISOString().split('T')[0];
  const expiry = new Date(now);
  if (memberData.billing_cycle === 'yearly') {
    expiry.setFullYear(expiry.getFullYear() + 1);
  } else {
    expiry.setMonth(expiry.getMonth() + 1);
  }
  const expiryDate = expiry.toISOString().split('T')[0];

  const newMember = {
    membership_code: code,
    full_name: memberData.full_name,
    email: memberData.email,
    phone: memberData.phone || '',
    plan: memberData.plan || 'Premium Plan',
    billing_cycle: memberData.billing_cycle || 'monthly',
    amount_paid: memberData.amount_paid || 1499,
    payment_method: memberData.payment_method || 'UPI',
    start_date: startDate,
    expiry_date: expiryDate,
    status: 'active',
    created_at: new Date().toISOString()
  };

  if (dbMode === 'mysql') {
    const [result] = await mysqlPool.query(
      `INSERT INTO members (membership_code, full_name, email, phone, plan, billing_cycle, amount_paid, payment_method, start_date, expiry_date, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        newMember.membership_code,
        newMember.full_name,
        newMember.email,
        newMember.phone,
        newMember.plan,
        newMember.billing_cycle,
        newMember.amount_paid,
        newMember.payment_method,
        newMember.start_date,
        newMember.expiry_date,
        newMember.status
      ]
    );
    newMember.id = result.insertId;
    return newMember;
  }

  const store = readLocalStore();
  newMember.id = store.members.length ? Math.max(...store.members.map(m => m.id)) + 1 : 1;
  store.members.push(newMember);
  writeLocalStore(store);
  return newMember;
}

export async function getMembers() {
  if (dbMode === 'mysql') {
    const [rows] = await mysqlPool.query('SELECT * FROM members ORDER BY id DESC');
    return rows;
  }
  return readLocalStore().members;
}

export async function bookClass(bookingData) {
  const bookingCode = 'BK-FZ-' + Math.floor(1000 + Math.random() * 9000);
  const newBooking = {
    booking_code: bookingCode,
    class_id: bookingData.class_id,
    class_title: bookingData.class_title,
    member_name: bookingData.member_name,
    member_email: bookingData.member_email,
    member_phone: bookingData.member_phone,
    booking_date: bookingData.booking_date || new Date().toISOString().split('T')[0],
    time_slot: bookingData.time_slot,
    status: 'confirmed',
    created_at: new Date().toISOString()
  };

  if (dbMode === 'mysql') {
    const [res] = await mysqlPool.query(
      `INSERT INTO bookings (booking_code, class_id, class_title, member_name, member_email, member_phone, booking_date, time_slot, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        newBooking.booking_code,
        newBooking.class_id,
        newBooking.class_title,
        newBooking.member_name,
        newBooking.member_email,
        newBooking.member_phone,
        newBooking.booking_date,
        newBooking.time_slot,
        newBooking.status
      ]
    );
    // increment booked_count
    await mysqlPool.query('UPDATE classes SET booked_count = booked_count + 1 WHERE id = ?', [bookingData.class_id]);
    newBooking.id = res.insertId;
    return newBooking;
  }

  const store = readLocalStore();
  newBooking.id = store.bookings.length ? Math.max(...store.bookings.map(b => b.id)) + 1 : 1;
  store.bookings.push(newBooking);
  const cls = store.classes.find(c => c.id === bookingData.class_id);
  if (cls) cls.booked_count = (cls.booked_count || 0) + 1;
  writeLocalStore(store);
  return newBooking;
}

export async function createInquiry(inquiryData) {
  const newInquiry = {
    name: inquiryData.name,
    email: inquiryData.email,
    phone: inquiryData.phone || '',
    subject: inquiryData.subject || 'General Inquiry',
    message: inquiryData.message,
    status: 'new',
    created_at: new Date().toISOString()
  };

  if (dbMode === 'mysql') {
    const [res] = await mysqlPool.query(
      `INSERT INTO inquiries (name, email, phone, subject, message, status) VALUES (?, ?, ?, ?, ?, ?)`,
      [newInquiry.name, newInquiry.email, newInquiry.phone, newInquiry.subject, newInquiry.message, newInquiry.status]
    );
    newInquiry.id = res.insertId;
    return newInquiry;
  }

  const store = readLocalStore();
  newInquiry.id = store.inquiries.length ? Math.max(...store.inquiries.map(i => i.id)) + 1 : 1;
  store.inquiries.push(newInquiry);
  writeLocalStore(store);
  return newInquiry;
}

export async function subscribeNewsletter(email) {
  if (dbMode === 'mysql') {
    await mysqlPool.query(
      `INSERT INTO newsletter_subscribers (email) VALUES (?) ON DUPLICATE KEY UPDATE subscribed_at = CURRENT_TIMESTAMP`,
      [email]
    );
    return { success: true, email };
  }

  const store = readLocalStore();
  if (!store.subscribers.some(s => s.email.toLowerCase() === email.toLowerCase())) {
    store.subscribers.push({
      id: store.subscribers.length + 1,
      email,
      subscribed_at: new Date().toISOString()
    });
    writeLocalStore(store);
  }
  return { success: true, email };
}

export async function getReviews() {
  if (dbMode === 'mysql') {
    const [rows] = await mysqlPool.query('SELECT * FROM reviews ORDER BY id ASC');
    return rows;
  }
  return readLocalStore().reviews;
}

export async function getStats() {
  const members = await getMembers();
  const trainers = await getTrainers();
  const classes = await getClasses();
  return {
    happyMembersCount: '10K+',
    expertTrainersCount: '50+',
    yearsExperience: '5+',
    activeMembers: members.length,
    totalTrainers: trainers.length,
    activeClasses: classes.length,
    dbMode
  };
}
