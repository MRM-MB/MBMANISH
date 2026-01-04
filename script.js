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
        
        // Also update any elements with class 'dynamic-age'
        const ageElements = document.querySelectorAll('.dynamic-age');
        ageElements.forEach(element => {
            element.textContent = age;
        });

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
    const toggleBtn = document.getElementById('theme-toggle');
    
    // Icons
    const sunIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
    const moonIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';

    // Check saved preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

    // Apply initial theme
    if (isDark) {
        document.documentElement.classList.add('dark-mode');
    }

    // Function to update icon
    const updateIcon = (dark) => {
        if (toggleBtn) {
            toggleBtn.innerHTML = dark ? sunIcon : moonIcon;
        } else {
            // Fallback for pages with old structure (inject button)
            injectLegacyToggle(dark);
        }
    };

    updateIcon(isDark);

    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            document.documentElement.classList.toggle('dark-mode');
            isDark = document.documentElement.classList.contains('dark-mode');
            updateIcon(isDark);
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    // Legacy Injection Logic (for pages without #theme-toggle)
    function injectLegacyToggle(initialDark) {
        const navList = document.querySelector('nav ul');
        if (navList && !document.querySelector('.theme-toggle-btn')) {
            const sunIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
            const moonIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';

            const toggleLi = document.createElement('li');
            const btn = document.createElement('button');
            btn.className = 'theme-toggle-btn';
            btn.ariaLabel = 'Toggle Dark Mode';
            btn.innerHTML = initialDark ? sunIcon : moonIcon;
            
            toggleLi.appendChild(btn);
            navList.appendChild(toggleLi);

            btn.addEventListener('click', function() {
                document.documentElement.classList.toggle('dark-mode');
                const currentDark = document.documentElement.classList.contains('dark-mode');
                btn.innerHTML = currentDark ? sunIcon : moonIcon;
                localStorage.setItem('theme', currentDark ? 'dark' : 'light');
            });
        }
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



// Video Lightbox Logic
document.addEventListener('DOMContentLoaded', function() {
    // Create Video Lightbox Elements dynamically
    const videoLightbox = document.createElement('div');
    videoLightbox.id = 'video-lightbox';
    videoLightbox.className = 'lightbox';
    videoLightbox.innerHTML = `
        <span class='close-lightbox'>&times;</span>
        <video class='lightbox-content' id='lightbox-video' controls autoplay></video>
    `;
    document.body.appendChild(videoLightbox);

    const lightboxVideo = document.getElementById('lightbox-video');
    const closeBtn = videoLightbox.querySelector('.close-lightbox');

    // Select all videos that should be expandable
    const videos = document.querySelectorAll('video');

    videos.forEach(video => {
        // Add visual cue
        video.style.cursor = 'pointer';
        video.title = 'Click to expand';

        video.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            // Pause the background video
            this.pause();

            // Show lightbox
            videoLightbox.style.display = 'flex';
            
            // Set source
            const currentSrc = this.currentSrc || this.src;
            if (currentSrc) {
                lightboxVideo.src = currentSrc;
            } else {
                lightboxVideo.innerHTML = this.innerHTML;
            }
            
            // Play the lightbox video
            setTimeout(() => {
                lightboxVideo.play().catch(e => console.log('Autoplay prevented:', e));
            }, 100);
        });
    });

    // Close Logic
    const closeVideoLightbox = () => {
        videoLightbox.style.display = 'none';
        lightboxVideo.pause();
        lightboxVideo.src = ''; 
        
        // Resume all background videos
        videos.forEach(v => {
            if (v.hasAttribute('autoplay')) {
                v.play().catch(e => console.log('Resume prevented:', e));
            }
        });
    };

    if (closeBtn) {
        closeBtn.addEventListener('click', closeVideoLightbox);
    }

    videoLightbox.addEventListener('click', function(e) {
        if (e.target === videoLightbox) {
            closeVideoLightbox();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoLightbox.style.display === 'flex') {
            closeVideoLightbox();
        }
    });
});

// Tab Switching Logic
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                // Add active class to clicked button and corresponding content
                button.classList.add('active');
                const targetId = button.getAttribute('data-tab');
                const targetContent = document.getElementById(targetId);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }
});

