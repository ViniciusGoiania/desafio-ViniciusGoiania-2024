const ANIMAIS_CONFIG = {
  "LEAO": { tamanho: 3, bioma: "savana", isCarnivoro: true },
  "LEOPARDO": { tamanho: 2, bioma: "savana", isCarnivoro: true },
  "CROCODILO": { tamanho: 3, bioma: "rio", isCarnivoro: true },
  "MACACO": { tamanho: 1, bioma: ["savana", "floresta"], isCarnivoro: false },
  "GAZELA": { tamanho: 2, bioma: "savana", isCarnivoro: false },
  "HIPOPOTAMO": { tamanho: 4, bioma: ["savana", "rio"], isCarnivoro: false }
};

const RECINTOS_CONFIG = [
  { numero: 1, bioma: "savana", tamanhoTotal: 10, animais: [{ especie: "MACACO", quantidade: 3, _isCarnivoro: false }] },
  { numero: 2, bioma: "floresta", tamanhoTotal: 5, animais: [] },
  { numero: 3, bioma: ["savana", "rio"], tamanhoTotal: 7, animais: [{ especie: "GAZELA", quantidade: 1, _isCarnivoro: false }] },
  { numero: 4, bioma: "rio", tamanhoTotal: 8, animais: [] },
  { numero: 5, bioma: "savana", tamanhoTotal: 9, animais: [{ especie: "LEAO", quantidade: 1, _isCarnivoro: true }] }
];

export { ANIMAIS_CONFIG, RECINTOS_CONFIG };
