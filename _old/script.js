// Header scroll effect
const header = document.getElementById('header');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    lastScrollY = window.scrollY;
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
});

// Close mobile menu when clicking a link
const mobileMenuLinks = mobileMenu.querySelectorAll('a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }
    });
}, observerOptions);

// Observe product cards and feature cards
document.querySelectorAll('.product-card, .feature-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Button clicks (you can add real functionality here)
document.querySelectorAll('.btn-gradient, .btn-ghost').forEach(btn => {
    btn.addEventListener('click', function(e) {
        if (this.textContent.includes('Demo')) {
            console.log('Opening demo booking...');
        } else if (this.textContent.includes('Teste')) {
            console.log('Starting free trial...');
        }
    });
});

// Particle System - Apenas na Hero
class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particles-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 80;
        this.mouse = {
            x: null,
            y: null,
            radius: 100
        };

        this.init();
        this.animate();
        this.bindEvents();
    }

    init() {
        this.resizeCanvas();
        this.createParticles();
    }

    resizeCanvas() {
        const heroSection = this.canvas.parentElement;
        this.canvas.width = heroSection.clientWidth;
        this.canvas.height = heroSection.clientHeight;
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 1.5 + 0.5,
                speedX: Math.random() * 0.5 - 0.25,
                speedY: Math.random() * 0.5 - 0.25,
                color: `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, 255, ${Math.random() * 0.4 + 0.1})`
            });
        }
    }

    drawParticle(particle) {
        this.ctx.beginPath();
        this.ctx.fillStyle = particle.color;
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fill();
    }

    updateParticle(particle) {
        // Move particle
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Bounce off walls
        if (particle.x > this.canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = this.canvas.width;
        if (particle.y > this.canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = this.canvas.height;

        // Mouse interaction
        if (this.mouse.x !== null && this.mouse.y !== null) {
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.mouse.radius) {
                const angle = Math.atan2(dy, dx);
                const force = (this.mouse.radius - distance) / this.mouse.radius;
                
                particle.x -= Math.cos(angle) * force * 3;
                particle.y -= Math.sin(angle) * force * 3;
                
                // Highlight particle on mouse proximity
                particle.color = `rgba(0, 176, 255, ${0.6 + force * 0.4})`;
            }
        }
    }

    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    const opacity = 1 - (distance / 120);
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(0, 176, 255, ${opacity * 0.2})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        this.particles.forEach(particle => {
            this.updateParticle(particle);
            this.drawParticle(particle);
        });

        // Draw connections between particles
        this.drawConnections();

        requestAnimationFrame(() => this.animate());
    }

    bindEvents() {
        // Window resize
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.createParticles();
        });

        // Mouse move
        window.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });

        // Mouse leave
        window.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }
}

// Initialize particle system when page loads
window.addEventListener('load', () => {
    if (document.getElementById('particles-canvas')) {
        new ParticleSystem();
    }
});