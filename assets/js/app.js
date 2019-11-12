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
        $(".displayQ").html("<div class='imgBox'><img class='glyphImg' src='assets/images/glyph/" + img + "'></div><br>" + 
                            "<div>" + pro + "</div><br>" + 
                            "<div>" + ans + "</div>");
    }

    function selectGlyph() {
        while (selectedGlyphs.length < 10) {
            let glyphNum = maya.glyph[Math.floor(Math.random() * maya.glyph.length)];
            if ($.inArray(glyphNum.oid, selectedGlyphs) === -1) {
                selectedGlyphs.push(glyphNum.oid);
                console.log(glyphNum.oid);
                console.log(selectedGlyphs);
            }
            displayQuestion(glyphNum.img, glyphNum.pro, glyphNum.ans);
        }
    }
    



    // ************************************** //
    //  - (screen 3)
    // ************************************** //


    // ************************************** //
    //  - (screen 4)
    // ************************************** //


});