// Initialize landing interactions
document.addEventListener('DOMContentLoaded', () => {
    console.log("AcquireMeta Labs Engine: Ready for deployment.");
    
    // Smooth scroll for CTA button
    const ctaButton = document.querySelector('.btn-primary');
    if (ctaButton) {
        ctaButton.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = document.querySelector('#tool');
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});
