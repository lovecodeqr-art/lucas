/* ==========================================================================\
   ÁREA DE EDIÇÃO FÁCIL - ALTERE OS DADOS DO SEU CASAL AQUI
   ========================================================================== */
const CONFIG = {
    nomesCasal: "Anthonny Lucas & Dhafany Ferreira",              // Nome dos dois
    dataInicio: "2024-04-26 20:30:00",           // Formato exato: AAAA-MM-DD HH:MM:SS
    tituloCarta: "Para o amor da minha vida",    // Título dentro da cartinha inicial
    resumoCarta: "Clique aqui, preparei uma surpresa para você... ❤️", 
    
    // ===== CONFIGURAÇÃO DE FOTOS SIMPLIFICADAS =====
    prefixoFotos: "foto",                        // Nome padrão dos arquivos (ex: foto1, foto2)
    extensaoFotos: ".jpg",                       // Extensão das fotos (.jpg)

    sliderFotoInicio: 1,                          // Número da primeira foto do Slider Principal (foto1.jpg)
    sliderFotoFim: 6,                             // Número da última foto do Slider Principal (foto6.jpg)

    carrosselFotoInicio: 7,                       // Número da primeira foto da Galeria Horizontal (foto7.jpg)
    carrosselFotoFim: 12,                         // Número da última foto da Galeria Horizontal (foto12.jpg)
    
    // ===== CONFIGURAÇÃO DE MÚSICA DO YOUTUBE =====
    nomeMusica: "PAREDES - JORGE E MATEUS", // Nome que aparecerá no player
    youtubeId: "mSs-H_y-F6c",                     // ID do vídeo do YouTube
    // ==============================================

    // Texto romântico principal da página
    textoApaixonante: `Meu amor,

Hoje eu quero te fazer uma promessa simples, mas verdadeira.
Prometo caminhar ao seu lado mesmo nos dias difíceis, quando o mundo parecer pesado e os nossos sonhos parecerem distantes. Prometo celebrar cada conquista sua como se fosse minha, porque a sua felicidade também se tornou parte da minha.

Prometo cuidar do nosso amor com paciência, respeito e carinho. Não quero viver apenas os momentos perfeitos com você, quero também enfrentar as tempestades, aprender com os erros e crescer juntos todos os dias.

Prometo nunca deixar faltar diálogo, abraço apertado e sinceridade entre nós. Quando você sentir medo, quero ser seu abrigo. Quando eu estiver perdido, espero encontrar paz no seu olhar.

Ainda somos jovens, temos muito para descobrir, construir e viver. E talvez seja exatamente isso que torna tudo tão especial: estamos escrevendo nossa história juntos, página por página, sonho por sonho.

Acima de qualquer coisa, prometo escolher você todos os dias — nos dias fáceis e nos difíceis, nas risadas e nas inseguranças, no presente e em todos os planos que ainda vamos realizar... Te amo infinitamente!`
};

// Frases românticas para o Coração que Estoupa (Sorteio aleatório baseado no milissegundo do clique)
const FRASES_CORACAO = [
    "Você é o meu lugar favorito no mundo inteirinho! ❤️",
    "Sete bilhões de sorrisos no mundo, e o seu é o meu único predileto.",
    "O amor é lindo, mas o seu sorriso supera qualquer definição.",
    "Dizer que te amo já ficou pequeno perto de tudo que sinto por você.",
    "Com você, até os dias mais nublados ganham a cor mais linda do universo.",
    "Você é a resposta exata para todas as minhas orações.",
    "Se eu pudesse viver toda a minha vida de novo, te encontraria muito mais cedo.",
    "Meu amor por você cresce a cada batida do meu próprio coração.",
    "Você não imagina o tamanho do sorriso que eu dou quando penso em você.",
    "Obrigado por transformar os meus momentos simples em memórias inesquecíveis.",
    "Estarei ao seu lado em cada vitória, em cada abraço e em todas as estações.",
    "Você é o meu porto seguro, a minha paz eterna e a minha melhor escolha diária.",
    "Te amo hoje, amanhã, depois e por toda a eternidade que nos espera.",
    "Seu carinho reconstruiu tudo de mais lindo que existe em mim.",
    "Não importa onde eu esteja, meu coração sempre vai pertencera você.",
    "Estar com você é como ouvir a minha música favorita repetidamente sem nunca enjoar.",
    "Você é o sonho mais lindo que Deus me permitiu realizar acordado.",
    "O seu abraço tem o encaixe perfeito para acalmar todo o meu mundo.",
    "Prometo te amar nos pequenos detalhes e cuidar de você para sempre.",
    "Minha vida ganhou uma trilha sonora muito mais bonita desde que você chegou."
];

