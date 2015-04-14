import Ember from 'ember';
export default Ember.Component.extend({

	data: [{
          "sale": "202",
          "year": "2000"
      }, {
          "sale": "215",
          "year": "2001"
      }, {
          "sale": "179",
          "year": "2002"
      }, {
          "sale": "199",
          "year": "2003"
      }, {
          "sale": "134",
          "year": "2003"
      }, {
          "sale": "176",
          "year": "2010"
      }],

  data2 : [{
          "sale": "152",
          "year": "2000"
      }, {
          "sale": "189",
          "year": "2002"
      }, {
          "sale": "179",
          "year": "2004"
      }, {
          "sale": "199",
          "year": "2006"
      }, {
          "sale": "134",
          "year": "2008"
      }, {
          "sale": "176",
          "year": "2010"
      }],
  width: 1000,
  height: 500,
  MARGINS: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 50
      },

	didInsertElement: function(){
    var vis = d3.select("#visualisation");

    var xScale = d3.scale.linear().range([this.get("MARGINS").left, this.get("width") - this.get("MARGINS").right]).domain([2000,2010]);
    var yScale = d3.scale.linear().range([this.get("height") - this.get("MARGINS").top, this.get("MARGINS").bottom]).domain([134,215]);
    
    var xAxis = d3.svg.axis()
            .scale(xScale);
  
    var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left");

    vis.append("svg:g")
        .attr("transform", "translate(0," + (this.get("height") - this.get("MARGINS").bottom) + ")") 
        .attr("class","axis")
        .call(xAxis);

    vis.append("svg:g")
      .attr("transform", "translate(" + (this.get("MARGINS").left) + ",0)")
      .attr("class","axis")
    .call(yAxis);

    // Axis DONE


    var lineGen = d3.svg.line()
                  .x(function(d) {
                      return xScale(d.year);
                    })
                  .y(function(d) {
                      return yScale(d.sale);
                  })
                  .interpolate("basis");

    vis.append('svg:path')
       .attr('d', lineGen(this.get("data")))
       .attr('stroke', 'green')
        .attr('stroke-width', 2)
        .attr('fill', 'none');

    vis.append('svg:path')
      .attr('d', lineGen(this.get("data2")))
      .attr('stroke', 'blue')
      .attr('stroke-width', 2)
      .attr('fill', 'none');




	}

});