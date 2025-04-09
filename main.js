// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Adjust for header height
        behavior: 'smooth'
      });
    }
  });
});

// Simple mobile menu toggle (can be expanded as needed)
function setupMobileMenu() {
  const header = document.querySelector('header');
  const nav = document.querySelector('nav');
  
  // This is a placeholder for mobile menu functionality
  // In a real implementation, you would add a hamburger icon and toggle menu visibility
  
  // Example of how you might implement this:
  // const mobileMenuBtn = document.createElement('button');
  // mobileMenuBtn.classList.add('mobile-menu-btn');
  // mobileMenuBtn.innerHTML = '☰';
  // header.insertBefore(mobileMenuBtn, nav);
  
  // mobileMenuBtn.addEventListener('click', () => {
  //   nav.classList.toggle('active');
  // });
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Call setup functions here
  // setupMobileMenu();
  
  console.log('Website initialized successfully!');
});
