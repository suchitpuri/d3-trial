import Ember from 'ember';
export default Ember.Component.extend({

	data: [4, 8, 15, 16, 23, 42],
  width: 420,
  barHeight: 20,

	didInsertElement: function(){
		var data = this.get('data');
    var self = this;
		var x =  d3.scale.linear()
    			.domain([0, d3.max(data)])
    			.range([0, this.get("width")]);

    var chart = d3.select(".svg-chart")
                  .attr("width", this.get("width"))
                  .attr("height", this.get("barHeight") * this.get("data").length);
      
    var bar = chart.selectAll("g")
                .data(data)
                .enter().append("g")
                .attr("transform", function(d, i) { return "translate(0," + i * self.get("barHeight") + ")"; });

	  bar.append("rect")
        .attr("width", x)
        .attr("height", self.get("barHeight") - 1);

    bar.append("text")
      .attr("x", function(d) { return x(d) - 3; })
      .attr("y", self.get("barHeight") / 2)
      .attr("dy", ".35em")
      .text(function(d) { return d; });
  
	}

});