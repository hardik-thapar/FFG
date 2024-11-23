document.addEventListener('DOMContentLoaded', () => {
    const profileIcon = document.getElementById('profile-icon');
    const profileModal = document.getElementById('profile-modal');
    const closeBtn = profileModal.querySelector('.close');

    profileIcon.addEventListener('click', () => {
        profileModal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        profileModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === profileModal) {
            profileModal.style.display = 'none';
        }
    });

    // Simulated user data (replace with actual data fetching)
    const userData = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '(555) 123-4567'
    };

    document.getElementById('profile-name').textContent = userData.name;
    document.getElementById('profile-email').textContent = userData.email;
    document.getElementById('profile-phone').textContent = userData.phone;

    // Reviews
    const reviews = [
        { rating: 5 },
        { rating: 4 },
        { rating: 5 },
        { rating: 5 },
        { rating: 4 },
    ];

    function renderReviews() {
        const reviewSlider = document.querySelector('.review-slider');
        if (!reviewSlider) return;

        reviews.forEach(review => {
            const reviewCard = document.createElement('div');
            reviewCard.classList.add('review-card');
            reviewCard.innerHTML = `
                <div class="stars">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
            `;
            reviewSlider.appendChild(reviewCard);
        });
    }

    renderReviews();

    // Single Rating
    function renderRating() {
        const starsContainer = document.querySelector('.stars');
        const ratingText = document.querySelector('.rating-text');
        if (!starsContainer || !ratingText) return;

        const rating = 4.0;
        const fullStars = Math.floor(rating);

        starsContainer.innerHTML = `
            <span style="color: gold;">${'★'.repeat(fullStars)}</span>${'☆'.repeat(5 - fullStars)}
        `;
        ratingText.textContent = `${rating.toFixed(1)} out of 5`;
    }

    renderRating();

    // Simple Automatic Slider
    function startAutoSlider() {
        const slides = document.querySelectorAll('.hero-slide');
        let currentIndex = 0;

        // First make all slides invisible except first one
        slides.forEach((slide, index) => {
            if (index === 0) {
                slide.style.opacity = '1';
                slide.classList.add('active');
            } else {
                slide.style.opacity = '0';
                slide.classList.remove('active');
            }
        });

        // Change slide every 4 seconds
        setInterval(() => {
            // Hide current slide
            slides[currentIndex].style.opacity = '0';
            slides[currentIndex].classList.remove('active');

            // Move to next slide
            currentIndex = (currentIndex + 1) % slides.length;

            // Show next slide
            slides[currentIndex].style.opacity = '1';
            slides[currentIndex].classList.add('active');
        }, 4000);
    }

    // Start the automatic slider
    startAutoSlider();
});
