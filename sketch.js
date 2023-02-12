let jsonData;
let img;
let lat;
let long;
let normalizedLat;
let normalizedLong;

function preload() {
  img = loadImage('assets/worldmap.png');
}

function setup() {
  createCanvas(1000, 650);
  frameRate(1);
}

function draw() {
  background(220);
  image(img, 0, 0);
  httpGet('http://api.open-notify.org/iss-now.json', 'json', false, function(response) {
    if(response.message === 'success') {
    jsonData = response;
    lat = jsonData.iss_position.latitude;
    long = jsonData.iss_position.longitude;
    }
  });

  normalizedLat = map(lat, -90, 90, height, 0);
  normalizedLong = map(long, -180, 180, 0, width);

  noStroke();
  fill(255, 60, 80);
  circle(normalizedLong, normalizedLat, 20);
  textAlign(CENTER);
  textStyle(BOLD);
  textSize(15);
  text('ISS Location', normalizedLong, normalizedLat - 20);
}