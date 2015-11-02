//
//  Function for Draw Knob Charts
//
function DrawKnob(elem){
	elem.knob({
		change : function (value) {
			console.log("change : " + value);
		},
		release : function (value) {
			console.log(this.$.attr('value'));
			console.log("release : " + value);
		},
		cancel : function () {
			console.log("cancel : ", this);
		},
		draw : function () {
			// "tron" case
			if(this.$.data('skin') === 'tron') {
				var a = this.angle(this.cv);  // Angle
				var sa = this.startAngle;          // Previous start angle
				var sat = this.startAngle;         // Start angle
				var ea;                            // Previous end angle
				var eat = sat + a;                 // End angle
				var r = 1;
				this.g.lineWidth = this.lineWidth;
				this.o.cursor
					&& (sat = eat - 0.3)
					&& (eat = eat + 0.3);
				if (this.o.displayPrevious) {
					ea = this.startAngle + this.angle(this.v);
					this.o.cursor
						&& (sa = ea - 0.3)
						&& (ea = ea + 0.3);
					this.g.beginPath();
					this.g.strokeStyle = this.pColor;
					this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sa, ea, false);
					this.g.stroke();
				}
				this.g.beginPath();
				this.g.strokeStyle = r ? this.o.fgColor : this.fgColor ;
				this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sat, eat, false);
				this.g.stroke();
				this.g.lineWidth = 2;
				this.g.beginPath();
				this.g.strokeStyle = this.o.fgColor;
				this.g.arc( this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
				this.g.stroke();
				return false;
			}
		}
	});
	// Example of infinite knob, iPod click wheel
	var v;
	var up = 0;
	var down=0;
	var i=0;
	var $idir = $("div.idir");
	var $ival = $("div.ival");
	var incr = function() { i++; $idir.show().html("+").fadeOut(); $ival.html(i); };
	var decr = function() { i--; $idir.show().html("-").fadeOut(); $ival.html(i); };
	$("input.infinite").knob(
		{
			min : 0,
			max : 20,
			stopper : false,
			change : function () {
				if(v > this.cv){
					if(up){
						decr();
						up=0;
					} else {
						up=1;down=0;
					}
				} else {
					if(v < this.cv){
						if(down){
							incr();
							down=0;
						} else {
							down=1;up=0;
						}
					}
				}
				v = this.cv;
			}
		});
}