$(document).ready(function () {

    // *************************************** //
    // global var setup
    // *************************************** //
    // stores selected glyphs so the same rendom one is not selected twice
    let selectedGlyphs = [];


    // ************************************** //
    // instructions / start game - (screen 1)
    // ************************************** //
    $(".startButton").on("click", function () {
        // play sound
        $("#tap")[0].play();
        // add / remove classes
        $(".screen_1").addClass("hidden");
        $(".screen_2").removeClass("hidden");
        // load screen 2 question
        selectGlyph();
    });

    // ************************************** //
    //  - (screen 2)
    // ************************************** //
    function displayQuestion(img, pro, ans) {
        // randomized order of output
        let randOutput = [];
        while (randOutput.length < 4) {
            let current = ans[Math.floor(Math.random() * 4)];
            if ($.inArray(current.a, randOutput) === -1) {
                randOutput.push(current.a);
            }
        }
        console.log(randOutput);
        console.log(selectedGlyphs);
        // output to screen
        $(".displayQ").html("<div class='imgBox'><img class='glyphImg' src='assets/images/glyph/" + 
                            img + "'></div>" + 
                            "<div class='textCenter'><span id='pro'>pron: (" + pro + ")</span></div><br>" + 
                            "<div class='flexbox'>" + 
                            "<div class='optionButton'>" + randOutput[0] + "</div>" +
                            "<div class='optionButton'>" + randOutput[1] + "</div>" +
                            "<div class='optionButton'>" + randOutput[2] + "</div>" +
                            "<div class='optionButton'>" + randOutput[3] + "</div>" +
                            "</div>"
                            );
    }

    function selectGlyph() {
            let glyphNum = maya.glyph[Math.floor(Math.random() * maya.glyph.length)];
            if ($.inArray(glyphNum.oid, selectedGlyphs) === -1) {
                selectedGlyphs.push(glyphNum.oid);
                //console.log(glyphNum.oid);
                //console.log(selectedGlyphs);
            }
            displayQuestion(glyphNum.img, glyphNum.pro, glyphNum.ans);
            // listen for option click
            $(".optionButton").click(function(event) {
                let theChosen = $(this).html();
                console.log(theChosen);
                // eval of ans - true/false
                if (theChosen === glyphNum.ans[0].a) {
                  console.log(glyphNum.ans[0].isTrue);
                } else {
                    console.log("not a match");
                }
            });
    }


    



    // ************************************** //
    //  - (screen 3)
    // ************************************** //


    // ************************************** //
    //  - (screen 4)
    // ************************************** //


});