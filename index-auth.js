import { getCurrentUser, signOut } from './supabase.js';

document.addEventListener('DOMContentLoaded', async () => {
  // Check if user is logged in
  const { user } = await getCurrentUser();
  
  updateNavigation(user);
  
  // Set up logout functionality
  const logoutLink = document.getElementById('logout-link');
  if (logoutLink) {
    logoutLink.addEventListener('click', handleLogout);
  }
});

function updateNavigation(user) {
  const authLinks = document.getElementById('auth-links');
  const userMenu = document.getElementById('user-menu');
  
  if (user) {
    // User is logged in
    if (authLinks) authLinks.style.display = 'none';
    if (userMenu) {
      userMenu.style.display = 'block';
      
      // Update profile link with user name if available
      const profileLink = document.getElementById('profile-link');
      if (profileLink && user.user_metadata && user.user_metadata.full_name) {
        profileLink.textContent = user.user_metadata.full_name;
      }
    }
  } else {
    // User is not logged in
    if (authLinks) authLinks.style.display = 'block';
    if (userMenu) userMenu.style.display = 'none';
  }
}

async function handleLogout(e) {
  e.preventDefault();
  
  try {
    const { error } = await signOut();
    
    if (error) {
      console.error('Error signing out:', error.message);
      return;
    }
    
    // Update navigation after logout
    updateNavigation(null);
    
    // Reload the page to reset state
    window.location.reload();
  } catch (err) {
    console.error('Unexpected error during logout:', err);
  }
}
