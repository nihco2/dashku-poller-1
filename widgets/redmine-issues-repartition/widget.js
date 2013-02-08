// You can use 3rd-party libraries with your widget. For more information, 
// check out the Docs section titled 'Using 3rd-party JS libraries'.

// The widget's html as a jQuery object
var widget = this.widget;

// This runs when the widget receives a transmission
this.on('load', function(data){
 
  head.js('http://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js');
  head.js('http://cdnjs.cloudflare.com/ajax/libs/graphael/0.5.0/g.raphael-min.js');
  head.js('http://cdnjs.cloudflare.com/ajax/libs/graphael/0.5.0/g.pie-min.js');
  
});

this.on('transmission', function(data){
  
	var r = Raphael("pieholder"),
      values = data.values,
      names = data.names,
      pie = r.piechart(100, 100, 80, values, {
        legend: names,
        legendpos: "east"
      })
  ;
    
  pie.hover(function () {
    this.sector.stop();
    this.sector.scale(1.1, 1.1, this.cx, this.cy);
    
    if (this.label) {
      this.label[0].stop();
      this.label[0].attr({ r: 7.5 });
      this.label[1].attr({ "font-weight": 800 });
    }
  }, function () {
    this.sector.animate({ transform: 's1 1 ' + this.cx + ' ' + this.cy }, 500, "bounce");
    
    if (this.label) {
      this.label[0].animate({ r: 5 }, 500, "bounce");
      this.label[1].attr({ "font-weight": 400 });
    }
  });


});