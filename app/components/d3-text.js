import Ember from 'ember';
export default Ember.Component.extend({

	alphabet: function(){
		return "abcdefghijklmnopqrstuvwxyz".split("");
	}.property(),
	width:960,
	height:500,
	shuffle: function(array) {
 			 var m = array.length, t, i;
  			 while (m) {
    			i = Math.floor(Math.random() * m--);
    			t = array[m], array[m] = array[i], array[i] = t;
  			}
  			return array;
	},
	update: function(data){
				// DATA JOIN
  				// Join new data with old elements, if any.
  				var svg =  d3.select(".d3-text");
  				var text = svg.selectAll("text")
  				    		   .data(data,function(d) { return d; });
				
  				// UPDATE
  				// Update old elements as needed.
  				text.attr("class", "update")
  				.transition()
      			.duration(750)
      			.attr("x", function(d, i) { return i * 32; });
				
  				// ENTER
  				// Create new elements as needed.
  				text.enter().append("text")
  				    .attr("class", "enter")
  				    .attr("dy", "3em")
  				    .attr("y", -60)
      				.attr("x", function(d, i) { return i * 32; })
      				.style("fill-opacity", 1e-6)
      				.text(function(d) { return d; })
      				.transition()
      				.duration(750)
      				.attr("y", 0)
      				.style("fill-opacity", 1);
				
				
  				// EXIT
  				// Remove old elements as needed.
  				text.exit().attr("class", "exit")
    					.transition()
      					.duration(750)
      					.attr("y", 60)
      					.style("fill-opacity", 1e-6)
      					.remove();
	},

	didInsertElement: function(){
		var self = this;
		d3.select(".d3-text")
    					.attr("width", this.get("width"))
   						.attr("height", this.get("height"))
  						.append("g")
    					.attr("transform", "translate(32," + (this.get("height") / 2) + ")");

        this.update(this.get("alphabet"));

        setInterval(function() {
  			self.update(self.shuffle(self.get("alphabet"))
      		.slice(0, Math.floor(Math.random() * 26))
      		.sort());
		}, 1500);

	}
});