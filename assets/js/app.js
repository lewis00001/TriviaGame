$(document).ready(function () {

    // *************************************** //
    // global var setup
    // *************************************** //
    // stores selected glyphs so the same rendom 
    // one is not selected twice
    let selectedGlyphs = [];
    // end condition triggers
    let outOfTime = false;
    let ansIncorrect = false;
    let ansCorrect = false;
    // active correct answer
    let activeAns;

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
    // question handling - (screen 2)
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
            "<div class='textCenter'><span id='pro'>pron: (" + pro + ")</span></div>" +
            "<div id='timerBox'><div id='timerBar'></div></div><br>" +
            "<div class='flexbox'>" +
            "<div class='optionButton'>" + randOutput[0] + "</div>" +
            "<div class='optionButton'>" + randOutput[1] + "</div>" +
            "<div class='optionButton'>" + randOutput[2] + "</div>" +
            "<div class='optionButton'>" + randOutput[3] + "</div>" +
            "</div>"
        );

        // calls questionTimer
        questionTimer();
    }

    function selectGlyph() {
        // selects a random glyph object
        let glyphNum = maya.glyph[Math.floor(Math.random() * maya.glyph.length)];
        // ensure glyph obj has not already been used
        if ($.inArray(glyphNum.oid, selectedGlyphs) === -1) {
            selectedGlyphs.push(glyphNum.oid);
        }

        // updates active correct answer
        activeAns = glyphNum.ans[0].a;
        console.log("active answer set to: " + activeAns);

        // calls displayQuestion()
        displayQuestion(glyphNum.img, glyphNum.pro, glyphNum.ans);

        // listen for option click
        $(".optionButton").click(function (event) {
            let theChosen = $(this).html();
            console.log(theChosen);
            // eval of ans - true/false
            if (theChosen === glyphNum.ans[0].a) {
                console.log(glyphNum.ans[0].isTrue);
            }
        });
    }

    // questionTimer display
    function questionTimer() {
        let width = 100;
        let durration = 5; // time in seconds
        let countDown = setInterval(update, durration * 10);
        // make updates
        function update() {
            // checks for out of time
            if (width === 0) {
                outOfTime = true;
                clearInterval(countDown);
                endCondition_outOfTime();
            // if not out of time, reduce time
            } else if (width > 0) {
                $("#timerBar").css({
                    "width": width + "%"
                });
                width--;
            }
        };
    }

    // end conditions -----------------//
    // out of time
    function endCondition_outOfTime() {
        if (outOfTime) {
            console.log("You ran out of time");
            $(".modal").addClass("bg-modal");
            $(".modal-content").append("<div class='modal-heading'>Out of Time</div>" +
                                    "<div class='details-modal'>The correct answer was:</div>" + 
                                    "<div class='details-modal-bold'>" + activeAns + "</div>");
        }
    }
    // answer incorrect
    function endCondition_ansIncorrect() {

    }
    // answer correct
    function endCondition_ansCorrect() {

    }
    // game over
    function endCondition_gameOver() {

    }


    // ************************************** //
    //  - (screen 3)
    // ************************************** //


    // ************************************** //
    //  - (screen 4)
    // ************************************** //


});