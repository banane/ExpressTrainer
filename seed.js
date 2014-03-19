
var model = require("./model")
var Sequelize = require('sequelize')

// database connection:

db = model.sequelize;

//catch changes to tables:

model.syncUp();

// model.createTables();

db.authenticate().complete(function(err) {
    if (!!err) {
      console.log('Unable to connect to the database:', err)
    } else {
      console.log('Connection has been established successfully in seed.js')

      model.User
      .create({
        username: 'kaherson@yahoo.com',
        password: 'crusher',
        age: 15,
        teamId: 3,
        goal: "SCS Regionals",
        goalDate: new Date(Date.parse("May 10, 2014")),
        boulderPar: 6,
        boulderBest: 8,
        routePar: 26,
        routeBest: 28
      })   

      .complete(function(err) {
          if (!!err) {
            console.log('The user instance has not been saved:', err)
          } else {

            console.log('We have a persisted user instance now')
            //test ability to retrieve the user
            findThatUser();
          }
        })        

      model.Coach
       .create({
        username: 'isaac@planetgranite.com',
        password: 'heckler'
       })

       .complete(function(err) {
          if (!!err) {
            console.log('The coach instance has not been saved:', err)
          } else {
            console.log('We have a persisted coach instance now')
            //test ability to retrieve coach
            findThatCoach();
          }
        })

    }
  })


//For now, functions to test that we can retrieve data.

function findThatUser(){
  db
  .authenticate()
  .complete(function(err) {
     if (!!err) {
       console.log('An error occurred while authenticating:', err)
     } else {
       
       model.User
        .find({ where: { username: 'kaherson@yahoo.com' } })
        .complete(function(err, kaherson) {
          if (!!err) {
            console.log('An error occurred while searching for Kara:', err)
          } else if (!kaherson) {
            console.log('No user with the username "kaherson@yahoo.com" has been found.')
          } else {
            console.log('Hello ' + kaherson.username + '!')
          }
        })
 }
})
}


function findThatCoach(){
  db
  .authenticate()
  .complete(function(err) {
     if (!!err) {
       console.log('An error occurred while authenticating:', err)
     } else {

       model.Coach
        .find({ where: { username: 'isaac@planetgranite.com' } })
        .complete(function(err, isaac) {
          if (!!err) {
            console.log('An error occurred while searching for Isaac:', err)
          } else if (!isaac) {
            console.log('No user with the username "isaac@planetgranite.com" has been found.')
          } else {
            console.log('Hello ' + isaac.username + '!')
          }
        })
     
  }
})
}




