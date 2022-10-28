$(document).ready(function () {
  
  

  $("#container1").on("click", "#btneliminarPokemon", function () {
    alerta();

   
  });

  $("#container2").on("click", "#btneliminarReg", function () {
    alerta2() 

   
  });

  $("#container3").on("click", "#btneliminarTip", function () {
    alerta3()
   
  });

  function alerta() {
    if (confirm('Estas seguro de que deseas eliminar el dato?')) {
      $("button").attr({
        "type": "submit"
      });
     
    } else {
      
      $("button").attr({
        "type": "button"
      });
    }
  }
    
  function alerta2() {
    if (confirm('Estas seguro de que deseas eliminar el dato?')) {
      $("button").attr({
        "type": "submit"
      });
     
    } else {
      
      $("button").attr({
        "type": "button"
      });
    }
  }

  function alerta3() {
    if (confirm('Estas seguro de que deseas eliminar el dato?')) {
      $("button").attr({
        "type": "submit"
      });
     
    } else {
      
      $("button").attr({
        "type": "button"
      });
    }
  }
    




});

