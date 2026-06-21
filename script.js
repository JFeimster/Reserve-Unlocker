document.addEventListener('DOMContentLoaded', () => {
    console.log("AcquireMeta Labs Engine: Ready.");
    document.querySelector('.btn-primary').addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('#tool').scrollIntoView({ behavior: 'smooth' });
    });
});
