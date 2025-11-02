from flask import Flask, render_template, request, redirect, url_for, flash
from flask_mail import Mail, Message
import os
import dotenv
from threading import Thread

dotenv.load_dotenv()

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")

# Mail Configurations
app.config["MAIL_SERVER"] = "smtp.sendgrid.net"
app.config["MAIL_PORT"] = 587
app.config["MAIL_USERNAME"] = "apikey"
app.config["MAIL_PASSWORD"] = os.getenv("SENDGRID_API")
app.config["MAIL_USE_TLS"] = True
app.config["MAIL_USE_SSL"] = False
app.config["MAIL_DEFAULT_SENDER"] = os.getenv("USER_EMAIL")

mail = Mail(app)

def send_async_email(app, msg):
    with app.app_context():
        try:
            mail.send(msg)
            print(f"✅ Email sent successfully")
        except Exception as e:
            print(f"❌ Error sending email: {e}")


@app.route("/", methods=["GET", "POST"])
def homepage():
    if request.method == 'POST':
        # Getting the values of the form
        fullname = request.form.get("name")
        email = request.form.get("email")
        subject = request.form.get("subject")
        message = request.form.get("message")
        
        # Form Data Validation
        if not all([fullname, email, subject, message]):
            flash("All fields are required", category="error")
            return redirect(url_for("homepage") + "#contact")
       
        try:
            # Sending the mail
            msg = Message(
                subject,
                sender=os.getenv("USER_EMAIL"),
                recipients=[os.getenv("USER_EMAIL"), "saviourb100@gmail.com"]
            )
            msg.body = f"Message from: {fullname}\nEmail: {email}\nSubject: {subject}\n\nDescription: {message}"
            
            # Send email in background thread
            Thread(target=send_async_email, args=(app, msg)).start()
            
            flash("Message sent successfully!", category="success")
        except Exception as e:
            print(f"Error sending email: {e}")
            flash("Failed to send message. Please try again later.", category="error")
        
        return redirect(url_for("homepage") + "#contact")
    
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)