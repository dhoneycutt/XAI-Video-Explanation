var listItems;
var listItems1;
var listItems2;
var listItems3;

// To load explanation data from json files
function loadData(explanationsData, associationData) {
    console.log(explanationsData)
    console.log(associationData)
    document.getElementById('selectError').style.display = "none"
    document.getElementById('anyError').style.display = "none"

    var listOfCombinations = []
    for(var i = 0; i < explanationsData.length; i++) {
      var tempString = explanationsData[i]['action'] + " + " + explanationsData[i]['object'] + " + " + explanationsData[i]['location']
      listOfCombinations.push(tempString)
    }

    var el = document.getElementById('combination-ul');
    for (var i = 0; i < listOfCombinations.length; i++) {
      var li = document.createElement("li")
      li.innerHTML += "<span class='badge'>" + (i + 1) + "</span>  "
      li.appendChild(document.createTextNode(listOfCombinations[i]))
      li.setAttribute("id", listOfCombinations[i])
      li.insertAdjacentHTML('beforeend', '<a href="#" onclick="deleteLi(\'' + listOfCombinations[i] + '\')" class="delete">X</a>')
      el.appendChild(li)
    }





    var combinationSort = Sortable.create(el);
    var userOrder = el.getElementsByTagName("li");
    orderIDs = makeIDList(userOrder);
    localStorage.setItem("originalOrder", orderIDs)


    var listOfActions = ["any action", "add", "close", "cut", "dry", "move", "open", "peel", "put in", "take out", "wash"]
    var listOfObjects = ["any object", "bowl", "carrot", "cucumber", "cutting board", "drawer", "frying pan", "green beans", "hand", "knife", "onion", "parsley", "pepper", "pineapple", "plate", "potato", "stove"]
    var listOfLocations = ["any location", "bowl", "cupboard", "cutting board", "drawer", "fridge", "frying pan", "plate", "pot", "sink", "stove"]
    var addCombs = document.getElementById('combination-adder')
    var addAction = document.createElement("select")
    addAction.setAttribute("id", "addAction")
    for (var i = 0; i < listOfActions.length; i++) {
      var opt = document.createElement("option")
      opt.appendChild(document.createTextNode(listOfActions[i]))
      opt.value = listOfActions[i]
      addAction.appendChild(opt)
    }

    var addObject = document.createElement("select")
    addObject.setAttribute("id", "addObject")
    for (var i = 0; i < listOfObjects.length; i++) {
      var opt = document.createElement("option")
      opt.appendChild(document.createTextNode(listOfObjects[i]))
      opt.value = listOfObjects[i]
      addObject.appendChild(opt)
    }

    var addLocation = document.createElement("select")
    addLocation.setAttribute("id", "addLocation")
    for (var i = 0; i < listOfLocations.length; i++) {
      var opt = document.createElement("option")
      opt.appendChild(document.createTextNode(listOfLocations[i]))
      opt.value = listOfLocations[i]
      addLocation.appendChild(opt)
    }
    addAction.setAttribute("class", "select-css")
    addObject.setAttribute("class", "select-css")
    addLocation.setAttribute("class", "select-css")

    addCombs.appendChild(addAction)
    addCombs.appendChild(addObject)
    addCombs.appendChild(addLocation)
    addCombs.setAttribute("style", "text-align: center;")

    var button2 = document.createElement("button");
    button2.setAttribute("class", "btn btn-primary col-md-5")
    button2.setAttribute("id", "reset-combination")
    button2.innerHTML = "Reset Activities";
    addCombs.appendChild(button2)
    button2.addEventListener ("click", function() {
      // Delete all list elements
      liElements = document.getElementsByTagName("li")
      liIDs = []
      for (i = 0; i < liElements.length; i++) {
        liIDs.push(liElements[i].id)
      }
      for (i = 0; i < liIDs.length; i++) {
        deleteLi(liIDs[i])
      }

      // Re-add the original list elements
      var el = document.getElementById('combination-ul');
      for (var i = 0; i < listOfCombinations.length; i++) {
        var li = document.createElement("li")
        li.innerHTML += "<span class='badge'>" + (i + 1) + "</span>  "
        li.appendChild(document.createTextNode(listOfCombinations[i]))
        li.setAttribute("id", listOfCombinations[i])
        li.insertAdjacentHTML('beforeend', '<a href="#" onclick="deleteLi(\'' + listOfCombinations[i] + '\')" class="delete">X</a>')
        el.appendChild(li)
      }
    });

    var btnDivider = document.createElement("div")
    btnDivider.setAttribute("class", "divider")
    addCombs.appendChild(btnDivider)

    var button = document.createElement("button");
    button.setAttribute("class", "btn btn-primary col-md-5")
    button.setAttribute("id", "submit-combination")
    button.innerHTML = "Add Activity";
    addCombs.appendChild(button)
    button.addEventListener ("click", function() {
      var newAct = document.getElementById("addAction").value;
      var newObj = document.getElementById("addObject").value;
      var newLoc = document.getElementById("addLocation").value;

      var newComb = newAct + " + " + newObj + " + " + newLoc
      if(newComb != "Any Action + Any Object + Any Location") {
        if(!orderIDs.includes(newComb)) {
          var li = document.createElement("li")
          liVal = document.createTextNode(newComb)

          li.appendChild(liVal)
          li.setAttribute("id", newComb)
          li.setAttribute("class", "newComb")
          li.insertAdjacentHTML('beforeend', '<a href="#" onclick="deleteLi(\'' + newComb + '\')" class="delete">X</a>')
          el.appendChild(li)

          userOrder = el.getElementsByTagName("li");
          orderIDs = makeIDList(userOrder);
          document.getElementById('selectError').style.display = "none"
          document.getElementById('anyError').style.display = "none"
        }
        else {
          document.getElementById('selectError').style.display = "block"
          document.getElementById('anyError').style.display = "none"
        }
      }
      else {
        document.getElementById('selectError').style.display = "none"
        document.getElementById('anyError').style.display = "block"
      }
    });









    // d3.select('#list').append("div")
    //         .classed("explanation-options explanation-options-header vertical-align-center", true)
    //         .html("Activity")
    //     .style("font-size","medium");
    //
    // d3.select('#list1').append("div")
    //     .classed("explanation-options explanation-options-header vertical-align-center", true)
    //     .html("Object")
    //     .style("font-size","medium");
    //
    // d3.select('#list2').append("div")
    //     .classed("explanation-options explanation-options-header vertical-align-center", true)
    //     .html("Location")
    //     .style("font-size","medium");
    //
    // d3.select('#list3').append("div")
    //     .classed("explanation-options explanation-options-header vertical-align-center", true)
    //     .html("Rank")
    //     .style("font-size","medium");
    // loadExplanation(explanationsData);
    // loadCharts(associationData, "#4dcee4");
    originalOrder = el.getElementsByTagName("li");
    console.log(makeIDList(originalOrder))
}

