        /* --- DYNAMIC YEAR & AGE CALCULATION --- */
        // Update the footer year and calculate current age based on birthdate
        document.getElementById('year').textContent = new Date().getFullYear();

        function calculateAge(birthDate) {
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDifference = today.getMonth() - birthDate.getMonth();

            if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }

            return age;
        }

        const birthDate = new Date(2005, 3, 27);
        const age = calculateAge(birthDate);

        const ageElement = document.getElementById('age');
        if (ageElement) {
            ageElement.textContent = age;
        }
        
        const ageElements = document.querySelectorAll('.dynamic-age');
        ageElements.forEach(element => {
            element.textContent = age;
        });

        /* --- RESUME MODAL --- */
        // Manage the interactions for the resume download confirmation modal
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
                });

                modal.addEventListener('click', function(e) {
                    if (e.target === modal) {
                        modal.classList.remove('active');
                    }
                });
            }
        });

        /* --- GAME DOWNLOAD MODAL --- */
        // Handle the confirmation logic before downloading game files
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

        /* --- IMAGE LIGHTBOX --- */
        // Create a full-screen viewer for images and handle opening/closing interactions
        document.addEventListener('DOMContentLoaded', function() {
            const lightbox = document.createElement('div');
            lightbox.id = 'image-lightbox';
            lightbox.className = 'lightbox';
            lightbox.innerHTML = '<span class="close-lightbox">&times;</span><img class="lightbox-content" id="lightbox-img">';
            document.body.appendChild(lightbox);

            const lightboxImg = document.getElementById('lightbox-img');
            const closeBtn = lightbox.querySelector('.close-lightbox');

            const images = document.querySelectorAll('img.top-image, img.side-image, .image-container img, img.hero-image-post, img.project-screenshot');

            images.forEach(img => {
                img.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    lightbox.style.display = 'flex';
                    lightboxImg.src = this.src;
                    lightboxImg.alt = this.alt;
                });
                
                img.style.cursor = 'zoom-in';
            });

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
            
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && lightbox.style.display === 'flex') {
                    closeLightbox();
                }
            });
        });

/* --- DARK MODE --- */
// Manage theme switching, persist changes to localStorage, and ensure icons match the state
document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('theme-toggle');
    
    const sunIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
    const moonIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

    const updateAvatar = (dark) => {
        const avatars = document.querySelectorAll('.header-image-small, .logo');
        avatars.forEach(img => {
            if (img.src.includes('avatar.svg') || img.src.includes('avatar-dark.svg')) {
                 if (dark) {
                     if (img.src.includes('avatar.svg') && !img.src.includes('avatar-dark.svg')) {
                         img.src = img.src.replace('avatar.svg', 'avatar-dark.svg');
                     }
                 } else {
                     if (img.src.includes('avatar-dark.svg')) {
                         img.src = img.src.replace('avatar-dark.svg', 'avatar.svg');
                     }
                 }
            }
        });
    };

    const updateThemeImages = (dark) => {
        const themeImages = document.querySelectorAll('[data-theme-src-light][data-theme-src-dark]');
        themeImages.forEach(img => {
            const lightSrc = img.getAttribute('data-theme-src-light');
            const darkSrc = img.getAttribute('data-theme-src-dark');
            if (!lightSrc || !darkSrc) {
                return;
            }

            const nextSrc = dark ? darkSrc : lightSrc;
            if (img.getAttribute('src') !== nextSrc) {
                img.setAttribute('src', nextSrc);
            }
        });
    };
    
    updateAvatar(isDark);
    updateThemeImages(isDark);

    if (isDark) {
        document.documentElement.classList.add('dark-mode');
    }

    const updateIcon = (dark) => {
        if (toggleBtn) {
            toggleBtn.innerHTML = dark ? sunIcon : moonIcon;
        } else {
            injectLegacyToggle(dark);
        }
    };


    updateIcon(isDark);

    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            document.documentElement.classList.toggle('dark-mode');
            isDark = document.documentElement.classList.contains('dark-mode');
            updateIcon(isDark);
            updateAvatar(isDark);
            updateThemeImages(isDark);
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    // Inject the toggle button dynamically on backward-compatible pages
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
                updateAvatar(currentDark);
                updateThemeImages(currentDark);
                localStorage.setItem('theme', currentDark ? 'dark' : 'light');
            });
        }
    }
});

/* --- BACKGROUND EFFECTS --- */
// Add ambient background layers for visual depth
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



