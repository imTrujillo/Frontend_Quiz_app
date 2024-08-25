const quizData = [
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

// Obtener los elementos del HTML
const questionEl = document.getElementById("preguntas");
const options = document.querySelectorAll(".columna-respuesta");
const questionStatus = document.getElementById("estado-pregunta");
const submitBtn = document.getElementById("btn-respuesta");
const resultEl = document.querySelector(".container");

// Función para cargar la pregunta actual
function loadQuestion() {
  const questionData = quizData[currentQuestion];
  questionEl.textContent = questionData.question;

  // Actualizar las opciones de respuesta
  options.forEach((option, index) => {
    if (index < questionData.options.length) {
      option.textContent = questionData.options[index];
      option.classList.remove('selected');
      option.onclick = () => selectAnswer(index);
    } else {
      option.textContent = "";
      option.onclick = null;
    }
  });

  questionStatus.textContent = `Pregunta ${currentQuestion + 1} de ${quizData.length}`;
  submitBtn.dataset.selectedIndex = undefined;
}

// Función para manejar la selección de una respuesta
function selectAnswer(selectedIndex) {
  options.forEach(option => option.classList.remove('selected'));
  options[selectedIndex].classList.add('selected');
  submitBtn.dataset.selectedIndex = selectedIndex;
}

// Función para verificar la respuesta y avanzar a la siguiente pregunta
function submitAnswer() {
  const selectedIndex = submitBtn.dataset.selectedIndex;
  
  if (selectedIndex === undefined){
    Swal.fire({
      title: 'Selección Requerida',
      text: 'Por favor, selecciona una respuesta antes de continuar.',
      icon: 'warning',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  const correctIndex = quizData[currentQuestion].correct;

  // Animaciones para la respuesta seleccionada
  if (parseInt(selectedIndex) === correctIndex) {
    score++;
    options[selectedIndex].classList.add('animate__animated', 'animate__bounceIn', 'correcta');
  } else {
    options[selectedIndex].classList.add('animate__animated', 'animate__shakeX', 'incorrecta');
  }
 
  setTimeout(() => {
    currentQuestion++;
    // Limpiar las animaciones y selección previa
    options.forEach(option => {
      option.classList.remove('animate__animated', 'animate__bounceIn', 'animate__shakeX', 'correcta', 'incorrecta');
    });

    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }, 2000); // Esperar 2 segundos para la animación
}

// Función para mostrar el resultado final
function showResult() {
  resultEl.innerHTML = `
    <h2>Resumen de resultados</h2>
    <p>Has obtenido ${score} de ${quizData.length} respuestas correctas.</p>
    <p>¡Gracias por participar!</p>
  `;
}

// Agregar eventos a las opciones y al botón
options.forEach(option => {
  option.addEventListener('click', (event) => selectAnswer(Array.from(options).indexOf(event.target)));
});
submitBtn.addEventListener('click', submitAnswer);

// Cargar la primera pregunta al iniciar
loadQuestion();

// Estilos dinámicos
const style = document.createElement('style');
style.innerHTML = `
.selected { border: 2px solid white; }
.correcta { border: 2px solid green; }
.incorrecta { border: 2px solid red; }
`;
document.head.appendChild(style);
