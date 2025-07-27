from flask import Flask, request, render_template, redirect, url_for, send_from_directory, session
from werkzeug.security import check_password_hash, generate_password_hash
from werkzeug.utils import secure_filename
import psycopg2
import os
from datetime import datetime

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", "supersecret")  # Use a real secret key in production

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

# File type checker
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Admin Login Route
@app.route('/Admin', methods=['GET', 'POST'])
def admin_login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor()
        cur.execute("SELECT password FROM admin_users WHERE username = %s", (username,))
        record = cur.fetchone()
        cur.close()
        conn.close()

        if record and check_password_hash(record[0], password):
            session['admin'] = True
            return redirect(url_for('admin_dashboard'))
        else:
            return "Login failed. Invalid username or password.", 401
    
    return '''
    <h2>Admin Login</h2>
    <form method="POST">
        Username: <input name="username"><br>
        Password: <input type="password" name="password"><br>
        <input type="submit" value="Login">
    </form>
    '''

# Admin Dashboard Route
@app.route('/admin_dashboard')
def admin_dashboard():
    if not session.get('admin'):
        return redirect(url_for('admin_login'))
    return render_template('admin_dashboard.html')

# Logout Route
@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('home'))

# Home with IP Logging
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

#notes upload 
@app.route('/upload_note', methods=['GET', 'POST'])
def upload_note():
    if not session.get('admin'):
        return redirect(url_for('admin_login'))

    if request.method == 'POST':
        title = request.form.get('noteTitle')
        description = request.form.get('noteDescription')
        author = request.form.get('noteAuthor')
        category = request.form.get('noteCategory')
        drive_link = request.form.get('driveLink')
        file_size = request.form.get('fileSize')

        # Handle thumbnail
        thumbnail = request.files.get('thumbnail')
        thumbnail_filename = None
        if thumbnail and '.' in thumbnail.filename:
            ext = thumbnail.filename.rsplit('.', 1)[1].lower()
            if ext in {'jpg', 'jpeg', 'png', 'gif'}:
                from werkzeug.utils import secure_filename
                safe_name = secure_filename(thumbnail.filename)
                thumbnail_filename = datetime.now().strftime('%Y%m%d%H%M%S_') + safe_name
                thumbnail.save(os.path.join('static', 'thumbnails', thumbnail_filename))

        # Save to DB
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor()
        cur.execute("""
            INSERT INTO tools_notes 
                (title, description, author, category, drive_link, file_size, thumbnail_filename, type) 
            VALUES (%s, %s, %s, %s, %s, %s, %s, 'note')
        """, (title, description, author, category, drive_link, file_size, thumbnail_filename))
        conn.commit()
        cur.close()
        conn.close()

        return redirect(url_for('notes'))

    return render_template("upload_note.html")


# Contact Page
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

# Blog Reader
@app.route('/blog')
def blog():
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute("SELECT title, content, created_at FROM blog_posts ORDER BY created_at DESC")
    posts = cur.fetchall()
    cur.close()
    conn.close()
    return render_template('blog.html', posts=posts)

# Blog Uploader (admin only)
@app.route('/upload_blog', methods=['GET', 'POST'])
def upload_blog():
    if not session.get('admin'):
        return redirect(url_for('admin_login'))

    if request.method == 'POST':
        title = request.form['title']
        content = request.form['content']
        conn = psycopg2.connect(os.environ["DATABASE_URL"])
        cur = conn.cursor()
        cur.execute("INSERT INTO blog_posts (title, content) VALUES (%s, %s)", (title, content))
        conn.commit()
        cur.close()
        conn.close()
        return "Blog posted!"
    
    return '''
    <form method="POST">
        Title: <input name="title"><br>
        Content: <textarea name="content"></textarea><br>
        <input type="submit" value="Post">
    </form>
    '''

# Notes Page
@app.route('/notes')
def notes():
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute("""
        SELECT title, description, author, category, drive_link, file_size, thumbnail_filename, created_at 
        FROM tools_notes
        WHERE type='note'
        ORDER BY created_at DESC
    """)
    notes = cur.fetchall()
    cur.close()
    conn.close()

    return render_template('study_notes.html', notes=notes)

# Tools Page
@app.route('/tools')
def tools():
    return render_template('tools.html')

# Upload Notes (Admin Only)
@app.route('/upload_note', methods=['GET', 'POST'])
def upload_note():
    if not session.get('admin'):
        return redirect(url_for('admin_login'))

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

# Serve Uploaded Files
@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

# Security Info Page
@app.route('/security')
def security():
    return render_template('security.html')

# Run App
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
