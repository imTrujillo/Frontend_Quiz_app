const quizData = [
    // Datos de las preguntas del cuestionario
    {
      question: "¿Qué propiedad de CSS3 se utiliza para aplicar una sombra a un texto?",
      options: [
        "text-shadow",
        "box-shadow",
        "shadow-text",
        "font-shadow"
      ],
      correct: 0,
    },
    {
      question: "¿Qué propiedad de CSS3 permite controlar la opacidad de un elemento?",
      options: [
        "opacity",
        "visibility",
        "filter",
        "alpha",
      ],
      correct: 0,
    },
    {
      question: "¿Qué propiedad de CSS3 se utiliza para crear esquinas redondeadas en un elemento?",
      options: [
        "border-radius",
        "border-style",
        "border-curve",
        "corner-radius",
      ],
      correct: 0,
    },
    {
      question: "¿Cuál de las siguientes es una unidad de medida relativa en CSS3?",
      options: [
        "px",
        "em",
        "cm",
        "mm",
      ],
      correct: 1,
    },
    {
      question: "¿Qué propiedad CSS3 se utiliza para aplicar una transición en una animación?",
      options: [
        "animation",
        "transition",
        "transform",
        "keyframes",
      ],
      correct: 1,
    },
    {
      question: "¿Qué propiedad CSS3 se utiliza para aplicar múltiples imágenes de fondo en un elemento?",
      options: [
        "background-image",
        "background-multi",
        "background-set",
        "background-layer",
      ],
      correct: 0,
    },
    {
      question: "¿Qué propiedad CSS3 se utiliza para transformar un elemento en 3D?",
      options: [
        "transform",
        "perspective",
        "rotate",
        "translate",
      ],
      correct: 0,
    },
    {
      question: "¿Qué propiedad CSS3 permite distribuir el espacio sobrante entre elementos flexibles en un contenedor?",
      options: [
        "flex",
        "align-content",
        "justify-content",
        "space-around",
      ],
      correct: 2,
    },
    {
      question: "¿Cuál de las siguientes es una función en CSS3 utilizada para aplicar transformaciones de escala, rotación o traslación?",
      options: [
        "scale",
        "skew",
        "rotate",
        "transform",
      ],
      correct: 3,
    },
    {
      question: "¿Qué propiedad CSS3 define la repetición de una animación?",
      options: [
        "animation-duration",
        "animation-repeat",
        "animation-iteration-count",
        "animation-cycle",
      ],
      correct: 2,
    },
  ];

let currentQuestion = 0; 
let score = 0;

function loadQuestion() {
  const questionEl = document.getElementById("preguntas"); // Párrafo que tendrá la pregunta
  const options = document.querySelectorAll(".columna-respuesta"); // Opciones 
  const questionStatus = document.getElementById("estado-pregunta"); // Número de pregunta

  // Verifica si hay preguntas disponibles
  if (currentQuestion < quizData.length) {
    const questionData = quizData[currentQuestion];
    questionEl.textContent = questionData.question;

    // Limpiar opciones y eliminar la selección previa
    options.forEach((option, index) => {
      if (index < questionData.options.length) {
        option.textContent = questionData.options[index];
        option.classList.remove('selected');  // Elimina opción previamente seleccionada
        option.onclick = () => selectAnswer(index);
      } else {
        option.textContent = ""; // Limpiar opciones extra si las hay
        option.onclick = null;
      }
    });

    // Limpiar selección previa
    options.forEach(option => option.classList.remove('selected'));

    // Actualiza el estado de la pregunta
    questionStatus.textContent = `Pregunta ${currentQuestion + 1} de ${quizData.length}`;

    // Configura el botón de respuesta
    document.getElementById("btn-respuesta").dataset.selectedIndex = undefined;
    document.getElementById("btn-respuesta").onclick = () => submitAnswer();
  } else {
    showResult();
  }
}

function selectAnswer(selectedIndex) {
  const options = document.querySelectorAll(".columna-respuesta");
  options.forEach(option => option.classList.remove('selected'));  // Deseleccionar todas
  options[selectedIndex].classList.add('selected');  // Resaltar la opción seleccionada

  // Guardar el índice de la respuesta seleccionada
  document.getElementById("btn-respuesta").dataset.selectedIndex = selectedIndex;
}

function submitAnswer() {
  const selectedIndex = document.getElementById("btn-respuesta").dataset.selectedIndex;

  // Verifica si se ha seleccionado una opción
  if (selectedIndex === undefined) {
    Swal.fire({
      title: 'Selecciona una respuesta',
      text: 'Por favor, selecciona una respuesta antes de continuar.',
      icon: 'warning',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  // Verifica si la respuesta seleccionada es correcta
  if (parseInt(selectedIndex) === quizData[currentQuestion].correct) {
    score++;
  }

  // Avanza a la siguiente pregunta
  currentQuestion++;

  // Carga la siguiente pregunta o muestra el resultado si no hay más preguntas
  loadQuestion();
}

function showResult() {
  const quizContainer = document.querySelector(".container");
  quizContainer.innerHTML = `
    <h2>Resumen de resultados</h2>
    <p>Has obtenido ${score} de ${quizData.length} respuestas correctas.</p>
    <p>¡Gracias por participar!</p>
  `;
}

// Cargar la primera pregunta al iniciar
loadQuestion();
