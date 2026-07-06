// ==========================
// LOADER + GSAP INTRO
// ==========================

document.addEventListener('DOMContentLoaded', function() {
    
    // --- LOADER ---
    const loader = document.getElementById('loader');
    const hero = document.getElementById('homeHero');
    const heroContent = document.getElementById('heroContent');
    
    // Force loader to show for minimum 4 seconds
    const minLoadTime = 4000; // 4 seconds
    let loadStart = Date.now();
    
    // GSAP Timeline
    const tl = gsap.timeline({
        defaults: { duration: 0.3, ease: "power2.out" },
        paused: true
    });
    
    tl.from("#B1", { yPercent: 100, opacity: 0 })
      .from("#B2", { yPercent: 100, opacity: 0 }, "-=0.2")
      .from("#B3", { yPercent: 100, opacity: 0 }, "-=0.2")
      .from("#B4", { yPercent: 100, opacity: 0 }, "-=0.2")
      .from("#B5", { yPercent: -100, opacity: 0 }, "-=0.2")
      .from("#B6", { yPercent: -100, opacity: 0 }, "-=0.2")
      .from("#Sea", { yPercent: -100, opacity: 0 }, "-=0.2")
      .from("#Sky", { yPercent: -100, opacity: 0, duration: 0.5, ease: "bounce" }, "-=0.2")
      .call(() => {
          // Show hero content after images animate
          heroContent.classList.add('visible');
      }, [], "-=0.2");
    
    // --- FUNCTION TO HIDE LOADER AND START GSAP ---
    function hideLoaderAndStart() {
        loader.classList.add('loader-hidden');
        
        // Show hero after loader fades
        setTimeout(() => {
            hero.classList.add('visible');
            // Start GSAP timeline
            tl.play();
        }, 300);
    }
    
    // --- CHECK IF EVERYTHING IS LOADED ---
    function checkLoadComplete() {
        const elapsed = Date.now() - loadStart;
        const remaining = minLoadTime - elapsed;
        
        if (remaining > 0) {
            // Wait for minimum time
            setTimeout(hideLoaderAndStart, remaining);
        } else {
            hideLoaderAndStart();
        }
    }
    
    // --- PARALLAX (Mouse Tracking) ---
    const parallaxImages = document.querySelectorAll('.parallax');
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    
    document.addEventListener('mousemove', function(e) {
        // Normalize mouse position (-1 to 1)
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });
    
    function updateParallax() {
        // Smooth interpolation
        const smoothFactor = 0.08;
        currentX += (mouseX - currentX) * smoothFactor;
        currentY += (mouseY - currentY) * smoothFactor;
        
        parallaxImages.forEach(function(img) {
            const speedX = parseFloat(img.dataset.speedx) || 0.1;
            const speedY = parseFloat(img.dataset.speedy) || 0.05;
            const xOffset = currentX * 60 * speedX;
            const yOffset = currentY * 30 * speedY;
            
            // Preserve the GSAP transform and add mouse offset
            img.style.transform = `translate(calc(-50% + ${xOffset}px), calc(-50% + ${yOffset}px))`;
        });
        
        requestAnimationFrame(updateParallax);
    }
    
    // --- TOUCH SUPPORT ---
    document.addEventListener('touchmove', function(e) {
        const touch = e.touches[0];
        mouseX = (touch.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (touch.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });
    
    document.addEventListener('touchend', function() {
        mouseX = 0;
        mouseY = 0;
    }, { passive: true });
    
    // --- START EVERYTHING ---
    // Start parallax loop
    updateParallax();
    
    // Wait for all images to load
    const allImages = document.querySelectorAll('.parallax-wrapper img');
    let imagesLoaded = 0;
    const totalImages = allImages.length;
    
    if (totalImages === 0) {
        checkLoadComplete();
    } else {
        allImages.forEach(function(img) {
            if (img.complete) {
                imagesLoaded++;
                if (imagesLoaded === totalImages) checkLoadComplete();
            } else {
                img.addEventListener('load', function() {
                    imagesLoaded++;
                    if (imagesLoaded === totalImages) checkLoadComplete();
                });
                img.addEventListener('error', function() {
                    imagesLoaded++;
                    if (imagesLoaded === totalImages) checkLoadComplete();
                });
            }
        });
    }
    
    // Fallback: if images take too long, force load after 6 seconds
    setTimeout(function() {
        if (!loader.classList.contains('loader-hidden')) {
            checkLoadComplete();
        }
    }, 6000);
});















// // ========== CYBER DRIFT CANVAS ANIMATION ==========
// const canvas = document.getElementById('driftCanvas');
// if (canvas) {
//     let ctx = canvas.getContext('2d');
//     let width, height;
//     let particles = [];
//     let nodes = [];
//     let flowLines = [];

//     function resizeCanvas() {
//         width = window.innerWidth;
//         height = window.innerHeight;
//         canvas.width = width;
//         canvas.height = height;
//         initScene();
//     }

//     function initScene() {
//         particles = [];
//         nodes = [];
//         flowLines = [];
        
//         // Floating particles
//         for (let i = 0; i < 120; i++) {
//             particles.push({
//                 x: Math.random() * width,
//                 y: Math.random() * height,
//                 radius: Math.random() * 2.5 + 1,
//                 vx: (Math.random() - 0.5) * 0.25,
//                 vy: (Math.random() - 0.5) * 0.15 + 0.08,
//                 alpha: Math.random() * 0.5 + 0.2,
//                 color: `rgba(0, 220, 200, ${Math.random() * 0.6 + 0.2})`
//             });
//         }
        
//         // Glowing nodes
//         for (let i = 0; i < 32; i++) {
//             nodes.push({
//                 x: Math.random() * width,
//                 y: Math.random() * height,
//                 radius: Math.random() * 4 + 2,
//                 pulse: Math.random() * Math.PI * 2,
//                 speed: 0.02 + Math.random() * 0.02,
//             });
//         }
        
//         // Flow lines
//         for (let i = 0; i < 25; i++) {
//             flowLines.push({
//                 x: Math.random() * width,
//                 y: Math.random() * height,
//                 length: 40 + Math.random() * 90,
//                 angle: Math.random() * Math.PI * 2,
//                 progress: Math.random() * 100,
//                 speed: 0.4 + Math.random() * 0.8,
//             });
//         }
//     }

//     function drawDrift() {
//         if (!ctx) return;
//         ctx.clearRect(0, 0, width, height);
        
//         // Draw connections between particles
//         for (let i = 0; i < particles.length; i++) {
//             for (let j = i + 1; j < particles.length; j++) {
//                 const dx = particles[i].x - particles[j].x;
//                 const dy = particles[i].y - particles[j].y;
//                 const dist = Math.hypot(dx, dy);
//                 if (dist < 90) {
//                     ctx.beginPath();
//                     ctx.moveTo(particles[i].x, particles[i].y);
//                     ctx.lineTo(particles[j].x, particles[j].y);
//                     ctx.strokeStyle = `rgba(0, 200, 180, ${0.08 * (1 - dist / 100)})`;
//                     ctx.lineWidth = 0.6;
//                     ctx.stroke();
//                 }
//             }
//         }
        
//         // Draw flow lines
//         for (let l of flowLines) {
//             l.progress += l.speed;
//             if (l.progress > 120) l.progress = -20;
//             const offset = l.progress;
//             const rad = l.angle;
//             const startX = l.x + Math.cos(rad) * offset;
//             const startY = l.y + Math.sin(rad) * offset;
//             const endX = startX + Math.cos(rad) * l.length;
//             const endY = startY + Math.sin(rad) * l.length;
//             ctx.beginPath();
//             ctx.moveTo(startX, startY);
//             ctx.lineTo(endX, endY);
//             ctx.strokeStyle = `rgba(0, 250, 210, 0.2)`;
//             ctx.lineWidth = 1.2;
//             ctx.stroke();
//             ctx.beginPath();
//             ctx.arc(startX, startY, 1.2, 0, Math.PI * 2);
//             ctx.fillStyle = `rgba(0, 255, 200, 0.4)`;
//             ctx.fill();
//         }
        
//         // Draw particles
//         for (let p of particles) {
//             ctx.beginPath();
//             ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
//             ctx.fillStyle = p.color;
//             ctx.fill();
//             p.x += p.vx;
//             p.y += p.vy;
//             if (p.x < -20) p.x = width + 20;
//             if (p.x > width + 20) p.x = -20;
//             if (p.y < -20) p.y = height + 20;
//             if (p.y > height + 20) p.y = -20;
//         }
        
//         // Draw pulsing nodes
//         for (let n of nodes) {
//             n.pulse += n.speed;
//             const glow = Math.sin(n.pulse) * 0.4 + 0.5;
//             ctx.beginPath();
//             ctx.arc(n.x, n.y, n.radius + glow * 1.2, 0, Math.PI * 2);
//             ctx.fillStyle = `rgba(0, 210, 190, ${0.3 + glow * 0.2})`;
//             ctx.fill();
//             ctx.beginPath();
//             ctx.arc(n.x, n.y, n.radius * 0.6, 0, Math.PI * 2);
//             ctx.fillStyle = `rgba(100, 255, 220, 0.8)`;
//             ctx.fill();
//             n.x += (Math.random() - 0.5) * 0.12;
//             n.y += (Math.random() - 0.5) * 0.08;
//             if (n.x < -30) n.x = width + 20;
//             if (n.x > width + 30) n.x = -30;
//             if (n.y < -30) n.y = height + 20;
//             if (n.y > height + 30) n.y = -30;
//         }
        
//         requestAnimationFrame(drawDrift);
//     }

//     window.addEventListener('resize', resizeCanvas);
//     resizeCanvas();
//     drawDrift();
// }