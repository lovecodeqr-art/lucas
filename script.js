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
    textoApaixonante: "Cada momento ao seu lado transforma minha vida em algo completamente mágico. Olhar para trás e ver tudo o que já construímos me dá a certeza de que fomos feitos um para o outro. Obrigado(a) por ser meu porto seguro, meu sorriso diário e minha melhor escolha todos os dias. Que o nosso 'para sempre' continue sendo escrito com todo o carinho e cumplicidade do mundo. Te amo infinitamente!"
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
    "Não importa onde eu esteja, meu coração sempre vai pertencer a você.",
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

    let isFirst = true;
    let indexDot = 0;

    // 1. Gera o Grupo de Fotos do Slider Superior (Grupo 1: foto1.jpg até foto6.jpg)
    for (let i = CONFIG.sliderFotoInicio; i <= CONFIG.sliderFotoFim; i++) {
        const slideDiv = document.createElement("div");
        slideDiv.className = `slide-item ${isFirst ? 'active' : ''}`;
        
        // Caminho da imagem
        const imgPath = `imag/${CONFIG.prefixoFotos}${i}${CONFIG.extensaoFotos}`;
        
        // Definimos o background inline para o efeito blur funcionar no CSS
        slideDiv.style.backgroundImage = `url('${imgPath}')`;
        slideDiv.innerHTML = `<img src="${imgPath}" alt="Nosso momento">`;
        
        // Insere o slide antes dos botões de controle de navegação
        sliderContainer.insertBefore(slideDiv, sliderContainer.querySelector(".prev-btn"));

        // Gera as bolinhas indicadoras inferiores do slider
        const dotSpan = document.createElement("span");
        dotSpan.className = `dot ${isFirst ? 'active' : ''}`;
        const currentIdx = indexDot;
        dotSpan.onclick = () => showSlide(currentIdx);
        dotsContainer.appendChild(dotSpan);

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

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');

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

    document.getElementById("years").innerText = String(anos).padStart(2, '0');
    document.getElementById("days").innerText = String(dias).padStart(2, '0');
    document.getElementById("hours").innerText = String(horas).padStart(2, '0');
    document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
    document.getElementById("seconds").innerText = String(segundos).padStart(2, '0');
    document.getElementById("milliseconds").innerText = String(milisegundos).padStart(3, '0');
}

/* ==========================================================================\
   NOVA FUNÇÃO: LOGICA INTERATIVA DO CORAÇÃO SURPRESA DO BALÃO
   ========================================================================== */
function popHeart(event) {
    const heart = document.getElementById("clickable-heart");
    const phraseBox = document.getElementById("heart-phrase-box");
    const phraseText = document.getElementById("heart-phrase-text");

    // Coleta o milissegundo atual do clique para garantir a aleatoriedade completa baseada no horário exato
    const currentMs = new Date().getMilliseconds();
    const randomIndex = currentMs % FRASES_CORACAO.length;
    
    // Define o texto sorteado
    phraseText.innerText = FRASES_CORACAO[randomIndex];

    // Cria efeito visual de estouro injetando mini corações no canvas de fundo
    if (typeof Coracao === 'function') {
        for (let i = 0; i < 35; i++) {
            let p = new Coracao();
            // Faz brotar do local aproximado do clique na tela
            p.x = event.clientX || window.innerWidth / 2;
            p.y = event.clientY || window.innerHeight / 2;
            p.velocidadeY = (Math.random() * 4 - 2) * 2;
            p.oscilacaoDistancia = Math.random() * 3 + 1;
            p.tamanho = Math.random() * 15 + 10;
            p.opacidade = Math.random() * 0.7 + 0.3;
            particulas.push(p);
        }
    }

    // Esconde o coração e mostra o card com a frase de amor
    heart.style.transform = "scale(0)";
    setTimeout(() => {
        heart.classList.add("hidden");
        phraseBox.classList.remove("hidden");
    }, 200);
}

function resetHeart() {
    const heart = document.getElementById("clickable-heart");
    const phraseBox = document.getElementById("heart-phrase-box");

    phraseBox.classList.add("hidden");
    heart.classList.remove("hidden");
    setTimeout(() => {
        heart.style.transform = "scale(1)";
    }, 50);
}

/* ==========================================================================\
   AÇÃO DE ABRIR A CARTA E DAR START NA EXPERIÊNCIA
   ========================================================================== */
function openEnvelope() {
    const wrapper = document.querySelector('.envelope-wrapper');
    wrapper.classList.add('open');

    if (playerYT && typeof playerYT.playVideo === 'function') {
        playerYT.playVideo();
        musicaTocando = true;
        document.getElementById("play-pause-btn").innerText = "⏸";
    }

    setTimeout(() => {
        document.getElementById("welcome-screen").classList.add("fade-out");
        document.getElementById("main-content").classList.remove("hidden");
        
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
    document.getElementById("music-title").innerText = CONFIG.nomeMusica;
}

function toggleMúsica() {
    if (!playerYT || typeof playerYT.playVideo !== 'function') return;
    const btn = document.getElementById("play-pause-btn");

    if (!musicaTocando) {
        playerYT.playVideo();
        btn.innerText = "⏸";
        musicaTocando = true;
    } else {
        playerYT.pauseVideo();
        btn.innerText = "▶";
        musicaTocando = false;
    }
}

/* ==========================================================================\
   SISTEMA DE PARTÍCULAS EM SEGUNDO PLANO (CANVAS)
   ========================================================================== */
const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");

let particulas = [];
const maxParticulas = 40;

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