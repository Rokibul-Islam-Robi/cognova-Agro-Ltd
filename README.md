# Prome Agro Foods Limited - Enterprise Full-Stack Web Platform

> **Official Reference**: [Prome Agro Foods Ltd. (prome.com.bd)](https://prome.com.bd/)  
> **Corporate HQ & Factory**: 487, Gobindapur, Moinertek, Uttarkhan, Dhaka - 1230, Bangladesh  
> **Chairman & Managing Director**: Mr. Md. Anamul Hasan Khan (CIP)  
> **Tech Stack**: Raw PHP (PHP 8+ Object-Oriented MVC/REST API) • MySQL • Tailwind CSS • React 18 • Bootstrap 5

---

## 🌟 Project Overview & Architecture

This repository delivers a modern, full-stack enterprise web platform and digital export gateway engineered specifically for **Prome Agro Foods Limited**, Bangladesh's premier food production and export company (established in 1982, reincorporated in 2002).

The platform bridges domestic retail consumers and global B2B container importers across **32+ countries** (USA, UK, UAE, Saudi Arabia, Canada, Europe, Japan, and Malaysia) with an annual manufacturing volume exceeding **1,000,000 metric tons**.

---

## 🛠️ Technology Stack Breakdown

| Layer | Technology | Key Highlights & Standards |
|---|---|---|
| **Backend** | **Raw PHP (PHP 8.2+)** | Pure Object-Oriented PHP without heavy framework bloat. Modular MVC architecture, Singleton PDO database connection, strictly parameterized prepared statements (OWASP SQLi defense), custom RESTful routing engine, pure PHP JWT authentication, input sanitization against XSS, and standardized JSON response envelopes. |
| **Database** | **MySQL (InnoDB / UTF-8mb4)** | Fully normalized relational schema with primary and foreign key constraints, indexes, cascade behaviors, and seeders mirroring Prome's authentic product lines. |
| **Frontend Framework** | **React 18** | Modular functional components with React Hooks (`useState`, `useEffect`, `useRef`), clean state management, and decoupled API consumption layer. |
| **Styling & UI** | **Tailwind CSS + Bootstrap 5** | Utility-first Tailwind CSS for modern glassmorphism, responsive grids, gradients, and custom scrollbars; Bootstrap 5 for admin dashboard data tables, badges, modals, and ERP forms. |
| **Video Integration** | **HTML5 Agro Video Player** | Autoplaying, looping agro-field harvesting and automated processing background video with custom controls (Play/Pause, Mute/Unmute, and multi-scene video switcher). |

---

## 🚀 Key Feature Deliverables

### 1. Floating Glassmorphism Navbar (Over Hero Section)
- **Positioning**: Fixed suspended floating navigation bar (`fixed top-3 inset-x-3 md:top-4 md:inset-x-8 z-50 rounded-2xl`) directly over the video hero section with `backdrop-blur-xl bg-slate-900/80 border border-white/20`.
- **Dynamic Interaction**:
  - Prome Agro Brand logo with establishment badge (Est. 1982).
  - Categorized dropdown menu covering all 11 product lines.
  - Smooth-scrolling anchor links: Products, Corporate & CIP, Agro Video, Global Export, and Contact.
  - View switcher: Toggle between **Public Storefront**, **B2B Dealer Portal**, and **Admin ERP Dashboard**.
  - Dynamic shopping cart badge counter with slide-out drawer trigger.
  - Mobile responsive drawer menu.

### 2. Agro-Related Video Hero Section
- **Background Video**: Plays crisp, high-definition agricultural harvesting footage directly in the hero background.
- **Controls**:
  - Play/Pause toggle.
  - Mute/Unmute audio toggle.
  - Scene switcher: *Agro Harvest* (tractors harvesting wheat), *Spice Milling* (cleanroom processing), *Packaging Line* (automated nitrogen-flushed conveyors), and *CIP Recognition*.
- **Hero Messaging**: Highlighting Chairman Md. Anamul Hasan Khan's 5 consecutive CIP (Industry) awards, 1M tons annual output, and 3,000+ workforce.
- **Floating Live Metric Badges**:
  - 32+ Export Destinations
  - 1M Tons Annual Output Capacity
  - 5x National CIP Award Winner
  - 3,000+ Skilled Workers & Contract Farmers

### 3. Comprehensive Product Showcase (11 Categories)
- **All Authentic Prome Categories**:
  1. **Prome Spices**: Chilli Powder, Turmeric Powder, Biryani Masala, Chicken Curry Powder, Black Pepper, Coriander.
  2. **Prome Mustard Oil**: 100% cold-pressed pure mustard oil (*Ghani Phata*).
  3. **Prome Aromatic Rice**: Heritage Dinajpur Chinigura & Kalijeera fragrant polao rice.
  4. **Prome Snacks**: Traditional Jhal Chanachur, fried lentils, and spicy Jhal Muri.
  5. **Prome Bakery & Biscuit**: Crispy salted toast biscuits and rich butter dry cake.
  6. **Prome Drinks & Juices**: Natural Rajshahi mango fruit drinks and orange soft drink powders.
  7. **Prome Pickles & Chutney**: Green mango, spiced olive, and mixed pickles in mustard oil.
  8. **Prome Pudding & Jelly**: Fruit pudding and lychee ice lolly with edible seaweed carrageenan.
  9. **Prome Natural Herbs**: Organic Sat Isabgol (Psyllium husk) and Basil Seeds (*Tokma*).
  10. **Prome Tea**: Selected CTC black tea blend from Sreemangal & Sylhet.
  11. **Prome Sauces & Semai**: Ghee-roasted Laccha Semai, hot tomato sauce, and sugarcane jaggery.
- **Features**: Real-time search filter, category pills, dual currency pricing (BDT Retail / USD Export), Quick View modal, and instant Add to Cart.

### 4. Interactive Slide-In Cart & Checkout Invoice Generator
- Domestic retail ordering (bKash / Cash on delivery).
- International B2B container consignment ordering (Letter of Credit / Bank Wire).
- Automated unique order number generation (e.g. `PRM-2026-EXP-0841` or `PRM-2026-RET-1092`).
- On-screen printable receipt / pro-forma summary.

### 5. Interactive Container Freight & Cargo Estimator
- Tailored for global importers from Dubai, London, New York, Toronto, Riyadh, and Jeddah.
- Selects 20ft Standard, 40ft High Cube, or 40ft Reefer containers.
- Calculates pallet allocations, estimated carton counts, net tonnage (MT), and FOB USD cargo value.

### 6. Video & Media Center
- 4 high-definition video documentary cards with full modal stream playback, detailing harvesting, cleanroom spice micro-grinding, robotic packaging, and CIP award ceremonies.

### 7. Admin ERP Control Dashboard
- **KPI Metrics**: Total revenue, container consignments, active SKUs, and pending inquiries.
- **Product Inventory Management**: Datatable with search, stock counters, Delete, and "+ Add New Agro Product" modal form.
- **Orders Management**: Live order status updater (`pending` ➔ `processing` ➔ `shipped` ➔ `delivered`).
- **Inquiry Desk**: Review wholesale inquiries with one-click status transitions.

### 8. B2B Wholesale Dealer Portal
- Tiered bulk discounting (Tier 1: 10% off for 500 cartons, Tier 2: 18% off for 20ft container, Tier 3: 25% off for 3+ containers).
- Bulk order carton calculator and direct booking.

---

## 📂 Project Directory Structure

```
prome-agro-platform/
├── backend/
│   ├── config/
│   │   ├── Config.php               # Environment constants, app meta, security secrets
│   │   └── Database.php             # Singleton PDO MySQL connector with strict prepared statements
│   ├── controllers/
│   │   ├── AuthController.php       # JWT login, registration, user profiles
│   │   ├── CategoryController.php   # Category listing with product counts
│   │   ├── ProductController.php    # Full product catalog CRUD, filters, search
│   │   ├── OrderController.php      # Order placement, item transaction, status update
│   │   ├── InquiryController.php    # B2B export inquiry submission & review
│   │   ├── MediaController.php      # Video gallery & hero video endpoints
│   │   └── DashboardController.php  # ERP metrics, revenue aggregation, analytics
│   ├── middleware/
│   │   ├── AuthMiddleware.php       # JWT token verification & role enforcement
│   │   └── CorsMiddleware.php       # Multi-origin CORS & preflight OPTIONS handling
│   ├── models/
│   │   ├── User.php                 # User entity & password hashing operations
│   │   ├── Category.php             # Category retrieval & relation logic
│   │   ├── Product.php              # Product queries, insert, update, delete
│   │   ├── Order.php                # Atomic multi-table order transactions
│   │   ├── Inquiry.php              # B2B inquiries database layer
│   │   └── Media.php                # Media & video gallery model
│   ├── routes/
│   │   └── api.php                  # Lightweight regex REST router
│   ├── utils/
│   │   ├── JWT.php                  # Pure PHP HS256 JWT encoder & decoder
│   │   ├── Response.php             # Standardized JSON response envelope
│   │   └── Validator.php            # Request sanitizer & payload validation rules
│   └── index.php                    # REST API entry gateway & autoloader
│
├── database/
│   ├── schema.sql                   # MySQL relational schema (8 normalized tables)
│   └── seeders.sql                  # Comprehensive seed dataset matching Prome products
│
├── frontend/
│   ├── index.html                   # High-performance standalone SPA preview & runtime
│   ├── package.json                 # Node dependencies for Vite/React build
│   ├── vite.config.js               # Vite bundler configuration
│   ├── tailwind.config.js           # Tailwind configuration
│   ├── postcss.config.js            # PostCSS configuration
│   └── src/
│       ├── App.jsx                  # Main application controller & modal coordinator
│       ├── main.jsx                 # React root mount point
│       ├── index.css                # Tailwind directives & custom glassmorphism styles
│       ├── components/
│       │   ├── FloatingNavbar.jsx   # Floating glassmorphism navbar over hero section
│       │   ├── HeroSection.jsx      # Agro background video player with controls & stats
│       │   ├── ProductCard.jsx      # Individual product card with dual pricing
│       │   ├── ProductCatalog.jsx   # Category filter pills, search & sorting
│       │   ├── AboutCompany.jsx     # Chairman CIP profile, 1982 history, certifications
│       │   ├── AgroVideoGallery.jsx # Video tour cards with modal stream player
│       │   ├── GlobalFootprint.jsx  # 32+ export countries & logistics map
│       │   ├── ExportCalculator.jsx # 20ft/40ft container freight & payload calculator
│       │   ├── ContactSection.jsx   # Uttarkhan factory address & B2B inquiry form
│       │   ├── Footer.jsx           # Global footer with quick links & newsletter
│       │   └── dashboard/
│       │       ├── AdminDashboard.jsx # Bootstrap 5 + Tailwind ERP control center
│       │       └── DealerPortal.jsx   # B2B distributor wholesale pricing portal
│       ├── data/
│       │   └── initialData.js       # Complete Prome portfolio offline data store
│       └── services/
│           └── api.js               # Decoupled API service connecting PHP or local state
└── README.md
```

---

## ⚙️ Installation & Running Guide

### 1. Database Setup (MySQL)
1. Open your MySQL client (e.g. phpMyAdmin, MySQL CLI, or MySQL Workbench).
2. Execute `database/schema.sql` to generate the `prome_agro_db` database and tables:
   ```bash
   mysql -u root -p < database/schema.sql
   ```
3. Execute `database/seeders.sql` to populate all authentic Prome Agro products, media, orders, and inquiries:
   ```bash
   mysql -u root -p prome_agro_db < database/seeders.sql
   ```

### 2. Backend Setup (Raw PHP)
1. Ensure PHP 8.0 or higher is installed with `pdo_mysql` extension.
2. In `backend/config/Config.php`, verify your MySQL credentials if different from default (`root`, no password).
3. Start the PHP built-in server:
   ```bash
   cd backend
   php -S 0.0.0.0:8000
   ```
4. Test the API:
   ```bash
   curl http://localhost:8000/api/products
   curl http://localhost:8000/api/categories
   curl http://localhost:8000/api/media/hero-video
   ```

### 3. Frontend Execution & Preview
The frontend provides two seamless ways to run:

#### Option A: Instant Zero-Setup Standalone Mode (Browser / Any HTTP server)
Simply open `frontend/index.html` in any modern web browser or serve it using Python:
```bash
cd frontend
python3 -m http.server 3000
```
Then visit `http://localhost:3000`. You will immediately see:
- The floating glassmorphic navbar.
- The agro video background playing with sound/mute and play/pause controls.
- The complete product catalog, shopping cart, export calculator, video gallery, and admin/dealer dashboards.

#### Option B: Vite / Node.js Modular Build
```bash
cd frontend
npm install
npm run dev
```

---

## 🔒 Security Best Practices Implemented
- **OWASP SQL Injection Prevention**: 100% prepared statements with bound parameters across all database models.
- **XSS Cross-Site Scripting Mitigation**: Comprehensive sanitization via `htmlspecialchars(..., ENT_QUOTES, 'UTF-8')`.
- **Password Security**: Strong hashing utilizing `password_hash($password, PASSWORD_BCRYPT)`.
- **Stateless Tokens**: Pure PHP cryptographic HMAC-SHA256 JWT implementation.
- **Strict Role-Based Access Control**: `AuthMiddleware::requireRole('admin')` restricts critical ERP operations.
