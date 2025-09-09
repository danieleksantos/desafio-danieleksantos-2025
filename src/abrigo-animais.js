class AbrigoAnimais {
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const brinquedosPessoa1Array = brinquedosPessoa1.split(',').map(item => item.trim());
    const brinquedosPessoa2Array = brinquedosPessoa2.split(',').map(item => item.trim());
    const ordemAnimaisArray = ordemAnimais.split(',').map(item => item.trim());

    const animaisDoAbrigo = [
      { nome: 'Rex', tipo: 'cão', brinquedos: ['RATO', 'BOLA'] },
      { nome: 'Mimi', tipo: 'gato', brinquedos: ['BOLA', 'LASER'] },
      { nome: 'Fofo', tipo: 'gato', brinquedos: ['BOLA', 'RATO', 'LASER'] },
      { nome: 'Zero', tipo: 'gato', brinquedos: ['RATO', 'BOLA'] },
      { nome: 'Bola', tipo: 'cão', brinquedos: ['CAIXA', 'NOVELO'] },
      { nome: 'Bebe', tipo: 'cão', brinquedos: ['LASER', 'RATO','BOLA'] },
      { nome: 'Loco', tipo: 'jabuti', brinquedos: ['SKATE', 'RATO'] }
    ];

    const todosBrinquedosValidos = [];
    animaisDoAbrigo.forEach(animal => {
        animal.brinquedos.forEach(brinquedo => {
            if (!todosBrinquedosValidos.includes(brinquedo)) {
                todosBrinquedosValidos.push(brinquedo);
            }
        });
    });

    const animaisUnicos = new Set(ordemAnimaisArray);
    if (animaisUnicos.size !== ordemAnimaisArray.length) {
      return { erro: 'Animal inválido' };
    }

    const brinquedosPessoa1Unicos = new Set(brinquedosPessoa1Array);
    const pessoa1TemBrinquedoInvalido = brinquedosPessoa1Array.some(brinquedo => 
        !todosBrinquedosValidos.includes(brinquedo)
    );
    if (brinquedosPessoa1Unicos.size !== brinquedosPessoa1Array.length || pessoa1TemBrinquedoInvalido) {
      return { erro: 'Brinquedo inválido' };
    }

    const brinquedosPessoa2Unicos = new Set(brinquedosPessoa2Array);
    const pessoa2TemBrinquedoInvalido = brinquedosPessoa2Array.some(brinquedo =>
        !todosBrinquedosValidos.includes(brinquedo)
    );
    if (brinquedosPessoa2Unicos.size !== brinquedosPessoa2Array.length || pessoa2TemBrinquedoInvalido) {
      return { erro: 'Brinquedo inválido' };
    }
    
    function verificaOrdem(brinquedosPessoa, brinquedosAnimal) {
      const temTodosOsBrinquedos = brinquedosAnimal.every(brinquedo =>
        brinquedosPessoa.includes(brinquedo)
      );

      if (!temTodosOsBrinquedos) {
        return false;
      }

      let ultimoIndice = -1;

      for (const brinquedoFavorito of brinquedosAnimal) {
        const indiceAtual = brinquedosPessoa.indexOf(brinquedoFavorito, ultimoIndice + 1);

        if (indiceAtual === -1) {
          return false;
        }

        ultimoIndice = indiceAtual;
      }

      return true;
    }
    
    const adotouGatoPessoa1 = { status: false, brinquedos: new Set() };
    const adotouGatoPessoa2 = { status: false, brinquedos: new Set() };

    let locoAdotadoPessoa1 = false;
    let locoAdotadoPessoa2 = false;

    let contadorAdocoesPessoa1 = 0;
    let contadorAdocoesPessoa2 = 0;

    const listaFinal = [];

    for (const nomeAnimal of ordemAnimaisArray) {

      const animalAtual = animaisDoAbrigo.find(a => a.nome === nomeAnimal);
      if (!animalAtual) {
        return { erro: 'Animal inválido' };
      }

      let pessoa1Apta = false;
      let pessoa2Apta = false;

      if (animalAtual.nome === 'Loco') {
        const pessoa1TemBrinquedosLoco = animalAtual.brinquedos.every(brinquedo => brinquedosPessoa1Array.includes(brinquedo));
        const pessoa2TemBrinquedosLoco = animalAtual.brinquedos.every(brinquedo => brinquedosPessoa2Array.includes(brinquedo));

        if (pessoa1TemBrinquedosLoco && contadorAdocoesPessoa1 < 3) {
          pessoa1Apta = true;
          locoAdotadoPessoa1 = true;
        }
        if (pessoa2TemBrinquedosLoco && contadorAdocoesPessoa2 < 3) {
          pessoa2Apta = true;
          locoAdotadoPessoa2 = true;
        }
      } else {
        if (contadorAdocoesPessoa1 < 3 && verificaOrdem(brinquedosPessoa1Array, animalAtual.brinquedos)) {
          pessoa1Apta = true;
        }
        if (contadorAdocoesPessoa2 < 3 && verificaOrdem(brinquedosPessoa2Array, animalAtual.brinquedos)) {
          pessoa2Apta = true;
        }
      }
      
      if (pessoa1Apta && adotouGatoPessoa1.status && animalAtual.tipo !== 'gato') {
          const brinquedosUsados = new Set(animalAtual.brinquedos);
          const conflito = Array.from(adotouGatoPessoa1.brinquedos).some(brinquedoGato => brinquedosUsados.has(brinquedoGato));
          if (conflito) pessoa1Apta = false;
      }
      if (pessoa2Apta && adotouGatoPessoa2.status && animalAtual.tipo !== 'gato') {
          const brinquedosUsados = new Set(animalAtual.brinquedos);
          const conflito = Array.from(adotouGatoPessoa2.brinquedos).some(brinquedoGato => brinquedosUsados.has(brinquedoGato));
          if (conflito) pessoa2Apta = false;
      }
      
      if (pessoa1Apta && pessoa2Apta) {
        listaFinal.push(`${nomeAnimal} - abrigo`);
      } else if (pessoa1Apta) {
        listaFinal.push(`${nomeAnimal} - pessoa 1`);
        contadorAdocoesPessoa1++;
        if (animalAtual.tipo === 'gato') {
            adotouGatoPessoa1.status = true;
            animalAtual.brinquedos.forEach(brinquedo => adotouGatoPessoa1.brinquedos.add(brinquedo));
        }
      } else if (pessoa2Apta) {
        listaFinal.push(`${nomeAnimal} - pessoa 2`);
        contadorAdocoesPessoa2++;
        if (animalAtual.tipo === 'gato') {
            adotouGatoPessoa2.status = true;
            animalAtual.brinquedos.forEach(brinquedo => adotouGatoPessoa2.brinquedos.add(brinquedo));
        }
      } else {
        listaFinal.push(`${nomeAnimal} - abrigo`);
      }
    }

    if (locoAdotadoPessoa1 && contadorAdocoesPessoa1 <= 1) {
      const indiceLoco = listaFinal.findIndex(item => item.startsWith('Loco'));
      if (indiceLoco !== -1) {
        listaFinal[indiceLoco] = 'Loco - abrigo';
      }
    }
    
    if (locoAdotadoPessoa2 && contadorAdocoesPessoa2 <= 1) {
      const indiceLoco = listaFinal.findIndex(item => item.startsWith('Loco'));
      if (indiceLoco !== -1) {
        listaFinal[indiceLoco] = 'Loco - abrigo';
      }
    }
    return { lista: listaFinal.sort() }
  }
}
export { AbrigoAnimais as AbrigoAnimais };