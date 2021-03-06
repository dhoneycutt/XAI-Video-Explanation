var optionsDiv = d3.select("#options");

var toggleItems = [
    {
        text:"Video Segment",
        id:"segment"
    },
    {
        text:"Component Scores",
        id:"component-score-div"
    },
    {
        text:"Detected Combinations",
        id:"explanation-box"
    }
];

var item = optionsDiv.append("div")
    .selectAll("div").data(toggleItems).enter()
    .append("div")
    .classed("col-md-12 option-item", true);



var temp = item.append("label")
    .classed("checkbox-container", true)
    .text(function (d) {
        return d.text;
    });

temp.append("input")
    .attr("type","checkbox")
    .attr("checked", true)
    .attr("id", function (d,i) {
        return "checkbox" + i;
    })
    .on("click", function (d,i) {
        var vid = d3.select("#checkbox0").property("checked");
        var comp = d3.select("#checkbox1").property("checked");
        var score = d3.select("#checkbox2").property("checked");

        if (d3.select("#checkbox" + i).property("checked")) {
            if (i == 0)
                d3.select("#" + d.id)
                    .style("visibility", "visible");
            else
                d3.select("#" + d.id)
                    // .style("visibility", "visible");
                    .style("display","block");
        }

        else {
            if (i == 0)
                d3.select("#" + d.id)
                    .style("visibility", "hidden");
            else
                d3.select("#" + d.id)
                    // .style("visibility", "hidden");
                    .style("display","none");
        }

        if (!vid && (comp || score)) {
            d3.select("#explanation-set-main")
                .style("display","block");
                // .style("visibility", "visible");
        }

        else {
            d3.select("#explanation-set-main")
                .style("display","none");
                // .style("visibility", "hidden");
        }
    });

temp.append("span")
    .classed("checkmark", true);


