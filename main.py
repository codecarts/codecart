from flask import Flask, request, render_template, redirect, url_for, send_from_directory
import psycopg2
import os
from datetime import datetime
from werkzeug.utils import secure_filename

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'pdf', 'pptx'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Security headers
@app.after_request
def add_security_headers(response):
    response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'SAMEORIGIN'
    response.headers['X-XSS-Protection'] = '1; mode=block'
    response.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'
    response.headers['Content-Security-Policy'] = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' fonts.gstatic.com; img-src 'self' data:; connect-src 'self'"
    return response

# Helper: Check file extension
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Home page + log IP
@app.route('/')
def home():
    ip = request.remote_addr
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute("INSERT INTO visitor_logs (ip_address) VALUES (%s)", (ip,))
    conn.commit()
    cur.close()
    conn.close()
    return render_template('index.html')

# Contact form page
@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        message = request.form['message']
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor()
        cur.execute("INSERT INTO contact_form (name, email, message) VALUES (%s, %s, %s)", (name, email, message))
        conn.commit()
        cur.close()
        conn.close()
        return "Message sent!"
    return render_template('contact.html')

# Blog page
@app.route('/blog')
def blog():
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute("SELECT title, content, created_at FROM blog_posts ORDER BY created_at DESC")
    posts = cur.fetchall()
    cur.close()
    conn.close()
    return render_template('blog.html', posts=posts)

# Notes page (shows uploaded files)
@app.route('/notes')
def notes():
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute("SELECT title, description, file_url, created_at FROM tools_notes WHERE type='note' ORDER BY created_at DESC")
    notes = cur.fetchall()
    cur.close()
    conn.close()
    return render_template('notes.html', notes=notes)

# Tools page (optional tools metadata)
@app.route('/tools')
def tools():
    return render_template('tools.html')

# Upload notes (.pdf/.pptx)
@app.route('/upload_note', methods=['GET', 'POST'])
def upload_note():
    if request.method == 'POST':
        title = request.form['title']
        description = request.form['description']
        file = request.files['file']
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)
            conn = psycopg2.connect(os.environ["DATABASE_URL"])
            cur = conn.cursor()
            cur.execute("""
                INSERT INTO tools_notes (title, description, type, file_url)
                VALUES (%s, %s, 'note', %s)
            """, (title, description, filename))
            conn.commit()
            cur.close()
            conn.close()
            return "Note uploaded!"
    return '''
    <form method="POST" enctype="multipart/form-data">
      Title: <input name="title"><br>
      Description: <textarea name="description"></textarea><br>
      File: <input type="file" name="file"><br>
      <input type="submit">
    </form>
    '''

# Serve uploaded files
@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

# Static security info
@app.route('/security')
def security():
    return render_template('security.html')

# App run
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
