import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        username: 'maya-chen',
        email: 'maya.chen@example.com',
        profile: { displayName: 'Maya Chen', grade: '10th' },
      },
      {
        username: 'jordan-rivera',
        email: 'jordan.rivera@example.com',
        profile: { displayName: 'Jordan Rivera', grade: '11th' },
      },
      {
        username: 'sam-patel',
        email: 'sam.patel@example.com',
        profile: { displayName: 'Sam Patel', grade: '9th' },
      },
    ]);

    await Team.insertMany([
      {
        name: 'Sunrise Striders',
        description: 'A friendly team focused on consistent morning movement.',
        members: [users[0]._id, users[1]._id],
      },
      {
        name: 'Power Circuit',
        description: 'Strength and conditioning sessions for the whole crew.',
        members: [users[1]._id, users[2]._id],
      },
    ]);

    await Activity.insertMany([
      {
        user: users[0]._id,
        type: 'running',
        durationMinutes: 28,
        distanceMiles: 2.7,
        notes: 'Easy-paced neighborhood run',
        completedAt: new Date('2026-09-05T07:30:00Z'),
      },
      {
        user: users[1]._id,
        type: 'cycling',
        durationMinutes: 42,
        distanceMiles: 8.4,
        notes: 'Trail ride',
        completedAt: new Date('2026-09-04T16:00:00Z'),
      },
      {
        user: users[2]._id,
        type: 'strength',
        durationMinutes: 30,
        notes: 'Full-body circuit',
        completedAt: new Date('2026-09-03T18:15:00Z'),
      },
    ]);

    await Leaderboard.insertMany([
      { user: users[0]._id, points: 420, rank: 1, period: 'monthly' },
      { user: users[1]._id, points: 365, rank: 2, period: 'monthly' },
      { user: users[2]._id, points: 290, rank: 3, period: 'monthly' },
    ]);

    await Workout.insertMany([
      {
        title: 'Quick Cardio Start',
        description: 'A short workout to raise your heart rate and build momentum.',
        difficulty: 'beginner',
        focus: 'cardio',
        durationMinutes: 15,
      },
      {
        title: 'Core and Balance',
        description: 'Controlled movements that strengthen the core and improve stability.',
        difficulty: 'intermediate',
        focus: 'core',
        durationMinutes: 25,
      },
      {
        title: 'Athlete Strength',
        description: 'A challenging full-body session for experienced athletes.',
        difficulty: 'advanced',
        focus: 'strength',
        durationMinutes: 40,
      },
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
