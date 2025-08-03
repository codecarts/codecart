from flask import Flask, render_template, request, jsonify
import os
from datetime import datetime

app = Flask(__name__)

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

@app.route('/contact')
def contact():
    return render_template('contact.html')


# Run the app
if __name__ == '__main__':
    app.run(debug=True)
