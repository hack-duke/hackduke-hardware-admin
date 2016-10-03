import Hardware from '../models/HardwareSchema.js';
import request from 'request';

function findById(req,res,next) {
  var id = req.params.id;
  Hardware.findOne({ id: id }, function(err,hardware) {
    if (err) {
      return next(err);
    }
    if(hardware===null) {
      res.status(404).send("no hardware with id "+id+" has been found");
    } else {
      res.json(hardware);
    }   
  });
}
function create(req,res,next) {
  var newHardware = new Hardware(req.body);
  newHardware.save(function(err,event) {
    if(err) {
      res.status(400).send("error creating hardware entry: "+err);
    } else {
      res.json(event);
    }
  });
}
function remove(req,res,next) {
  Hardware.remove({ id:req.params.id }, function(err) {
    if(err) {
      res.status(500).send("Could not remove record. Error: "+err);
    }
    res.json('record removed!');
  });
}
function updateName(req,res,next) {
  var newName = req.body.name;
  Hardware.update({ id: req.params.id }, {
    name: newName,
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

function checkout(req,res,next) {
  var id = req.params.id;
  var checkoutTime = req.body.checkout_time;
  if(typeof checkoutTime==="undefined") {
    res.status(400).send("must include checkout time in request.");
    return;
  }
  var userId = req.body.userId;
  Hardware.findOne({ id: id }, function(err,hardware) {
    if (err) {
      res.status(400).send("error finding hardware id: "+id+" "+err);
      return;
    }
    if(hardware.checked_out) {
      res.status(400).send('Hardware is already checked out.');
      return;
    }
    hardware.checked_out = true;
    hardware.checkout_time = checkoutTime;
    hardware.record.push({
      "user_id": userId,
      "checkout_time": checkoutTime,
      "checkin_time": ""
    });
    hardware.save(function(err) {
      if(err) {
        return next(err);
      }
      res.json("checkout record appended.");
    })
  });
}

function checkin(req,res,next) {
  var id = req.params.id;
  var checkinTime = req.body.checkin_time;
  if(typeof checkinTime==="undefined") {
    res.status(400).send("must include check in time.");
    return;
  }
  Hardware.findOne({ id: id }, function(err,hardware) {
    if(err) {
      res.status(400).send("error finding hardware with id "+id+" "+err);
      return;
    }
    if(!hardware.checked_out) {
      res.status(400).send("hardware is already checked in.");
      return;
    }
    hardware.record[hardware.record.length-1].checkin_time = checkinTime;
    hardware.checked_out = false;
    hardware.checkout_time = "";
    hardware.save(function(err) {
      if(err) {
        res.status(500).send("Unable to update hardware record. Contact Administrator");
      }
      res.json("checkin record appended.")
    });
  });
}


export default {findById,create,remove,updateName,checkout,checkin};
