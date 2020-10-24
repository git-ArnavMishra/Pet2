//Create variables here
var dog, happyDog, database, foodS, foodStock, mydog;
var database;

function preload(){
  mydog = loadImage("Sprites/Dog.png");
  happyDog = loadImage("Sprites/happydog.png");
  
}
function setup() {
	createCanvas(500, 500);
  dog = createSprite(250, 250, 40,40);
  mydog.resize(100,100);
  happyDog.resize(100,100);
  dog.addImage(mydog);
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
}

var count =0;
function draw() {  
  background(46, 139, 87);
  if(keyWentDown(UP_ARROW)){
    if (foodS >0)count = count+10;
    writeStock(foodS);
    happyDog.resize(100+count,100+count);
    dog.addImage(happyDog);
  }
  //add styles here
  fill(0, 102, 153);
  textSize(15);
  text("Note: Press UP_ARROW Key To Feed Tookie Mamba Milk!", 50, 60);
  text("Bottles Remaining:"+ foodS, 50, 150);
  drawSprites();

}
// function to read value in DB;

function readStock(data){
  foodS = data.val();
}
// function to write value in DB;
function writeStock(x){
  if(x<=0){
    x = 0;
  }
  else{
    x = x-1;
  }
  database.ref('/').update({
    Food:x
  })
}


