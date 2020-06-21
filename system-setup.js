var Datastore = require('nedb'), 
    db = new Datastore({ filename: './system-setup.db', autoload: true });

var interlock = {};

interlock.id = 'Interlock';
interlock.stat = ['freddezza'];
interlock.skill = ['seduzione'];
interlock.classes = ['rockerman'];
interlock.character = ['name', 'class', 'img'];
interlock.min = 0;
interlock.max = 10;

db.insert(interlock, function (err, newDoc) {   // Callback is optional
    // newDoc is the newly inserted document, including its _id
    // newDoc has no key called notToBeSaved since its value was undefined
  });