-- ==============================================================================
-- Prome Agro Foods Limited - Official Seed Data
-- ==============================================================================

USE `prome_agro_db`;

-- 1. Seed Users (Admin, B2B Dealer, Customer)
-- Passwords hashed with bcrypt password_hash('prome123', PASSWORD_BCRYPT)
INSERT INTO `users` (`id`, `name`, `email`, `password_hash`, `role`, `phone`, `company_name`, `country`, `status`) VALUES
(1, 'Md. Anamul Hasan Khan (CIP)', 'admin@prome.com.bd', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', '+8809648230230', 'Prome Agro Foods Ltd.', 'Bangladesh', 'active'),
(2, 'Al-Bustan General Trading LLC', 'export.dubai@albustan.ae', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'dealer', '+97142234567', 'Al-Bustan Trading LLC', 'United Arab Emirates', 'active'),
(3, 'Bangla Bazaar London', 'orders@banglabazaar.co.uk', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'dealer', '+442079460912', 'Bangla Bazaar Retail UK', 'United Kingdom', 'active'),
(4, 'Tanvir Ahmed', 'tanvir@gmail.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'customer', '+8801712345678', NULL, 'Bangladesh', 'active');

-- 2. Seed Categories (11 Prome Agro Manufacturing Lines)
INSERT INTO `categories` (`id`, `name`, `slug`, `icon`, `description`, `image_url`, `sort_order`) VALUES
(1, 'Prome Spices', 'prome-spices', 'flame', 'Pure stone-ground authentic Bangladeshi spices processed under ISO-22000 standards.', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80', 1),
(2, 'Prome Mustard Oil', 'prome-oil', 'droplet', '100% cold-pressed pure mustard oil extracted from choice local mustard seeds with natural pungency.', 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80', 2),
(3, 'Prome Aromatic Rice', 'prome-rice', 'wheat', 'Export-grade premium Chinigura and Kalijeera aromatic polao rice cultivated organically.', 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80', 3),
(4, 'Prome Snacks', 'prome-snacks', 'cookie', 'Crispy traditional Bangladeshi Chanachur, fried lentils, and spicy Jhal Muri snacks.', 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=800&q=80', 4),
(5, 'Prome Bakery & Biscuit', 'prome-biscuit', 'cake', 'Oven-fresh crispy toast biscuits, dry cake, and rich golden butter cookies.', 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80', 5),
(6, 'Prome Drinks & Beverages', 'prome-drinks', 'cup-soda', 'Natural mango fruit drinks, orange soft drink powder, lychee nectar, and oral saline.', 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=800&q=80', 6),
(7, 'Prome Pickles & Chutney', 'prome-pickle', 'jar', 'Traditional homestyle mango, olive, and mixed pickles infused in mustard oil and spices.', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80', 7),
(8, 'Prome Pudding & Jelly', 'prome-pudding-jelly', 'sparkles', 'Delicious fruit pudding, lychee ice lolly, and fruity jellies loved by kids worldwide.', 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80', 8),
(9, 'Prome Natural Herbs', 'prome-herbs', 'leaf', 'Health supplements including organic Basil Seeds (Tokma), Chirata, and Sat Isabgol.', 'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80', 9),
(10, 'Prome Tea', 'prome-tea', 'coffee', 'Selected aromatic instant tea and tea blends from the finest gardens of Sylhet.', 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80', 10),
(11, 'Prome Sauces & Semai', 'prome-others', 'utensils', 'Specialty pantry staples including Hot Tomato Sauce, Laccha Semai, Soya Meat, and Sugarcane Jaggery.', 'https://images.unsplash.com/photo-1514944298352-fa0181710b91?auto=format&fit=crop&w=800&q=80', 11);

-- 3. Seed Products (Authentic Prome Agro Foods Portfolio)
INSERT INTO `products` (`id`, `category_id`, `name`, `slug`, `sku`, `weight_volume`, `price`, `wholesale_price`, `stock`, `image_url`, `description`, `ingredients`, `is_featured`, `is_export_ready`, `rating`) VALUES
(1, 1, 'Prome Pure Chilli Powder', 'prome-chilli-powder', 'PRM-SPC-001', '200g Foil Pack', 145.00, 115.00, 1500, 'https://images.unsplash.com/photo-1627993077793-780cb4e99f57?auto=format&fit=crop&w=600&q=80', 'Finely pulverized sun-dried red chillies directly procured from Bogura farms. Provides vibrant red color and authentic pungency.', '100% Sun-Dried Red Chilli', 1, 1, 4.95),
(2, 1, 'Prome Turmeric Powder Jar', 'prome-turmeric-powder-jar', 'PRM-SPC-002', '250g PET Jar', 160.00, 125.00, 2000, 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80', 'Golden aromatic turmeric powder with high curcumin content, triple-sifted for spotless purity and vibrant kitchen aroma.', '100% Pure Curcuma Longa (Turmeric)', 1, 1, 4.90),
(3, 1, 'Prome Special Biryani Masala', 'prome-biryani-masala', 'PRM-SPC-003', '100g Box', 120.00, 95.00, 1200, 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80', 'Authentic royal Mughlai spices blend for Shahi Biryani, Kacchi, and Tehari cooking with whole cardamom and mace.', 'Cinnamon, Cardamom, Clove, Mace, Nutmeg, Coriander, White Pepper, Bay Leaf', 1, 1, 5.00),
(4, 1, 'Prome Chicken Curry Powder', 'prome-chicken-curry-powder', 'PRM-SPC-004', '125g Foil Pack', 95.00, 75.00, 1800, 'https://images.unsplash.com/photo-1505253758473-96b3015f27eb?auto=format&fit=crop&w=600&q=80', 'Balanced culinary spice mix specially balanced for home-style chicken curry and roast dishes.', 'Cumin, Coriander, Turmeric, Ginger, Garlic, Red Chilli, Fennel, Cloves', 0, 1, 4.85),
(5, 2, 'Prome Pure Mustard Oil (Ghani Phata)', 'prome-mustard-oil-1l', 'PRM-OIL-001', '1 Liter Bottle', 340.00, 285.00, 3500, 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80', 'Traditional cold pressed mustard oil preserving rich allyl isothiocyanate pungency and authentic aroma. Ideal for bhorta and curries.', '100% Cold-Pressed Mustard Seed Oil', 1, 1, 4.98),
(6, 2, 'Prome Mustard Oil Jar', 'prome-mustard-oil-500ml', 'PRM-OIL-002', '500 ml Bottle', 180.00, 150.00, 2200, 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80', 'Pure cold pressed mustard oil in a convenient 500ml tabletop bottle.', 'Cold-Pressed Mustard Seed Oil', 0, 1, 4.92),
(7, 3, 'Prome Premium Chinigura Aromatic Rice', 'prome-chinigura-rice', 'PRM-RCE-001', '1 Kg Poly Pack', 170.00, 140.00, 5000, 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80', 'Heritage Dinajpur Chinigura aromatic rice, aged to perfection, non-sticky and delightfully fragrant for royal Polao and Biryani.', '100% Dinajpur Aromatic Chinigura Rice', 1, 1, 4.96),
(8, 3, 'Prome Kalijeera Aromatic Rice', 'prome-kalijeera-rice', 'PRM-RCE-002', '1 Kg Poly Pack', 185.00, 155.00, 3000, 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80', 'Small-grain fragrant Kalijeera paddy rice, rich in natural aroma for festive desserts like Payesh, Firni, and Khichuri.', '100% Organic Kalijeera Rice', 0, 1, 4.91),
(9, 4, 'Prome Special Jhal Chanachur', 'prome-jhal-chanachur', 'PRM-SNK-001', '300g Foil Pack', 90.00, 70.00, 4000, 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=600&q=80', 'Crunchy chickpea noodles, fried peanuts, lentils, and crispy peas seasoned with spicy, tangy chaat spices.', 'Gram Flour, Peanuts, Fried Peas, Rice Flakes, Mustard Oil, Spices Blend', 1, 1, 4.88),
(10, 4, 'Prome Spicy Jhal Muri Ready Pack', 'prome-jhal-muri', 'PRM-SNK-002', '150g Pack', 45.00, 35.00, 3200, 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=600&q=80', 'Authentic street-style puffed rice tossed with mustard oil aroma, crispy chanachur, and roasted spices.', 'Puffed Rice, Chanachur, Mustard Oil, Special Spice Mix', 0, 1, 4.80),
(11, 5, 'Prome Crispy Salted Toast Biscuit', 'prome-salted-toast', 'PRM-BSC-001', '350g Family Pack', 110.00, 85.00, 2500, 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80', 'Double-baked crispy golden toast biscuits, perfectly balanced with a pinch of sea salt for morning tea time.', 'Wheat Flour, Vegetable Fat, Sugar, Yeast, Salt, Milk Solids', 1, 1, 4.94),
(12, 5, 'Prome Rich Dry Cake', 'prome-dry-cake', 'PRM-BSC-002', '300g Box', 130.00, 105.00, 1900, 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80', 'Crispy baked tea-time cake bites infused with rich cardamom and vanilla aroma.', 'Flour, Farm Eggs, Sugar, Butter Fat, Vanilla Extract', 0, 1, 4.89),
(13, 6, 'Prome Mango Fruit Drink', 'prome-mango-drink', 'PRM-DRK-001', '250ml Tetra Pack', 35.00, 26.00, 6000, 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=600&q=80', 'Made from ripe Rajshahi Fazli and Langra mango pulp with essential Vitamin C fortification.', 'Mango Pulp (20%), Water, Sugar, Citric Acid, Ascorbic Acid (Vitamin C)', 1, 1, 4.90),
(14, 6, 'Prome Instant Mango Soft Drink Powder', 'prome-mango-powder', 'PRM-DRK-002', '500g Jar', 220.00, 180.00, 1500, 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=600&q=80', 'Instant refreshing fruit powder enriched with Vitamins A, B, and C. Makes 4 liters of refreshing mango drink.', 'Sucrose, Mango Powder, Vitamin Premix, Mineral Salts', 0, 1, 4.84),
(15, 7, 'Prome Green Mango Pickle (Aam Achar)', 'prome-mango-pickle', 'PRM-PCK-001', '400g Glass Jar', 165.00, 130.00, 2800, 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80', 'Hand-cut sour green mango slices steeped in cold-pressed mustard oil with whole panchforan and roasted garlic.', 'Green Mango, Pure Mustard Oil, Fenugreek, Cumin, Mustard Seed, Salt, Turmeric, Vinegar', 1, 1, 4.97),
(16, 7, 'Prome Spiced Olive Pickle (Jolpai Achar)', 'prome-olive-pickle', 'PRM-PCK-002', '400g Glass Jar', 175.00, 140.00, 2100, 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80', 'Juicy wild olives seasoned with sweet and hot chili garlic mustard syrup.', 'Wild Olives (Jolpai), Mustard Oil, Red Chilli, Sugar, Spices Blend', 0, 1, 4.93),
(17, 8, 'Prome Lychee Ice Lolly Jelly', 'prome-ice-lolly-lychee', 'PRM-JEL-001', '500g Pack (20 pcs)', 120.00, 95.00, 3500, 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80', 'Fruity cooling lychee ice lolly treats made from natural seaweed carrageenan jelly.', 'Water, Sugar, Carrageenan, Fruit Flavor, Citric Acid', 0, 1, 4.86),
(18, 9, 'Prome Organic Sat Isabgol', 'prome-isabgol', 'PRM-HRB-001', '100g Box', 140.00, 115.00, 1700, 'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=600&q=80', '100% natural Psyllium Husk dietary fiber for digestive wellness and heart health.', 'Pure Psyllium Husk (Plantago Ovata)', 1, 1, 4.95),
(19, 10, 'Prome Premium Instant Tea', 'prome-instant-tea', 'PRM-TEA-001', '200g Jar', 210.00, 170.00, 1100, 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80', 'Selected CTC black tea blend from premier estates of Sylhet and Sreemangal.', 'Selected Black Tea Dust & Fannings', 0, 1, 4.88),
(20, 11, 'Prome Roasted Laccha Semai', 'prome-laccha-semai', 'PRM-OTH-001', '200g Box', 75.00, 58.00, 4500, 'https://images.unsplash.com/photo-1514944298352-fa0181710b91?auto=format&fit=crop&w=600&q=80', 'Golden ghee-roasted vermicelli noodles crafted for traditional creamy Eid dessert preparations.', 'High-Grade Semolina (Suji), Wheat Flour, Pure Vegetable Ghee', 1, 1, 4.96);

-- 4. Seed Media Gallery (Agro Farming, Factory Processing, Packaging, CIP Award)
INSERT INTO `media_gallery` (`id`, `title`, `media_type`, `video_url`, `thumbnail_url`, `category`, `description`, `duration`, `is_hero_featured`) VALUES
(1, 'Prome Agro Harvest to Factory Documentary', 'video', 'https://assets.mixkit.co/videos/preview/mixkit-tractor-harvesting-wheat-in-a-large-field-42567-large.mp4', 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80', 'agro_farm', 'Experience how Prome Agro Foods harvests fresh organic crops from Bangladeshi fields into state-of-the-art modern processing lines.', '03:15', 1),
(2, 'Automated Spice Micro-Grinding Cleanroom', 'video', 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-farmer-gathering-grain-41712-large.mp4', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80', 'processing', 'Tour our ISO-22000 certified automated spice grinding chambers equipped with cryogenic chilling to protect natural oils.', '02:40', 0),
(3, 'High-Speed Automated Packaging & Quality Testing', 'video', 'https://assets.mixkit.co/videos/preview/mixkit-vegetables-moving-along-a-conveyor-belt-in-a-factory-42617-large.mp4', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80', 'packaging', 'Robotic multi-head weighers and nitrogen-flushed foil packaging ensuring 24-month crisp freshness for export shipments.', '02:10', 0),
(4, 'Chairman Md. Anamul Hasan Khan 5x CIP Honor Ceremony', 'video', 'https://assets.mixkit.co/videos/preview/mixkit-farmers-walking-together-through-a-wheat-field-42566-large.mp4', 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80', 'awards', 'Honorable Chairman awarded Commercially Important Person (CIP - Industry) by the Ministry of Industries for 5 consecutive years.', '04:05', 0);

-- 5. Seed Orders (Retail & B2B International Export Orders)
INSERT INTO `orders` (`id`, `order_number`, `user_id`, `customer_name`, `customer_email`, `customer_phone`, `shipping_address`, `order_type`, `destination_country`, `total_amount`, `payment_method`, `payment_status`, `order_status`, `notes`) VALUES
(1, 'PRM-2026-EXP-0841', 2, 'Al-Bustan Trading LLC', 'export.dubai@albustan.ae', '+97142234567', 'Warehouse 14, Al Aweer Industrial Area 2, Dubai, UAE', 'wholesale_export', 'United Arab Emirates', 1845000.00, 'Letter of Credit (LC)', 'paid', 'shipped', '1x40ft Reefer Container of Prome Mustard Oil, Chinigura Rice, and Mango Pickle.'),
(2, 'PRM-2026-EXP-0842', 3, 'Bangla Bazaar London', 'orders@banglabazaar.co.uk', '+442079460912', 'Unit 7, Olympic Business Centre, Paycocke Rd, Basildon SS14 3HR, UK', 'wholesale_export', 'United Kingdom', 950000.00, 'Bank Wire (T/T)', 'paid', 'processing', '1x20ft Container with Biryani Masala, Jhal Chanachur, and Laccha Semai.'),
(3, 'PRM-2026-RET-1092', 4, 'Tanvir Ahmed', 'tanvir@gmail.com', '+8801712345678', 'House 42, Road 11, Sector 4, Uttara, Dhaka - 1230', 'retail', 'Bangladesh', 1650.00, 'bKash Online', 'paid', 'delivered', 'Urgent family weekend grocery pack.');

-- 6. Seed Order Items
INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `product_name`, `quantity`, `unit_price`, `subtotal`) VALUES
(1, 1, 5, 'Prome Pure Mustard Oil (1L)', 3000, 285.00, 855000.00),
(2, 1, 7, 'Prome Premium Chinigura Aromatic Rice (1Kg)', 5000, 140.00, 700000.00),
(3, 1, 15, 'Prome Green Mango Pickle (400g Jar)', 2000, 130.00, 260000.00),
(4, 1, 3, 'Prome Special Biryani Masala (100g)', 300, 100.00, 30000.00),
(5, 2, 3, 'Prome Special Biryani Masala (100g)', 4000, 95.00, 380000.00),
(6, 2, 9, 'Prome Special Jhal Chanachur (300g)', 5000, 70.00, 350000.00),
(7, 2, 20, 'Prome Roasted Laccha Semai (200g)', 3000, 58.00, 174000.00),
(8, 2, 1, 'Prome Pure Chilli Powder (200g)', 400, 115.00, 46000.00),
(9, 3, 5, 'Prome Pure Mustard Oil (1L)', 2, 340.00, 680.00),
(10, 3, 7, 'Prome Premium Chinigura Aromatic Rice (1Kg)', 3, 170.00, 510.00),
(11, 3, 11, 'Prome Crispy Salted Toast Biscuit (350g)', 2, 110.00, 220.00),
(12, 3, 15, 'Prome Green Mango Pickle (400g)', 1, 165.00, 165.00),
(13, 3, 9, 'Prome Special Jhal Chanachur (300g)', 1, 75.00, 75.00);

-- 7. Seed B2B Export Inquiries
INSERT INTO `inquiries` (`id`, `name`, `email`, `phone`, `company`, `country`, `product_interest`, `estimated_volume`, `message`, `status`) VALUES
(1, 'Tariq Al-Mansoor', 'tariq@gulfsupermarkets.com', '+966501234567', 'Gulf Supermarkets KSA', 'Saudi Arabia', 'Prome Spices & Pickles', '2x40ft High Cube Container', 'We need regular monthly consignments of Prome Turmeric, Chilli Powder, and Mango Pickles for our 45 branches across Riyadh and Jeddah.', 'in_review'),
(2, 'David Miller', 'dmiller@pacificagrofood.com', '+14165550198', 'Pacific Agro Trading Canada', 'Canada', 'Chinigura Rice & Snacks', '1x20ft Container FCL', 'Requesting CIF Toronto shipping quotation and Halal/BSTI laboratory certificates for Prome Aromatic Rice and Chanachur.', 'new'),
(3, 'Farhana Chowdhury', 'farhana.ch@dhakafoods.com', '+8801912987654', 'Dhaka Superstores Ltd.', 'Bangladesh', 'Bakery & Biscuits', '2000 Cartons / Month', 'Interested in expanding wholesale dealership across Sylhet division for Prome Toast & Dry Cake.', 'contacted');

-- 8. Seed Verified Customer & Distributor Reviews
INSERT INTO `reviews` (`id`, `product_id`, `reviewer_name`, `country`, `rating`, `comment`, `is_verified`) VALUES
(1, 5, 'Khurshid Jahan', 'Bangladesh', 5, 'Prome mustard oil has that real traditional ghanir flavour! The pungency is unmatched in shorshe ilish and aloo bhorta.', 1),
(2, 3, 'Chef Mahbubur Rahman', 'United Arab Emirates', 5, 'Using Prome Biryani Masala in our restaurant chain in Dubai for over 4 years. The aroma of cardamom and mace is consistently authentic.', 1),
(3, 7, 'Sadia Nusrat', 'United Kingdom', 5, 'Finding original Dinajpur Chinigura rice in London was a blessing. Prome grains stay perfectly slender and fragrant when cooked.', 1),
(4, 15, 'Rezaul Karim', 'United States', 5, 'The green mango pickle reminds me of home in Dhaka. Crisp pieces with the right amount of mustard oil and panchforan punch.', 1);
