//对象
var common={
	
	width:20,//把游戏区域横向划分20个小方格
	height:20,//把游戏区域竖向划分20个小方格
	box:15,//每个小方格的大小
	timer:null,//计时器
	speed:300,//速度
	snake:null,//蛇
	food:null,//食物
	$mainbox:$("#mainbox")//游戏区域对象
	
}
function Snake(){
	this.head=null;//蛇头
	this.tails=[];//蛇尾
	this.dir='right';//运动方向
	this.pos={x:0,y:0};//起始位置
}
Snake.prototype={
	//创建对象
	create:function(){
		this.head=$('<div class="snakehead"></div>')
		this.head.css({
			width:common.box,
			height:common.box,
			left:this.pos.x,
			top:this.pos.y,
		})
		common.$mainbox.append(this.head)
	},
	//移动
	move:function(){
		//把蛇头运动之前的坐标位置存储--数组最后一个要用
		var pos={x:this.pos.x,y:this.pos.y}
		switch(this.dir){
			case 'up':
			this.pos.y-=common.box;break;
			case 'down':
			this.pos.y+=common.box;break;
			case 'left':
			this.pos.x-=common.box;break;
			case 'right':
			this.pos.x+=common.box;break;
		}
		this.head.css({
			left:this.pos.x,
			top:this.pos.y
		})
		this.colis();
		this.tailmove(pos);
	},
	//吃
	eat:function(){
		this.addtail();
		common.food.update();
		
	},
	//添加蛇尾
	addtail:function(){
		var tail=$('<div class="snake"></div>');
		tail.css({
			width:common.box,
			height:common.box
			
		})
		common.$mainbox.append(tail)
		this.tails.push(tail)
	},
	//游戏结束
	over:function(){
		clearInterval(common.timer)
		alert("Game over!")	
	},
	//蛇尾移动
	tailmove:function(pos){
		if(this.tails.length){
			var las=this.tails.length-1;
			this.tails[las].css({
				left:pos.x,
				top:pos.y
			})
			this.tails.unshift(this.tails.pop())
		}
	},
	//监听函数
	colis:function(){
		if(this.pos.x==common.food.pos.x&&this.pos.y==common.food.pos.y){
			this.eat()
//			for(var i=0;i<this.tails.length;i++){ 
//				
//				if( parseInt(this.tails[i].x)==this.pos.x && parseInt(this.tails[i].y)==this.pos.y){ 
//				
//			 		this.over();
//			 
//				} 
//			}
		}
		if(this.pos.x<0||this.pos.y<0||this.pos.x>(common.width-1)*common.box||this.pos.y>(common.height-1)*common.box){
			this.over();
		}
		
	}
	
}
//创建食物对象
function Food(){
	this.el=null;//食物位置
	this.pos={x:0,y:0};//位置
}
Food.prototype={
	//食物创建
	create:function(){
		this.el=$('<div class="food"></div>')
		this.createpos()
		this.el.css({
			width:common.box,
			height:common.box,
			left:this.pos.x,
			top:this.pos.y
		})
		common.$mainbox.append(this.el)
	},
	//更新食物位置
	update:function(){
		this.createpos()
		this.el.css({
			left:this.pos.x,
			top:this.pos.y
		})	
	},
	//创建食物随机位置
	createpos:function(){
	 	var x=Math.floor(Math.random()*common.width)*common.box;
	 	var y=Math.floor(Math.random()*common.height)*common.box;
	 	this.pos={
		x:x,y:y
		}
	}
	
}
