function queryObj() {
	var result = {}, queryString = location.search.slice(1),
		re = /([^&=]+)=([^&]*)/g, m;

	while (m = re.exec(queryString)) {
		result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
	}
	return result;
}

(function () {

	Logo = {
	};

	Logo.randomColor = function() {
		var color = ''
		for(var i = 0; i < 3; i++) {
			var r = Math.floor(Math.random() * 15);
			color += r < 9 ? r : String.fromCharCode(65 + r - 9);
		}
		return color;
	};

	Logo.queryObj = new queryObj();

	Logo.backStyles = new Array('blank', 'striped', 'diag', 'exed', 'habs', 'roundel', 'dots');
	Logo.fontFamilies = new Array("Calibri", "Times New Roman", "Comic Sans MS", "Palatino Linotype", "Arial", "Helvetica", "Tahoma");

	Logo.letters = new Array();
		if(queryObj.letters != null) {
			queryObj = Logo.queryObj.letters.split("|");
		} else {
			var letterLength = 1 + Math.floor(Math.random() * 2);
			for(var i = 0; i < letterLength; i++) {
				Logo.letters.push([String.fromCharCode(65 + Math.floor(Math.random() * 26))]);
			}
		}
		Logo.backColor = Logo.queryObj.backColor ? Logo.queryObj.backColor : Logo.randomColor();
		Logo.fontColor = Logo.queryObj.fontColor ? Logo.queryObj.fontColor : Logo.randomColor();
		Logo.fontStroke = Logo.queryObj.fontStroke ? Logo.queryObj.fontStroke : Logo.backColor;
		Logo.backStyle = Logo.queryObj.backStyle ? Logo.queryObj.backStyle : Logo.backStyles[Math.floor(Math.random() * Logo.backStyles.length)];
		Logo.stripeColor = Logo.queryObj.stripeColor ? Logo.queryObj.stripeColor : Logo.randomColor();
		Logo.offsetX = Logo.queryObj.offsetX? Logo.queryObj.offsetX : (Logo.letters.length > 1? (Math.random() * 50) : 0);
		Logo.fontFamily = Logo.queryObj.fontFamily ? Logo.queryObj.fontFamily : Logo.fontFamilies[Math.floor(Math.random() * Logo.fontFamilies.length)];

	Logo.url = 'http://' + window.location.hostname + 
		'/?backColor=' + Logo.backColor + 
		'&fontColor=' + Logo.fontColor + 
		'&fontStroke=' + Logo.fontStroke + 
		'&backStyle=' + Logo.backStyle + 
		'&stripeColor=' + Logo.stripeColor + 
		'&logoLetter=' + Logo.letters.join('|') +
		'&offsetX=' + Logo.offsetX +
		'&fontFamily=' + encodeURIComponent(Logo.fontFamily);
  

	Logo.kinetic = {}; // All kinetic object references go in here

	Logo.kinetic.stage = new Kinetic.Stage( {
		container: 'logo',
		width: Logo.queryObj.width? Logo.queryObj.width : 275, //Math.min(window.innerWidth, window.innerHeight),
		height: Logo.queryObj.height? Logo.queryObj.height : 275 //Math.min(window.innerWidth, window.innerHeight)
	});

	Logo.kinetic.layer = new Kinetic.Layer();

	Logo.kinetic.wrapper = new Kinetic.Rect( {
		x:0,
		y:0,
		width: Logo.kinetic.stage.getWidth(),
		height: Logo.kinetic.stage.getHeight(),
		fill: '#' + Logo.backColor
	});
	
	Logo.kinetic.layer.add(Logo.kinetic.wrapper);

	Logo.kinetic.stripes = new Array();

	if(Logo.backStyle == 'striped') {
		for(var i = 0; i < 2; i++) {
			var x = (i % 2 == 0)? Logo.kinetic.stage.getWidth() * .2 : Logo.kinetic.stage.getWidth() - (Logo.kinetic.stage.getWidth() * .2);
			var stripe = new Kinetic.Line({
				points: [ x, 0, x, Logo.kinetic.stage.getHeight() ],
				stroke: '#' + Logo.stripeColor,
				strokeWidth: Logo.kinetic.stage.getWidth() * .1
			});
			Logo.kinetic.stripes.push(stripe);
			Logo.kinetic.layer.add(stripe);
		}
	}
	if(Logo.backStyle == 'diag' || Logo.backStyle == 'exed') {
		var count = Logo.backStyle == 'diag' ? 1 : 2;
		for(var i = 0; i < count; i++) {
			var stripe = new Kinetic.Line({
				points: (i % 2 == 0) ? [0, 0, Logo.kinetic.stage.getWidth(), Logo.kinetic.stage.getHeight()] : [0, Logo.kinetic.stage.getHeight(), Logo.kinetic.stage.getWidth(), 0],
				stroke: '#' + Logo.stripeColor,
				strokeWidth: Logo.kinetic.stage.getWidth() * .2
			});
			Logo.kinetic.stripes.push(stripe);
			Logo.kinetic.layer.add(stripe);
		}
	}
	if(Logo.backStyle == 'habs') {
		var stripe = new Kinetic.Line({
			points: [0, Logo.kinetic.stage.getHeight() * .5, Logo.kinetic.stage.getWidth(), Logo.kinetic.stage.getHeight() * .5],
			stroke: '#' + Logo.stripeColor,
			strokeWidth: Logo.kinetic.stage.getWidth() * .25
		});
		Logo.kinetic.stripes.push(stripe);
		Logo.kinetic.layer.add(stripe);
	}
	if(Logo.backStyle == 'roundel') {
		var circle = new Kinetic.Circle({
			x: Logo.kinetic.stage.getWidth() * .5,
			y: Logo.kinetic.stage.getHeight() * .5,
			fill: '#' + Logo.stripeColor,
			radius: Math.min(Logo.kinetic.stage.getWidth(), Logo.kinetic.stage.getHeight()) * .2
		});
		Logo.kinetic.stripes.push(circle);
		Logo.kinetic.layer.add(circle);
	 
		var circle = new Kinetic.Circle({
			x: Logo.kinetic.stage.getWidth() * .5,
			y: Logo.kinetic.stage.getHeight() * .5,
			strokeWidth: Logo.kinetic.stage.getWidth() * .15,
			radius: Math.min(Logo.kinetic.stage.getWidth(), Logo.kinetic.stage.getHeight()) * .4,
			stroke: '#' + Logo.stripeColor
		});
		Logo.kinetic.stripes.push(circle);
		Logo.kinetic.layer.add(circle);
	}
	if(Logo.backStyle == 'dots') {
		for(var i = 0; i < 4; i++) {
			for(var j = 0; j < 4; j++) {
				var circle = new Kinetic.Circle({
					x: (Logo.kinetic.stage.getWidth() / 3*( i )) + ((j%2) * Logo.kinetic.stage.getWidth()/6),
					y: Logo.kinetic.stage.getHeight() / 3 * (j ),
					radius: Math.min(Logo.kinetic.stage.getWidth(), Logo.kinetic.stage.getHeight()) * .1,
					fill: '#' + Logo.stripeColor
				});
				Logo.kinetic.stripes.push(circle);
				Logo.kinetic.layer.add(circle);
			}
		}
	}
	Logo.kinetic.letters = new Array();
	for(var i = Logo.letters.length-1; i >= 0; i--) {
		var y = i * Logo.kinetic.stage.getHeight() * .1;
		var x = 0;
		if(Logo.letters.length > 1) {
			x = (i == 0? -1 : 1) * Logo.offsetX * Logo.kinetic.stage.getWidth() / 200;
		}
		if(Logo.letters.length == 2) {
			y  -= Logo.kinetic.stage.getHeight() * (i == 0? .1 : -.02);
		}
		var letter = new Kinetic.Text({
			x: x,
			y: y, 
			width: Logo.kinetic.stage.getWidth(),
			fill: '#' + Logo.fontColor,
			fontFamily: Logo.fontFamily,
			fontSize: Logo.kinetic.stage.getHeight() - 25,
			text: Logo.letters[i],
			align: 'center',
			fontStyle: 'bold',
			strokeWidth: 2,
			stroke: '#' + Logo.fontStroke
		});
		Logo.kinetic.letters.push(letter);
		Logo.kinetic.layer.add(letter);
	}

     Logo.kinetic.gloss = new Kinetic.Shape({
		drawFunc: function(canvas) {
			var borderSize = Logo.kinetic.stage.getWidth() * .03;
			var context = canvas.getContext();
			context.beginPath();
			context.moveTo(borderSize, borderSize);
			context.lineTo(Logo.kinetic.stage.getWidth() - borderSize , borderSize);
			context.lineTo(Logo.kinetic.stage.getWidth() - borderSize, Logo.kinetic.stage.getHeight() * .3);
			context.quadraticCurveTo(Logo.kinetic.stage.getWidth() - borderSize, Logo.kinetic.stage.getHeight() * .5, Logo.kinetic.stage.getWidth() * .5, Logo.kinetic.stage.getHeight() * .5);
			context.quadraticCurveTo(borderSize, Logo.kinetic.stage.getWidth() * .5, borderSize, Logo.kinetic.stage.getWidth() * .6);
			context.closePath();
			canvas.fillStroke(this);
		},
		fill: "cecece",
		opacity: .25
	});

	Logo.kinetic.layer.add(Logo.kinetic.gloss);

	Logo.kinetic.stage.add(Logo.kinetic.layer);



	Logo.kinetic.stage.toDataURL({
		callback: function(dataUrl,scp) {
			query = new queryObj();
			if(query.mode == 'png') {
				pngLogo = new Image();
				pngLogo.src = dataUrl;
				console.log(dataUrl)
				$('#logo').css("display", "none");
				$('body').append(pngLogo);
			}
		}
	});


})();