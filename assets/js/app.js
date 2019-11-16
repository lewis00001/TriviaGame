$(document).ready(function () {

    // *************************************** //
    // global var setup
    // *************************************** //
    // game controls
    let secondsPerQuestion  = 15;
    let secondsPerModal     = 3.5;
    let numQuestionsPerGame = 8;
    // stores selected glyphs so the same random 
    // one is not selected twice
    let selectedGlyphs = [];
    // active correct answer
    let activeAns = "";
    // stats
    let outOfTime_count = 0;
    let ansIncorrect_count = 0;
    let ansCorrect_count = 0;
    // sets a global var for setInterval so it can
    // cleared by any function
    let countDown;

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
    function selectGlyph() {
        // selects a random glyph object
        let glyphNum = maya.glyph[Math.floor(Math.random() * maya.glyph.length)];
        // ensure glyph obj has not already been used
        if ($.inArray(glyphNum.oid, selectedGlyphs) === -1) {
            selectedGlyphs.push(glyphNum.oid);
            // updates active correct answer
            activeAns = glyphNum.ans[0].a;
            // 8888888888888888888888888888888888888888888888
            console.log("active answer set to: " + activeAns);
            // calls displayQuestion()
            displayQuestion(glyphNum.img, glyphNum.pro, glyphNum.ans);
        } else {
            // recursive action
            selectGlyph();
        }
    }

    function displayQuestion(img, pro, ans) {
        // randomized order of output
        let randOutput = [];
        while (randOutput.length < 4) {
            let current = ans[Math.floor(Math.random() * 4)];
            if ($.inArray(current.a, randOutput) === -1) {
                randOutput.push(current.a);
            }
        }

        // 8888888888888888888888888888888888888888888888
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

    // questionTimer display
    function questionTimer() {
        let width = 100;
        countDown = setInterval(update, secondsPerQuestion * 16.6667); // (16.6667 mSec is ~1 sec)
        // make updates
        function update() {
            // checks for out of time
            if (width === 0) {
                clearInterval(countDown);
                endCondition_outOfTime();
                // if not out of time, reduce time
            } else if (width > 0) {
                $("#timerBar").css({
                    "width": width + "%"
                });
                width--;
            }
        }
    }

    // continue game if question limit not reached
    function continueGame() {
        // clear modal
        $(".modal").removeClass("bg-modal");
        $(".modal-inner").removeClass("modal-content").html("");
        // has endgame condition been reached
        if (selectedGlyphs.length === numQuestionsPerGame) {
            endCondition_gameOver()
        } else {
            selectGlyph();
        }
    }

    // listen for option click - call end condition 
    $(document).on("click", ".optionButton", function (event) {
        let theChosen = $(this).html();
        // eval of ans - true/false
        if (theChosen === activeAns) {
            clearInterval(countDown);
            endCondition_ansCorrect();
        } else {
            clearInterval(countDown);
            endCondition_ansIncorrect();
        }
    });

    // modal for end conditions
    function callModal(hText, details) {
        // show modal
        $(".modal").addClass("bg-modal");
        $(".modal-inner").addClass("modal-content");
        // add content to modal
        $(".modal-content").html("<div class='modal-heading'>" + hText + "</div>" +
            "<div class='details-modal'>" + details + "</div>" +
            "<div class='details-modal-bold'>" + activeAns + "</div>"
        );
        setTimeout(continueGame, secondsPerModal * 16.6667); // (16.6667 mSec is ~1 sec)
    }

    // end conditions -----------------//
    // out of time
    function endCondition_outOfTime() {
        outOfTime_count++;
        let headingText = "Out of Time";
        let giveDetails = "The correct answer was:";
        callModal(headingText, giveDetails);
    }
    // answer incorrect
    function endCondition_ansIncorrect() {
        ansIncorrect_count++;
        let headingText = "Answer Incorrect";
        let giveDetails = "The correct answer was:";
        callModal(headingText, giveDetails);
    }
    // answer correct
    function endCondition_ansCorrect() {
        ansCorrect_count++;
        let headingText = "Correct Answer!";
        let giveDetails = "The answer is: ";
        callModal(headingText, giveDetails);
    }

    // ************************************** //
    // end of game stats - (screen 3)
    // ************************************** //
    // game over
    function endCondition_gameOver() {
        // add / remove classes
        $(".screen_2").addClass("hidden");
        $(".screen_3").removeClass("hidden");
        // add content / stats to end screen
        $("#endStats").html("<div class='details-stat-bold'>Here's how you did:</div>" +
            "<div class='details-stat'>Answered Correctly:<span class='float-right'>" +
            ansCorrect_count + "</span></div>" +
            "<div class='details-stat'>Answered Incorrectly:<span class='float-right'>" +
            ansIncorrect_count + "</span></div>" +
            "<div class='details-stat'>Out of Time:<span class='float-right'>" +
            outOfTime_count + "</span></div>"
        );
    }
});