import mongoose from 'mongoose';
let hardwareSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required:true},
  checked_out: { type: Boolean, required: true, default: false },
  user_checkout: { type: String, required:true, defalut: "" },
  checkout_time: { type: String, required:true, default: "" },
  record: { type: [{
                     user_id: String,
                     checkout_time: String,
                     checkin_time: String,
                  }],
            required: true,
            default: [] 
          }
});
export default mongoose.model('HardwareSchema',hardwareSchema);