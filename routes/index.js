var model = require('../model')
var Sequelize = require('sequelize')
var _ = require('underscore')


exports.index = function(req, res){
  res.render('index', { title: 'Express' });
  console.log('in index')
};

exports.add_mail = function(req, res) {
    console.log('in add_mail');
	var email = (req.body.email).substr(0,256);
    console.log ('email enterd = '+email);
    db = model.sequelize;
//    findThatAthlete('kaherson@yahoo.com');
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
                console.log('An error occurred while searching for uname:', err)
              } else if (!athlete) {
                console.log('No user with the username ' + uname + ' has been found.')
                res.send('No user with the username ' + uname + ' has been found; please go back.')
              } else {
                db
                    .query('SELECT * FROM teams where "teamId" = '+ athlete.teamId +'', Team)
                    .success(function(team){

                    db.query('SELECT * FROM coaches where "coachId" = '+team[0].coachId+'', Coach)
                      .success(function(coach){

                        console.log('Hello ' + coach.spokenName + '!');
                        res.render('athlete_page', {title: 'Express'
                                                ,current_athlete: athlete.spokenName
                                                ,tn: team[0].teamName
                                                ,cn: coach[0].spokenName
                                                ,goal: athlete.goal
                                                ,gd: athlete.goalDate.toDateString()
                                                ,bp: athlete.boulderPar
                                                ,bb: athlete.boulderBest
                                                ,sp: athlete.routePar
                                                ,sb: athlete.routeBest});
                        })
                      })
               // res.send('Home Page for: ' + athlete.spokenName);
              }
            })
         }
        })

	//res.send('success!');
};

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