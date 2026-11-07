// --- WHATSAPP FUNCTION ---
const whatsappNumber = "6287839663131"; // Nomor asli Trendy Salon

function bookAppointment(serviceName = "") {
  const baseMessage = "Halo Trendy Salon, saya ingin bertanya mengenai layanan salon dan booking appointment.";
  const serviceMessage = serviceName ? ` Saya tertarik dengan layanan ${serviceName}.` : "";
  const message = encodeURIComponent(baseMessage + serviceMessage);
  
  window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
}

// --- INIT ICONS ---
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
});

// --- NAVBAR SCROLL ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// --- MOBILE MENU ---
const menuToggle = document.getElementById('menuToggle');
const closeMenu = document.getElementById('closeMenu');
const mobileNav = document.getElementById('mobileNav');

function toggleMenu() {
  mobileNav.classList.toggle('active');
  if (mobileNav.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

menuToggle.addEventListener('click', toggleMenu);
closeMenu.addEventListener('click', toggleMenu);

// --- SCROLL REVEAL ---
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px"
});

revealElements.forEach(el => revealObserver.observe(el));

// --- LIGHTBOX ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(src) {
  lightboxImg.src = src;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('active')) {
    closeLightbox();
  }
});