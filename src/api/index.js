import { Router } from 'express';
import hardware from './hardware.js';
export default ({ db }) => {
	let api = Router();
	// // perhaps expose some API metadata at the root
	// api.get('/', (req, res) => {
	// 	res.json({ version });
	// });
  // TODO: access control
  
  api.get('/hardware/',hardware.findAll);
  api.get('/hardware/checkedout',hardware.findCheckedOut);
  api.get('/hardware/byset',hardware.groupByHardwareSet);
  // query hardware by user id
  api.get('/user/:uid',hardware.recordForUserId);
  // find all info for one hardware by hardwareID
  api.get('/hardware/:id',hardware.findById);
  // create hardware item with empty record
  api.put('/hardware/',hardware.create);
  // update hardware name for given ID
  api.post('/hardware/:id',hardware.updateForId);
  // update checkout status for hardware
  api.post('/hardware/:id/checkout',hardware.checkout);
  // update checkin status for hardware
  api.post('/hardware/:id/checkin',hardware.checkin);
  // remove hardware with ID from db
  api.delete('/hardware/:id',hardware.remove);

	return api;
}
