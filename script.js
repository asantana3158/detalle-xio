document.addEventListener('DOMContentLoaded', function() {
    // Música de fondo
    const music = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-btn');
    let isMusicPlaying = false;
    
    const playMusic = () => {
        music.play().then(() => {
            isMusicPlaying = true;
            musicBtn.textContent = '🎵 🔊';
        }).catch(e => {
            console.log("Reproducción automática bloqueada:", e);
            musicBtn.textContent = '🎵 🔇';
        });
    };
    
    musicBtn.addEventListener('click', function() {
        if (isMusicPlaying) {
            music.pause();
            musicBtn.textContent = '🎵 🔇';
        } else {
            playMusic();
        }
        isMusicPlaying = !isMusicPlaying;
    });
    
    document.body.addEventListener('click', function() {
        if (!isMusicPlaying) {
            playMusic();
        }
    }, { once: true });

    // 📌 Sobres interactivos (expandir carta en pantalla completa)
    const envelopes = document.querySelectorAll('.envelope');
    
    envelopes.forEach(envelope => {
        envelope.addEventListener('click', function(e) {
            e.stopPropagation();

            // Cerrar otras cartas si están abiertas
            document.querySelectorAll('.envelope.open').forEach(openEnv => {
                if (openEnv !== this) {
                    openEnv.classList.remove('open');
                    openEnv.classList.remove('fullscreen'); // quitar modo pantalla completa
                }
            });

            // Alternar carta abierta
            this.classList.toggle('open');

            // Si está abierta, activar pantalla completa
            if (this.classList.contains('open')) {
                this.classList.add('fullscreen');
            } else {
                this.classList.remove('fullscreen');
            }
        });
    });

    // Cerrar al hacer click fuera
    document.addEventListener('click', function() {
        document.querySelectorAll('.envelope.open').forEach(envelope => {
            envelope.classList.remove('open');
            envelope.classList.remove('fullscreen');
        });
    });

    // Regalos
    const gifts = document.querySelectorAll('.gift');
    const modal = document.getElementById('photo-modal');
    const modalImg = document.getElementById('modal-photo');
    const modalMsg = document.getElementById('modal-message');
    const closeModal = document.querySelector('.close');
    
    const giftData = [
        { img: 'foto2.jpg', msg: 'Eres la persona más especial en mi vida 💚' },
        { img: 'foto1.jpg', msg: 'Tu sonrisa ilumina mi mundo 🌟' },
        { img: 'foto3.jpg', msg: 'Feliz 17 años, mi amor 🎉' }
    ];

    gifts.forEach((gift, index) => {
        gift.addEventListener('click', function(e) {
            e.stopPropagation();
            modalImg.src = giftData[index].img;
            modalImg.alt = `Foto de Sara ${index + 1}`;
            modalMsg.textContent = giftData[index].msg;
            modal.style.display = 'flex';
            this.textContent = ['💝', '🎂', '🎈'][index];
            this.style.transform = 'scale(1.2)';
            setTimeout(() => this.style.transform = 'scale(1)', 300);
        });
    });

    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', function(e) {
        if (e.target === this) modal.style.display = 'none';
    });

    // Efectos mágicos
    const canvas = document.getElementById('effects-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    document.getElementById('play-effect').addEventListener('click', function() {
        const effect = document.getElementById('effects').value;
        playEffect(effect);
    });

    function drawHeart(ctx, x, y, size, color, rotation = 0) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        ctx.scale(size / 100, size / 100);
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(75, 40);
        ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
        ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
        ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
        ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
        ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
        ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
        ctx.fill();
        ctx.restore();
    }

    function drawStar(ctx, x, y, spikes, outerRadius, innerRadius, color) {
        let rot = Math.PI / 2 * 3;
        let cx = x, cy = y;
        let step = Math.PI / spikes;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(cx, cy - outerRadius);
        for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            ctx.lineTo(x, y);
            rot += step;
            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            ctx.lineTo(x, y);
            rot += step;
        }
        ctx.lineTo(cx, cy - outerRadius);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
        ctx.restore();
    }

    function createStars() {
        const stars = [];
        const colors = ['#fff9c4', '#fff59d', '#fff176', '#ffee58'];
        for (let i = 0; i < 40; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                outerRadius: Math.random() * 15 + 10,
                innerRadius: Math.random() * 7 + 3,
                color: colors[Math.floor(Math.random() * colors.length)],
                twinkleSpeed: Math.random() * 0.03 + 0.01,
                alpha: Math.random() * 0.5 + 0.5,
                direction: Math.random() > 0.5 ? 1 : -1
            });
        }
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            stars.forEach(star => {
                star.alpha += star.twinkleSpeed * star.direction;
                if (star.alpha <= 0.4 || star.alpha >= 1) star.direction *= -1;
                ctx.globalAlpha = star.alpha;
                drawStar(ctx, star.x, star.y, 5, star.outerRadius, star.innerRadius, star.color);
                ctx.globalAlpha = 1;
            });
            animationId = requestAnimationFrame(animate);
        }
        let animationId = requestAnimationFrame(animate);
        setTimeout(() => {
            cancelAnimationFrame(animationId);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }, 8000);
    }

    function createHearts() {
        const hearts = [];
        const colors = ['#ff6b6b', '#ff8e8e', '#ffb3b3', '#ffd8d8'];
        for (let i = 0; i < 25; i++) {
            hearts.push({
                x: Math.random() * canvas.width,
                y: canvas.height + 50,
                size: Math.random() * 20 + 15,
                color: colors[Math.floor(Math.random() * colors.length)],
                speed: Math.random() * 3 + 2,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: Math.random() * 0.05 - 0.025
            });
        }
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            hearts.forEach(heart => {
                heart.y -= heart.speed;
                heart.rotation += heart.rotationSpeed;
                if (heart.y < -50) {
                    heart.y = canvas.height + 50;
                    heart.x = Math.random() * canvas.width;
                }
                drawHeart(ctx, heart.x, heart.y, heart.size, heart.color, heart.rotation);
            });
            animationId = requestAnimationFrame(animate);
        }
        let animationId = requestAnimationFrame(animate);
        setTimeout(() => {
            cancelAnimationFrame(animationId);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }, 8000);
    }

    function createConfetti() {
        const particles = [];
        const colors = ['#4caf50', '#81c784', '#a5d6a7', '#c8e6c9', '#e8f5e9'];
        const shapes = ['rect', 'circle', 'star'];
        for (let i = 0; i < 120; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: -20,
                size: Math.random() * 12 + 5,
                color: colors[Math.floor(Math.random() * colors.length)],
                shape: shapes[Math.floor(Math.random() * shapes.length)],
                speed: Math.random() * 5 + 3,
                angle: Math.random() * Math.PI * 2,
                spin: Math.random() * 0.2 - 0.1
            });
        }
        function drawParticle(p) {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.angle);
            ctx.fillStyle = p.color;
            switch(p.shape) {
                case 'rect': ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size); break;
                case 'circle': ctx.beginPath(); ctx.arc(0, 0, p.size/2, 0, Math.PI*2); ctx.fill(); break;
                case 'star': drawStar(ctx, 0, 0, 5, p.size, p.size/2, p.color); break;
            }
            ctx.restore();
        }
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.y += p.speed;
                p.angle += p.spin;
                if (p.y > canvas.height + 20) {
                    p.y = -20;
                    p.x = Math.random() * canvas.width;
                }
                drawParticle(p);
            });
            animationId = requestAnimationFrame(animate);
        }
        let animationId = requestAnimationFrame(animate);
        setTimeout(() => {
            cancelAnimationFrame(animationId);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }, 8000);
    }

    function playEffect(effect) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        switch(effect) {
            case 'hearts': createHearts(); break;
            case 'confetti': createConfetti(); break;
            case 'stars': createStars(); break;
        }
    }

    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});
