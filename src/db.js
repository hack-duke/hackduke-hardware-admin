import mongoose from 'mongoose';
export default callback => {
	// connect to a database if needed, the pass it to `callback`:
  // Configure database
  mongoose.connect('mongodb://localhost:27017/hackduke-hardware');
  mongoose.connection.on('error',function() {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});
	callback(mongoose);
}
