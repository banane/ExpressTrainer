var model = require('../model')
var Sequelize = require('sequelize')
var _ = require('underscore')


exports.index = function(req, res){
  res.render('index', { title: 'Express' });
  console.log('in index')
};


//code to demonstrate looping construct in Jade
exports.userlist = function(req, res) {
  console.log('in user list');
        db
          .authenticate()
          .complete(function(err) {
            if (!!err){
              console.log('An error occurred while authenticating:', err)
            } else {  
              console.log('in userlist');
              model.Coach
                .findAll()
                .complete(function(err,coaches){
                  console.log(coaches);
                  res.render('userlist', {
                    "userlist" : coaches
                  })
                })
            }
         })
  };


exports.add_mail = function(req, res) {
	var email = (req.body.email).substr(0,256);
    console.log ('email enterd = '+email);
    db = model.sequelize;
    uname = email;
    db
      .authenticate()
      .complete(function(err) {
         if (!!err) {
           console.log('An error occurred while authenticating:', err)
         } else {         
           model.Athlete
            .find({ where: { username: uname} })
            .complete(function(err, athlete) {
              if (!!err) {
                console.log('An error occurred while searching for uname:', err);
                res.render('index', { title: 'Express'});
              } else if (!athlete) {
                console.log('No user with the username ' + uname + ' has been found.');
                res.render('index', { title: 'Express' });
              } else {

//TODO add error handling; for prototype implementation ensure dataset is clean 
//so a coach and team will be found; saving time/space until foreign keys are working in sequelize

                model.Team
                  .find({ where: { teamId: athlete.teamId} })
                  .complete(function(err,team) {
                  model.Coach
                    .find({ where: {coachId: team.teamId} })
                    .complete(function(err, coach){
                    console.log('Hello ' + coach.spokenName + '!');
                    res.render('athlete_page', {title: 'Express'
                                                ,current_athlete: athlete.spokenName
                                                ,athleteId: athlete.athleteId
                                                ,tn: team.teamName
                                                ,cn: coach.spokenName
                                                ,goal: athlete.goal
                                                ,gd: athlete.goalDate.toDateString()
                                                ,bp: athlete.boulderPar
                                                ,bb: athlete.boulderBest
                                                ,sp: athlete.routePar
                                                ,sb: athlete.routeBest});                
                          
                      })
                   })
              }
            })
         }
      })
  };


//trying to get button from athlete page to redirect here, so far without success
// goal is to pass parameters from templates to various callbacks.  When this works a list
// of workouts for a specific athlete can be fetched/displayed

exports.see_workouts = function(req, res) {
  var athlete = req.body.athlete_id;
  console.log ('In see_workouts trying to get an id'+ athlete);   
    //res.render('workout_page', {title: 'Express', aname: name})

    
  };


// exports.add_mail = function(req, res) {
//     console.log('in add_mail');
//   var email = (req.body.email).substr(0,256);
//     console.log ('email enterd = '+email);
//     db = model.sequelize;
// //    findThatAthlete('kaherson@yahoo.com');
//     uname = email;
//     db
//       .authenticate()
//       .complete(function(err) {
//          if (!!err) {
//            console.log('An error occurred while authenticating:', err)
//          } else {
           
//            model.Athlete
//             .find({ where: { username: uname} })
//             .complete(function(err, athlete) {
//               if (!!err) {
//                 console.log('An error occurred while searching for uname:', err)
//               } else if (!athlete) {
//                 console.log('No user with the username ' + uname + ' has been found.')
//                 res.send('No user with the username ' + uname + ' has been found; please go back.')
//               } else {
//                 db
//                     .query('SELECT * FROM teams where "teamId" = '+ athlete.teamId +'', Team)
//                     .success(function(team){

//                     db.query('SELECT * FROM coaches where "coachId" = '+team[0].coachId+'', Coach)
//                       .success(function(coach){

//                         console.log('Hello ' + coach.spokenName + '!');
//                         res.render('athlete_page', {title: 'Express'
//                                                 ,current_athlete: athlete.spokenName
//                                                 ,tn: team[0].teamName
//                                                 ,cn: coach[0].spokenName
//                                                 ,goal: athlete.goal
//                                                 ,gd: athlete.goalDate.toDateString()
//                                                 ,bp: athlete.boulderPar
//                                                 ,bb: athlete.boulderBest
//                                                 ,sp: athlete.routePar
//                                                 ,sb: athlete.routeBest});
//                         })
//                       })
//               }
//             })
//          }
//         })
//};



exports.athlete_home = function(req, res) {
    console.log("in athlete home page");
    db = model.sequelize;
//    findThatAthlete('kaherson@yahoo.com');
    uname = 'kaherson@yahoo.com';
    db
      .authenticate()
      .complete(function(err) {
         if (!!err) {
           console.log('An error occurred while authenticating:', err)
         } else {
           
           model.Athlete
            .find({ where: { username: uname} })
            .complete(function(err, athlete) {
              if (!!err) {
                console.log('An error occurred while searching for uname:', err)
              } else if (!athlete) {
                console.log('No user with the username ' + uname + ' has been found.')
              } else {
                console.log('Hello ' + athlete.spokenName + '!');
                res.render('athlete_page', {title: 'Blech!'});
                res.send('Home Page for: ' + athlete.spokenName);
              }
            })
         }
        })
    
}


function findThatAthlete(uname){
  db
  .authenticate()
  .complete(function(err) {
     if (!!err) {
       console.log('An error occurred while authenticating:', err)
     } else {
       
       model.Athlete
        .find({ where: { username: uname} })
        .complete(function(err, athlete) {
          if (!!err) {
            console.log('An error occurred while searching for uname:', err)
          } else if (!athlete) {
            console.log('No user with the username uname has been found.')
          } else {
            console.log('Hello ' + athlete.spokenName + '!');

          }
        })
 }
})
}