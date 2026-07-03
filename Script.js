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