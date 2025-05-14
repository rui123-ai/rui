// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Here you would typically send the form data to a server
        console.log('Form submitted:', formObject);
        
        // Show success message
        alert('Mensagem enviada com sucesso!');
        this.reset();
    });
}

// Add animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.gallery-item, .about-content, .contact-content');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animate');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Popup de visualização de imagem
const galleryItems = document.querySelectorAll('.gallery-item');
const popup = document.getElementById('popup');
const popupImg = document.querySelector('.popup-img');
const popupCaption = document.querySelector('.popup-caption');
const closePopup = document.querySelector('.close-popup');

if (galleryItems && popup && popupImg && popupCaption && closePopup) {
    galleryItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const imgSrc = item.getAttribute('data-img');
            const title = item.getAttribute('data-title');
            const year = item.getAttribute('data-year');
            popupImg.src = imgSrc;
            popupImg.alt = title;
            popupCaption.innerHTML = `<strong>${title}</strong><br>${year}`;
            popup.classList.add('active');

            // Efeito de zoom a partir da miniatura
            const thumb = item.querySelector('img');
            const thumbRect = thumb.getBoundingClientRect();
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            const popupTargetW = Math.min(vw * 0.9, thumb.naturalWidth);
            const popupTargetH = Math.min(vh * 0.8, thumb.naturalHeight);
            const centerX = vw / 2;
            const centerY = vh / 2;
            const thumbCenterX = thumbRect.left + thumbRect.width / 2;
            const thumbCenterY = thumbRect.top + thumbRect.height / 2;

            popupImg.classList.add('popup-from-thumb');
            popupImg.style.width = thumbRect.width + 'px';
            popupImg.style.height = thumbRect.height + 'px';
            popupImg.style.left = thumbRect.left + 'px';
            popupImg.style.top = thumbRect.top + 'px';
            popupImg.style.transform = 'none';
            popupImg.style.opacity = '1';

            // Forçar reflow
            void popupImg.offsetWidth;

            // Calcular escala e translação para centralizar
            const scaleX = popupTargetW / thumbRect.width;
            const scaleY = popupTargetH / thumbRect.height;
            const scale = Math.min(scaleX, scaleY, 1.2);
            const translateX = centerX - thumbCenterX;
            const translateY = centerY - thumbCenterY;

            popupImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;

            setTimeout(() => {
                popupImg.classList.remove('popup-from-thumb');
                popupImg.style = '';
            }, 400);
        });
    });
    closePopup.addEventListener('click', () => {
        popup.classList.remove('active');
        popupImg.src = '';
        popupImg.style = '';
    });
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.classList.remove('active');
            popupImg.src = '';
            popupImg.style = '';
        }
    });
} 