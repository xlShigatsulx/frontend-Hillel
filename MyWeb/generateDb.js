import fs from 'fs/promises';
import { faker } from '@faker-js/faker';

const CROISSANT_COUNT = 10;

const generateCroissants = (num) => {
  return Array.from({ length: num }, () => ({
    id: faker.database.mongodbObjectId(),
    name: faker.commerce.productName() + ' Croissant',
    price: Number(
      faker.number.float({ min: 1.5, max: 5.0, precision: 0.01 }).toFixed(2)
    ),
    description: faker.commerce.productDescription(),
    image: faker.image.urlLoremFlickr({ category: 'food' }),
    quantity: 1,
  }));
};

const db = {
  products: generateCroissants(CROISSANT_COUNT),
};

const writeDbFile = async () => {
  try {
    await fs.writeFile('db.json', JSON.stringify(db, null, 2));
    console.log(
      '✅ db.json has been generated with croissants and empty users list.'
    );
  } catch (error) {
    console.error('❌ Error writing db.json:', error);
  }
};

writeDbFile();
