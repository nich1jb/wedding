var nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

var transporter = (pass) => nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'weddingzoeandnick@gmail.com',
		pass: pass
	}
});

  
const mailOptions = (recipient, emailBody) => (
	{
		from: 'noreply@havingawedding.fyi',
		to: recipient,
		subject: "Your eTickets to Nick and Zoe's Wedding are here!",
		html: emailBody,
		attachments: [{
			filename: 'banner.png',
			path: path.join(__dirname, "../attachments/email-header.png"),
			cid: 'nickzoeweddingbanner' 
		},
		{
			filename: 'footer.png',
			path: path.join(__dirname, "../attachments/email-footer.png"),
			cid: 'nickzoeweddingfooter' 
		},
		{
			filename: 'eticket.pdf',
			path: path.join(__dirname, "../attachments/eticket.pdf"),
		}
		]
	}
);

function sendEmail(recipient, pass) {
	const filePath = path.join(__dirname, './email.html');
  	const source = fs.readFileSync(filePath, 'utf-8').toString();
	transporter(pass).sendMail(mailOptions(recipient, source), function(error, info){
		if (error) {
		  console.log(error);
		} else {
		  console.log('Email sent: ' + info.response);
		}
	});
}

module.exports = {
    sendEmail
};
