import { signUp, signIn, checkAuthState } from './supabase.js';

// Check authentication state on page load
document.addEventListener('DOMContentLoaded', async () => {
  await checkAuthState(false); // Don't redirect from auth pages
  
  // Set up form event listeners
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }
  
  if (signupForm) {
    signupForm.addEventListener('submit', handleSignup);
  }
});

async function handleLogin(e) {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const errorElement = document.getElementById('login-error');
  
  // Clear previous error messages
  errorElement.textContent = '';
  
  // Disable form during submission
  const submitButton = e.target.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = 'Logging in...';
  
  try {
    const { data, error } = await signIn(email, password);
    
    if (error) {
      errorElement.textContent = error.message || 'Failed to log in. Please check your credentials.';
      return;
    }
    
    // Successful login
    window.location.href = 'index.html';
  } catch (err) {
    errorElement.textContent = 'An unexpected error occurred. Please try again.';
    console.error('Login error:', err);
  } finally {
    // Re-enable form
    submitButton.disabled = false;
    submitButton.textContent = 'Login';
  }
}

async function handleSignup(e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  const errorElement = document.getElementById('signup-error');
  
  // Clear previous error messages
  errorElement.textContent = '';
  
  // Validate passwords match
  if (password !== confirmPassword) {
    errorElement.textContent = 'Passwords do not match';
    return;
  }
  
  // Disable form during submission
  const submitButton = e.target.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = 'Creating account...';
  
  try {
    // Add user metadata
    const userData = {
      full_name: name
    };
    
    const { data, error } = await signUp(email, password, userData);
    
    if (error) {
      errorElement.textContent = error.message || 'Failed to create account. Please try again.';
      return;
    }
    
    // Successful signup
    window.location.href = 'login.html?registered=true';
  } catch (err) {
    errorElement.textContent = 'An unexpected error occurred. Please try again.';
    console.error('Signup error:', err);
  } finally {
    // Re-enable form
    submitButton.disabled = false;
    submitButton.textContent = 'Sign Up';
  }
}
