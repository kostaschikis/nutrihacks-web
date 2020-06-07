$(function() {
  // DOM Elements
  var result = $('#bmi-result');
  var designetion = $('#bmi-des');

  // When user submits the form (clicks the 'calculate' button)
  $('#bmiForm').submit(function(e) {

    // 1. Prevent reloading the page
    e.preventDefault();

    // 2. Get form inputs & radio values
    var weight = $('#weight-kg').val();
    var height = $('#height-cm').val();
    var genderField = $('input[name="gender"]');

    // 3. Find the selected gender
    // -- If the user didn't select a gender alert a message and exit the callback
    if (genderField[0].checked == false && genderField[1].checked == false) {
      alert('Please select your gender');
      return;
    } 
    let gender = (genderField[0].checked) ? 'male' : 'female';

    // 4. Calculate BMI
    let bmi = calcBMI(weight, height);

    // 5. Find Weight Designation
    let des = findDes(parseFloat(bmi), gender);

    // 6. Display bmi in HTML
    result.text(bmi);

    // 7. Display designation in HTML and apply the right color to the text
    designetion.text(des.text);
    // -- Unmute the text 
    designetion.removeClass('text-muted');
    // -- Aplly the color
    designetion.css('color', des.color);

    // 8. If client is on mobile device -> scroll result into view 
    if (document.documentElement.clientWidth < 768) {
      // The scroll will be smooth & the result will be at the center of the screen
      document.getElementById('bmi-result').scrollIntoView({behavior: "smooth", block: "center"});
    }
  })
})

// Calculates BMI 
function calcBMI(weight, height) {
  if (weight > 0 && height > 0) {
    // (weight / height^2) x 10000 with 1 decimal point 
    return parseFloat((weight / Math.pow(height, 2)) * 10000).toFixed(1);
  } else return 0
} 

// Finds weight designation based on BMI and gender     
// Returns an object with the text to display & the appropriate color to match the designation
function findDes(bmi, gender) {
  if (gender === 'male') {
    if (bmi < 18.5) {
      return {text: 'Underweight', color: '#147895'};
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      return {text: 'Normal', color: '#4DB752'};
    } else if (bmi >= 25 && bmi <= 29.9) {
      return {text: 'Overweight', color: '#E4512B'};
    } else if (bmi >= 30 && bmi <= 40) {
      return {text: 'Obese', color: '#FC3865'};
    } else if (bmi > 40) {
      return {text: 'Morbidly obese', color: '#FC3865'};
    }
  } else if (gender === 'female') {
    if (bmi < 18.5) {
      return {text: 'Underweight', color: '#147895'};
    } else if (bmi >= 18.5 && bmi <= 23.5) {
      return {text: 'Normal', color: '#4DB752'};
    } else if (bmi >= 23.6 && bmi <= 28.6) {
      return {text: 'Overweight', color: '#E4512B'};
    } else if (bmi >= 28.7 && bmi <= 40) {
      return {text: 'Obese', color: '#FC3865'};
    } else if (bmi > 40) {
      return {text: 'Morbidly obese', color: '#DA0000'};
    }
  } else return null;
}