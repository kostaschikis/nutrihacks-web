$(function() {
  // DOM Elements
  var weight = $('#weight-kg');
  var height = $('#height-cm');
  var genderField = $('input[name="gender"]');
  var result = $('#bmi-result');
  var designetion = $('#bmi-des');

  // When user clicks the 'calculate' button
  $('#calc').click(function(e) {
    // 1. Prevent reloading the page
    e.preventDefault();

    // 2. Find the selected gender
    let gender = (genderField[0].checked) ? 'male' : 'female';

    // 2. Calculate BMI
    let bmi = calcBMI(weight.val(), height.val());

    // 3. Find Weight Designation
    let des = findDes(bmi, gender);

    // 4. Display bmi in HTML
    result.text(bmi);

    // 5. Display designation in HTML (with the right color)
    designetion.text(des.text);
    designetion.removeClass('text-muted');
    designetion.css('color', des.color);
  })
})

// Calculates BMI and returns it as a string with 1 decimal
function calcBMI(weight, height) {
  if (weight > 0 && height > 0) {
    return parseFloat((weight / Math.pow(height, 2)) * 10000).toFixed(1);
  } else return 0
} 

// Finds weight designation based on BMI
function findDes(bmi, gender) {
  bmi = parseFloat(bmi);

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
      return {text: 'Morbidly obese', color: '#FC3865'};
    }
  } else return null;
}