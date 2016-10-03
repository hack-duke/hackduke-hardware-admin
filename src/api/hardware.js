import Hardware from '../models/HardwareSchema.js';
import request from 'request';

function findById(req,res,next) {
  var id = req.params.id;
  Hardware.findOne({ id: id }, function(err,Ids) {
    if (err) {
      return next(err);
    }
    res.json(Ids);
  });
}
function create(req,res,next) {
  var newHardware = new Hardware(req.body);
  newHardware.save(function(err,event) {
    if(err) {
      return next(err);
    } else {
      res.json(event);
    }
  });
}
function update(req,res,next) {
  var hardware = new Hardware(req.body);
  Hardware.update({ id: req.params.id }, {
    name: hardware.name,
    checked_out: hardware.checked_out,
    checkout_time: hardware.checkout_time,
    record: hardware.record
  }, {
    upsert: false,
    multi: false
  },
  function(err,writeResult) {
    if(err) {
      return next(err);
    } 
    res.json(writeResult);
  });
}
function delete(req,res,next) {
  Hardware.remove({ id:req.body.id }, function(err) {
    if(err) {
      return next(err);
    }
    res.json('record removed!');
  });
}

export default {findById,create,update,delete};
