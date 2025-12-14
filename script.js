        // JavaScript to update the year dynamically
        document.getElementById('year').textContent = new Date().getFullYear();

        // Function to calculate age
        function calculateAge(birthDate) {
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDifference = today.getMonth() - birthDate.getMonth();

            // Adjust age if the birthday hasn't occurred yet this year
            if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }

            return age;
        }

        // Birthdate
        const birthDate = new Date(2005, 3, 27); // Months are 0-indexed in JavaScript (April is 3)
        const age = calculateAge(birthDate);

        // Update the HTML with the calculated age
        const ageElement = document.getElementById('age');
        if (ageElement) {
            ageElement.textContent = age;
        }

        // Resume Modal Logic
        document.addEventListener('DOMContentLoaded', function() {
            const resumeBtn = document.getElementById('resume-download-btn');
            const modal = document.getElementById('resume-modal');
            const cancelBtn = document.getElementById('cancel-download');
            const confirmBtn = document.getElementById('confirm-download');

            if (resumeBtn && modal) {
                resumeBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    modal.classList.add('active');
                });

                cancelBtn.addEventListener('click', function() {
                    modal.classList.remove('active');
                });

                confirmBtn.addEventListener('click', function() {
                    modal.classList.remove('active');
                    // The download will proceed as it's an anchor tag
                });

                // Close modal when clicking outside
                modal.addEventListener('click', function(e) {
                    if (e.target === modal) {
                        modal.classList.remove('active');
                    }
                });
            }
        });

        // Game Download Modal Logic
        document.addEventListener('DOMContentLoaded', function() {
            const gameBtn = document.getElementById('game-download-btn');
            const gameModal = document.getElementById('game-modal');
            const gameCancelBtn = document.getElementById('cancel-game-download');
            const gameConfirmBtn = document.getElementById('confirm-game-download');

            if (gameBtn && gameModal) {
                gameBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    gameModal.classList.add('active');
                });

                gameCancelBtn.addEventListener('click', function() {
                    gameModal.classList.remove('active');
                });

                gameConfirmBtn.addEventListener('click', function() {
                    gameModal.classList.remove('active');
                });

                gameModal.addEventListener('click', function(e) {
                    if (e.target === gameModal) {
                        gameModal.classList.remove('active');
                    }
                });
            }
        });

        // Image Lightbox Logic
        document.addEventListener('DOMContentLoaded', function() {
            // Create Lightbox Elements dynamically
            const lightbox = document.createElement('div');
            lightbox.id = 'image-lightbox';
            lightbox.className = 'lightbox';
            lightbox.innerHTML = '<span class="close-lightbox">&times;</span><img class="lightbox-content" id="lightbox-img">';
            document.body.appendChild(lightbox);

            const lightboxImg = document.getElementById('lightbox-img');
            const closeBtn = lightbox.querySelector('.close-lightbox');

            // Select images for lightbox (excluding project thumbnails as per request)
            const images = document.querySelectorAll('.top-image, .side-image, .image-container img, .hero-image-post, .project-screenshot');

            images.forEach(img => {
                // Ensure the parent anchor doesn't trigger navigation when image is clicked
                img.addEventListener('click', function(e) {
                    e.preventDefault(); // Prevent default link behavior
                    e.stopPropagation(); // Stop event bubbling
                    
                    lightbox.style.display = 'flex';
                    lightboxImg.src = this.src;
                    lightboxImg.alt = this.alt;
                });
                
                // Optional: Add a visual cue that the image is clickable
                img.style.cursor = 'zoom-in';
            });

            // Close Logic
            const closeLightbox = () => {
                lightbox.style.display = 'none';
            };

            if (closeBtn) {
                closeBtn.addEventListener('click', closeLightbox);
            }

            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    closeLightbox();
                }
            });
            
            // Close on Escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && lightbox.style.display === 'flex') {
                    closeLightbox();
                }
            });
        });
// Dark Mode Logic
document.addEventListener('DOMContentLoaded', function() {
    // Icons
    const sunIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
    const moonIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';

    // Create Toggle Button
    const navList = document.querySelector('nav ul');
    if (navList) {
        // Check if button already exists
        if (document.querySelector('.theme-toggle-btn')) return;

        const toggleLi = document.createElement('li');
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'theme-toggle-btn';
        toggleBtn.ariaLabel = 'Toggle Dark Mode';
        toggleBtn.innerHTML = moonIcon; // Default to Moon (for Light Mode)
        
        toggleLi.appendChild(toggleBtn);
        navList.appendChild(toggleLi);

        // Check saved preference
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.documentElement.classList.add('dark-mode');
            toggleBtn.innerHTML = sunIcon; // Sun icon for Dark Mode
        }

        // Toggle Event
        toggleBtn.addEventListener('click', function() {
            document.documentElement.classList.toggle('dark-mode');
            const isDark = document.documentElement.classList.contains('dark-mode');
            
            toggleBtn.innerHTML = isDark ? sunIcon : moonIcon;
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }
});

// Inject Background Effects
document.addEventListener('DOMContentLoaded', function() {
    if (!document.getElementById('bg-effects')) {
        const bgEffects = document.createElement('div');
        bgEffects.id = 'bg-effects';
        bgEffects.innerHTML = `
            <div class="bg-layer bg-layer-light"></div>
            <div class="bg-layer bg-layer-dark"></div>
        `;
        document.body.appendChild(bgEffects);
    }
});

