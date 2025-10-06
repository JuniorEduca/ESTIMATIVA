document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('betForm');
    const resultado = document.getElementById('resultado');
    const demoBtn = document.getElementById('demoBtn');
    const clearBtn = document.getElementById('clearBtn');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const posCasa = parseInt(document.getElementById('classCasa').value);
        const posFora = parseInt(document.getElementById('classFora').value);

        if (isNaN(posCasa) || isNaN(posFora)) return;

        // Força baseada em posição
        const forcaCasa = (21 - posCasa) / 20;
        const forcaFora = (21 - posFora) / 20;

        // Vantagem do mandante (10%)
        const vantagemCasa = 0.1;

        let probCasa = forcaCasa + vantagemCasa;
        let probFora = forcaFora;
        let total = probCasa + probFora;

        // Normaliza 80% para vitória/derrota, 20% para empate ajustado
        probCasa = (probCasa / total) * 0.8;
        probFora = (probFora / total) * 0.8;

        // Empate dinâmico (maior se forças próximas)
        const diff = Math.abs(posCasa - posFora);
        let probEmpate = Math.max(0.15, 0.35 - diff * 0.01);

        const soma = probCasa + probFora + probEmpate;
        probCasa /= soma;
        probFora /= soma;
        probEmpate /= soma;

        const vitoria = (probCasa * 100).toFixed(1) + "%";
        const empate = (probEmpate * 100).toFixed(1) + "%";
        const derrota = (probFora * 100).toFixed(1) + "%";

        mostrarResultado({
            vitoria, empate, derrota,
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
        resultado.classList.add('hidden');
        resetResultadoText();
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

    function resetResultadoText() {
        document.getElementById('vitoria').textContent = 'Vitória Mandante: -';
        document.getElementById('empate').textContent = 'Empate: -';
        document.getElementById('derrota').textContent = 'Vitória Visitante: -';
        document.getElementById('escanteios').textContent = 'Escanteios: -';
        document.getElementById('gols').textContent = 'Gols: -';
    }
});