$(document).ready(function() {
  $("#keyboard-upper-container div:nth-child(2)").addClass("hide");
  $("#keyboard-upper-container div:nth-child(3)").addClass("hide");
  $("#keyboard-upper-container div:nth-child(4)").addClass("hide");
  let isShiftPressed = false;
  let startDate = new Date();
  let startTime = startDate.getMinutes();
  let sentenceNumber = 0;
  let characterNumber = 0;
  let sentences = [
    "ten ate neite ate nee enet ite ate inet ent eate",
    "Too ato too nOt enot one totA not anot tOO aNot",
    "oat itain oat tain nate eate tea anne inant nean",
    "itant eate anot eat nato inate eat anot tain eat",
    "nee ene ate ite tent tiet ent ine ene ete ene ate"
  ];
  $("#sentence").append(sentences[sentenceNumber]);
  $("#target-letter").append(sentences[sentenceNumber][characterNumber]);
  let wrong = 0,
    correct = 0;
  $("body").on("keydown", function(event) {
    if (event.which == 16) {
      $("#keyboard-upper-container div:nth-child(2)").removeClass("hide");
      $("#keyboard-upper-container div:nth-child(3)").removeClass("hide");
      $("#keyboard-upper-container div:nth-child(4)").removeClass("hide");
      $("#keyboard-lower-container div:nth-child(2)").addClass("hide");
      $("#keyboard-lower-container div:nth-child(3)").addClass("hide");
      $("#keyboard-lower-container div:nth-child(4)").addClass("hide");
      isShiftPressed = true;
    } else {
      let key = event.which;
      if (key >= 65 && key <= 90 && !isShiftPressed) {
        key += 32;
      }
      $(`#${key}`).addClass("highlight");
      let reqd = sentences[sentenceNumber].charCodeAt(characterNumber);
      if (reqd == key) {
        correct++;
        $("#yellow-block").css("margin-left", `${15 * characterNumber}px`);
        $("#feedback").empty();
        $("#feedback").append(
          '<span class="glyphicon glyphicon-ok" style="color:green"></span>'
        );
        characterNumber++;
        if (characterNumber == sentences[sentenceNumber].length) {
          let endDate = new Date();
          let endTime = endDate.getMinutes();
          let diff = endTime - startTime;
          sentenceNumber++;
          characterNumber = 0;
          console.log(sentenceNumber);
          if (sentenceNumber < 5) {
            $("#sentence").empty();
            $("#sentence").append(sentences[sentenceNumber]);
          } else {
            console.log(sentenceNumber);
            $div = $("<div></div>");
            $div.append(
              `<h3>Your score is ${54 / diff - 2 * wrong} words per minute</h3>`
            );
            $("#target").after($div);
            $div.append(`<p>Click Button below to restart</p>`);
            $btn = $("<button>Restart</button>");
            $div.append($btn);
            $btn.click(function() {});
            return;
          }
        }
        $("#target-letter").empty();
        $("#target-letter").append(sentences[sentenceNumber][characterNumber]);
      } else {
        wrong++;
        $("#feedback").empty();
        $("#feedback").append(
          '<span class="glyphicon glyphicon-remove" style="color:red"></span>'
        );
      }
    }
  });
  $("body").on("keyup", function(event) {
    if (event.which == 16) {
      $("#keyboard-upper-container div:nth-child(2)").addClass("hide");
      $("#keyboard-upper-container div:nth-child(3)").addClass("hide");
      $("#keyboard-upper-container div:nth-child(4)").addClass("hide");
      $("#keyboard-lower-container div:nth-child(2)").removeClass("hide");
      $("#keyboard-lower-container div:nth-child(3)").removeClass("hide");
      $("#keyboard-lower-container div:nth-child(4)").removeClass("hide");
      isShiftPressed = false;
    } else {
      let key = event.which;
      if (key >= 65 && key <= 90 && !isShiftPressed) {
        key += 32;
      }
      $(`#${key}`).removeClass("highlight");
    }
  });
});
