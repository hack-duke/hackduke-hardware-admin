import mongoose from 'mongoose';
export default callback => {
	// connect to a database if needed, the pass it to `callback`:
  // Configure database
  mongoose.connect('mongodb://hackduke:dendenHacker@ds151927.mlab.com:51927/heroku_vkhkvzv3');
  mongoose.connection.on('error',function(err) {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  console.log(err);
  process.exit(1);
});
	callback(mongoose);
}
