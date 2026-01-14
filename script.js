// Theme Management
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or default to system preference
    const currentTheme = localStorage.getItem('theme') || (prefersDark.matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    themeToggle.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme');
        const newTheme = theme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
    
    // Listen for system theme changes
    prefersDark.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        }
    });
}

// Project Rendering
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-categories', project.category.join(' '));
    
    const featuredBadge = project.featured ? '<span class="featured-badge">Featured</span>' : '';
    const playableBadge = project.playable ? '<span class="playable-badge">▶ Playable</span>' : '';
    
    // Create links HTML
    let linksHTML = '<div class="project-links">';
    if (project.links.demo) {
        linksHTML += `<a href="${project.links.demo}" class="project-link" target="_blank">Play Demo</a>`;
    }
    if (project.links.website) {
        linksHTML += `<a href="${project.links.website}" class="project-link" target="_blank">Visit Site</a>`;
    }
    if (project.links.github) {
        linksHTML += `<a href="${project.links.github}" class="project-link" target="_blank">View Code</a>`;
    }
    if (project.links.playstore) {
        linksHTML += `<a href="${project.links.playstore}" class="project-link" target="_blank">Play Store</a>`;
    }
    linksHTML += '</div>';
    
    // Create highlights HTML
    const highlightsHTML = project.highlights 
        ? `<ul class="project-highlights">
            ${project.highlights.map(h => `<li>${h}</li>`).join('')}
           </ul>`
        : '';
    
    card.innerHTML = `
        <div class="project-header">
            <div class="project-title-row">
                <h3 class="project-title">${project.title}</h3>
                <div class="project-badges">
                    ${featuredBadge}
                    ${playableBadge}
                </div>
            </div>
            <p class="project-role">${project.role}</p>
        </div>
        <p class="project-description">${project.description}</p>
        ${highlightsHTML}
        <div class="project-tags">
            ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        ${linksHTML}
    `;
    
    return card;
}

function renderProjects(filter = 'all') {
    const grid = document.getElementById('projectsGrid');
    grid.innerHTML = '';
    
    const projects = filter === 'all' ? projectsData : getProjectsByCategory(filter);
    
    // Sort to show featured first
    projects.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    
    projects.forEach(project => {
        grid.appendChild(createProjectCard(project));
    });
    
    // Trigger animation
    setTimeout(() => {
        document.querySelectorAll('.project-card').forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 50);
        });
    }, 10);
}

// Filter Management
function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter projects
            const filter = btn.getAttribute('data-filter');
            
            // Fade out
            document.querySelectorAll('.project-card').forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
            });
            
            // Re-render after animation
            setTimeout(() => {
                renderProjects(filter);
            }, 300);
        });
    });
}

// Category Card Click Handling
function initCategoryCards() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');
            
            // Scroll to projects section
            document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
            
            // Update filter
            setTimeout(() => {
                const filterBtn = document.querySelector(`[data-filter="${category}"]`);
                if (filterBtn) {
                    filterBtn.click();
                }
            }, 500);
        });
    });
}

// Smooth Scrolling for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1
    });
    
    document.querySelectorAll('.category-card, .about-content, .contact-card').forEach(el => {
        observer.observe(el);
    });
}

// Hero scroll indicator
function initHeroScroll() {
    const heroScroll = document.querySelector('.hero-scroll');
    if (heroScroll) {
        heroScroll.addEventListener('click', () => {
            document.getElementById('categories').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Hide scroll indicator after scrolling
    window.addEventListener('scroll', () => {
        if (heroScroll) {
            if (window.scrollY > 100) {
                heroScroll.style.opacity = '0';
            } else {
                heroScroll.style.opacity = '1';
            }
        }
    });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    renderProjects();
    initFilters();
    initCategoryCards();
    initSmoothScroll();
    initScrollAnimations();
    initHeroScroll();
});

// Add parallax effect to hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight) * 1.5;
    }
});
