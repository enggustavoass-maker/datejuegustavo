// ============================================================
// config.js — configurações gerais do site
// Edite os valores abaixo à vontade. Não precisa mexer em mais
// nenhum arquivo para trocar a senha ou os textos.
// ============================================================

const APP_CONFIG = {
  // Senha de acesso (troque quando quiser — é só editar esta linha)
  PASSWORD: "atequenaoemaideia.",

  // Textos da tela 1 (terminal)
  TERMINAL_LINES: [
    "Oi Ju! Que bom que você está aqui :)",
    "Para continuar, digite a senha:"
  ],
  TERMINAL_WRONG_PASSWORD: "Senha incorreta. Tente novamente.",
  TERMINAL_PROMPT_LABEL: "senha:",

  // Textos da tela 2 (perguntas)
  NEXT_BUTTON_LABEL: "Próxima",
  SEND_BUTTON_LABEL: "Enviar respostas",
  SENDING_LABEL: "Enviando...",

  // Textos da etapa final de comentários (depois da última pergunta)
  FINAL_STEP_TITLE: "Quase lá!",
  FINAL_STEP_TEXT: "Quer deixar alguma mensagem?",

  // Textos da tela 3 (final)
  RESULT_TITLE: "Pronto! 💚",
  RESULT_TEXT: "Suas respostas foram enviadas!",
  RESULT_ERROR_TEXT: "Não consegui enviar suas respostas agora. Verifique sua internet e tente de novo."
};
