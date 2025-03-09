// Load patients from data.json for the add-sickness page
function loadPatients() {
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      const select = document.getElementById('patient_id');
      // Sort patients by student_id
      data.patients.sort((a, b) => a.student_id.localeCompare(b.student_id));
      data.patients.forEach(patient => {
        const option = document.createElement('option');
        option.value = patient.patient_id;
        option.text = `${patient.student_id} - ${patient.name} ${patient.surname}`;
        select.appendChild(option);
      });
      // (Optional) Initialize a searchable dropdown if using a library like Select2
    })
    .catch(err => console.error("Error loading patients:", err));
}

// Setup Speech Recognition for an input field (for Thai language)
function setupSpeechRecognition(buttonId, inputId) {
  const btn = document.getElementById(buttonId);
  const input = document.getElementById(inputId);
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return;
  const recognition = new SpeechRecognition();
  recognition.lang = 'th-TH';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  
  btn.addEventListener("mousedown", e => {
    e.preventDefault();
    input.focus();
    recognition.start();
    btn.style.color = "#d9534f";
  });
  btn.addEventListener("mouseup", e => {
    e.preventDefault();
    recognition.stop();
    btn.style.color = "#2c3e50";
  });
  btn.addEventListener("mouseleave", e => {
    e.preventDefault();
    recognition.stop();
    btn.style.color = "#2c3e50";
  });
  recognition.addEventListener("result", event => {
    const transcript = event.results[0][0].transcript;
    // Append recognized text without deleting existing content
    input.value = (input.value + " " + transcript).trim();
  });
  recognition.addEventListener("error", event => {
    console.error("Speech recognition error: " + event.error);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('patient_id')) {
    loadPatients();
  }
  // Setup speech recognition for sickness, treatment, and referral fields if they exist.
  if (document.getElementById('micBtnSickness') && document.getElementById('sickness')) {
    setupSpeechRecognition("micBtnSickness", "sickness");
  }
  if (document.getElementById('micBtnTreatment') && document.getElementById('treatment')) {
    setupSpeechRecognition("micBtnTreatment", "treatment");
  }
  if (document.getElementById('micBtnReferral') && document.getElementById('referral')) {
    setupSpeechRecognition("micBtnReferral", "referral");
  }
});