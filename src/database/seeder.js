/* eslint-disable no-console */
import fs from 'fs/promises';
import dotenv from 'dotenv';
import { connect, disconnect } from 'mongoose';
import Careers from '#models/careerModel.js';
import Subjects from '#models/subjectModel.js';
import SubjectsRelationships from '#models/subjectRelationshipModel.js';

dotenv.config({ path: './.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
).replace('<USER>', process.env.DATABASE_USER);

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

async function seedCareers() {
  const registeredCareers = await Careers.find();
  if (registeredCareers.length > 0) {
    await Careers.deleteMany();
  }

  const data = await fs.readFile('./mock/Careers.json', 'utf-8');
  const careers = JSON.parse(data);
  await Promise.all(
    careers.map((career) => Careers.create({ _id: career.id, ...career })),
  );
}

async function seedSubjects() {
  const registeredSubjects = await Subjects.find();
  if (registeredSubjects.length > 0) {
    await Subjects.deleteMany();
  }

  const data = await fs.readFile('./mock/Subjects.json', 'utf-8');
  const subjects = JSON.parse(data);
  await Promise.all(
    subjects.map((subject) => Subjects.create({ _id: subject.id, ...subject })),
  );
}

async function seedSubjectRelationShips() {
  const registeredSubjectRelationShips = await SubjectsRelationships.find();
  if (registeredSubjectRelationShips.length > 0) {
    await SubjectsRelationships.deleteMany();
  }

  const data = await fs.readFile('./mock/SubjectRelationships.json', 'utf-8');
  const subjectRelationShips = JSON.parse(data);
  await Promise.all(
    subjectRelationShips.map((subjectRelationship) =>
      SubjectsRelationships.create({
        _id: subjectRelationship.id,
        ...subjectRelationship,
      }),
    ),
  );
}

async function main() {
  try {
    await connect(DB);
    console.log('Database connection established successfully.');

    await seedCareers();
    await seedSubjects();
    await seedSubjectRelationShips();

    console.log('Seeding process completed successfully.');
  } catch (error) {
    console.error('Error during the main seeding process:', error);
  } finally {
    console.log('Disconnecting from database.');
    await disconnect();
  }
}

main().catch(console.error);
