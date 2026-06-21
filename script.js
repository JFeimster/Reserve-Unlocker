// Initialize landing interactions
document.addEventListener('DOMContentLoaded', () => {
    console.log("AcquireMeta Labs Engine: Ready for deployment.");
    
    // Smooth scroll for CTA button
    const ctaButton = document.querySelector('.btn-primary');
    if (ctaButton) {
        ctaButton.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector('#tool').scrollIntoView({ behavior: 'smooth' });
        });
    }
});
