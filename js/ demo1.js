/*js脚本*/
$(function(){
	//重新初始化游戏区域
	common.$mainbox.width(common.width*common.box)
	common.$mainbox.height(common.height*common.box)
	//食物对象实例化
	common.food=new Food();
	common.food.create();
	//蛇实例化
	common.snake=new Snake();
	common.snake.create();
	
	
	common.timer=setInterval(function(){
		
		common.snake.move();
		
	},common.speed)
	
	
	$(document).swipe({
		swipe:function(e,a){
			common.snake.dir=a;
			
		}
	})
})
