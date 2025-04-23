const form = document.getElementById('form');
const resultados = document.getElementById('resultados');
const numerosSorteados = document.getElementById('numeros-sorteados');
const btnNovamente = document.getElementById('btn-novamente');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    //Esconde o form
    form.classList.add('hidden');
    //Mostra o resultado
    resultados.classList.remove('hidden');
    numerosSorteados.innerHTML = ''; // limpa os resultados anteriores
 
    
    const quant = parseInt(document.getElementById('quant').value);
    console.log(quant);
    const desde = parseInt(document.getElementById('desde').value);
    console.log(desde)
    const ate = parseInt(document.getElementById('ate').value);
    console.log(ate)
    const unicos = document.getElementById('uniqueNumbers').checked;
    console.log(unicos)
    

    if (isNaN(quant) || isNaN(desde) || isNaN(ate)) {
        alert('Preencha todos os campos corretamente!');
        return;
    }

    if(quant <= 0) {
        alert('Quantidade de números deve ser maior que zero!');
        return;
    }

    if(desde > ate) {
        alert('O valor mínimo deve ser menor ou igual ao valor máximo.');
        return;
    }

    const totalDisponiveis = ate - desde + 1;

    if(unicos && quant > totalDisponiveis) {
        alert(`Você quer ${quant} números únicos, mas só existem ${totalDisponiveis} números possíveis nesse intervalo.`)
    }
  
      let numeros = [];
      let usados = new Set(); //Set para garantir que não se repitam (se marcado)
  
      resultados.innerHTML = ''; // limpa resultado anterior
  
      let intervalo = setInterval(() => {
        if (numeros.length >= quant) {
          clearInterval(intervalo);
          return;
        }
  
        let numero;
        do {
          numero = Math.floor(Math.random() * (ate - desde + 1)) + desde; // gera um número aleatório
        } while (unicos && usados.has(numero));
  
        if (unicos) usados.add(numero); // se "únicos" for true, adiciona ao Set de usados
  
        numeros.push(numero); // adiciona o número ao array final

        // Mostra um número por vez com animação
        numeros.forEach((numero, i) => {
            setTimeout(() => {
            const span = document.createElement('span');
            span.textContent = numero;
            span.classList.add('numero-animado');
            numerosSorteados.appendChild(span);

            if (i === numeros.length - 1) {
                // Quando acabar, mostrar o botão de sortear novamente
                btnNovamente.classList.remove('hidden');
            }
            }, i * 500); // 500ms entre cada número
        });
  
        const span = document.createElement('span');
        span.className = 'numero';
        span.textContent = numero;
        resultados.appendChild(span);
  
      }, 300); // muda a velocidade aqui se quiser
})

btnNovamente.addEventListener('click', () => {
    //Oculta os resultados
    resultados.classList.add('hidden');
    btnNovamente.classList.add('hidden');
    numerosSorteados.innerHTML = '';

    //Mostra o form de novo
    form.classList.remove('hidden');
})