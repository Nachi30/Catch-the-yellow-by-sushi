var canvas;
var ctx;
var FPS = 50;
var puntos = 0;
var  nivel = 0;
function empieza(){
    canvas = document.getElementById("canvas")
    ctx =  canvas.getContext("2d")

    setInterval(function(){
        principal();
    }, 1000/FPS)
}

function borraCanvas(){
    canvas.width = 480;
    canvas.height = 640;
}

function amarillo(){
    //Creando el objetivo
    this.x = 192
    this.y = 80
    this.draw = function(){
        ctx.fillStyle = "yellow";
        
        ctx.fillRect(this.x, this.y, 64, 64);
    }
    
}
yellow = new amarillo()

function moverAmarillo(){
    this.speed=5
    this.aumento = false
    if (yellow.y>=490){
        posx=Math.floor(Math.random()*3) + 1;
        if (posx==1){
            yellow.x = 42
        }
        if (posx==2){
            yellow.x = 192
        }
        if (posx==3){
            yellow.x = 342
        }
        yellow.y = 80
        
    }
    
    if (puntos==3 || puntos<5){
        this.speed = 6
       
    }
    if (puntos==6 || puntos==7){
        this.speed = 7
        
    }
    if (puntos==8 || puntos==9){
        this.speed = 8
        
    }
    if (puntos==10){
        this.speed = 9
        
    }
    if (puntos>=11 && puntos<13){
        this.speed = 11
        
    }
    if (puntos>=13){
        this.speed = 13
        
    }
   
    yellow.y+=this.speed
}
function personaje(x, y){
    
    //Propiedades del personaje
    this.x = x;
    this.y = y;
    
    //Dibujando al personaje
    this.draw = function(){
        ctx.fillStyle = "red"
        ctx.fillRect(this.x, this.y, 64, 64)
    }
    
}

jugador = new personaje(192,500);

var moverPersonaje = function(){
    canvas.addEventListener("click", function(evento){
        clickeado = true;
        mouseX = evento.clientX;
        mouseY = evento.clientY;
        if (mouseX>canvas.width/2-100 && mouseX<canvas.width/2+100){
            jugador.x=192
        }
        if (mouseX<canvas.width/2-100){
            jugador.x=42
        }
        if (mouseX>canvas.width/2+100){
            jugador.x=342
        }
           

    })

}
function detectaColisiones(){
    var col;
    if (jugador.x == yellow.x){
        if (yellow.y >=490 ){
        col = true;}
    }
    if (col==true){
        puntos++;
        col=false;
    }
    if (yellow.x != jugador.x){
        if (yellow.y >=490){
        puntos = 0
        nivel=0}
    }
}
function hud(){
    this.draw = function(){
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, 640, 70)
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 20px Arial"
    ctx.fillText("SCORE: " + puntos,canvas.width/2-50,30);}

}
function menu(){
    this.draw = function(){
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 48px Consolas"
    ctx.fillText("Catch the yellow!",canvas.width/6-25-30,100);
    ctx.font = "bold 16px Consolas"
    ctx.fillText("By Ignacio Yafe",340,600)
    ctx.fillStyle = "#AAEF85";
    ctx.font = "bold 56px Consolas"
    var boton = new Image();
    boton.src = "img/btn_play.png"
    ctx.drawImage(boton,  canvas.width/3, canvas.height/3)
}
this.logic = function(){
   canvas.addEventListener("click", function(evento){
    mouseX = evento.clientX;
    mouseY = evento.clientY;
    this.click = false
    if (mouseX > canvas.width/3 && mouseX<canvas.width/3 + 128){
        if (mouseY > canvas.height/3 && mouseX<canvas.height/3 + 128){
            this.click = true
        }
    }
    if (this.click==true){
        nivel=1
    }
    })
}
}
    
interfaz = new hud();
inicio = new menu();

function principal(){
    borraCanvas()
    //EL NIVEL 0 - MENU DEL JUEGO
    if (nivel==0){
        inicio.draw();
        inicio.logic();
    }

    //EL NIVEL PRINCIPAL - ESCENA DE JUEGO
    if (nivel==1){
    yellow.draw()
    moverAmarillo()
    jugador.draw();
    detectaColisiones();
    interfaz.draw();
    moverPersonaje();
    }

}