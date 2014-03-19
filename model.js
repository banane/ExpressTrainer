var Sequelize = require('sequelize')
  , sequelize = new Sequelize('pgtest', 'demorole1', 'password1', {
       dialect: "postgres", // or 'sqlite', 'postgres', 'mariadb'
       port:    5432, // or 5432 (for postgres)
       host: 'localhost'
    })


exports.syncUp = syncUp = function syncUp(){

  sequelize
    .sync({ force: false })
    // .authenticate()
    .complete(function(err) {
       if (!!err) {
         console.log('An error occurred while creating the tables:', err)
       } else {
         console.log('It worked!')           
       }
    })

}

exports.sequelize = sequelize;

exports.User = User = sequelize.define('user', {
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

exports.Coach = Coach = sequelize.define('coach', {
    username: Sequelize.STRING,
    password: Sequelize.STRING
  })


exports.Team = Coach = sequelize.define('team', {
    teamName: Sequelize.STRING,
    teamGoal: Sequelize.STRING
  })

exports.Workout = sequelize.define('workout',{
    workoutName: Sequelize.STRING,
    workoutTheme: Sequelize.STRING,
    workoutDescription: Sequelize.TEXT,
    workoutExercises: Sequelize.ARRAY(Sequelize.INTEGER),
    exerciseReps: Sequelize.ARRAY(Sequelize.INTEGER)
  })

exports.Exercise = sequelize.define('exercise',{
    exerciseName: Sequelize.STRING,
    exerciseDescription: Sequelize.TEXT
  })
