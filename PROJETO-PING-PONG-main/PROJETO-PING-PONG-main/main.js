var somMissed;
var somTouch;
function preload(){
    somMissed = loadSound("missed.wav")
    somTouch = loadSound("ball_touch_paddel.wav")
}
function setup(){
    //crie o canvas
    canvas = createCanvas(400, 400);
    //defina o parent dele para o canvas
    canvas.parent("canvas");
    //capture a imagem de vídeo
    video = createCapture(VIDEO);
    //defina o parent dele para o video
    video.parent("video");

    //crie o robôzinho do ml5 poseNet para detectar a pose
    robozinho  = ml5.poseNet(video, modelReady);
    robozinho.on("pose", gotResult);
    //mande detectar a pose


    raquete = createSprite(20,200,20,100);
    raquete2 = createSprite(380,200,20,100);
    parede1 = createSprite(200,0,400,1);
    parede2 = createSprite(200,400,400,1);
    
    bola = createSprite(200,200,20,20);
    
}
function modelReady(){
    console.log("O modelo está pronto!!!");
}

var pontos = 0;

//crie uma variável para guardar a posiçao do pulso no eixo Y
var pulsoY = 0;

var p = 0; 
//crie a function gotResult e
function gotResult(result){
if(result.length>0){
  console.log(result);
  //mande guardar a posição do pulso na variável
  pulsoY = result[0].pose.rightWrist.y;
  //diz se o braço está no vídeo
  p = result[0].pose.keypoints[10].score
}
}




function draw(){

    background("white");

    //se a posição do pulso for menor que 350 e maior que 50, mude a posição da raquete para que seja a mesma do pulso
    if(p>0.2 && pulsoY<350 && pulsoY>50){
        raquete.y = pulsoY;
    }
  
    textSize(30);
    text(pontos, 50,50);


    

    if(bola.isTouching(raquete)){
        pontos++;
        somTouch.play();
    }
    if( bola.x > 400|| bola.x < 0){
        reiniciar()
        somMissed.play();
    }

    bola.bounceOff(raquete);
    bola.bounceOff(raquete2);
    bola.bounceOff(parede1);
    bola.bounceOff(parede2);

    raquete2.bounceOff(parede1);
    raquete2.bounceOff(parede2);

    raquete.collide(parede1);
    raquete.collide(parede2);

    drawSprites()

}

function reiniciar(){
    raquete2.velocityY = 0;
    raquete2.y = 200;
    bola.velocityX = 0;
    bola.velocityY = 0;
    bola.x = 200;
    bola.y = 200;
}

/* CRIE UMA FUNÇÃO PARA INICIAR O JOGO */
function start(){
/*ELA DEFINE A VELOCIDADE DA BOLA E DA RAQUETE PARA 2 */
 raquete2.velocityY = 2;
 bola.velocityX = 2;
 bola.velocityY = 2;
}

