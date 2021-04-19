var expFeedback = [];

var ansFeedback = [];

var evalFeedback = [];

var startFeedback = [];

var endFeedback = [];

var userDiff = [];

$(document).ready(function () {
    var condition = localStorage.getItem("condition");
    var today = new Date();
    localStorage.taskStart = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    //#TODO: change this
    localStorage.id = "pilot1"


    if (localStorage.getItem("isPredictionTask") == "false") {
        if (condition == "3") /* This is no explanations */{
            d3.select("#segment").style("visibility", "hidden");
            d3.select("#explanation-box")
                .style("visibility", "hidden");
            d3.select("#component-score-div")
                .style("visibility", "hidden");
            d3.select("#evaluation-question")
                .style("display", "none");
            d3.select("#evaluation")
                .style("display", "none");
        }
        else if (condition == "4") /* This is when video segments are not shown!*/
            d3.select("#segment").style("visibility", "hidden");
        else if (condition == "5") /* This is when component explanations are not shown!*/ {
            d3.select("#explanation-box")
                .style("visibility", "hidden");
            d3.select("#component-score-div")
                .style("visibility", "hidden");
        }
        else if (condition == "6") /* Literally no AI*/{
            d3.select("#segment").style("visibility", "hidden");
            d3.select("#explanation-box")
                .style("visibility", "hidden");
            d3.select("#component-score-div")
                .style("visibility", "hidden");
            d3.select("#evaluation-question")
                .style("display", "none");
            d3.select("#evaluation")
                .style("display", "none");
            d3.select("#segment").style("visibility", "hidden");
            d3.select("#explanation-box")
                .style("visibility", "hidden");
            d3.select("#component-score-div")
                .style("visibility", "hidden");
        }
    }
});

