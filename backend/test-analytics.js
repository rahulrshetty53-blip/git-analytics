import mongoose from 'mongoose';
import Commit from './models/Commit.js';

mongoose.connect('mongodb://localhost:27017/git-analytics').then(async () => {
  console.log('\n✅ Connected to MongoDB\n');

  const repoId = new mongoose.Types.ObjectId('69d3bf65dad9b1b55b2e122e');
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  console.log('Testing aggregation query for analytics...\n');

  const result = await Commit.aggregate([
    {
      $match: {
        repositoryId: repoId,
        committedDate: { $gte: thirtyDaysAgo }
      }
    },
    {
      $group: {
        _id: {
          $dateToString: { format: '%Y-%m-%d', date: '$committedDate' }
        },
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  console.log('Commit Trends (last 30 days):');
  console.log(JSON.stringify(result, null, 2));
  console.log('\nTotal days with commits:', result.length);
  console.log('\n');

  process.exit(0);
}).catch(e => {
  console.error('Error:', e.message);
  process.exit(1);
});
