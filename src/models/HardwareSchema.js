import mongoose from 'mongoose';
let hardwareSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required:true},
  checked_out: { type: Boolean, required: true, default: false },
  checkout_time: { type: String, default: "" },
  record: { type: [{
                     user_id: String,
                     checkout_time: String,
                     checkin_time: String,
                  }],
            default: [] 
          }
});
export default mongoose.model('HardwareSchema',hardwareSchema);