/* --- VIDEO LIGHTBOX --- */
// Manage a pop-up player for video content, handling autoplay and pausing background videos
document.addEventListener('DOMContentLoaded', function() {
    const videoLightbox = document.createElement('div');
    videoLightbox.id = 'video-lightbox';
    videoLightbox.className = 'lightbox';
    videoLightbox.innerHTML = `
        <span class='close-lightbox'>&times;</span>
        <video class='lightbox-content' id='lightbox-video' controls></video>
    `;
    document.body.appendChild(videoLightbox);

    const lightboxVideo = document.getElementById('lightbox-video');
    const closeBtn = videoLightbox.querySelector('.close-lightbox');

    const videos = document.querySelectorAll('video:not(.no-lightbox)');

    let playTimeoutId = null;

    videos.forEach(video => {
        video.style.cursor = 'pointer';
        video.title = 'Click to expand';

        video.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            this.pause();

            videoLightbox.style.display = 'flex';

            
            // Set source
            const currentSrc = this.currentSrc || this.src;
            if (currentSrc) {
                lightboxVideo.src = currentSrc;
            } else {
                lightboxVideo.innerHTML = this.innerHTML;
            }

            // Mirror poster when available to avoid broken icon on close
            if (this.getAttribute('poster')) {
                lightboxVideo.setAttribute('poster', this.getAttribute('poster'));
            } else {
                lightboxVideo.removeAttribute('poster');
            }
            
            // Play the lightbox video
            lightboxVideo.play().catch(e => console.log('Autoplay prevented:', e));
        });
    });

    // Close Logic
    const closeVideoLightbox = () => {
        if (playTimeoutId) {
            clearTimeout(playTimeoutId);
            playTimeoutId = null;
        }
        videoLightbox.style.display = 'none';
        lightboxVideo.pause();
        lightboxVideo.currentTime = 0;

        // Clear source after hiding to avoid broken icon flash
        setTimeout(() => {
            lightboxVideo.removeAttribute('src');
            lightboxVideo.removeAttribute('poster');
            lightboxVideo.load();
        }, 0);

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

/* --- TAB SWITCHING --- */
// Handle content visibility when switching between different tabs
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

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

/* --- INTERACTIVE CARD STACK --- */
// Enable gesture-based card swiping (Tinder-style) with physics-based dragging and throwing
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
    
    const stackSlots = [];
    for(let i = 0; i < 10; i++) {
        stackSlots.push({
            x: (Math.random() * 20) - 10, 
            y: (Math.random() * 20) - 10,
            rot: (Math.random() * 10) - 5
        });
    }

    const corners = [
        {x: -1, y: -1}, 
        {x: 1, y: -1}, 
        {x: -1, y: 1}, 
        {x: 1, y: 1}
    ];

    function initCards() {
        cards.forEach((card, index) => {
            card.style.zIndex = cards.length - index;
            card.onmousedown = startDrag;
            card.ontouchstart = startDrag;
        });
        
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
        if (this !== cards[0]) return; 
        
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
                const corner = corners[index % 4]; 
                
                let tx, ty, rot, scale;

                if (isHovering) {
                    const spread = 20 + (index * 4); 
                    tx = slot.x + (corner.x * spread);
                    ty = slot.y + (corner.y * spread * 0.5); 
                    rot = slot.rot + (corner.x * 5); 
                    scale = 1; 
                } else {
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


/* --- PROJECT DECORATION LOGIC --- */
// Coordinate the scroll-reactive portrait, handling hover states, theme switching, and image preloading
document.addEventListener('DOMContentLoaded', function() {
    const projectDecoration = document.querySelector('.project-decoration');
    const projectLevitate = document.querySelector('.project-levitate');
    
    if (projectDecoration) {
        let lastScrollTop = 0;
        let isHovered = false;
        let isScrollingDown = false; 

        const paths = {
            light: {
                base: '../images/decoration/light/portrait-base.svg',
                hover: '../images/decoration/light/portrait-hover.svg',
                elements: '../images/decoration/light/portrait-elements.svg'
            },
            dark: {
                base: '../images/decoration/dark/portrait-base.svg',
                hover: '../images/decoration/dark/portrait-hover.svg',
                elements: '../images/decoration/dark/portrait-elements.svg'
            }
        };

        const preloadImages = () => {
             ['light', 'dark'].forEach(mode => {
                 Object.values(paths[mode]).forEach(src => {
                     const img = new Image();
                     img.src = src;
                 });
             });
        };
        preloadImages();

        function getMode() {
            return document.documentElement.classList.contains('dark-mode') ? 'dark' : 'light';
        }

        function updateImages() {
            const mode = getMode();
            
            if (projectLevitate) {
                const elementsSrc = paths[mode].elements;
                if (!projectLevitate.src.includes(elementsSrc.substring(3))) {
                     projectLevitate.src = elementsSrc;
                }
            }

            const showActive = (isScrollingDown !== isHovered);
            const targetSrc = showActive ? paths[mode].hover : paths[mode].base;
            
            const currentSrc = projectDecoration.src;
            if (!currentSrc.includes(targetSrc.substring(3))) { 
                 projectDecoration.src = targetSrc;
            }
        }

        updateImages();

        projectDecoration.addEventListener('mouseenter', () => {
            isHovered = true;
            updateImages();
        });

        projectDecoration.addEventListener('mouseleave', () => {
            isHovered = false;
            updateImages();
        });

        window.addEventListener('scroll', function() {
            let st = window.pageYOffset || document.documentElement.scrollTop;
            
            if (st < 0) return;

            if (st > lastScrollTop) {
                isScrollingDown = true;
            } else {
                isScrollingDown = false;
            }
            
            updateImages();
            lastScrollTop = st;
        }, { passive: true });

        // Watch for class changes on the html element to trigger image updates
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    updateImages();
                }
            });
        });
        
        observer.observe(document.documentElement, { attributes: true });
    }
});