/* ==========================================================================\
   INICIALIZAÇÃO DO CONTEÚDO E MONTAGEM DA PÁGINA
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    // Injeta os dados estáticos do CONFIG nos lugares corretos do HTML
    document.getElementById("card-title").innerText = CONFIG.tituloCarta;
    document.getElementById("card-short-text").innerText = CONFIG.resumoCarta;
    document.getElementById("couple-names").innerText = CONFIG.nomesCasal;
    document.getElementById("main-love-text").innerText = CONFIG.textoApaixonante;

    montarEstruturasDeFotos();
});

function montarEstruturasDeFotos() {
    const sliderContainer = document.getElementById("main-slider");
    const dotsContainer = document.getElementById("slider-dots");
    const galleryContainer = document.getElementById("horizontal-gallery");

    if (!sliderContainer || !galleryContainer) return;

    let isFirst = true;
    let indexDot = 0;

    // 1. Gera o Grupo de Fotos do Slider Superior (Grupo 1: foto1.jpg até foto6.jpg)
    for (let i = CONFIG.sliderFotoInicio; i <= CONFIG.sliderFotoFim; i++) {
        const slideDiv = document.createElement("div");
        slideDiv.className = `slide-item ${isFirst ? 'active' : ''}`;
        
        const imgPath = `imag/${CONFIG.prefixoFotos}${i}${CONFIG.extensaoFotos}`;
        
        slideDiv.style.backgroundImage = `url('${imgPath}')`;
        slideDiv.innerHTML = `<img src="${imgPath}" alt="Nosso momento">`;
        
        const prevBtn = sliderContainer.querySelector(".prev-btn");
        if (prevBtn) {
            sliderContainer.insertBefore(slideDiv, prevBtn);
        } else {
            sliderContainer.appendChild(slideDiv);
        }

        if (dotsContainer) {
            const dotSpan = document.createElement("span");
            dotSpan.className = `dot ${isFirst ? 'active' : ''}`;
            const currentIdx = indexDot;
            dotSpan.onclick = () => showSlide(currentIdx);
            dotsContainer.appendChild(dotSpan);
        }

        isFirst = false;
        indexDot++;
    }

    // 2. Gera o Grupo de Fotos da Galeria Horizontal Inferior (Grupo 2: foto7.jpg até foto12.jpg)
    for (let i = CONFIG.carrosselFotoInicio; i <= CONFIG.carrosselFotoFim; i++) {
        const itemDiv = document.createElement("div");
        itemDiv.className = "gallery-item";
        itemDiv.innerHTML = `<img src="imag/${CONFIG.prefixoFotos}${i}${CONFIG.extensaoFotos}" alt="Nosso momento" draggable="false">`;
        galleryContainer.appendChild(itemDiv);
    }
}

/* ==========================================================================\
   CONTROLE DO CARROSSEL / SLIDER SUPERIOR AUTOMÁTICO
   ========================================================================== */
let currentSlide = 0;
let sliderTimer = null;

function showSlide(index) {
    const slides = document.querySelectorAll('.slide-item');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length === 0) return;

    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    if (slides[currentSlide]) slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');

    resetSliderTimer();
}

function changeSlide(direction) {
    showSlide(currentSlide + direction);
}

function resetSliderTimer() {
    if(sliderTimer) clearInterval(sliderTimer);
    sliderTimer = setInterval(() => {
        changeSlide(1);
    }, 4000);
}

/* ==========================================================================\
   MECANISMO DE CRONÔMETRO PROGRESSIVO (CONTAGEM DO TEMPO JUNTO)
   ========================================================================== */
