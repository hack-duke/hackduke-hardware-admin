import { version } from '../../package.json';
import { Router } from 'express';
import hardware from './hardware.js';
export default ({ config, db }) => {
	let api = Router();
	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});
  api.get('/hardware/:id',hardware.findById);
  api.put('/hardware/',hardware.create);
  api.post('/hardware/:id/name',hardware.updateName);
  api.post('/hardware/:id/checkout',hardware.checkout);
  api.post('/hardware/:id/checkin',hardware.checkin);
  api.delete('/hardware/:id',hardware.remove);

	return api;
}