// This js is used to load the video and associated data
(function scopeFunction() {

    var listOfVideos = [];

    var currentVideoData = [];



    var startTime;

    var currentVideo = {},
        nextVideoIndex = 0,
        nextQueryIndex = 0;

    var isFirstVideo = true;

    var adChanged = 0;
    var eChanged = 0;
    var spChanged = 0;
    var epChanged = 0;

    localStorage.setItem('groupCond', 1)
    groupCond = localStorage.getItem('groupCond')
    if (groupCond == "1") {
      var file = 'assets/data/video_list_1.json';
    }
    else if (groupCond == "2") {
      var file = 'assets/data/video_list_2.json';
    }
    else if (groupCond == "3") {
      var file = 'assets/data/video_list_3.json';
    }
    else {
      var file = 'assets/data/video_list_1.json';
    }
    console.log("groupCond: " + groupCond)
    // var file = 'assets/data/video_list_main_new.json';
    // var file = 'assets/data/video_list_main Original.json';
    d3.json(file, function(error, data) {
        if (error)
            console.log(error);

        var videos;
        // To know which set of videos to load
        if (localStorage.getItem("isPredictionTask") == "false")
            videos = data.reviewTask;
        else
            videos = data.predictionTask;

        for (var i = 0; i < videos.length; i++) {
            listOfVideos.push(videos[i]);
        }

        // This is to randomize the videos for each participant!
        // listOfVideos = shuffle(listOfVideos);

        loadVideo();
    });

    this.adChange0 = function () {
      adChanged = 1;
      localStorage.setItem('adVal', 0);
      console.log(localStorage.getItem('adVal'));
      radioChange();
    };

    this.adChange1 = function () {
      adChanged = 1;
      localStorage.setItem('adVal', 1);
      console.log(localStorage.getItem('adVal'));
      radioChange();
    };

    this.eChangem2 = function () {
      eChanged = 1;
      localStorage.setItem('eVal', -2);
      console.log(localStorage.getItem('eVal'));
      radioChange();
    };

    this.eChangem1 = function () {
      eChanged = 1;
      localStorage.setItem('eVal', -1);
      console.log(localStorage.getItem('eVal'));
      radioChange();
    };

    this.eChange0 = function () {
      eChanged = 1;
      localStorage.setItem('eVal', 0);
      console.log(localStorage.getItem('eVal'));
      radioChange();
    };

    this.eChange1 = function () {
      eChanged = 1;
      localStorage.setItem('eVal', 1);
      console.log(localStorage.getItem('eVal'));
      radioChange();
    };

    this.eChange2 = function () {
      eChanged = 1;
      localStorage.setItem('eVal', 2);
      console.log(localStorage.getItem('eVal'));
      radioChange();
    };

    this.spChangem1 = function () {
      localStorage.setItem('spVal', -1);
      console.log(localStorage.getItem('spVal'));
      spChanged = 1
      radioChange();
    };

    this.spChange0 = function () {
      spChanged = 1
      localStorage.setItem('spVal', 0);
      console.log(localStorage.getItem('spVal'));
      radioChange();
    };

    this.spChange1 = function () {
      spChanged = 1
      localStorage.setItem('spVal', 1);
      console.log(localStorage.getItem('spVal'));
      radioChange();
    };

    this.epChangem1 = function () {
      epChanged = 1;
      localStorage.setItem('epVal', -1);
      console.log(localStorage.getItem('epVal'));
      radioChange();
    };

    this.epChange0 = function () {
      epChanged = 1;
      localStorage.setItem('epVal', 0);
      console.log(localStorage.getItem('epVal'));
      radioChange();
    };

    this.epChange1 = function () {
      epChanged = 1;
      localStorage.setItem('epVal', 1);
      console.log(localStorage.getItem('epVal'));
      radioChange();
    };

    this.radioChange = function () {
      console.log("A: " + adChanged + ", B: " + eChanged + ", C: " + spChanged + ", D: " + epChanged)
        if (adChanged && eChanged && spChanged && epChanged) {
            d3.select("#submit").classed("disabled", false);
        }
    };

    function loadVideo() {
        var vid = document.getElementById("media-video");
        if (!isFirstVideo)
            document.getElementById("modal-btn").click();

        currentVideo = listOfVideos[nextVideoIndex++];
        nextQueryIndex = 0;
        console.log("changed the video! " + currentVideo.videoName);
        var sourceVideo = 'assets/videos/' + currentVideo.videoName;
        vid.src = sourceVideo;
        vid.load();
        isFirstVideo = false;
    }

    this.onVideoLoaded = function() {
        document.getElementById("media-video").currentTime = 0;
        // This should be a different file for bad explanations!
        // if (localStorage.getItem("condition") == "2")
        //     file = 'assets/data/video_new_bad.json';
        // else
        //     file = 'assets/data/video_new_good.json';
        // file = 'assets/data/video_new_good.json';
        file = 'assets/data/explanations.json';
        d3.json(file, function(error, data){
            if (error)
                console.log(error);
            for (var i = 0; i<data.length; i++){
                console.log(data[i])
                if (data[i].videoName == currentVideo.videoName) {
                    currentVideoData = data[i].listOfQuestions;
                    console.log("here")
                    // shuffle the list of questions for each each video.
                    // currentVideoData = shuffle(currentVideoData);

                    break;
                }
            }
            // if (!isPredictionTask)
            if (localStorage.getItem("isPredictionTask") == "false")
                loadQuestion();
            else
                loadQuestionPrediction();
        });
        d3.select("#submit").classed("disabled", true);
    }

    function loadQuestion() {
        var currentQuestion =  currentVideoData[nextQueryIndex++];
        console.log(currentVideoData);
    //    1 . show the question and respond on the page. (D3)
        showQuery(currentQuestion);
        showResponse(currentQuestion);
    //    2 . show the explanations
        showExplanations(currentQuestion);
    //    3. record current time
        startTime = new Date().getTime();
        // console.log("this is the time " + startTime);
    }

    function loadQuestionPrediction() {
        var currentQuestion =  currentVideoData[nextQueryIndex++];
        showQuery(currentQuestion);
        startTime = new Date().getTime();
    }

    this.loadNextQuery = function () {
        // Log the Click for current task
        var clickLocation = (localStorage.getItem("isPredictionTask")) == "false"?"performanceTask":"predictionTask";
        createClickLog("nxtQ", clickLocation);

        // Record the answers
        var el = document.getElementById('combination-ul');
        userOrder = el.getElementsByTagName("li");
        orderIDs = makeIDList(userOrder);
        expFeedback.push(orderIDs)
        expFeedback.push("|")

        var agreeDisagree = localStorage.getItem('adVal');
        ansFeedback.push(agreeDisagree)

        var evaluation = localStorage.getItem('eVal');
        evalFeedback.push(evaluation)

        var startEval = localStorage.getItem('spVal');
        startFeedback.push(startEval);

        var endEval = localStorage.getItem('epVal');
        endFeedback.push(endEval);

        console.log(ansFeedback + ":" + evalFeedback + ":" + startFeedback + ":" + endFeedback)


        thisString = ""
        for (i=0; i<orderIDs.length; i++) {
          thisString = thisString + orderIDs[i]
          if (i < orderIDs.length - 1) {
            thisString = thisString + ","
          }
        }

        console.log(localStorage.getItem("originalOrder"))
        console.log(thisString)

        if (localStorage.getItem("originalOrder") == thisString) {
          userDiff.push(0)
        }
        else {
          userDiff.push(1)
        }
        console.log(userDiff)

        console.log(expFeedback)
        console.log(ansFeedback)
        console.log(evalFeedback)
        console.log(startFeedback)
        console.log(endFeedback)

        // Make sure the video Progress bar is zero (basically for tasks without segment explanations
        document.getElementById("media-video").currentTime = 0;

        if (nextQueryIndex == currentVideo.queryCount) {

            if ((nextVideoIndex == listOfVideos.length) && localStorage.getItem("isPredictionTask") == "false") {
                localStorage.setItem("isPredictionTask", "true");

                //save the answers and go to the next task (either questionnaire or prediction task
                this.loadTaskAfterReview();
            }
            else if ((nextVideoIndex == listOfVideos.length) && localStorage.getItem("isPredictionTask") == "true"){
                // 1. Open the modal to say thanks all videos are done.

                // 2. go to the post-study questionnaire
                // console.log("study is done!");
                loadTaskAfterPrediction();
                return;
            }
            else {
                loadVideo();
            }
        }

        else {
            if (localStorage.getItem("isPredictionTask") == "false")
                loadQuestion();
            else
                loadQuestionPrediction();
        }
        uncheckAll();
        console.log("here")
        d3.select("#submit").classed("disabled", true);
        // toggleDisabilityRadioButtons();
    };

    this.submitAndShowCorrectAnswer = function () {
        d3.select("#correct-answer")
            // .style("visibility", "visible");
            .classed ("correct-answer-visible", true)
            .classed ("correct-answer-hidden", false);
        d3.select("#correct-answer-header")
        // .style("visibility", "visible");
            .classed ("correct-answer-visible", true)
            .classed ("correct-answer-hidden", false);

        // So to avoid misunderstanding of the user when they select confirmed the selection.
        // I want the user to not be able to change their respond in order to compare their answer with the correct answer.

        // toggleDisabilityRadioButtons();

        var agreeDisagree = getValueOfSelected("#agree-disagree");
        var evaluation = getValueOfSelected("#evaluation");
        // console.log(currentVideoData[nextQueryIndex-1]);
        var respondObject = {};
            respondObject.vid = currentVideo.videoName;
            respondObject.qid = currentVideoData[nextQueryIndex-1].questionId;
            respondObject.yesNo = agreeDisagree;
            respondObject.eval = evaluation;
        recordResults (respondObject, responses);
        // console.log(respondObject.agreeDisagree + " " + respondObject.evaluation);

        var clickLocation = (localStorage.getItem("isPredictionTask")) == "false"?"rev":"pred";
        createClickLog("submit", clickLocation);

        // d3.select("#next").style("display", "block");
        // d3.select("#submit").style("display", "none");
    };

    this.loadTaskAfterReview = function () {
        // localStorage.setItem("responsesReviewTask", JSON.stringify(responses));

        localStorage.setItem("expFeedback", expFeedback)
        localStorage.setItem("ansFeedback", ansFeedback)
        localStorage.setItem("evalFeedback", evalFeedback)
        localStorage.setItem("startFeedback", startFeedback)
        localStorage.setItem("endFeedback", endFeedback)
        localStorage.setItem("userDiff", userDiff)
        localStorage.setItem("isPredictionTask", "true");

        // Changing the modal content to show a message before going to the next task!
        d3.select(".modal-title")
            .html("Task Complete!");
        d3.select(".modal-body > p")
            .html(function () {
                return "You have completed the task. Press continue.";
                // if (localStorage.getItem("condition") == "3" || localStorage.getItem("condition") == "6")
                //     return "You have completed the task. Press continue.";
                // else
                //     return "You have completed the task. Press continue to answer a questionnaire about this task.";
            });
        d3.select(".modal-footer")
            .select("button").remove();
        d3.select(".modal-footer")
            .append("button")
            .classed("btn btn-success", true)
            .attr("type","button")
            .html("Continue")
            .on("click", function () {
                localStorage.setItem("revEnd", getDateTime());
                // We don't need a survey for the no explanation conditions; hence, directly to the prediction task
                // if (localStorage.getItem("condition") == "3")
                //     // location.href = './prediction-task.html';
                //     location.href = './Tutorial.html';
                // No AI conditions go directly to the post-study questionnaire
                location.href = './tempEnd.html'
                // if (localStorage.getItem("condition") == "6") {
                //     localStorage.setItem("isPredictionTask", "true");
                //     // location.href = './index.html';
                //     location.href = './post-study.html'
                // }
                // else
                //     location.href = './shortq.html';
            });

        document.getElementById("modal-btn").click();
    };

    function loadTaskAfterPrediction () {
        // localStorage.setItem("responsesPredictionTask", JSON.stringify(responses));

        // Changing the modal content to show a message before going to the next task!
        d3.select(".modal-title")
            .html("Task Complete!");
        d3.select(".modal-body > p")
            .html("You have completed the task. Press continue to answer a questionnaire about this task.");
        d3.select(".modal-footer")
            .select("button").remove();
        d3.select(".modal-footer")
            .append("button")
            .classed("btn btn-success", true)
            .attr("type","button")
            .html("Continue")
            .on("click", function () {
                // location.href = './index.html';
                // localStorage.setItem("predEnd", getDateTime());
                // location.href = './post-study.html';
                location.href = "./tempEnd.html"
            });

        document.getElementById("modal-btn").click();
    };

    function recordResults(recordObject, array) {
        recordObject.qtime = startTime;
        // recordObject.userID = localStorage.getItem("id");
        array.push(recordObject);
    }

    function getValueOfSelected(id) {
        var value = -100;
        d3.select(id)
            .selectAll("input")
            .each(function (d) {
                if (d3.select(this).node().checked) {
                    value = d3.select(this).attr("value");
                }
            });
        return value;
    }

    function uncheckAll(){
        d3.selectAll('input')
            .each(function (d) {
                d3.select(this).node().checked = false;
            });
        d3.selectAll('label').classed("active", false);
        adChanged = 0;
        eChanged = 0;
        spChanged = 0;
        epChanged = 0;
    }

    function toggleDisabilityRadioButtons() {
        d3.selectAll("label")
            .each(function (d) {
                if (d3.select(this).classed("disabled")) {
                    d3.select(this).classed("disabled", false);
                }
                else
                    d3.select(this).classed("disabled", true);
            });
    }

    function isOptionSelected(id) {
        var isChecked = false;
        d3.select(id)
            .selectAll("input").each(function (d) {
                console.log("ID: " + id + ", Node: " + d3.select(this).node().id + ", Checked: " + d3.select(this).node().checked)
                if (d3.select(this).node().checked == true)
                    isChecked = true;
            });
        return isChecked;
    }

    function showQuery(currentQuestion) {
        var queryDiv = d3.select("#query-section");
        queryDiv.html("");
        //header
        queryDiv.append("div")
            .classed("col-md-12 panel-heading", true)
            .attr("id", "question-section-header")
            .append("h")
            .classed("component", true)
            .html("Question from the Video");
        //query
        queryDiv.append("div")
            .attr("id","query")
            .classed("col-md-12 vertical-align-center", true)
            .append("h")
            .html(function () {
                return currentQuestion.questionText;
            });
    }

    function showResponse(currentQuestion) {

        var queryDiv = d3.select("#query-section");
        //system's answer

        if (localStorage.getItem("condition") != "6") {
            var responseDiv = queryDiv.append("div")
                .classed("col-md-12 vertical-align-center system-answer", true);
            responseDiv.append("h")
                .style("color", "#428bca")
                .html("System's Answer:&nbsp;");
            responseDiv.append("h")
                .html(function () {
                    return currentQuestion.computerAnswer;
                });
            queryDiv.append("div")
                .classed("col-md-12 component-header vertical-align-center component correct-answer-hidden", true)
                .attr("id", "correct-answer-header")
                .style("margin-top", "0px")
                .append("h")
                .classed("component", true)
                .html("Correct Answer");
        }
        var correctAnswerDiv = queryDiv.append("div")
            .classed("col-md-12 vertical-align-center system-answer correct-answer-hidden", true)
            .attr("id","correct-answer");
        correctAnswerDiv.append("h")
            .style("color", "#428bca")
            .html("Correct Answer:&nbsp;");
        correctAnswerDiv.append("h")
            .html(function () {
                return currentQuestion.correctAnswer;
            });
    }

    function showExplanations(currentQuestion) {
        // var listOfFrames = currentQuestion.listOfKeyFrames;
        var length = currentQuestion.listOfKeyFrames.length;
        var startTimes = [],
            endTimes = [],
            explanations = [],
            associations = [];
        for (var i = 0; i< length; i++) {
            startTimes.push(currentQuestion.listOfKeyFrames[i].startTime);
            endTimes.push(currentQuestion.listOfKeyFrames[i].endTime);
            explanations.push(currentQuestion.listOfKeyFrames[i].textExplanations);
            associations.push(currentQuestion.listOfKeyFrames[i].associatedFeatures);
        }

        // This will make sure the video's metadata is load before plotting the segments
        clear_list();
        clear_segment();
        segment_buttons(startTimes, endTimes, explanations, associations);
    }

    this.createClickLog = function (clickInstrument, clickLocation) {
        var logObject = {};
            logObject.vid = currentVideo.videoName;
            logObject.qid = currentVideoData[nextQueryIndex-1].questionId;
            logObject.obj = clickInstrument;
            logObject.clickLoc = clickLocation;
            logObject.t = new Date().getTime();

        var allTheLogs = JSON.parse(localStorage.getItem("logs"));
        allTheLogs.push(logObject);
        localStorage.setItem("logs", JSON.stringify(allTheLogs));
    }

    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
})();
