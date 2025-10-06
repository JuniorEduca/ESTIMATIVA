document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('betForm');
    const resultado = document.getElementById('resultado');
    const demoBtn = document.getElementById('demoBtn');
    const clearBtn = document.getElementById('clearBtn');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const posCasa = parseInt(document.getElementById('classCasa').value);
        const posFora = parseInt(document.getElementById('classFora').value);

        const diff = posFora - posCasa;
        let vitoria = 50 + (diff * 1.5);
        let derrota = 50 - (diff * 1.5);
        let empate = 100 - (vitoria + derrota);

        vitoria = Math.max(10, Math.min(80, vitoria));
        derrota = Math.max(10, Math.min(80, derrota));
        empate = 100 - (vitoria + derrota);

        mostrarResultado({
            vitoria: vitoria.toFixed(1) + '%',
            empate: empate.toFixed(1) + '%',
            derrota: derrota.toFixed(1) + '%',
            escanteios: (7 + Math.random() * 3).toFixed(1),
            gols: (2 + Math.random()).toFixed(1)
        });
    });

    demoBtn.addEventListener('click', () => {
        document.getElementById('campeonato').value = 'Brasileirão';
        document.getElementById('timeCasa').value = 'Flamengo';
        document.getElementById('timeFora').value = 'Palmeiras';
        document.getElementById('classCasa').value = '3';
        document.getElementById('classFora').value = '15';
        document.getElementById('data').value = '2025-10-05';
        form.dispatchEvent(new Event('submit'));
    });

    clearBtn.addEventListener('click', () => {
        form.reset();
        hideResultado();
        resetResultadoText();
        document.getElementById('campeonato').focus();
    });

    function mostrarResultado(dados) {
        resultado.classList.remove('hidden');
        document.getElementById('vitoria').textContent = `Vitória Mandante: ${dados.vitoria}`;
        document.getElementById('empate').textContent = `Empate: ${dados.empate}`;
        document.getElementById('derrota').textContent = `Vitória Visitante: ${dados.derrota}`;
        document.getElementById('escanteios').textContent = `Escanteios: ${dados.escanteios}`;
        document.getElementById('gols').textContent = `Gols: ${dados.gols}`;
        resultado.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 600 });
    }

    function hideResultado() {
        resultado.classList.add('hidden');
    }

    function resetResultadoText() {
        document.getElementById('vitoria').textContent = 'Vitória Mandante: -';
        document.getElementById('empate').textContent = 'Empate: -';
        document.getElementById('derrota').textContent = 'Vitória Visitante: -';
        document.getElementById('escanteios').textContent = 'Escanteios: -';
        document.getElementById('gols').textContent = 'Gols: -';
    }
});