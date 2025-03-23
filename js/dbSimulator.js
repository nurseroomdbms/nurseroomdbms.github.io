// js/dbSimulator.js
async function loadJSON(file) {
  const response = await fetch(file);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}
