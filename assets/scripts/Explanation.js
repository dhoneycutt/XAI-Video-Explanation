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
      var tempString = explanationsData[i]['activity'] + " + " + explanationsData[i]['object'] + " + " + explanationsData[i]['location']
      listOfCombinations.push(tempString)
    }

    var el = document.getElementById('combination-ul');
    for (var i = 0; i < listOfCombinations.length; i++) {
      var li = document.createElement("li")
      li.appendChild(document.createTextNode(listOfCombinations[i]))
      li.setAttribute("id", listOfCombinations[i])
      el.appendChild(li)
    }


    var combinationSort = Sortable.create(el);
    var userOrder = el.getElementsByTagName("li");
    orderIDs = makeIDList(userOrder);


    var listOfActions = ["Any Action", "Add", "Close", "Cut", "Dry", "Move", "Open", "Peel", "Put in", "Take out", "Wash"]
    var listOfObjects = ["Any Object", "Bowl", "Carrot", "Cucumber", "Cutting board", "Frying pan", "Green beans", "Hand", "Knife", "Onion", "Parsley", "Pepper", "Pineapple", "Plate", "Potato", "Stove"]
    var listOfLocations = ["Any Location", "Bowl", "Cupboard", "Cutting board", "Drawer", "Fridge", "Frying pan", "Plate", "Pot", "Sink", "Stove"]
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

    var button = document.createElement("button");
    button.setAttribute("class", "btn btn-primary col-md-5")
    button.setAttribute("id", "submit-combination")
    button.innerHTML = "Add Combination";
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
                + d.activity;
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
  deleteLi = document.getElementById(liID)
  deleteLi.parentNode.removeChild(deleteLi)
  var el = document.getElementById('combination-ul');
  userOrder = el.getElementsByTagName("li");
  orderIDs = makeIDList(userOrder);
}
