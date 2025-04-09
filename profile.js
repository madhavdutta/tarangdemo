import { getCurrentUser, signOut, checkAuthState } from './supabase.js';

document.addEventListener('DOMContentLoaded', async () => {
  // Check if user is logged in, redirect to login if not
  const user = await checkAuthState(true);
  
  if (user) {
    displayUserProfile(user);
  }
  
  // Set up logout button
  const logoutButton = document.getElementById('logout-button');
  if (logoutButton) {
    logoutButton.addEventListener('click', handleLogout);
  }
});

function displayUserProfile(user) {
  const profileInfo = document.getElementById('profile-info');
  
  if (!profileInfo) return;
  
  // Get user metadata
  const userData = user.user_metadata || {};
  const fullName = userData.full_name || 'User';
  const email = user.email || 'No email provided';
  
  // Create profile display
  profileInfo.innerHTML = `
    <div class="profile-section">
      <h3>Account Information</h3>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Account created:</strong> ${new Date(user.created_at).toLocaleDateString()}</p>
    </div>
  `;
}

async function handleLogout(e) {
  e.preventDefault();
  
  try {
    const { error } = await signOut();
    
    if (error) {
      console.error('Error signing out:', error.message);
      return;
    }
    
    // Redirect to login page after successful logout
    window.location.href = 'login.html';
  } catch (err) {
    console.error('Unexpected error during logout:', err);
  }
}
