# FitZone — Full Stack Gym & Fitness Web Application 🏋️‍♂️

A high-performance gym web application inspired by modern athletic fitness aesthetics, built with **React**, **Tailwind CSS**, **Node.js (Express)**, and **MySQL**.

![FitZone Hero Preview](./client/public/images/hero.jpg)

---

## 🌟 Key Features & Visual Layout

### 1. Header & Navigation (`Navbar.jsx`)
- **FitZone Logo**: Brand badge with glowing red barbell icon and bold athletic typography.
- **Navigation Links**: Home, About, Services, Trainers, Membership, Schedule, and Contact with smooth scrollspy.
- **Search Palette**: Instant interactive search modal for finding classes, trainers, plans, and workouts.
- **Database & Admin Badge**: Real-time status indicator displaying live connection mode (`MySQL` or local fallback).
- **"Join Now" Button**: Quick access to the VIP membership registration modal.

### 2. Hero Section (`Hero.jsx`)
- **Headline**: High-impact bold athletic typography matching reference:
  - Tagline: `BE STRONGER EVERYDAY`
  - Headline: `BUILD YOUR BEST VERSION` (with glowing crimson red emphasis)
  - Subtitle: *"Join FitZone and get expert training, modern equipment and a supportive community to achieve your fitness goals."*
- **Action CTAs**:
  - `Join Now ->` (red pill button)
  - `Watch Video` (cinematic gym trailer player modal)
- **Live Stats Strip**:
  - **10K+** Happy Members
  - **50+** Expert Trainers
  - **5+** Years Experience
- **4 Feature Cards Strip**:
  - **Expert Trainers** (*Learn from certified and experienced trainers.*)
  - **Modern Equipment** (*Train with top quality equipment.*)
  - **Flexible Plans** (*Choose a plan that suits your goals.*)
  - **Supportive Community** (*Be part of a motivated fitness community.*)

### 3. Programs Built For Every Goal (`Services.jsx`)
- 4 Featured interactive cards with dark gradient overlays, hover zoom, and circular arrow buttons:
  - **Strength Training** (Powerlifting, compound lifts, hypertrophy)
  - **Cardio Fitness** (Curved treadmills, aerobic endurance, HIIT)
  - **CrossFit** (Metabolic conditioning, battle ropes, Olympic lifting)
  - **Yoga & Flexibility** (Mobility, mental clarity, core stability)
- Clicking any program card displays curriculum details, calories burned, duration, and direct enrollment.

### 4. Membership Plans (`Membership.jsx`)
- Interactive **Monthly / Yearly** toggle with yearly discount badge (`-17%`).
- 3 Tiered pricing cards matching reference image:
  - **Basic Plan** — ₹999/month (Gym access, basic training plan, locker, community)
  - **Premium Plan** — ₹1,499/month (**Most Popular** red badge, glowing neon red border, personal training sessions, diet plan)
  - **Pro Plan** — ₹1,999/month (Diamond tier, unlimited personal training, nutrition consultation, priority 24/7 support)

### 5. Elite Trainers (`Trainers.jsx`)
- Trainer profiles matching the reference image:
  - **Rahul Sharma** (Strength & Conditioning Coach)
  - **Priya Mehta** (Yoga & Wellness Specialist)
  - **Aman Verma** (CrossFit Expert)
  - **Neha Singh** (Cardio & Fitness Specialist)
- Social media links (Instagram, Facebook, LinkedIn) and **1-on-1 Free Trial Session Booking Modal**.