// Tinder-like Card Stack Logic
document.addEventListener('DOMContentLoaded', function() {
    const cardsContainer = document.getElementById('tinder-cards');
    const messageContainer = document.getElementById('tinder-message');
    const reloadBtn = document.getElementById('reload-cards');
    
    if (!cardsContainer || !messageContainer) return;

    let cards = Array.from(document.querySelectorAll('.tinder-card'));
    let isDragging = false;
    let isHovering = false;
    let startX = 0;
    let currentX = 0;
    let currentCard = null;
    
    // Pre-calculate random "messy" positions for the stack slots
    const stackSlots = [];
    for(let i = 0; i < 10; i++) {
        stackSlots.push({
            x: (Math.random() * 20) - 10, // Small random offset
            y: (Math.random() * 20) - 10,
            rot: (Math.random() * 10) - 5
        });
    }

    // Directions for corner spreading: TL, TR, BL, BR
    const corners = [
        {x: -1, y: -1}, 
        {x: 1, y: -1}, 
        {x: -1, y: 1}, 
        {x: 1, y: 1}
    ];

    function initCards() {
        cards.forEach((card, index) => {
            card.style.zIndex = cards.length - index;
            // Reset event listeners
            card.onmousedown = startDrag;
            card.ontouchstart = startDrag;
        });
        
        // Add hover effects to the container
        cardsContainer.addEventListener('mouseenter', () => {
            isHovering = true;
            updateStack();
        });
        
        cardsContainer.addEventListener('mouseleave', () => {
            isHovering = false;
            updateStack();
        });
        
        messageContainer.classList.remove('active');
        cardsContainer.style.display = 'block';
        updateStack();
    }

    function startDrag(e) {
        if (this !== cards[0]) return; // Only top card is draggable
        
        isDragging = true;
        currentCard = this;
        startX = (e.type === 'touchstart') ? e.touches[0].clientX : e.clientX;
        currentX = startX;
        
        currentCard.style.transition = 'none';
        
        document.addEventListener('mousemove', onDrag);
        document.addEventListener('touchmove', onDrag, { passive: false });
        document.addEventListener('mouseup', endDrag);
        document.addEventListener('touchend', endDrag);
    }

    function onDrag(e) {
        if (!isDragging) return;
        
        if(e.type === 'touchmove') {
             e.preventDefault(); 
        }
        
        currentX = (e.type === 'touchmove') ? e.touches[0].clientX : e.clientX;
        const deltaX = currentX - startX;
        const rotate = deltaX * 0.1;
        
        currentCard.style.transform = 'translateX(' + deltaX + 'px) rotate(' + rotate + 'deg)';
    }

    function endDrag(e) {
        if (!isDragging) return;
        
        isDragging = false;
        const deltaX = currentX - startX;
        const threshold = 100;
        
        currentCard.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
        
        if (Math.abs(deltaX) > threshold) {
            const throwDir = deltaX > 0 ? 1 : -1;
            currentCard.style.transform = 'translateX(' + (throwDir * 500) + 'px) rotate(' + (throwDir * 45) + 'deg)';
            currentCard.style.opacity = '0';
            
            setTimeout(() => {
                currentCard.remove();
                cards.shift();
                
                if (cards.length === 0) {
                    showEndMessage();
                } else {
                    updateStack();
                }
            }, 300);
        } else {
            currentCard.style.transform = 'scale(1) rotate(0deg)';
        }
        
        document.removeEventListener('mousemove', onDrag);
        document.removeEventListener('touchmove', onDrag);
        document.removeEventListener('mouseup', endDrag);
        document.removeEventListener('touchend', endDrag);
    }

    function updateStack() {
        cards.forEach((card, index) => {
            card.style.zIndex = cards.length - index;
            card.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
            
            if (index === 0) {
                if (!isDragging) card.style.transform = 'scale(1) rotate(0deg)';
            } else {
                const slot = stackSlots[index] || {x:0, y:0, rot:0};
                const corner = corners[index % 4]; // Cycle through corners
                
                let tx, ty, rot, scale;

                if (isHovering) {
                    // Expand towards corners
                    // Spread factor increases with index to prevent overlap
                    const spread = 20 + (index * 4); // Reduced spread on hover
                    tx = slot.x + (corner.x * spread);
                    ty = slot.y + (corner.y * spread * 0.5); // Less vertical spread
                    rot = slot.rot + (corner.x * 5); // Rotate towards outside
                    scale = 1; // Full size on hover
                } else {
                    // Compact messy stack
                    // Increased spread to show background cards more
                    tx = slot.x + (corner.x * 12);
                    ty = slot.y + (corner.y * 8);
                    rot = slot.rot;
                    scale = 1 - (index * 0.05);
                }
                
                card.style.transform = 'translate(' + tx + 'px, ' + ty + 'px) rotate(' + rot + 'deg) scale(' + scale + ')';
            }
        });
    }

    function showEndMessage() {
        cardsContainer.style.display = 'none';
        messageContainer.classList.add('active');
    }

    reloadBtn.addEventListener('click', () => {
        cardsContainer.innerHTML = `
            <div class="tinder-card"><img class="header-image" src="images/avatar/avatar_1.svg" alt="Manish’s portrait" draggable="false"/></div>
            <div class="tinder-card"><img class="header-image" src="images/avatar/avatar_2.svg" alt="Manish’s portrait" draggable="false"/></div>
            <div class="tinder-card"><img class="header-image" src="images/avatar/avatar_3.svg" alt="Manish’s portrait" draggable="false"/></div>
            <div class="tinder-card"><img class="header-image" src="images/avatar/avatar_4.svg" alt="Manish’s portrait" draggable="false"/></div>
            <div class="tinder-card"><img class="header-image" src="images/avatar/avatar_5.svg" alt="Manish’s portrait" draggable="false"/></div>
        `;
        cards = Array.from(document.querySelectorAll('.tinder-card'));
        initCards();
    });

    initCards();
});

