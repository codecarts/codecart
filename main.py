from flask import Flask, render_template, request, jsonify
from flask_mail import Mail, Message
import os
from datetime import datetime

app = Flask(__name__)
app.secret_key = 'hellouser123456789hello'

# Mail config
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'codecarthelp@gmail.com'       # Your Gmail
app.config['MAIL_PASSWORD'] = 'xeyl dfvy eaxo hlvu'          # App Password

# Connect Mail with app (THIS IS ESSENTIAL)
mail = Mail(app)


# Home route
@app.route('/')
def home():
    return render_template('index.html')

# API to handle resource form (from modal)
@app.route('/api/get_resources', methods=['POST'])
def get_resources():
    try:
        data = request.get_json()

        # Log to file (optional)
        with open('form_logs.txt', 'a') as f:
            f.write(f"{datetime.now()} - {data}\n")

        print("Resource Request Received:", data)

        return jsonify({'status': 'success'})
    except Exception as e:
        print("Error processing request:", e)
        return jsonify({'status': 'error', 'message': str(e)}), 500
    
@app.route('/notes')
def notes():
    return render_template('notes.html')

@app.route('/pyqs')
def pyqs():
    return render_template('pyqs.html')

@app.route('/blogs')
def blogs():
    return render_template('blogs.html')

@app.route("/contact", methods=["GET", "POST"])
def contact():
    if request.method == "POST":
        name = request.form["name"]
        email = request.form["email"]
        subject = request.form["subject"]
        message = request.form["message"]

        try:
            msg = Message(subject=f"[CodeCart Contact] {subject}",
                          sender=app.config['MAIL_USERNAME'],
                          recipients=[app.config['MAIL_USERNAME']])
            msg.body = f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}"
            mail.send(msg)
            flash("Message sent successfully!", "success")
        except Exception as e:
            flash("Error sending message. Please try again.", "error")

        return redirect(url_for("contact"))
    return render_template("contact.html")


# Run the app
if __name__ == '__main__':
    app.run(debug=True)