function atualizarContador() {
    const dataPassada = new Date(CONFIG.dataInicio).getTime();
    const agora = new Date().getTime();
    const diferenca = agora - dataPassada;

    if (isNaN(dataPassada)) {
        document.getElementById("years").innerText = "ERR";
        return;
    }

    const msmAno = 1000 * 60 * 60 * 24 * 365.25; 
    const msmDia = 1000 * 60 * 60 * 24;
    const msmHora = 1000 * 60 * 60;
    const msmMinuto = 1000 * 60;

    const anos = Math.floor(diferenca / msmAno);
    const dias = Math.floor((diferenca % msmAno) / msmDia);
    const horas = Math.floor((diferenca % msmDia) / msmHora);
    const minutes = Math.floor((diferenca % msmHora) / msmMinuto);
    const segundos = Math.floor((diferenca % msmMinuto) / 1000);
    const milisegundos = Math.floor(diferenca % 1000);

    const elYears = document.getElementById("years");
    const elDays = document.getElementById("days");
    const elHours = document.getElementById("hours");
    const elMinutes = document.getElementById("minutes");
    const elSeconds = document.getElementById("seconds");
    const elMillis = document.getElementById("milliseconds");

    if(elYears) elYears.innerText = String(anos).padStart(2, '0');
    if(elDays) elDays.innerText = String(dias).padStart(2, '0');
    if(elHours) elHours.innerText = String(horas).padStart(2, '0');
    if(elMinutes) elMinutes.innerText = String(minutes).padStart(2, '0');
    if(elSeconds) elSeconds.innerText = String(segundos).padStart(2, '0');
    if(elMillis) elMillis.innerText = String(milisegundos).padStart(3, '0');
}

/* ==========================================================================\
   LOGICA INTERATIVA DO CORAÇÃO SURPRESA DO BALÃO
   ========================================================================== */
function popHeart(event) {
    const heart = document.getElementById("clickable-heart");
    const phraseBox = document.getElementById("heart-phrase-box");
    const phraseText = document.getElementById("heart-phrase-text");

    const currentMs = new Date().getMilliseconds();
    const randomIndex = currentMs % FRASES_CORACAO.length;
    
    if (phraseText) phraseText.innerText = FRASES_CORACAO[randomIndex];

    if (typeof Coracao === 'function') {
        for (let i = 0; i < 35; i++) {
            let p = new Coracao();
            p.x = event.clientX || window.innerWidth / 2;
            p.y = event.clientY || window.innerHeight / 2;
            p.velocidadeY = (Math.random() * 4 - 2) * 2;
            p.oscilacaoDistancia = Math.random() * 3 + 1;
            p.tamanho = Math.random() * 15 + 10;
            p.opacidade = Math.random() * 0.7 + 0.3;
            particulas.push(p);
        }
    }

    if (heart) heart.style.transform = "scale(0)";
    setTimeout(() => {
        if (heart) heart.classList.add("hidden");
        if (phraseBox) phraseBox.classList.remove("hidden");
    }, 200);
}

function resetHeart() {
    const heart = document.getElementById("clickable-heart");
    const phraseBox = document.getElementById("heart-phrase-box");

    if (phraseBox) phraseBox.classList.add("hidden");
    if (heart) heart.classList.remove("hidden");
    setTimeout(() => {
        if (heart) heart.style.transform = "scale(1)";
    }, 50);
}

/* ==========================================================================\
   AÇÃO DE ABRIR A CARTA E DAR START NA EXPERIÊNCIA
   ========================================================================== */
function openEnvelope() {
    const wrapper = document.querySelector('.envelope-wrapper');
    if (wrapper) wrapper.classList.add('open');

    // Tenta dar play na música, mas não deixa travar se o navegador bloquear
    try {
        if (playerYT && typeof playerYT.playVideo === 'function') {
            playerYT.playVideo();
            musicaTocando = true;
            
            const btn = document.getElementById("play-pause-btn");
            const icon = document.querySelector(".music-icon");
            const tip = document.getElementById("music-tip");
            
            if (btn) { btn.innerText = "⏸"; btn.classList.add("playing"); }
            if (icon) icon.classList.add("playing");
            if (tip) tip.style.display = "none";
        }
    } catch (e) {
        console.log("Autoplay bloqueado pelo navegador, aguardando clique manual.");
    }

    setTimeout(() => {
        const welcomeScreen = document.getElementById("welcome-screen");
        const mainContent = document.getElementById("main-content");

        if (welcomeScreen) welcomeScreen.classList.add("fade-out");
        if (mainContent) mainContent.classList.remove("hidden");
        
        resetSliderTimer();
        setInterval(atualizarContador, 40);
        initScrollReveal();
    }, 1200); 
}

/* ==========================================================================\
   EFEITO SCROLL REVEAL (REVELAÇÃO DE ITENS CONFORME ROLAGEM)
   ========================================================================== */
