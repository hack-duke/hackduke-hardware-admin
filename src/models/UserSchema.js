import mongoose from 'mongoose';

let userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  hardware: { type: [{ 
                       hardware_id: String,
                       checkout_time: String, 
                       checkin_time: String,
                       is_checked_out: Boolean,
                       is_checked_in: Boolean 
                     }],
              required: true,
              default: [] 
            }
});

export default mongoose.model('UserSchema',userSchema);
