// ============================================================
// questions.js — lista de perguntas
// Adicione, remova ou reordene perguntas livremente. A tela se
// adapta automaticamente ao número de itens desta lista.
//
// Cada pergunta é um objeto com:
//   id    -> identificador único (usado no envio pro Telegram)
//   text  -> o texto da pergunta
//   image -> (opcional) URL de uma imagem para ilustrar a pergunta
// ============================================================

const QUESTIONS = [
  {
    id: "circuito_liberdade",
    text: "Cê conhece o Circuito da Liberdade? De 1 a 10 o quanto parece uma boa ideia a gente passar uma tarde por lá?",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Pra%C3%A7a%20da%20Liberdade%2C%20Belo%20Horizonte.jpg?width=1200"
  },
  {
    id: "pampulha",
    text: "E que nota você dá pra Lagoa da Pampulha? A gente pode dar uma volta na lagoa e tomar uma água de côco sla",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Igreja%20de%20S%C3%A3o%20Francisco%20de%20Assis%20-%20Igrejinha%20da%20Pampulha.jpg?width=1200"
  },
  {
    id: "escalada",
    text: "Escalar é uma boa ideia de date? Eu não faço ideia",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Movement%20(formerly%20Earth%20Treks)%20Rockville%20climbing%20gym%20interior.jpg?width=1200"
  },
  // {
  //   id: "passinho_bh",
  //   text: "Já ouviu falar no passinho de BH? @",
  //   image: "https://commons.wikimedia.org/wiki/Special:FilePath/Hip%20hop%20dance.jpg?width=1200"
  // },
  {
    id: "comida",
    text: "O básico funciona? Um hamburguer, pizza... Cê gosta de japa?",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Vista%20lateral%20de%20hamburguesa%20artesanal%20con%20queso%2C%20vegetales%20frescos%20y%20pan%20tipo%20casero%20con%20semillas.jpg?width=1200"
  },
  {
    id: "jogos",
    text: 'E jogos, vc gosta? O @shelfbar é bem legal',
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Board%20game.jpg?width=1200"
  },
  {
    id: "standup",
    text: "Como tá o seu senso de humor pra um stand-up?",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Stand-up%20comedy%20-%20Stage.jpg?width=1200"
  }

  // Exemplo de como adicionar uma nova pergunta:
  // {
  //   id: "outra_pergunta",
  //   text: "Texto da pergunta aqui",
  //   image: "https://link-da-imagem.jpg"
  // },
];
