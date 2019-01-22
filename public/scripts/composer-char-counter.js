$(document).ready(function() {
  console.log("Beans");
});

$( ".new-tweet textArea" ).on("input", function(event) {
  const maxLength = 140;
  let counter = $(this).siblings('.counter')[0];
  let numberOfCharacters = this.value.length;
  let numberOfCharactersLeft = counter.innerHTML = maxLength - numberOfCharacters;
  console.log(numberOfCharactersLeft); 
  
  if(numberOfCharactersLeft <= 0) {
    counter.style.color = "red"; 
    event.preventDefault();
  } else {
    counter.style.color = "black";
  }
});
