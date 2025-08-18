// Main JavaScript for MEMS D-AMP Blog

// Initialize Fuse.js for search functionality
let fuse = null;

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
    initializeTooltips();
    initializeFilters();
});

// Initialize search functionality
function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;

    // Sample data - in real implementation, this would come from the server
    const searchData = [
        { title: 'ME 101', category: 'course', type: 'core', difficulty: 'medium' },
        { title: 'ME 102', category: 'course', type: 'core', difficulty: 'easy' },
        { title: 'Google Internship', category: 'experience', type: 'internship', domain: 'software' },
        { title: 'Microsoft Internship', category: 'experience', type: 'internship', domain: 'software' },
        { title: 'DS Minor Track', category: 'track', type: 'minor' }
    ];

    // Initialize Fuse.js
    fuse = new Fuse(searchData, {
        keys: ['title', 'category', 'type', 'domain'],
        threshold: 0.3,
        includeScore: true
    });

    searchInput.addEventListener('input', function(e) {
        const query = e.target.value;
        if (query.length < 2) {
            hideSearchResults();
            return;
        }

        const results = fuse.search(query);
        displaySearchResults(results);
    });
}

// Display search results
function displaySearchResults(results) {
    const searchResults = document.getElementById('search-results');
    if (!searchResults) return;

    if (results.length === 0) {
        searchResults.innerHTML = '<p class="p-4 text-gray-500">No results found</p>';
        searchResults.classList.remove('hidden');
        return;
    }

    const html = results.slice(0, 5).map(result => {
        const item = result.item;
        const score = result.score;
        
        let badgeClass = 'badge';
        if (item.type === 'core') badgeClass += ' badge-core';
        else if (item.type === 'elective') badgeClass += ' badge-elective';
        else if (item.type === 'minor') badgeClass += ' badge-minor';

        return `
            <a href="/${item.category}/${item.title.toLowerCase().replace(/\s+/g, '-')}" 
               class="block p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0">
                <div class="flex items-center justify-between">
                    <div>
                        <h4 class="font-medium text-gray-900">${item.title}</h4>
                        <p class="text-sm text-gray-500">${item.category} • ${item.type}</p>
                    </div>
                    <span class="${badgeClass}">${item.type}</span>
                </div>
            </a>
        `;
    }).join('');

    searchResults.innerHTML = html;
    searchResults.classList.remove('hidden');
}

// Hide search results
function hideSearchResults() {
    const searchResults = document.getElementById('search-results');
    if (searchResults) {
        searchResults.classList.add('hidden');
    }
}

// Initialize tooltips
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = this.getAttribute('data-tooltip');
            showTooltip(this, tooltip);
        });
        
        element.addEventListener('mouseleave', function() {
            hideTooltip();
        });
    });
}

// Show tooltip
function showTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'absolute z-50 px-2 py-1 text-sm text-white bg-gray-900 rounded shadow-lg';
    tooltip.textContent = text;
    tooltip.id = 'tooltip';
    
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';
}

// Hide tooltip
function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

// Initialize filters
function initializeFilters() {
    const filterButtons = document.querySelectorAll('[data-filter]');
    const filterableItems = document.querySelectorAll('[data-category]');
    const internshipFilters = document.getElementById('internship-filters');
    const internshipTypeButtons = document.querySelectorAll('[data-internship-type]');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('bg-accent', 'text-white'));
            filterButtons.forEach(btn => btn.classList.add('bg-gray-200', 'text-gray-700'));
            this.classList.remove('bg-gray-200', 'text-gray-700');
            this.classList.add('bg-accent', 'text-white');
            
            // Show/hide internship type filters
            if (filter === 'internship') {
                internshipFilters.style.display = 'flex';
            } else {
                internshipFilters.style.display = 'none';
                // Reset internship type filters
                internshipTypeButtons.forEach(btn => {
                    btn.classList.remove('bg-accent', 'text-white');
                    btn.classList.add('bg-gray-200', 'text-gray-700');
                });
                // Show "All Internships" as active
                const allInternshipBtn = document.querySelector('[data-internship-type="all"]');
                if (allInternshipBtn) {
                    allInternshipBtn.classList.remove('bg-gray-200', 'text-gray-700');
                    allInternshipBtn.classList.add('bg-accent', 'text-white');
                }
            }
            
            // Filter items
            filterableItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    item.classList.add('animate-fade-in');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
    
    // Initialize internship type filters
    internshipTypeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const internshipType = this.getAttribute('data-internship-type');
            
            // Update active button
            internshipTypeButtons.forEach(btn => btn.classList.remove('bg-accent', 'text-white'));
            internshipTypeButtons.forEach(btn => btn.classList.add('bg-gray-200', 'text-gray-700'));
            this.classList.remove('bg-gray-200', 'text-gray-700');
            this.classList.add('bg-accent', 'text-white');
            
            // Filter internship items
            const internshipItems = document.querySelectorAll('[data-category="internship"]');
            internshipItems.forEach(item => {
                const itemType = item.getAttribute('data-internship-type');
                if (internshipType === 'all' || itemType === internshipType) {
                    item.classList.remove('hidden');
                    item.classList.add('animate-fade-in');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
}

// Smooth scroll to anchor links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeLazyLoading);

// Back to top button
function initializeBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    if (!backToTopButton) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.remove('hidden');
        } else {
            backToTopButton.classList.add('hidden');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize back to top button
document.addEventListener('DOMContentLoaded', initializeBackToTop);

// Export functions for use in other scripts
window.MEMSBlog = {
    initializeSearch,
    displaySearchResults,
    hideSearchResults,
    showTooltip,
    hideTooltip,
    initializeFilters
}; 