document.addEventListener('DOMContentLoaded', function() {
  // Security badge functionality
  const securityBadge = document.getElementById('securityBadge');
  
  securityBadge.addEventListener('click', () => {
    alert('🔒 Secure Connection\n\nThis site uses:\n- TLS 1.3 encryption\n- Regular security audits\n- Secure cloud hosting\n- Privacy protection\n\nYour connection is secure!');
  });

  // Animation for cards on scroll
  const cards = document.querySelectorAll('.feature-card, .security-card, .testimonial-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, {
    threshold: 0.1
  });
  
  cards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(card);
  });

  // Auth Modal Functionality
  const authModal = document.getElementById('authModal');
  const closeModal = document.getElementById('closeModal');
  const getStartedBtn = document.getElementById('getStartedBtn');
  const authTabs = document.querySelectorAll('.auth-tab');
  const authForms = document.querySelectorAll('.auth-form');
  const switchToLogin = document.getElementById('switchToLogin');
  const forgotPassword = document.getElementById('forgotPassword');

  // Open modal when clicking Get Started
  getStartedBtn.addEventListener('click', (e) => {
    e.preventDefault();
    authModal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  });

  // Close modal
  closeModal.addEventListener('click', () => {
    authModal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  });

  // Close when clicking outside modal
  authModal.addEventListener('click', (e) => {
    if (e.target === authModal) {
      authModal.style.display = 'none';
      document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
  });

  // Tab switching
  authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs and forms
      authTabs.forEach(t => t.classList.remove('active'));
      authForms.forEach(f => f.classList.remove('active'));
      
      // Add active class to clicked tab and corresponding form
      tab.classList.add('active');
      const formId = tab.getAttribute('data-tab') + 'Form';
      document.getElementById(formId).classList.add('active');
    });
  });

  // Switch to login form
  switchToLogin.addEventListener('click', (e) => {
    e.preventDefault();
    authTabs.forEach(t => t.classList.remove('active'));
    authForms.forEach(f => f.classList.remove('active'));
    document.querySelector('[data-tab="login"]').classList.add('active');
    document.getElementById('loginForm').classList.add('active');
  });

  // Forgot password
  forgotPassword.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    if (email) {
      alert(`Password reset link will be sent to: ${email}`);
    } else {
      alert('Please enter your email address first');
    }
  });

  // Form submissions
  document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }
    
    // Simulate login
    alert(`Login successful! Welcome back, ${email.split('@')[0]}`);
    authModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Reset form
    e.target.reset();
  });

  document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirm').value;
    
    if (!name || !email || !password || !confirmPassword) {
      alert('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    if (password.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }
    
    // Simulate signup
    alert(`Account created successfully! Welcome to CodeCart, ${name}`);
    authModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Reset form
    e.target.reset();
    
    // Switch to login tab
    authTabs.forEach(t => t.classList.remove('active'));
    authForms.forEach(f => f.classList.remove('active'));
    document.querySelector('[data-tab="login"]').classList.add('active');
    document.getElementById('loginForm').classList.add('active');
  });

  // Close modal on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && authModal.style.display === 'flex') {
      authModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
});