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
  
  if (selectedIndex === undefined || selectedIndex === null || isNaN(selectedIndex)) {
    Swal.fire({
      title: 'Selección Requerida',
      text: 'Por favor, selecciona una respuesta antes de continuar.',
      icon: 'warning',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  const correctIndex = quizData[currentQuestion].correct;
  const selectedOption = options[selectedIndex];

if (selectedOption){
  // Animaciones para la respuesta seleccionada
  if (parseInt(selectedIndex) === correctIndex) {
    score++;
    options[selectedIndex].classList.add('animate__animated', 'animate__bounceIn', 'correcta');
  } else {
    options[selectedIndex].classList.add('animate__animated', 'animate__shakeX', 'incorrecta');
  }
  
    progressBar();
 
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
else{
  Swal.fire({
    title: 'Error',
    text: "Hubo un error al procesar la solicitud",
    icon: 'error',
    confirmButtonText: 'Aceptar'
  })
}
}

//funcion para crear la barra de progreso
function progressBar(){
  let bar = document.getElementById('barra');
  let currentWidth = parseInt(bar.style.width.replace('%','')) ||0 ;

    currentWidth += 10;

  if(currentWidth >= 100){
    currentWidth = 100;
    bar.classList.add('barra-final');
  }

  bar.style.width = currentWidth + '%';
}


// Función para mostrar el resultado final
function showResult() {
  resultEl.innerHTML = `

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <!-- Bootstrap -->
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
      crossorigin="anonymous"
    />
    <!-- google font -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="../../../css/style.css"/>
  </head>
  <body>
    <section class="container row center">
      <nav class="nav-bar p-5">
        <i class="fa-solid fa-sun"></i>
        <i class="fa-solid fa-toggle-on"></i>
        <i class="fa-regular fa-moon"></i>
      </nav>
      
          <div class="col-lg-6 media-title">
            <p class="titulo">
              Felicidades
              <span><br />Has completado el cuestionario con: </span>
            </p>
          </div>
          <div class="col temas text-center">
              <div class="col-11 col text-center align-items-center h-auto" >
                <div class="score" style="font-size: 9rem;" id="preguntas">${score}</div>
                <p class="titulo-sub">respuestas buenas de ${quizData.length}.</p>
              </div>
              <button class="col col" id="btn-respuesta" onclick="location.reload()">Jugar de nuevo</button>
               <a href="../../../index.html"><button class="col col" id="btn-respuesta"> Volver al inicio</button> </a> 
            </div>
          </div>
        </section>
    
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://kit.fontawesome.com/7b866cf1b9.js"
      crossorigin="anonymous"
    ></script>
  </body>
</html>
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
