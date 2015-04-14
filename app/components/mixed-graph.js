import Ember from 'ember';
export default Ember.Component.extend({

	data:[  {name: "Locke",    value:  4},
          {name: "Reyes",    value:  8},
          {name: "Ford",     value: 15},
          {name: "Jarrah",   value: 16},
          {name: "Shephard", value: 23},
          {name: "Kwon",     value: 42}
        ],

  data2: [{
          "sale": "152",
          "name": "Locke"
      }, {
          "sale": "189",
          "name": "Reyes"
      }, {
          "sale": "179",
          "name": "Ford"
      }, {
          "sale": "199",
          "name": "Jarrah"
      }, {
          "sale": "134",
          "name": "Shephard"
      }, {
          "sale": "176",
          "name": "Kwon"
      }],

  width: function(){
     return (760 - this.get("margin").left - this.get("margin").right);
  }.property(),
  
  height: 300,
  margin: {top: 20, right: 30, bottom: 30, left: 40},

	didInsertElement: function(){

   var data = this.get('data');
   var self = this;

   var y = d3.scale.linear()
              .range([this.get("height"), 0])
              .domain([0, d3.max(data, function(d) { return d.value; })]);

   var x = d3.scale.ordinal()
              .rangeRoundBands([0, this.get("width")], .1)
              .domain(data.map(function(d) { return d.name; }));
  
   var xAxis = d3.svg.axis()
                  .scale(x)
                  .orient("bottom");

   var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left");     

   var chart = d3.select(".mixed-graph")
                  .attr("width", this.get("width") + this.get("margin").left + this.get("margin").right)
                  .attr("height", this.get("height")+ this.get("margin").top + this.get("margin").bottom)
                  .append("g")
                  .attr("transform", "translate(" + this.get("margin").left + "," + this.get("margin").top + ")");
    
    chart.append("g")
         .attr("class", "x axis")
         .attr("transform", "translate(0," + this.get("height") + ")")
         .call(xAxis);

    chart.append("g")
      .attr("class", "y axis")
      .call(yAxis);

    
    var bar = chart.selectAll(".bar")
         .data(data)
         .enter();
         
         bar.append("rect")
                  .attr("class", "bar")
                  .attr("x", function(d) { return x(d.name); })
                  .attr("y", function(d) { return y(d.value); })
                  .attr("height", function(d) { return self.get("height") - y(d.value); })
                  .attr("width", x.rangeBand());
                 


          bar.append("text")
              .attr("x", function(d) { return x(d.name) + x.rangeBand()/2; })
              .attr("y", function(d) { return y(d.value) + 10; })
              .attr("dy", ".35em")
              .text(function(d) { return d.value; });

    chart.append("g")
    .attr("class", "y axis")
    .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Frequency");

   var yScale = d3.scale.linear().range([this.get("height"), 0]).domain([0,215]);
   
   var yAxis =  d3.svg.axis()
                 .scale(yScale)
                 .orient("right");
   
   chart.append("svg:g")
      .attr("transform", "translate(" + (this.get("width"))  + ",0)")
      .attr("class","axis")
      .call(yAxis);

    var lineGen = d3.svg.line()
                  .x(function(d) {
                      return x(d.name) + x.rangeBand()/2 ;
                    })
                  .y(function(d) {
                      return yScale(d.sale);
                  });
                  // .interpolate("basis");

    chart.append('svg:path')
       .attr('d', lineGen(this.get("data2")))
       .attr('stroke', 'green')
        .attr('stroke-width', 2)
        .attr('fill', 'none');



	}

});