
/*
 * GET home page.
 */
var nodemailer = require("nodemailer");

// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "xxxxxx",
        pass: "xxxxxx"
    }
});



exports.index = function(req, res){
  console.log(req);
  res.render('index', { title: 'Express' });
};

exports.add_mail = function(req, res) {
	var email = (req.query.email).substr(0,256);
	// setup e-mail data with unicode symbols
	var mailOptions = {
		from: email, // sender address
		to: "xxxxxxx", // list of receivers
		subject: "New Beta Request", // Subject line
		text: "The following user has requested to be put on the beta list: " + email // plaintext body
	};

	// send mail with defined transport object
	smtpTransport.sendMail(mailOptions, function(error, response){
		if(error){
			console.log(error);
		}else{
			console.log("Message sent: " + response.message);
		}

		// if you don't want to use this transport object anymore, uncomment following line
		smtpTransport.close(); // shut down the connection pool, no more messages
	});
	res.send('success!');
};