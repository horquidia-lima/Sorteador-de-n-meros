const form = document.getElementById('form');
const resultados = document.getElementById('resultados');
const numerosSorteados = document.getElementById('numeros-sorteados');
const btnNovamente = document.getElementById('btn-novamente');
const blocoResultados = document.getElementById('resultado-bloco');
const contador = document.getElementById('contador');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Esconde o form
    form.classList.add('hidden');
    // Mostra o resultado
    blocoResultados.classList.remove('hidden');
    numerosSorteados.innerHTML = ''; // limpa os resultados anteriores
    btnNovamente.classList.add('hidden'); // esconde o botão novamente
 
    const quant = parseInt(document.getElementById('quant').value); 
    const desde = parseInt(document.getElementById('desde').value); 
    const ate = parseInt(document.getElementById('ate').value);
    const unicos = document.getElementById('uniqueNumbers').checked;
    
    console.log(`Quantidade: ${quant}, De: ${desde}, Até: ${ate}, Únicos: ${unicos}`);

    if (desde > ate) {
        alert('O valor mínimo deve ser menor ou igual ao valor máximo.');
        form.classList.remove('hidden');
        blocoResultados.classList.add('hidden');
        return;
    }

    const totalDisponiveis = ate - desde + 1;

    if (unicos && quant > totalDisponiveis) {
        alert(`Você quer ${quant} números únicos, mas só existem ${totalDisponiveis} números possíveis nesse intervalo.`);
        form.classList.remove('hidden');
        blocoResultados.classList.add('hidden');
        return;
    }
  
    // Gerar todos os números de uma vez
    let numeros = [];
    let usados = new Set(); // Set para garantir que não se repitam (se marcado)
  
    for (let i = 0; i < quant; i++) {
        let numero;
        do {
            numero = Math.floor(Math.random() * (ate - desde + 1)) + desde; // gera um número aleatório
        } while (unicos && usados.has(numero));
    
        if (unicos) usados.add(numero); // se "únicos" for true, adiciona ao Set de usados
        numeros.push(numero); // adiciona o número ao array final
    }
    
    console.log("Números sorteados:", numeros);
    
    // Mostrar os números um por um com animação
    let contadorAtual = 1;
    
    const mostrarProximoNumero = (index) => {
        if (index >= numeros.length) {
            // Quando acabar, mostrar o botão de sortear novamente
            btnNovamente.classList.remove('hidden');
            return;
        }
        
        contador.textContent = `${index + 1}º resultado`;
        
        const span = document.createElement('span');
        span.textContent = numeros[index];
        span.classList.add('numero-animado');
        numerosSorteados.appendChild(span);
        
        // Chama o próximo número depois de 800ms
        setTimeout(() => {
            mostrarProximoNumero(index + 1);
        }, 800);
    };
    
    // Inicia a exibição dos números
    mostrarProximoNumero(0);
});

btnNovamente.addEventListener('click', () => {
    // Oculta os resultados
    blocoResultados.classList.add('hidden');
    btnNovamente.classList.add('hidden');
    numerosSorteados.innerHTML = '';
    
    // Mostra o form de novo
    form.classList.remove('hidden');
});