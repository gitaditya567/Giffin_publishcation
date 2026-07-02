require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Book = require('./models/Book');
const Journal = require('./models/Journal');

const users = [
  {
    name: 'Griffin Admin',
    email: 'admin@griffinpublication.com',
    password: 'adminpassword',
    role: 'admin',
  },
  {
    name: 'Dr. John Doe',
    email: 'author@griffinpublication.com',
    password: 'authorpassword',
    role: 'author',
  },
];

const books = [
  {
    title: 'Advanced Research Methodology in Sciences',
    author: 'Dr. Robert Jenkins',
    description: 'A comprehensive guide to experimental designs, empirical modeling, and statistical inference for contemporary research applications across physical and biological sciences.',
    price: 49.99,
    coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400',
    category: 'Research Methodology',
    type: 'paperback',
    isFeatured: true,
  },
  {
    title: 'Modern Academic Writing and Ethical Publishing',
    author: 'Prof. Clara Higgins',
    description: 'An essential textbook for early-career researchers outlining standard referencing, plagiarism check tools, journal selection guidelines, and manuscript revision strategies.',
    price: 19.99,
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400',
    category: 'Academic Writing',
    type: 'ebook',
    isFeatured: true,
  },
  {
    title: 'Data Science & Machine Learning Applications',
    author: 'Dr. Amit Patel',
    description: 'Explore practical implementations of regression, deep learning, NLP, and neural networks in medical analytics, agronomy, and fintech domains.',
    price: 75.00,
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400',
    category: 'Computer Science',
    type: 'paperback',
    isFeatured: false,
  },
  {
    title: 'Sustainable Engineering and Green Energy',
    author: 'Engr. Sarah Connor',
    description: 'This volume features peer-reviewed chapters on photovoltaic tech, smart grids, wind energy conversion systems, and eco-friendly structural design.',
    price: 34.50,
    coverImage: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=400',
    category: 'Engineering',
    type: 'ebook',
    isFeatured: false,
  },
];

const journals = [
  {
    title: 'International Journal of Academic Scientific Research',
    issn: '2456-112X',
    description: 'A monthly, open-access, peer-reviewed international journal targeting breakthroughs in material sciences, biochemistry, thermodynamics, and robotics.',
    frequency: 'Monthly',
    indexing: ['Google Scholar', 'Scopus Indexed (Pending)', 'Crossref', 'Index Copernicus'],
    impactFactor: '3.82',
  },
  {
    title: 'Griffin Journal of Humanities & Social Sciences',
    issn: '1987-4321',
    description: 'An international forum covering historical studies, linguistics, cultural anthropology, public policy, and socio-economic developments.',
    frequency: 'Quarterly',
    indexing: ['Google Scholar', 'Directory of Open Access Journals (DOAJ)', 'Crossref'],
    impactFactor: '1.95',
  },
];

const seedDB = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/scripown';
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to DB for seeding...');

    // Clear existing data
    await User.deleteMany();
    await Book.deleteMany();
    await Journal.deleteMany();
    console.log('Cleared existing database entries.');

    // Seed users
    for (const u of users) {
      await User.create(u);
    }
    console.log('Users seeded successfully.');

    // Seed books
    await Book.insertMany(books);
    console.log('Books seeded successfully.');

    // Seed journals
    await Journal.insertMany(journals);
    console.log('Journals seeded successfully.');

    console.log('Database seeding process completed.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
