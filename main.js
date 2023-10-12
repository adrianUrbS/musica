var volumen = 0.4;
var velocidad = 1;
var manoDerX = 0;
var manoDerY = 0;
var manoDerPuntos = 0;
var manoIzqX = 0;
var manoIzqY = 0;
var manoIzqPuntos = 0;

function setup() {
    canvas = createCanvas(640, 480);
    background("black")
    video = createCapture(VIDEO)
    video.hide();
    posenet = ml5.poseNet(video, listo);
    posenet.on("pose", respuesta);
}

function draw() {
    translate(width, 0);
    scale(-1, 1);
    image(video, 0, 0, 640, 480);
    //line(630, 0, 630, 480)
    //text("2.5", 600, 96)
    if (manoDerPuntos > 0.2) {
        fill("red");
        circle(manoDerX, manoDerY, 20);
        volumen = (manoDerY * 5) / 480;
        volumen = 5 - volumen;
        volumen = Math.round(volumen * 10) / 10;
        cancion.setVolume(volumen);
        document.getElementById("volumen").innerHTML = "volumen " + volumen;
    }
    if (manoIzqPuntos > 0.2) {
        fill("blue");
        circle(manoIzqX, manoIzqY, 20);
        if (manoIzqY < 96) {
            velocidad = 2.5;
        }
        else if (manoIzqY < 192) {
            velocidad = 2
        } else if (manoIzqY < 288) {
            velocidad = 1.5;
        }
        else if (manoIzqY < 384) {
            velocidad = 1;
        }
        else if (manoIzqY < 480) {
            velocidad = 0.5;
        }
        document.getElementById("velocidad").innerHTML = "velocidad " + velocidad
        cancion.rate(velocidad);
    }
}

function preload() {
    cancion = loadSound("LessThanZero_TheWeeknd.mp3");
}
function reproducir() {
    if (!cancion.isPlaying()) {
        cancion.play();
        cancion.setVolume(volumen);
        cancion.rate(velocidad);
    }
}
function detener() {
    cancion.stop();
}

function listo() {
    console.log("posenet esta listo")
}
function respuesta(resultados) {
    if (resultados && resultados.length > 0) {
        manoDerX = resultados[0].pose.rightWrist.x;
        manoDerY = resultados[0].pose.rightWrist.y;
        manoDerPuntos = resultados[0].pose.keypoints[10].score;
        manoIzqX = resultados[0].pose.leftWrist.x;
        manoIzqY = resultados[0].pose.leftWrist.y;
        manoIzqPuntos = resultados[0].pose.keypoints[9].score;
    }
}