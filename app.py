from flask import Flask, render_template, make_response

app = Flask(__name__)

# Add security headers to all responses
@app.after_request
def add_security_headers(response):
    # Security headers to protect against common vulnerabilities
    response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'SAMEORIGIN'
    response.headers['X-XSS-Protection'] = '1; mode=block'
    response.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'
    response.headers['Content-Security-Policy'] = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' fonts.gstatic.com; img-src 'self' data:; connect-src 'self'"
    return response

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/blog')
def blog():
    return render_template('blog.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/tools')
def tools():
    return render_template('tools.html')

@app.route('/notes')
def notes():
    return render_template('notes.html')

# Security information route
@app.route('/security')
def security():
    return render_template('security.html')

if __name__ == '__main__':
    import os
    port = int(os.environ.get("PORT", 5000))
    # Run with HTTPS in production (for development use HTTP)
    app.run(host='0.0.0.0', port=port)
