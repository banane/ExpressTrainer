var Sequelize = require('sequelize')
  , sequelize = new Sequelize('pgtest', 'demorole1', 'password1', {
       dialect: "postgres", // or 'sqlite', 'postgres', 'mariadb'
       port:    5432, // or 5432 (for postgres)
       host: 'localhost'
    })

 
sequelize
  .authenticate()
  .complete(function(err) {
    if (!!err) {
      console.log('Unable to connect to the database:', err)
    } else {
      console.log('Connection has been established successfully.')

      User
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
          }
        })        

      Coach
       .create({
        username: 'isaac@planetgranite.com',
        password: 'heckler'
       })

       .complete(function(err) {
          if (!!err) {
            console.log('The coach instance has not been saved:', err)
          } else {
            console.log('We have a persisted coach instance now')
          }
        })

    }
  })

var User = sequelize.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  age: Sequelize.INTEGER,
  teamId: Sequelize.INTEGER,
  goal: Sequelize.STRING,
  goalDate: Sequelize.DATE,
  boulderPar: Sequelize.INTEGER,
  boulderBest: Sequelize.INTEGER,
  routePar: Sequelize.INTEGER,
  routeBest: Sequelize.INTEGER
})

var Coach = sequelize.define('coach', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
})

// var Team = sequelize.define('team', {
//   teamName: Sequelize.STRING,
//   teamGoal: Sequelize.STRING
// })

// var Workouts = sequelize.define('workout',{
//   workoutName: Sequelize.STRING,
//   workoutTheme: Sequelize.STRING,
//   workoutDescription: Sequelize.TEXT,
//   workoutExercises: Sequelize.ARRAY(Sequelize.INTEGER),
//   exerciseReps: Sequelize.ARRAY(Sequelize.INTEGER)
// })

// var Exercises = sequelize.define('exercise',{
//   exerciseName: Sequelize.STRING,
//   exerciseDescription: Sequelize.TEXT
// })




console.log("anything at all");

sequelize
  .authenticate()
  .complete(function(err) {
     if (!!err) {
       console.log('An error occurred while creating the tables:', err)
     } else {
       console.log('It worked!')
       
       User
        .find({ where: { username: 'kaherson@yahoo.com' } })
        .complete(function(err, kaherson) {
          if (!!err) {
            console.log('An error occurred while searching for Kara:', err)
          } else if (!kaherson) {
            console.log('No user with the username "kaherson@yahoo.com" has been found.')
          } else {
            console.log('Hello ' + kaherson.username + '!')
            console.log('All attributes of kara:', kaherson.values)
          }
        })

       Coach
        .find({ where: { username: 'isaac@planetgranite.com' } })
        .complete(function(err, isaac) {
          if (!!err) {
            console.log('An error occurred while searching for Isaac:', err)
          } else if (!isaac) {
            console.log('No user with the username "isaac@planetgranite.com" has been found.')
          } else {
            console.log('Hello ' + isaac.username + '!')
            console.log('All attributes of Isaac:', isaac.values)
          }
        })
     }
  })



