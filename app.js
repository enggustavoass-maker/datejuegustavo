// ============================================================
// app.js — lógica do site (não precisa editar para trocar
// senha, textos ou perguntas — isso é tudo em config.js e
// questions.js)
// ============================================================

(function () {
  "use strict";

  const screens = {
    terminal: document.getElementById("screen-terminal"),
    questions: document.getElementById("screen-questions"),
    done: document.getElementById("screen-done"),
  };

  function showScreen(name) {
    Object.values(screens).forEach((el) => el.classList.remove("is-active"));
    screens[name].classList.add("is-active");
  }

  // ---------------- TELA 1: Terminal ----------------

  const terminalLinesEl = document.getElementById("terminal-lines");
  const terminalErrorEl = document.getElementById("terminal-error");
  const promptLabelEl = document.getElementById("prompt-label");
  const passwordInput = document.getElementById("password-input");

  function initTerminal() {
    promptLabelEl.textContent = APP_CONFIG.TERMINAL_PROMPT_LABEL;
    APP_CONFIG.TERMINAL_LINES.forEach((text, i) => {
      const div = document.createElement("div");
      div.className = "line";
      div.textContent = text;
      div.style.animationDelay = i * 0.5 + "s";
      terminalLinesEl.appendChild(div);
    });
    passwordInput.focus();
  }

  function checkPassword() {
    const value = passwordInput.value;
    if (value === APP_CONFIG.PASSWORD) {
      terminalErrorEl.textContent = "";
      startQuestions();
    } else {
      terminalErrorEl.textContent = APP_CONFIG.TERMINAL_WRONG_PASSWORD;
      passwordInput.value = "";
    }
  }

  passwordInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") checkPassword();
  });

  // Keep focus on the hidden-ish input whenever the terminal screen is tapped
  screens.terminal.addEventListener("click", () => passwordInput.focus());

  // ---------------- TELA 2: Perguntas ----------------

  const progressEl = document.getElementById("questions-progress");
  const progressFillEl = document.getElementById("questions-progress-fill");
  const imageWrapEl = document.getElementById("question-image-wrap");
  const imageEl = document.getElementById("question-image");
  const textEl = document.getElementById("question-text");
  const answerWrapEl = document.getElementById("question-answer-wrap");
  const sliderEl = document.getElementById("question-slider");
  const valueEl = document.getElementById("question-value");
  const finalWrapEl = document.getElementById("questions-final");
  const finalCommentEl = document.getElementById("final-comment");
  const nextBtn = document.getElementById("question-next");
  const backBtn = document.getElementById("question-back");

  // currentIndex vai de 0 até QUESTIONS.length - 1 para as perguntas,
  // e QUESTIONS.length é a etapa extra de comentários finais.
  const TOTAL_STEPS = QUESTIONS.length + 1;
  const FINAL_STEP = QUESTIONS.length;

  let currentIndex = 0;
  const answers = {};
  let finalComment = "";

  function startQuestions() {
    showScreen("questions");
    currentIndex = 0;
    renderStep();
  }

  function updateSliderFill() {
    const pct = ((sliderEl.value - sliderEl.min) / (sliderEl.max - sliderEl.min)) * 100;
    sliderEl.style.background =
      `linear-gradient(to right, var(--teal) ${pct}%, rgba(19,78,74,0.15) ${pct}%)`;
    valueEl.textContent = sliderEl.value;
  }

  function renderStep() {
    progressFillEl.style.width = `${(currentIndex / TOTAL_STEPS) * 100}%`;
    backBtn.hidden = currentIndex === 0;

    if (currentIndex === FINAL_STEP) {
      renderFinalStep();
    } else {
      renderQuestion();
    }
  }

  function renderQuestion() {
    const q = QUESTIONS[currentIndex];

    progressEl.textContent = `Pergunta ${currentIndex + 1} de ${QUESTIONS.length}`;
    textEl.textContent = q.text;

    imageWrapEl.style.display = "";
    answerWrapEl.style.display = "";
    finalWrapEl.hidden = true;

    if (q.image) {
      imageEl.classList.remove("is-loaded");
      imageEl.src = q.image;
      imageEl.alt = q.text;
      imageEl.onload = () => imageEl.classList.add("is-loaded");
      imageEl.style.display = "block";
    } else {
      imageEl.style.display = "none";
    }

    sliderEl.value = answers[q.id] !== undefined ? answers[q.id] : 5;
    updateSliderFill();

    nextBtn.textContent = APP_CONFIG.NEXT_BUTTON_LABEL;
    nextBtn.disabled = false;
  }

  function renderFinalStep() {
    progressEl.textContent = APP_CONFIG.FINAL_STEP_TITLE;
    textEl.textContent = APP_CONFIG.FINAL_STEP_TEXT;

    imageWrapEl.style.display = "none";
    answerWrapEl.style.display = "none";
    finalWrapEl.hidden = false;
    finalCommentEl.value = finalComment;

    nextBtn.textContent = APP_CONFIG.SEND_BUTTON_LABEL;
    nextBtn.disabled = false;
  }

  sliderEl.addEventListener("input", updateSliderFill);

  function saveCurrentStep() {
    if (currentIndex === FINAL_STEP) {
      finalComment = finalCommentEl.value.trim();
    } else {
      const q = QUESTIONS[currentIndex];
      answers[q.id] = Number(sliderEl.value);
    }
  }

  nextBtn.addEventListener("click", () => {
    saveCurrentStep();

    if (currentIndex < FINAL_STEP) {
      currentIndex += 1;
      renderStep();
    } else {
      submitAnswers();
    }
  });

  backBtn.addEventListener("click", () => {
    saveCurrentStep();
    if (currentIndex > 0) {
      currentIndex -= 1;
      renderStep();
    }
  });

  // ---------------- Envio para o Telegram ----------------

  function getTopQuestionIds() {
    const values = QUESTIONS.map((q) => answers[q.id]);
    const maxValue = Math.max(...values);
    return QUESTIONS.filter((q) => answers[q.id] === maxValue).map((q) => q.id);
  }

  function buildMessage() {
    const topIds = getTopQuestionIds();
    const lines = ["📋 Novas respostas recebidas:", ""];

    QUESTIONS.forEach((q) => {
      const value = answers[q.id];
      const isTop = topIds.includes(q.id);
      const marker = isTop ? "⭐" : "•";
      const highlight = isTop ? "  <== MAIOR NOTA" : "";
      lines.push(`${marker} ${q.text} -> ${value}/10${highlight}`);
    });

    if (finalComment) {
      lines.push("");
      lines.push("💬 Comentários e sugestões:");
      lines.push(finalComment);
    }

    return lines.join("\n");
  }

  async function sendToTelegram(message) {
    const cfg = window.TELEGRAM_CONFIG;
    if (!cfg || !cfg.token || !cfg.chatId) {
      throw new Error("TELEGRAM_CONFIG não configurado (veja secrets.js)");
    }
    const url = `https://api.telegram.org/bot${cfg.token}/sendMessage`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: cfg.chatId, text: message }),
    });
    if (!res.ok) {
      throw new Error("Telegram respondeu com erro: " + res.status);
    }
    return res.json();
  }

  // ============================================================
  // 🔧🔧🔧 BLOCO DE DEBUG — REMOVA/COMENTE ANTES DE PUBLICAR 🔧🔧🔧
  // Mostra no console do navegador (F12 > Console) todas as
  // respostas, com a nota mais alta destacada, pra facilitar
  // testes. Não afeta o envio pro Telegram.
  // ============================================================
  function logAnswersForDebug() {
    const topIds = getTopQuestionIds();
    console.log("%c===== LOG DE DEBUG: RESPOSTAS =====", "color:#c1502e; font-weight:bold;");
    QUESTIONS.forEach((q) => {
      const value = answers[q.id];
      const tag = topIds.includes(q.id) ? "  ⭐ MAIOR NOTA" : "";
      console.log(`${q.text}: ${value}/10${tag}`);
    });
    console.log("Comentários e sugestões:", finalComment || "(vazio)");
    console.log("Objeto completo:", { answers, finalComment });
    console.log("%c====================================", "color:#c1502e; font-weight:bold;");
  }
  // ============================================================
  // 🔧🔧🔧 FIM DO BLOCO DE DEBUG 🔧🔧🔧
  // ============================================================

  async function submitAnswers() {
    nextBtn.disabled = true;
    nextBtn.textContent = APP_CONFIG.SENDING_LABEL;
    backBtn.hidden = true;
    progressFillEl.style.width = "100%";

    // 🔧 DEBUG — comente a linha abaixo antes de publicar o site
    logAnswersForDebug();

    try {
      await sendToTelegram(buildMessage());
      showDone(true);
    } catch (err) {
      console.error(err);
      showDone(false);
    }
  }

  // ---------------- TELA 3: Fim ----------------

  const doneTitleEl = document.getElementById("done-title");
  const doneTextEl = document.getElementById("done-text");

  function showDone(success) {
    doneTitleEl.textContent = success ? APP_CONFIG.RESULT_TITLE : "Ops!";
    doneTextEl.textContent = success ? APP_CONFIG.RESULT_TEXT : APP_CONFIG.RESULT_ERROR_TEXT;
    showScreen("done");
  }

  // ---------------- Start ----------------

  initTerminal();
})();
