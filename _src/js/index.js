const lightbox = document.querySelector('#lightbox');
const lightboxImg = document.querySelector('#lightbox-img');

document.querySelectorAll('.open-lightbox').forEach(link => {
    link.addEventListener('click', () => {
        // 1. Set the source to the high-res image
        lightboxImg.src = link.dataset.full;
        lightboxImg.alt = link.alt;

        // 2. Open the dialog
        lightbox.showModal();
    });
});

// Close when clicking the backdrop (outside the image)
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.close();
});