function initScrollReveal() {
    const targets = document.querySelectorAll('.scroll-reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    targets.forEach(target => observer.observe(target));
    setTimeout(() => window.dispatchEvent(new Event('scroll')), 200);
}

/* ==========================================================================\
   LOGICA ARRASTÁVEL DO MOUSE (PC) PARA A GALERIA DE FOTOS INFERIOR
   ========================================================================== */
const sliderGaleria = document.getElementById('horizontal-gallery');
let isDown = false;
let startX;
let scrollLeft;

if (sliderGaleria) {
    sliderGaleria.addEventListener('mousedown', (e) => {
        isDown = true;
        sliderGaleria.classList.add('active');
        startX = e.pageX - sliderGaleria.offsetLeft;
        scrollLeft = sliderGaleria.scrollLeft;
    });

    sliderGaleria.addEventListener('mouseleave', () => { isDown = false; });
    sliderGaleria.addEventListener('mouseup', () => { isDown = false; });

    sliderGaleria.addEventListener('mousemove', (e) => {
        if(!isDown) return;
        e.preventDefault();
        const x = e.pageX - sliderGaleria.offsetLeft;
        const walk = (x - startX) * 2;
        sliderGaleria.scrollLeft = scrollLeft - walk;
    });
}

/* ==========================================================================\
   CONTROLE DO PLAYER DE ÁUDIO INTEGRADO AO YOUTUBE
   ========================================================================== */
let playerYT;
let musicaTocando = false;

function onYouTubeIframeAPIReady() {
    playerYT = new YT.Player('youtube-audio-player', {
        videoId: CONFIG.youtubeId,
        playerVars: {
            'autoplay': 0,      
            'controls': 0,
            'loop': 1,
            'playlist': CONFIG.youtubeId,
            'modestbranding': 1,
            'rel': 0
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    const musicTitle = document.getElementById("music-title");
    if (musicTitle) musicTitle.innerText = CONFIG.nomeMusica;
}

function toggleMúsica() {
    if (!playerYT || typeof playerYT.playVideo !== 'function') return;
    
    const btn = document.getElementById("play-pause-btn");
    const icon = document.querySelector(".music-icon");
    const tip = document.getElementById("music-tip");

    if (!musicaTocando) {
        playerYT.playVideo();
        if (btn) { btn.innerText = "⏸"; btn.classList.add("playing"); }
        if (icon) icon.classList.add("playing");
        if (tip) tip.style.display = "none"; 
        musicaTocando = true;
    } else {
        playerYT.pauseVideo();
        if (btn) { btn.innerText = "▶"; btn.classList.remove("playing"); }
        if (icon) icon.classList.remove("playing");
        musicaTocando = false;
    }
}

/* ==========================================================================\
   SISTEMA DE PARTÍCULAS EM SEGUNDO PLANO (CANVAS)
   ========================================================================== */
const canvas = document.getElementById("heartCanvas");
const ctx = canvas ? canvas.getContext("2d") : null;

let particulas = [];
const maxParticulas = 40;

if (canvas && ctx) {
    function redimensionarCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", redimensionarCanvas);
    redimensionarCanvas();

    class Coracao {
        constructor() {
            this.reset();
            this.y = Math.random() * canvas.height; 
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + 20;
            this.tamanho = Math.random() * 12 + 6;
            this.velocidadeY = -(Math.random() * 0.8 + 0.4);
            this.oscilacaoVelocidade = Math.random() * 0.02 + 0.01;
            this.oscilacaoDistancia = Math.random() * 1.5;
            this.angulo = Math.random() * Math.PI;
            this.opacidade = Math.random() * 0.4 + 0.15;
        }

        atualizar() {
            this.y += this.velocidadeY;
            this.angulo += this.oscilacaoVelocidade;
            this.x += Math.sin(this.angulo) * this.oscilacaoDistancia;

            if (this.y < -20 || this.x < -20 || this.x > canvas.width + 20) {
                this.reset();
            }
        }

        desenhar() {
            ctx.save();
            ctx.globalAlpha = this.opacidade;
            ctx.translate(this.x, this.y);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(-this.tamanho / 2, -this.tamanho / 2, -this.tamanho, this.tamanho / 3, 0, this.tamanho);
            ctx.bezierCurveTo(this.tamanho, this.tamanho / 3, this.tamanho / 2, -this.tamanho / 2, 0, 0);
            ctx.fillStyle = "#ff2a4b";
            ctx.fill();
            ctx.restore();
        }
    }

    for (let i = 0; i < maxParticulas; i++) {
        particulas.push(new Coracao());
    }

    function loopAnimacaoCorta() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particulas.length; i++) {
            particulas[i].atualizar();
            particulas[i].desenhar();
        }
        requestAnimationFrame(loopAnimacaoCorta);
    }
    loopAnimacaoCorta();
}