// Hover functionality for project videos
document.addEventListener('DOMContentLoaded', function() {
    const videoContainers = document.querySelectorAll('.media-container');

    videoContainers.forEach(container => {
        const video = container.querySelector('video');
        if (video) {
            container.addEventListener('mouseenter', () => {
                video.play().catch(e => console.log('Video play failed:', e));
            });

            container.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0; // Reset video to start
            });
        }
    });
});

/* --- AUTO TAG RANKING (PROGRAMMING) --- */
// Replace tag lists with top-used tags from the programming projects page
document.addEventListener('DOMContentLoaded', function() {
    const tagLists = document.querySelectorAll('ul[data-tags-source]');
    if (!tagLists.length) return;

    tagLists.forEach(list => {
        const sourcePath = list.getAttribute('data-tags-source');
        const limitValue = list.getAttribute('data-tags-limit');
        const limit = Number.isFinite(parseInt(limitValue, 10)) ? parseInt(limitValue, 10) : 4;

        if (!sourcePath) return;

        const sourceUrl = new URL(sourcePath, window.location.href);
        const cacheKey = 'tag-rank:' + sourceUrl.pathname + ':' + limit;

        const renderList = (items) => {
            if (!Array.isArray(items) || !items.length) return;

            const current = Array.from(list.querySelectorAll('li > a')).map(a => (a.textContent || '').trim());
            const next = items.map(item => item.label);
            if (current.length && current.join('|') === next.join('|')) return;

            list.innerHTML = '';
            items.forEach(item => {
                const li = document.createElement('li');
                if (item.variantClass) {
                    li.className = item.variantClass;
                }

                const link = document.createElement('a');
                link.href = item.href;
                link.textContent = item.label;

                li.appendChild(link);
                list.appendChild(li);
            });

            list.style.visibility = 'visible';
        };

        const cachedRaw = localStorage.getItem(cacheKey);
        if (cachedRaw) {
            try {
                const cachedItems = JSON.parse(cachedRaw);
                renderList(cachedItems);
            } catch (e) {
                localStorage.removeItem(cacheKey);
            }
        }

        fetch(sourceUrl)
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const tagLinks = doc.querySelectorAll('.item-list.courses .tags li a');

                if (!tagLinks.length) return;

                const counts = new Map();
                const meta = new Map();

                tagLinks.forEach(anchor => {
                    const label = (anchor.textContent || '').trim();
                    if (!label) return;

                    const parent = anchor.closest('li');
                    const variantClass = parent ? Array.from(parent.classList).find(cls => cls.startsWith('variant-')) : '';
                    const href = anchor.getAttribute('href') || '';

                    counts.set(label, (counts.get(label) || 0) + 1);

                    if (!meta.has(label)) {
                        meta.set(label, { href, variantClass });
                    }
                });

                const sorted = Array.from(counts.entries()).sort((a, b) => {
                    const countDiff = b[1] - a[1];
                    if (countDiff !== 0) return countDiff;
                    return a[0].localeCompare(b[0]);
                });

                const top = sorted.slice(0, limit);
                if (!top.length) return;

                const items = top.map(([label]) => {
                    const info = meta.get(label) || { href: '#', variantClass: '' };
                    const resolvedHref = info.href ? new URL(info.href, sourceUrl).pathname : '#';
                    return {
                        label,
                        href: resolvedHref,
                        variantClass: info.variantClass || ''
                    };
                });

                localStorage.setItem(cacheKey, JSON.stringify(items));
                renderList(items);
            })
            .catch(() => {
                // Fallback to existing markup if the source page cannot be loaded.
                list.style.visibility = 'visible';
            });
    });
});

