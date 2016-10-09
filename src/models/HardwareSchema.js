import mongoose from 'mongoose';
let hardwareSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required:true},
  checked_out: { type: Boolean, required: false, default: false },
  user_checkout: { type: String, required:false, defalut: "" },
  checkout_time: { type: String, required:false, default: "" },
  record: { type: [{
                     user_id: String,
                     checkout_time: String,
                     checkin_time: String,
                  }],
            required: false,
            default: [] 
          },
  description: { type: String, required:false, default:"" }
});
export default mongoose.model('HardwareSchema',hardwareSchema);