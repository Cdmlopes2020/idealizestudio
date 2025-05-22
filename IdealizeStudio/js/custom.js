// get current year
(function () {
    var year = new Date().getFullYear();
    document.querySelector("#currentYear").innerHTML = year;
})();



    const canvas = document.getElementById('noiseCanvas');
    const ctx = canvas.getContext('2d');

    const pixelSize = 3; // Tamanho pequeno
    const minShade = 26; // #1a em decimal
    const maxShade = 42; // #2a em decimal

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawNoise();
    }

    function drawNoise() {
      const cols = Math.ceil(canvas.width / pixelSize);
      const rows = Math.ceil(canvas.height / pixelSize);

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const shade = Math.floor(Math.random() * (maxShade - minShade + 1)) + minShade;
          ctx.fillStyle = `rgb(${shade}, ${shade}, ${shade})`;
          ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        }
      }
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();


  function fecharAnuncio() {
    const anuncio = document.getElementById('anuncio');
    anuncio.style.display = 'none';
  }


