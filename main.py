from flask import Flask, request, render_template, redirect, url_for, session, flash
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
import psycopg2
import os
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", "supersecretkey")

# Database connection (Supabase = PostgreSQL)
def get_db_connection():
    return psycopg2.connect(os.environ['DATABASE_URL'])

# Security Headers
@app.after_request
def add_security_headers(response):
    headers = {
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'X-XSS-Protection': '1; mode=block',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' fonts.gstatic.com; img-src 'self' data:; connect-src 'self'"
    }
    for key, value in headers.items():
        response.headers[key] = value
    return response

# Homepage
@app.route('/')
def home():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("INSERT INTO visitor_logs (ip_address) VALUES (%s)", (request.remote_addr,))
        conn.commit()

        cur.execute("SELECT title, description FROM tools_notes ORDER BY created_at DESC LIMIT 3")
        recent_notes = cur.fetchall()

        cur.execute("SELECT title, id FROM blog_posts ORDER BY created_at DESC LIMIT 3")
        recent_blogs = cur.fetchall()

        cur.close()
        conn.close()
        return render_template('index.html', recent_notes=recent_notes, recent_blogs=recent_blogs, is_admin=session.get('admin', False))
    except Exception as e:
        return render_template('index.html', error=str(e))

# Authentication
@app.route('/auth')
def auth():
    return render_template('auth.html')

@app.route('/login', methods=['POST'])
def login():
    email = request.form.get('email')
    password = request.form.get('password')

    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT id, name, password FROM users WHERE email = %s", (email,))
        user = cur.fetchone()

        if user and check_password_hash(user[2], password):
            session['user'] = {'id': user[0], 'name': user[1]}
            flash('Login successful!', 'success')
            return redirect(url_for('home'))
        else:
            flash('Invalid email or password', 'danger')
            return redirect(url_for('auth'))
    except Exception as e:
        flash('Login error: ' + str(e), 'danger')
        return redirect(url_for('auth'))
    finally:
        if 'cur' in locals(): cur.close()
        if 'conn' in locals(): conn.close()

@app.route('/register', methods=['POST'])
def register():
    name = request.form.get('name')
    email = request.form.get('email')
    password = generate_password_hash(request.form.get('password'))

    try:
        conn = get_db_connection()
        cur = conn.cursor()

        cur.execute("SELECT id FROM users WHERE email = %s", (email,))
        if cur.fetchone():
            flash('Email already registered', 'danger')
            return redirect(url_for('auth'))

        cur.execute("INSERT INTO users (name, email, password) VALUES (%s, %s, %s) RETURNING id", (name, email, password))
        user_id = cur.fetchone()[0]
        conn.commit()

        session['user'] = {'id': user_id, 'name': name}
        flash('Registration successful!', 'success')
        return redirect(url_for('home'))
    except Exception as e:
        flash('Registration error: ' + str(e), 'danger')
        return redirect(url_for('auth'))
    finally:
        if 'cur' in locals(): cur.close()
        if 'conn' in locals(): conn.close()

# Notes Page
@app.route('/notes')
def notes():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("""
            SELECT id, title, description, author, category, drive_link, file_size, thumbnail_filename 
            FROM tools_notes 
            WHERE type='note' 
            ORDER BY created_at DESC
        """)
        notes = cur.fetchall()
        return render_template('notes.html', notes=notes)
    except Exception as e:
        return render_template('notes.html', error=str(e))
    finally:
        if 'cur' in locals(): cur.close()
        if 'conn' in locals(): conn.close()

# Tools alias for Tech Blogs
@app.route('/tools')
def tools_alias():
    return redirect(url_for('tech_blogs'))

@app.route('/tech-blogs')
def tech_blogs():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT id, title, content, created_at FROM blog_posts ORDER BY created_at DESC")
        blogs = cur.fetchall()
        return render_template('tech_blogs.html', blogs=blogs)
    except Exception as e:
        return render_template('tech_blogs.html', error=str(e))
    finally:
        if 'cur' in locals(): cur.close()
        if 'conn' in locals(): conn.close()

