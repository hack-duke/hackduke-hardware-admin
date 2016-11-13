import mongoose from 'mongoose';
export default callback => {
	// connect to a database if needed, the pass it to `callback`:
  // Configure database
  mongoose.connect('mongodb://heroku_vkhkvzv3:pm94t0nee6vt444c2b7pm195rn@ds151927.mlab.com:51927/heroku_vkhkvzv');
  mongoose.connection.on('error',function() {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});
	callback(mongoose);
}
