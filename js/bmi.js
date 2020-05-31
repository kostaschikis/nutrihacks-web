function calcBMI() {
  var weight = document.bmiform.pounds.value 
  var height = document.bmiform.inches.value;
  document.bmiform.bmi.value = parseInt((weight * 703) / (height * height));
} 