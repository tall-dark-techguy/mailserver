# mailserver
Send Mails Using Nodemailer

How to use mail-server-api

ENDPOINT:
https://mail-server-api.herokuapp.com/api/mail?host=smtp.zoho.com&port=465&username=support@tradulf.com&password=SSLecured0721

BODY:
{
sender: "Sender ID <username@domain.com>",
recipients: [email(s)],
subject: "Mail subject",
message: "HTML or plain text message, may include tags"
}
