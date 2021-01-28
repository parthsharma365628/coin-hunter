var bike, bike1
var road, road1, roadG
var ob, ob1, obG, ob2, ob3
var inv, inv1
var road2, ro
var edges
var score = 0
var coins = 0
var coin, coin1, coinG
var le
var Gstate = "play"
var re, ov, ov1, re1
var clo, clo1

function preload() {
  bike1 = loadAnimation("1.png", "2.png")
  road1 = loadImage("climber.png")
  ob1 = loadImage("ob.png")
  coin1 = loadImage("coin.png")
  ob2 = loadImage("ob2.png")
  ob3 = loadImage("ob3.png")
  re1 = loadImage("re.png")
  ov1 = loadImage("gameOver.png")
  clo1 = loadImage("clo.png")

}

function setup() {
  createCanvas(windowWidth, windowHeight)
  bike = createSprite(width - 100, height - 200, 10, 10)
  bike.addAnimation("1", bike1)
  bike.scale = 0.07
  // bike.debug=true
  bike.setCollider("rectangle", 0, -5, 1400, 1500)
  roadG = createGroup()
  ro = createGroup()
  inv = createSprite(width / 2, height - 10, width, 10)
  inv.visible = false

  inv1 = createSprite(50, 300, 10, 1000)
  inv1.visible = false
  edges = createEdgeSprites()
  coinG = createGroup()
  le = createSprite(width / 2, 300, width, 5)
  le.visible = false
  obG = createGroup()

  ov = createSprite(width / 2, height / 2, 10, 10)
  ov.addImage(ov1)

  re = createSprite(width / 2, (height / 2) + 150, 10, 10)
  re.addImage(re1)
  re.scale = 0.1

  //clo=createSprite(width+100,round(random(10,200)),10,10)
  //clo.velocityX=-1
  //clo.addImage(clo1)
  //clo.scale=0.1

}

function draw() {
  background("lightblue")
  if (Gstate === "play") {
    re.visible = false
    ov.visible = false;
    score = score + round(getFrameRate() / 60)
    bike.collide(edges[0])
    bike.velocityY = bike.velocityY + 0.8
    roadsCoin()
    obst()
    cloud()

    if (keyDown("space") && bike.y > 520) {
      bike.velocityY = -8
    }
    bike.collide(inv)
    bike.collide(ro)
    bike.collide(inv1)
    inv1.collide(bike)
    bike.collide(le)
    if (roadG.isTouching(bike)) {
      bike.velocityX = -3

    }
    if (coinG.isTouching(bike)) {

      coins = coins + 1
      coinG.destroyEach()


    }
    if (obG.isTouching(bike)) {
      Gstate = "over"
    }
    fill("green")
  }

  if (Gstate === "over") {
    cloud()
    bike.visible = false
    ro.destroyEach()
    roadG.destroyEach()
    coinG.destroyEach()
    obG.destroyEach()
    fill("lightblue")
    ov.visible = true;
    re.visible = true;
    inv1.collide(bike)
    if (mousePressedOver(re)) {
      reset()


    }
  }



  drawSprites()

  textSize(20)
  text("score:" + score, 3, 20)
  text("coins:" + coins, 3, 40)
}

function roadsCoin() {
  if (frameCount % 10 === 0) {
    road = createSprite(width + 30, height - 10, 10, 10)
    road.addImage(road1)
    road.velocityX = -9
    //road.debug=true
    roadG.add(road)
    road.lifetime = width / 2

  }
  // if(frameCount%100===0){
  if (score % 500 === 0 && score != 0) {
    road2 = createSprite(width + 4000, height - 140, 5000, 10)
    road2.velocityX = -9
    //roadG.add(road2)
    ro.add(road2)
    // road2.lifetime=200

    //}
  }
  if (frameCount % 200 === 0) {
    coin = createSprite(width + 10, 500, 10, 10)
    coin.addImage(coin1)
    coin.scale = 0.05
    coin.velocityX = -9
    coinG.add(coin)
  }


}

function obst() {
  if (frameCount % 300 === 0) {
    ob = createSprite(width + 50, height - 55, 10, 10)
    var ho = round(random(1, 3))
    switch (ho) {
      case 1:
        ob.addImage(ob1)
        ob.scale = 0.15
        break
      case 2:
        ob.addImage(ob2)
        ob.scale = 0.2
        break
      case 3:
        ob.addImage(ob3)
        ob.scale = 0.2
        break

    }

    ob.velocityX = -9

    obG.add(ob)
  }

}

function reset() {
  Gstate = "play"
  bike.visible = true
  score = 0
  coins = 0
  bike.x = width - 100
  bike.y = height - 300
}

function cloud() {
  if (frameCount % 80 === 0) {
    clo = createSprite(width + 100, round(random(10, 200)), 10, 10)
    var num = round(random(1, 3))
    switch (num) {
      case 1:
        clo.velocityX = -2
        clo.scale = 0.1
        break
      case 2:
        clo.velocityX = -3
        clo.scale = 0.15
        break
      case 3:
        clo.velocityX = -4
        clo.scale = 0.2
    }


    clo.addImage(clo1)
    //  clo.scale = 0.1


  }

}