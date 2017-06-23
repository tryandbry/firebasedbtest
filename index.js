//import firebase
const firebase = require('firebase');

//import secrets and package name
const pkg = require('./package.json');
const {config, login: {email,password}} = require(`${process.env.HOME}/capstone/.${pkg.name}.env`);

//initialize firebase
firebase.initializeApp(config);

//set alias for firebase db
const db = firebase.database();

//BEGIN BODY
//---------------------------------------
const handler = function(dataSnapshot){
  console.log('firebase db write detected! value:',dataSnapshot.val());
}

firebase.auth().signInWithEmailAndPassword(email,password)
.then(()=>{
  return db.ref('example').on('value',handler);
})
.then(()=>{
  console.log('login successful');
  console.log('writing to firebase...');
  return db.ref('example').set('pikapikapikachu!!');
})
.then(()=>db.ref('example').off('value'))
.catch(error=>console.error(error));

