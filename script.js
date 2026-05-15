document.addEventListener('DOMContentLoaded', () => {
    // Add a simple fade-in animation to video cards
    const cards = document.querySelectorAll('.video-card');
    
    // Initial state
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out, box-shadow 0.3s ease, border-color 0.3s ease';
    });

    // Animate them in sequentially
    setTimeout(() => {
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                
                // Clear the transition override after animation so the hover effect works properly
                setTimeout(() => {
                    card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease';
                }, 600);
            }, index * 100); // 100ms delay between each card
        });
    }, 300);

    // ==========================================
    // CINEMA MODE (Modal Logic)
    // ==========================================
    
    // 1. Create Modal HTML and inject to body
    const modal = document.createElement('div');
    modal.id = 'cinema-modal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="modal-video-wrapper">
                <iframe id="modal-iframe" src="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <div class="modal-info">
                <h3 id="modal-title"></h3>
                <p id="modal-description"></p>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    const modalIframe = document.getElementById('modal-iframe');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const closeModal = document.querySelector('.close-modal');

    // 2. Add overlays to video cards
    cards.forEach(card => {
        const wrapper = card.querySelector('.video-wrapper');
        const iframe = wrapper.querySelector('iframe');
        const title = card.querySelector('.card-title').innerText;
        const description = card.querySelector('.card-description').innerText;

        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'video-overlay';
        overlay.innerHTML = '<div class="play-icon">&#9658;</div>'; // Play icon
        wrapper.appendChild(overlay);

        // Overlay click event
        overlay.addEventListener('click', () => {
            let src = iframe.src;
            // Add autoplay to the iframe src if not present so it plays automatically when opened
            if (!src.includes('autoplay=1')) {
                src += (src.includes('?') ? '&' : '?') + 'autoplay=1';
            }
            modalIframe.src = src;
            modalTitle.innerText = title;
            modalDescription.innerText = description;
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent body scrolling
        });
    });

    // 3. Close Modal Logic
    const closeCinema = () => {
        modal.classList.remove('active');
        modalIframe.src = ''; // Stop the video
        document.body.style.overflow = ''; // Restore body scrolling
    };

    closeModal.addEventListener('click', closeCinema);
    
    // Close when clicking outside the modal content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeCinema();
        }
    });
});
