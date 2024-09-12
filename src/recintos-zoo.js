import { RECINTOS_CONFIG, ANIMAIS_CONFIG } from './configuracoes-zoo.js';
import { validarAnimal, biomaValido, validarCompatibilidade, calcularEspacoDisponivel } from './validacoes-geral.js';

class RecintosZoo {
  constructor() {
    this.recintos = RECINTOS_CONFIG;
  }

  analisaRecintos(especie, quantidade) {
    let animal;
    try {
      animal = { especie, quantidade, ...ANIMAIS_CONFIG[especie] };
      validarAnimal(animal);
    } catch (error) {
      return { erro: error.message, recintosViaveis: null };
    }

    const recintosViaveis = [];

    this.recintos.forEach(recinto => {
      if (biomaValido(animal, recinto) && validarCompatibilidade(animal, recinto)) {
        const espacoRestante = calcularEspacoDisponivel(animal, recinto);
        if (espacoRestante >= 0) {
          recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoRestante} total: ${recinto.tamanhoTotal})`);
        }
      }
    });

    recintosViaveis.sort((a, b) => {
      const RecintoA = parseInt(a.match(/\d+/)[0]);
      const RecintoB = parseInt(b.match(/\d+/)[0]);
      return RecintoA - RecintoB;
    });

    if (recintosViaveis.length === 0) {
      return { erro: "Não há recinto viável", recintosViaveis: null };
    }

    return { erro: null, recintosViaveis };
  }
}

export { RecintosZoo as RecintosZoo };
