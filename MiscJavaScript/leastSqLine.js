class LeastSquareLine{
	constructor(){
	}

	fit(A, b){
		return math.multiply(math.multiply(math.inv(math.multiply(math.transpose(A), A)),math.transpose(A)),b);
	}
}

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var pixelColor = "#FF0000";
var pixelClass = 1;

var A = [];
var b = [];

//Background
context.fillStyle = "#FFFFFF";
context.fillRect(0, 0, canvas.width, canvas.height);

canvas.addEventListener("mousedown", function(e) {
		var rect = canvas.getBoundingClientRect();

		var x_ = (e.x - rect.left)* canvas.width / parseInt(canvas.style.width) ;
		var y_ = (e.y - rect.top) * canvas.height / parseInt(canvas.style.height) ;

		console.log(x_ + ", " + y_);
		
		context.fillStyle = pixelColor;
		context.fillRect(Math.floor(x_) , Math.floor(y_), 2, 2);

		A.push([1, x_]);
		b.push(y_);
			
}, true);


function refreshCanvas(){
  context.clearRect(0, 0, canvas.width, canvas.height);
  //Clear the arrays
  A = [];
  b = [];
}

function fitLine(){
	
	ls = new LeastSquareLine();
	var answer = ls.fit(A,b);
	var alpha = answer[0];
	var beta = answer[1];

	console.log(alpha + "," + beta);

	
	context.beginPath();
	context.moveTo(0 , alpha);
	context.lineTo(canvas.width , alpha + canvas.width*beta);
	context.lineWidth = 1;
	context.strokeStyle = '#00ff00';
	context.stroke();
}
