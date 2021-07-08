//Create variables here
var dog,happyDog;
var database;
var foodS,foodStock,lastFed1,fedTime,feed,addFood;
var dogImg,dogImg_1;
var foodObj;
function preload(){
  dogImg=loadImage("images/dogImg.png");
dogImg_1=loadImage("images/dogImg1.png");
}

function setup() {
  database=firebase.database();
	createCanvas(1000,1000);
  foodObj=new Food()

dog=createSprite(550,400,50,50);
dog.addImage(dogImg);
dog.scale=0.2;

foodStock=database.ref("food");
foodStock.on("value",readStock);

feed=createButton("feed the dog");
feed.position(700,125);
feed.mousePressed(feedDog); 

 addFood=createButton("addFood")
 addFood.position(800,125);
 addFood.mousePressed(addFoods);
}


function draw() {  
background("green");
foodObj.display();
  drawSprites()
  fedTime=database.ref("lastFed")
  fedTime.on("value",function(data){
  lastFed=data.val();

  })
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg_1);
  }
  textSize(20);
  fill("white");
  text("Please press the up arrow key to feed the dog",250,50);
  text("food remaining:"+foodS,460,300);
  if(lastFed1>=12){
  text("lastFed:"+lastFed1%12+"PM",750,60);
  
  }
  else{
    text("lastFed:"+lastFed1+"AM",750,90);
  }
}
function readStock(data){
foodS=data.val();
foodObj.updateFoodStock(foodS);
console.log(foodS);
}
function feedDog(){
  dog.addImgae("images/dogImg1.png");
  if(foodObj.getFoodStock()<=0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }
  else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }
  database.ref("/").update({
 foodStock:foodObj.getFoodStock(),
 lastFed:hour()
  })
}
function addFoods(){
foodS=foodS+1
database.ref("/").update({
foodStock:foodS
})
}




