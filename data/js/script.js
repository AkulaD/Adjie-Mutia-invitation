// variabel global
const openBtn = document.getElementById('open-invitation');
const body = document.body;
const navMap = document.querySelector('.navmap-container');
const mainContent = document.querySelector('main');
const music = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
const volumeIcon = document.getElementById('volume-icon');
const giftBtnTrigger = document.getElementById('gift-button');
const giftCardDisplay = document.getElementById('gift-card-container');
const giftCardCopyBtn = document.getElementById('copy-button');
const bankAccountNumber = document.getElementById('acc-number');

// 1. Loading Screen logic
window.addEventListener("load", function() {
    const loader = document.getElementById("loader");
    setTimeout(function() {
        loader.classList.add("loader-hidden");
    }, 2000); 
});

// 2. Buka Undangan & Smooth Opening Scroll logic
if (openBtn) {
    openBtn.addEventListener('click', function(e) {
        e.preventDefault();

        const btnImg = this.querySelector('img');
        if (btnImg) {
            btnImg.src = "data/img/mail1.png";
        }

        body.classList.remove('scroll-off');
        body.style.overflow = "visible";
        body.style.height = "auto";
        
        if (mainContent) {
            mainContent.style.opacity = "1";
            mainContent.style.transform = "translateY(0)";
        }

        if (navMap) {
            navMap.classList.add('show');
        }

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
            const startPosition = window.scrollY;
            const distance = targetPosition - startPosition;
            const duration = 1500;
            let start = null;

            function step(timestamp) {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                const time = Math.min(1, progress / duration);
                const easing = time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time;
                
                window.scrollTo(0, startPosition + (distance * easing));
                
                if (progress < duration) {
                    window.requestAnimationFrame(step);
                }
            }
            window.requestAnimationFrame(step);
        }
    });
}

// 3. Hitung Mundur Acara (Countdown) logic
const countdownDate = new Date("Jul 4, 2026 08:00:00").getTime();

const x = setInterval(function() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minsEl = document.getElementById("minutes");

    if (daysEl) daysEl.innerHTML = days;
    if (hoursEl) hoursEl.innerHTML = hours;
    if (minsEl) minsEl.innerHTML = minutes;

    if (distance < 0) {
        clearInterval(x);
        const cdContainer = document.querySelector(".count-down");
        if (cdContainer) cdContainer.innerHTML = "ACARA SUDAH DIMULAI";
    }
}, 1000);

// 4. Efek Muncul Saat Scroll (Intersection Observer) logic
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            entry.target.classList.remove('active'); 
        }
    });
}, observerOptions);

const elements = document.querySelectorAll('.reveal');
elements.forEach((el) => observer.observe(el));

// 5. Navigasi Smooth Scroll Umum logic
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    if (anchor.id !== 'open-invitation') {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});

// 6. Force Scroll to Top (Refresh Restoration) logic
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('beforeunload', function() {
    window.scrollTo(0, 0);
});

window.onload = function() {
    setTimeout(function() {
        window.scrollTo(0, 0);
    }, 10);
};

// 7. Musik Logic (Mainkan saat buka undangan)
if (openBtn) {
    openBtn.addEventListener('click', function() {
        if (music) {
            music.play();
        }
    });
}

// 8. Toggle Mute Logic
if (musicToggle) {
    musicToggle.addEventListener('click', function() {
        if (music.muted) {
            music.muted = false;
            volumeIcon.src = "data/img/volume.png";
        } else {
            music.muted = true;
            volumeIcon.src = "data/img/volume-mute.png";
        }
    });
}

// 9. Typewriter Logic
const typewriterOptions = {
    threshold: 0.2
};

const typewriterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            typewriterObserver.unobserve(entry.target);
        }
    });
}, typewriterOptions);

document.querySelectorAll('.typewriter-text').forEach(el => typewriterObserver.observe(el));

// 10. Gift Card Interaction Logic
if (giftBtnTrigger && giftCardDisplay) {
    giftBtnTrigger.addEventListener('click', function() {
        giftCardDisplay.classList.toggle('hidden');
    });
}

// 11. Clipboard Copy Logic
if (giftCardCopyBtn && bankAccountNumber) {
    giftCardCopyBtn.addEventListener('click', function() {
        const textToCopy = bankAccountNumber.innerText.replace(/\s/g, '');
        
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert("Nomor rekening berhasil dicopy: " + textToCopy);
        }).catch(err => {
            console.error('Gagal copy teks: ', err);
        });
    });
}