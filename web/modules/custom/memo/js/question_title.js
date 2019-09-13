(function($){
  console.log("dans question_title.js");
  // récupération et affichage du paramètre passé par memo.module
  console.log(drupalSettings.memo.questiontitle.parametre);

  //Au changement de question, on change le titre
  $("#edit-field-carte-question-0-value").change(function(){
    $("#edit-title-0-value").val($(this).val());
  });
})(jQuery);