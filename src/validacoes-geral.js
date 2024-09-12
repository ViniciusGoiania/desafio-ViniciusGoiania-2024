import { ANIMAIS_CONFIG } from './configuracoes-zoo.js';

function validarAnimal(animal) {
  if (!ANIMAIS_CONFIG[animal.especie]) {
    throw new Error("Animal inválido");
  }
  if (isNaN(animal.quantidade) || animal.quantidade <= 0) {
    throw new Error("Quantidade inválida");
  }
}

function biomaValido(animal, recinto) {
  return Array.isArray(recinto.bioma)
    ? (Array.isArray(animal.bioma)
      ? animal.bioma.some(bioma => recinto.bioma.includes(bioma))
      : recinto.bioma.includes(animal.bioma))
    : (Array.isArray(animal.bioma)
      ? animal.bioma.includes(recinto.bioma)
      : recinto.bioma === animal.bioma);
}

function validarCompatibilidade(animal, recinto) {
  let compatibilidade = true;

  if (animal.isCarnivoro) {
    const temCarnivoros = recinto.animais.some(a => a._isCarnivoro);
    const temNaoCarnivoros = recinto.animais.some(a => !a._isCarnivoro);
    if (temNaoCarnivoros) {
      compatibilidade = false;
    } else {
      compatibilidade = temCarnivoros ?
        recinto.animais.every(a => a._isCarnivoro && a.especie === animal.especie) :
        true;
    }
  } else {
    const temCarnivoros = recinto.animais.some(a => a._isCarnivoro);
    compatibilidade = !temCarnivoros;
  }

  if (animal.especie === "MACACO") {
    compatibilidade = validarRegraMacaco(animal, recinto);
  } else if (animal.especie === "HIPOPOTAMO") {
    compatibilidade = validarRegraHipopotamo(animal, recinto);
  }

  return compatibilidade;
}

function validarRegraMacaco(animal, recinto) {
  const temAnimaisNaoCarnivoros = recinto.animais.some(a => !a._isCarnivoro);
  const biomaVazio = recinto.animais.length === 0;

  if (animal.quantidade > 1) {
    return biomaVazio || temAnimaisNaoCarnivoros;
  } else {
    return temAnimaisNaoCarnivoros && recinto.animais.length > 0;
  }
}

function validarRegraHipopotamo(animal, recinto) {
  if (animal.especie !== "HIPOPOTAMO") {
    return false;
  }

  const biomaAceito = recinto.bioma.includes("savana") && recinto.bioma.includes("rio");
  const biomaVazio = recinto.animais.length === 0;
  const semCarnivoros = recinto.animais.every(a => !a._isCarnivoro);

  return (biomaAceito && semCarnivoros) || (biomaVazio && (recinto.bioma.includes("savana") || recinto.bioma.includes("rio")));
}

function calcularEspacoDisponivel(animal, recinto) {
  const espacoOcupado = recinto.animais.reduce((total, a) => total + (a.quantidade * ANIMAIS_CONFIG[a.especie].tamanho), 0);
  const espacoDoAnimal = animal.tamanho * animal.quantidade;
  const espacoExtra = recinto.animais.some(a => a.especie !== animal.especie) ? 1 : 0;
  return recinto.tamanhoTotal - espacoOcupado - espacoDoAnimal - espacoExtra;
}

export { validarAnimal, biomaValido, validarCompatibilidade, calcularEspacoDisponivel };