# Blog view
@app.route('/blog/<int:post_id>')
def blog_post(post_id):
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT title, content, created_at FROM blog_posts WHERE id = %s", (post_id,))
        post = cur.fetchone()
        return render_template('blog_post.html', post=post)
    except Exception as e:
        return render_template('blog_post.html', error=str(e))
    finally:
        if 'cur' in locals(): cur.close()
        if 'conn' in locals(): conn.close()

# Questions
@app.route('/questions')
def questions():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("""
            SELECT id, title, description, category, drive_link, file_size, thumbnail_filename 
            FROM tools_notes 
            WHERE type='question' 
            ORDER BY created_at DESC
        """)
        questions = cur.fetchall()
        return render_template('questions.html', questions=questions)
    except Exception as e:
        return render_template('questions.html', error=str(e))
    finally:
        if 'cur' in locals(): cur.close()
        if 'conn' in locals(): conn.close()

# Admin login
@app.route('/admin/login', methods=['GET', 'POST'])
def admin_login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        try:
            conn = get_db_connection()
            cur = conn.cursor()
            cur.execute("SELECT id, password FROM admin_users WHERE username = %s", (username,))
            admin = cur.fetchone()
            if admin and check_password_hash(admin[1], password):
                session['admin'] = True
                session['admin_id'] = admin[0]
                return redirect(url_for('admin_dashboard'))
            else:
                flash('Invalid admin credentials', 'danger')
        except Exception as e:
            flash('Admin login error: ' + str(e), 'danger')
        finally:
            if 'cur' in locals(): cur.close()
            if 'conn' in locals(): conn.close()
    return render_template('admin_login.html')

# Admin dashboard
@app.route('/admin/dashboard')
def admin_dashboard():
    if not session.get('admin'):
        return redirect(url_for('admin_login'))
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT COUNT(*) FROM users")
        user_count = cur.fetchone()[0]
        cur.execute("SELECT COUNT(*) FROM blog_posts")
        post_count = cur.fetchone()[0]
        cur.execute("SELECT COUNT(*) FROM tools_notes")
        note_count = cur.fetchone()[0]
        return render_template('admin_dashboard.html', user_count=user_count, post_count=post_count, note_count=note_count)
    except Exception as e:
        return render_template('admin_dashboard.html', error=str(e))
    finally:
        if 'cur' in locals(): cur.close()
        if 'conn' in locals(): conn.close()

# Admin upload routes
@app.route('/upload_blog')
@app.route('/upload_note')
@app.route('/upload_question')
@app.route('/upload_resource')
@app.route('/database')
def admin_subpages():
    if not session.get('admin'):
        return redirect(url_for('admin_login'))
    return render_template(f"admin{request.path}.html")

# Resources page
@app.route('/resources')
def resources():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT * FROM tools_notes WHERE type='resource'")
        resources = cur.fetchall()
        return render_template('resources.html', resources=resources)
    except Exception as e:
        return render_template('resources.html', error=str(e))
    finally:
        if 'cur' in locals(): cur.close()
        if 'conn' in locals(): conn.close()

# Footer placeholders
@app.route('/cheatsheets')
def cheatsheets():
    return "<h3>Cheat Sheets coming soon!</h3>"

@app.route('/videos')
def videos():
    return "<h3>Video Tutorials coming soon!</h3>"

@app.route('/practice')
def practice():
    return "<h3>Practice Tests coming soon!</h3>"

# Contact
@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        message = request.form.get('message')
        try:
            conn = get_db_connection()
            cur = conn.cursor()
            cur.execute("INSERT INTO contact_messages (name, email, message) VALUES (%s, %s, %s)", (name, email, message))
            conn.commit()
            flash('Message sent successfully!', 'success')
        except Exception as e:
            flash('Error sending message: ' + str(e), 'danger')
        finally:
            if 'cur' in locals(): cur.close()
            if 'conn' in locals(): conn.close()
        return redirect(url_for('contact'))
    return render_template('contact.html')

# Security
@app.route('/security')
def security():
    return render_template('security.html')

# Logout
@app.route('/logout')
def logout():
    session.clear()
    flash('You have been logged out', 'info')
    return redirect(url_for('home'))

# Run
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
