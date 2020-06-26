var canvas=document.querySelector('canvas');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

var c=canvas.getContext('2d');

var colorArray=['#ffaa33','#99ffaa','#00ffhh','#224488','#aabb11','#13d56f'];
var gravity=1;
var friction=0.96;

window.addEventListener('resize',function()
{
	canvas.width=window.innerWidth;
	canvas.height=window.innerHeight;
	init();
});

addEventListener('click',function()
{
	init();
});

function randomIntFromRange(min,max)
{
	return Math.floor(Math.random()*(max-min+1)+min);
}

function Ball(x,y,dx,dy,radius,color)
{
	this.x=x;
	this.y=y;
	this.dx=dx;
	this.dy=dy;
	this.radius=radius;
	this.color=color;
	this.draw=function()
				{
					c.beginPath();
					c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
					c.fillStyle=this.color;
					c.fill();
					c.stroke();
					c.closePath();
				}
	this.update=function()
				{
					if(this.y+this.radius+this.dy>canvas.height)
					{
						this.dy=-this.dy*friction;
					}
					else
					{
						this.dy+=gravity;
					}
					if(this.x+this.radius+this.dx>canvas.width || this.x-this.radius<=0)
					{
						this.dx=-this.dx;
					}
					this.x+=this.dx;
					this.y+=this.dy;

					this.draw();
				}
}

var ballArray=[];
function init()
{
	ballArray=[];
	for(var i=0;i<90;i++)
	{
		var radius=randomIntFromRange(2,25);
		var x=randomIntFromRange(0,canvas.width-radius);
		var y=randomIntFromRange(0,canvas.height-radius);
		var dx=randomIntFromRange(-2,2);
		var dy=randomIntFromRange(-2,2);
		color=colorArray[Math.floor(Math.random()*colorArray.length)];

		ballArray.push(new Ball(x,y,dx,dy,radius,color));
	}
}

function animate()
{
	requestAnimationFrame(animate);
	c.clearRect(0,0,innerWidth,innerHeight);
	for(var i=0;i<ballArray.length;i++)
	{
		ballArray[i].update();
	}
}
init();
animate();