### 6. Dynamic Full-Stack Features
- **Biometric BMI & Calorie Goal Calculator** (`BmiCalculator.jsx`): Real-time sliders for height, weight, age, and activity level. Calculates BMI, health category, and recommended FitZone workout.
- **Weekly Class Timetable & Slot Booking** (`ClassSchedule.jsx`): Live capacity tracker, day-by-day scheduler (Monday–Saturday), and instant seat reservation.
- **Membership Checkout & VIP Pass Generator** (`JoinModal.jsx`): 3-step registration flow with celebratory confetti and digital VIP pass generation complete with barcode and member code (`FZ-MEM-XXXXXX`).
- **Database & Operations Console** (`AdminModal.jsx`): Inspect registered members, total revenue, class bookings, contact inquiries, and database schema.
- **Member Testimonials Carousel** (`Testimonials.jsx`): Star reviews by Amit Kumar, Sneha Patel, and Vikram Singh, plus a "Write a Review" submission modal.
- **Contact & Club Details** (`Contact.jsx`): Club address in Jaipur, phone helpline, and inquiry form saving directly to the database.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, Vite, Tailwind CSS v4, Lucide Icons, Canvas Confetti |
| **Backend** | Node.js, Express.js, CORS, Dotenv |
| **Database** | MySQL 8.0 (with `mysql2/promise`) + Intelligent fallback mode |
| **Styling** | Modern dark glassmorphism, crimson gradients, Outfit & Inter fonts |

---

## 🚀 Getting Started

### 1. Installation

Install dependencies in root, client, and server:

```powershell
# In the project root:
npm install
cd client && npm install
cd ../server && npm install
cd ..
```

### 2. Running Client & Server Together

Run both backend API (port 5000) and frontend (port 5173) concurrently:

```powershell
npm run dev
```

- **Frontend Application**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000](http://localhost:5000)
- **API Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

### 3. MySQL Database Setup

The backend is pre-configured to connect to MySQL Server 8.0.

1. Open `server/.env` and update your MySQL password if set:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_root_password
   DB_NAME=fitzone_db
   DB_PORT=3306
   ```

2. When the server starts, it will automatically:
   - Create database `fitzone_db`
   - Execute table creation scripts (`plans`, `members`, `trainers`, `classes`, `bookings`, `inquiries`, `reviews`)
   - Seed default plans, trainers, classes, and testimonials matching the reference image!

> **Note**: If your local MySQL service has a different password or is stopped, the server automatically activates a resilient local database engine so all features, member registrations, and class bookings work seamlessly without crashes!

---

## 📁 Project Structure

```
FitZone/
├── client/                      # React + Vite Frontend
│   ├── public/
│   │   └── images/              # Hero & workout photography
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx       # Header with logo, links & search
│   │   │   ├── Hero.jsx         # Hero section & stats
│   │   │   ├── Services.jsx     # 4 Program cards & details
│   │   │   ├── Membership.jsx   # Pricing plans & toggle
│   │   │   ├── Trainers.jsx     # Trainer cards & trial booking
│   │   │   ├── BmiCalculator.jsx# Biometric fitness analyzer
│   │   │   ├── ClassSchedule.jsx# Timetable & slot booking
│   │   │   ├── Testimonials.jsx # Reviews carousel & submit
│   │   │   ├── Contact.jsx      # Contact form & club hours
│   │   │   ├── Footer.jsx       # Footer & newsletter
│   │   │   ├── JoinModal.jsx    # VIP pass & checkout flow
│   │   │   ├── VideoModal.jsx   # Showcase video modal
│   │   │   ├── AdminModal.jsx   # DB console & member directory
│   │   │   ├── SearchModal.jsx  # Search palette
│   │   │   └── SocialIcons.jsx  # SVG social icons
│   │   ├── services/
│   │   │   └── api.js           # REST API client
│   │   ├── App.jsx              # Application root
│   │   ├── index.css            # Tailwind styles & theme
│   │   └── main.jsx             # Entry point
│   ├── index.html
│   └── vite.config.js           # Vite config with API proxy
├── server/                      # Node.js + Express Backend
│   ├── data/                    # Storage directory
│   ├── db.js                    # MySQL database pool & queries
│   ├── server.js                # Express REST API routes
│   ├── schema.sql               # MySQL relational database schema
│   ├── .env                     # MySQL & server credentials
│   └── package.json
├── package.json                 # Root unified dev script
└── README.md
```

---

## 🔒 License & Copyright
© 2026 FitZone. All Rights Reserved.
