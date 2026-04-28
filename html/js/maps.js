// Configuração do Mapa - Maquineta Stone
const embedCode = `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d225.46044363750008!2d-54.09457704201131!3d-25.29186758126349!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94f6acb065a95f31%3A0x9805d9303cfcf06d!2sMedianeira%2C%20State%20of%20Paran%C3%A1%2C%2085884-000!5e0!3m2!1sen!2sbr!4v1777258172758!5m2!1sen!2sbr" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;

(function injectMap() {
  const mapContainer = document.getElementById('map-embed');
  if (mapContainer) {
    mapContainer.innerHTML = embedCode;
  }
})();
