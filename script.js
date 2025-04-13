document.addEventListener('DOMContentLoaded', function() {
  gsap.registerPlugin(TextPlugin);
  const assets = document.querySelector('.assets').querySelectorAll('img');
  const progress = document.querySelector('progress');
  const quote = document.getElementById('quote');
  const cimol = document.getElementById('cimol');
  
  progress.max = assets.length;
  let loaded = 0;
  
  assets.forEach(asset => {
    // load assets
    asset.onload = () => {
      loaded++;
      progress.value = loaded;
      if (loaded === assets.length) {
        initAnimations();
      }
    }
    if (asset.complete) asset.onload();
  });
  
  let click = 0;
  const kataKata = [
    'aku tau aku salah, tapi aku sayang kelaa',
    'aku sayang kelaa, maapin aku ya',
    'tahu, nggak? orang kurus itu setia. makan aja nggak pernah nambah, apalagi pasangan.',
    'aku nggak sedih besok hari senin, aku sedihnya kalo besok nggak ketemu kelaa',
    'daripada daftar jadi boyband mending aku daftar jadi boyfriend kelaa aja.',
    'katanya kalo sering hujan itu bisa bikin seseorang terhanyut, kalo aku sekarang sedang terhanyut di dalam cintamu.',
    'ngemil apa yang paling enak? ngemilikin kela sepenuhnya.',
    'jepang bikin robot. jerman bikin mobil. kelaa bikin kangen.',
    'katanya kalau sering hujan itu bisa bikin seseorang terhanyut, kalau aku sekarang sedang terhanyut di dalam cintamu.',
    'kalau aku jadi wakil rakyat aku pasti gagal deh. gimana mau mikirin rakyat, kalau yang selalu ada di pikiranku hanyalah kelaa',
    'tanggal merah sekalipun aku tidak libur untuk memikirkan kelaa.'
  ];
  
  function getKata() {
    return kataKata[Math.floor(Math.random() * kataKata.length)];
  }
  
  const btn = document.querySelector('.ga');
  document.querySelector('.ya').addEventListener('click', handleYaClick);
  btn.addEventListener('click', handleGaClick);
  
  function initAnimations() {
    gsap.to('.loader', {
      autoAlpha: 0,
      duration: 0.75,
    });
    gsap.fromTo('#cimol', {
      scale: 0,
    }, {
      scale: 1,
      duration: 2,
      ease: "power2.out"
    });
    gsap.fromTo('.light', {
      autoAlpha: 0,
    }, {
      autoAlpha: 1,
      duration: 2,
      delay: 1,
      ease: "power2.out"
    });
    gsap.fromTo('.nama', {
      autoAlpha: 0,
      y: '500%',
    }, {
      y: '50%',
      autoAlpha: 1,
      duration: 0.5,
      ease: "power.inOut",
      delay: 1.75
    });
    gsap.fromTo('.dialog', {
      y: '-200%',
      scale: 0,
    }, {
      scale: 1,
      y: '-40%',
      duration: 1,
      ease: "power.in",
      delay: 2.5
    });
  }
  
  function handleYaClick(e) {
    e.preventDefault();
    gsap.to('.dialog', {
      scale: 0,
      y: '200%',
      duration: 0.5,
      ease: "power.out",
    });
    gsap.to('.light', {
      autoAlpha: 0,
      duration: 2.5,
      ease: "power.out",
    });
    gsap.to('body', {
      background: 'white',
      duration: 5,
      ease: "power.out",
    });
    gsap.to('.nama', {
      background: 'white',
      color: 'black',
      borderColor: 'black',
      duration: 5,
      ease: "power.out",
    });
    gsap.to('.arrow', {
      borderBottomColor: 'black',
      duration: 5,
      ease: "power.out",
    });
    firework();
    cimol.src = 'hore.gif';
  }
  
  function handleGaClick(e) {
    e.preventDefault();
    const text = getKata();
    gsap.fromTo(quote, {
      text: ''
    }, {
      duration: 2,
      text,
      ease: "power",
    });
    
    if (click > 6) {
      click = 0;
    } else if (click > 5) {
      cimol.src = 'nangis.gif';
    } else if (click > 1) {
      cimol.src = 'tanya.gif';
    } else {
      cimol.src = 'me.gif';
    }
    click++;
    
    const btn = e.target;
    btn.style.width = '8rem';
    btn.style.position = 'fixed';
    btn.style.display = 'block';
    const bound = document.querySelector('.ya').getBoundingClientRect();
    const x = Math.random() * (window.innerWidth - btn.offsetWidth) - (bound.left);
    const y = Math.random() * (window.innerHeight - btn.offsetHeight) - (bound.top);
    btn.style.background = 'red';
    btn.style.left = `${x}px`;
    btn.style.top = `${y}px`;
  }
  
  function firework() {
    const container = document.querySelector('.fireworks');
    const fireworks = new Fireworks.default(container);
    fireworks.start();
  }
});