function loadExplanation (data) {
    listItems = d3.select("#list").selectAll("a")
        .data(data).enter();

    listItems1 = d3.select("#list1").selectAll("a")
        .data(data).enter();

    listItems2 = d3.select("#list2").selectAll("a")
        .data(data).enter();

    listItems3 = d3.select("#list3").selectAll("a")
        .data(data).enter();

    listItems.append("a")
        .classed("list-group-item", true)
        .append("p")
        .classed("explanation-options vertical-align-center", true)
        .html(function(d) {
            return "<b>"
                + d.action;
        });

    listItems1.append("a")
        .classed("list-group-item", true)
        .append("p")
        .classed("explanation-options vertical-align-center", true)
        .html(function(d) {
            return "<b>"
                + d.object;
        });


    listItems2.append("a")
        .classed("list-group-item", true)
        .append("p")
        .classed("explanation-options vertical-align-center", true)
        .html(function(d) {
            return "<b>"
                + d.location;
        });

    listItems3.append("a")
        .classed("list-group-item list3", true)
        .style({
            "background-color": "#4edcf4",
            "color": "#333333"
        })
        .append("p")
        .classed("explanation-options vertical-align-center", true)
        .html(function(d) {
            return d.approximation;
        });



}

//to clear the prevous list before loading new list dor each question
function clear_list() {
    d3.selectAll('.list-group-item').remove();
    d3.select("#component-score-div").select(".panel-body").html("");
    d3.select("#component-score-div").select("#combination-adder").html("");
    d3.select("#combination-list-div").select("#combination-ul").html("");
    d3.selectAll('.explanation-options').remove();
}

function makeIDList(userOrder) {
  returnOrder = [];
  for (i=0; i<userOrder.length; i++) {
    returnOrder.push(userOrder[i].id)
  }
  console.log("Return Order")
  console.log(returnOrder)
  return returnOrder
}

function deleteLi(liID) {
  console.log("liID: " + liID);
  deleteLiEl = document.getElementById(liID)
  deleteLiEl.parentNode.removeChild(deleteLiEl)
  var el = document.getElementById('combination-ul');
  userOrder = el.getElementsByTagName("li");
  orderIDs = makeIDList(userOrder);
}
