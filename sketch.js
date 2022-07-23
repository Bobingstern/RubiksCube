let CUBE;
let TURN_BUFFER = []
let FONT;
let SOLVE_STAGE = -1
let WHITE_CROSS_STAGE = -1
let WHITE_EDGE_COLOR_STAGE = 0
let WHITE_EDGE_COLORS = [[BLUE,WHITE],[RED,WHITE],[GREEN,WHITE],[ORANGE,WHITE]]

let WHITE_CORNER_COLORS = [[WHITE,BLUE,RED],[WHITE,BLUE,ORANGE],[WHITE,RED,GREEN],[WHITE,ORANGE,GREEN]]
let WHITE_CORNER_STAGE = -1
let WHITE_CORNER_COLOR_STAGE = 0

let F2L_STAGE = -1
let F2L_EDGE = 0
let F2L_EDGE_COLORS = [[BLUE, RED], [GREEN, ORANGE], [RED, GREEN], [BLUE, ORANGE]]

let PLL_STAGE = -1
let easycam

let pg
let basic_solve_button;
let fast_solve_button;
let scramble_button;
let make_button;
let increase_turn;
let decrease_turn;
let next_turn;
let play_moves;
let pause_moves;

let SOLVE

let MOVES = []
let SOLVE_MOVES = []
let SOLVE_ARRAY = ""
let play = true
let allow_move = false
let display_buffer = []

let mouseDown = false
let easycam_prev

let MAKE_MODE = false
function scramble(n){
  if (MAKE_MODE){
    return []
  }
  SOLVE_ARRAY = ""
  let arr = [floor(random(0,R_PRIME_TURN+1))]
  for (let i=1;i<n;i++){
    let R = floor(random(0,R_PRIME_TURN+1))
    while (abs(arr[i-1]-R) == 1){
       R = floor(random(0,R_PRIME_TURN+1))
    }
    if (R == 0){
      SOLVE_ARRAY += "F "
    }
    if (R == 1){
      SOLVE_ARRAY += "F' "
    }
    if (R == 2){
      SOLVE_ARRAY += "B "
    }
    if (R == 3){
      SOLVE_ARRAY += "B' "
    }
    if (R == 4){
      SOLVE_ARRAY += "U "
    }
    if (R == 5){
      SOLVE_ARRAY += "U' "
    }
    if (R == 6){
      SOLVE_ARRAY += "D "
    }
    if (R == 7){
      SOLVE_ARRAY += "D' "
    }
    if (R == 8){
      SOLVE_ARRAY += "L "
    }
    if (R == 9){
      SOLVE_ARRAY += "L' "
    }
    if (R == 10){
      SOLVE_ARRAY += "R "
    }
    if (R == 11){
      SOLVE_ARRAY += "R' "
    }
    arr.push(R)
  }
  console.log(arr)
  display_buffer = [...arr]
  return arr
}
function preload(){
  FONT = loadFont('abril.ttf');
}
function setup() {
  createCanvas(window.innerWidth,window.innerHeight, WEBGL)
  document.addEventListener('contextmenu', event => event.preventDefault());
  textFont(FONT)
  pg = createCanvas(width, height)
  CUBE = new RCube(CUBE_SIZE)
  CUBE2 = new RCube(CUBE_SIZE)
  SOLVE = new Cube()
  Cube.initSolver()
  
  easycam = createEasyCam({
    rotation: [0.910003561430488, -0.18509807066041922, -0.36471333387119387, 0.06794414263328984]
  });
  
  scramble_button = createButton('Scramble!');
  scramble_button.position(10, 10);
  scramble_button.size(300,60)
  scramble_button.style("font-size","50px")
  scramble_button.mousePressed(function(){
    if (SOLVE_STAGE == -1){
      TURN_BUFFER = scramble(30)
    }
  });
  basic_solve_button = createButton('Basic Solve!');
  basic_solve_button.position(10, 80);
  basic_solve_button.size(300,60)
  basic_solve_button.style("font-size","50px")
  basic_solve_button.mousePressed(function(){
    if (SOLVE_STAGE == -1){
      SOLVE_STAGE = 0
      SOLVE_ARRAY = ""
    }
  });

  fast_solve_button = createButton('Fast Solve!');
  fast_solve_button.position(10, 155);
  fast_solve_button.size(300,60)
  fast_solve_button.style("font-size","50px")
  fast_solve_button.mousePressed(function(){
    if (!can_turn() || SOLVE_STAGE != -1){
      return
    }
    SOLVE = Cube.fromString(CUBE.to_facelet())
    let S = SOLVE.solve()
    SOLVE_ARRAY = S
    S = S.split(" ")
    console.log(S)
    for (let i of S){
      if (i == "F"){
        TURN_BUFFER.push(F_TURN)
      }
      if (i == "F'"){
        TURN_BUFFER.push(F_PRIME_TURN)
      }
      if (i == "F2"){
        TURN_BUFFER.push(F_TURN)
        TURN_BUFFER.push(F_TURN)
      }
      if (i == "B"){
        TURN_BUFFER.push(B_TURN)
      }
      if (i == "B'"){
        TURN_BUFFER.push(B_PRIME_TURN)
      }
      if (i == "B2"){
        TURN_BUFFER.push(B_TURN)
        TURN_BUFFER.push(B_TURN)
      }
      if (i == "R"){
        TURN_BUFFER.push(R_TURN)
      }
      if (i == "R'"){
        TURN_BUFFER.push(R_PRIME_TURN)
      }
      if (i == "R2"){
        TURN_BUFFER.push(R_TURN)
        TURN_BUFFER.push(R_TURN)
      }
      if (i == "L"){
        TURN_BUFFER.push(L_TURN)
      }
      if (i == "L'"){
        TURN_BUFFER.push(L_PRIME_TURN)
      }
      if (i == "L2"){
        TURN_BUFFER.push(L_TURN)
        TURN_BUFFER.push(L_TURN)
      }
      if (i == "U"){
        TURN_BUFFER.push(U_TURN)
      }
      if (i == "U'"){
        TURN_BUFFER.push(U_PRIME_TURN)
      }
      if (i == "U2"){
        TURN_BUFFER.push(U_TURN)
        TURN_BUFFER.push(U_TURN)
      }
      if (i == "D"){
        TURN_BUFFER.push(D_TURN)
      }
      if (i == "D'"){
        TURN_BUFFER.push(D_PRIME_TURN)
      }
      if (i == "D2"){
        TURN_BUFFER.push(D_TURN)
        TURN_BUFFER.push(D_TURN)
      }
    }
    SOLVE_MOVES = [...TURN_BUFFER]
  });
  
  make_button = createButton('Toggle Make Mode (Off)');
  make_button.position(10, 225);
  make_button.size(300,60)
  make_button.style("font-size","25px")
  make_button.mousePressed(function(){
    MAKE_MODE = !MAKE_MODE
    if (MAKE_MODE){
      make_button.html("Toggle Make Mode (On)")
    }
    else{
      make_button.html("Toggle Make Mode (Off)")
    }
  });

  increase_turn = createButton('Increase turn speed');
  increase_turn.position(10, 295);
  increase_turn.size(300,60)
  increase_turn.style("font-size","25px")
  increase_turn.mousePressed(function(){
    TURN_SPEED += 0.02
    TURN_SPEED = constrain(TURN_SPEED, 0.01, PI/2)
  });

  increase_turn = createButton('Decrease turn speed');
  increase_turn.position(10, 365);
  increase_turn.size(300,60)
  increase_turn.style("font-size","25px")
  increase_turn.mousePressed(function(){
    TURN_SPEED -= 0.02
    TURN_SPEED = constrain(TURN_SPEED, 0.01, PI/2)
  });

  next_turn = createButton('Next move');
  next_turn.position(10, 365+80);
  next_turn.size(300,60)
  next_turn.style("font-size","30px")
  next_turn.mousePressed(function(){
    allow_move = true
  });

  play_moves = createButton('Pause');
  play_moves.position(10, 365+80+80);
  play_moves.size(300,60)
  play_moves.style("font-size","30px")
  play_moves.mousePressed(function(){
    play = !play
    if (play){
      play_moves.html("Play")
    }
    else{
      play_moves.html("Pause")
    }
  });
  // pause_moves = createButton('Pause moves');
  // pause_moves.position(10, 365+80+80+80);
  // pause_moves.size(300,60)
  // pause_moves.style("font-size","30px")
  // pause_moves.mousePressed(function(){
  //   play = !true
  // });
  easycam.scale_rotation = 0.0005
  

  addScreenPositionFunction();
}
function can_turn(){
  if (CUBE.animation_queue == -1 && TURN_BUFFER.length == 0){
    return true
  }
  return false
}
function toEuler(q){
  let sinr_cosp = 2 * (q[0] * q[1] + q[2] * q[3]);
  let cosr_cosp = 1 - 2 * (q[1] * q[1] + q[2] * q[2]);
  let roll = atan2(sinr_cosp, cosr_cosp);
  let pitch
  let yaw
  // pitch (y-axis rotation)
  let sinp = 2 * (q[0] * q[2] - q[3] * q[1]);
  if (abs(sinp) >= 1){
      pitch = Math.sign(sinp) * (PI/2); // use 90 degrees if out of range
  }
  else{
      pitch = asin(sinp);
  }

  // yaw (z-axis rotation)
  let siny_cosp = 2 * (q[0] * q[3] + q[1] * q[2]);
  let cosy_cosp = 1 - 2 * (q[2] * q[2] + q[3] * q[3]);
  yaw = atan2(siny_cosp, cosy_cosp);

  return [roll,pitch,yaw];
}

let selected = undefined
let d_x = 0
function draw() {
  
  background(220)
  strokeWeight(5)
  easycam.state.distance = 500
  if (MAKE_MODE){
    easycam.state_reset.rotation = easycam.getRotation()
  }
  else{
    easycam.state_reset.rotation =  [0.910003561430488, -0.18509807066041922, -0.36471333387119387, 0.06794414263328984]
  }
  if (play){
    allow_move = true
  }
  //------------
  push()
  let a = toEuler(easycam.state.rotation)
  rotateX(-a[0])
  rotateY(-a[1])
  rotateZ(-a[2])
  fill(0)
  let SS = 30
  translate(-340,-254,0)
  textSize(SS)
  textAlign(CENTER)
  text(SOLVE_ARRAY,0,0)
  //translate(-340,-254,0)
  
  pop()
  // let SO = "None"
  // if (SOLVE_STAGE == 0){
  //   SO = "White Cross"
  // }
  // if (SOLVE_STAGE == 1){
  //   SO = "White Corners"
  // }
  // if (SOLVE_STAGE == 2){
  //   SO = "F2L (First 2 layers)"
  // }
  // if (SOLVE_STAGE == 3){
  //   SO = "Yellow Cross"
  // }
  // if (SOLVE_STAGE == 4){
  //   SO = "Yellow Face"
  // }
  // if (SOLVE_STAGE == 5){
  //   SO = "PLL (Permuting last layer)"
  // }
  // let X = width/5.3/12
  // let Y = height/4.5/4.8
  // pg.text("Turn Speed: "+round(TURN_SPEED*100)/100+ " (ARROWS to change)",X,Y)
  // pg.text("S to scramble, SPACE to solve",X,Y+30)
  // pg.text("Turning keys are labeled on the cube faces",X,Y+60)
  // pg.text("Hold shift to turn the other way",X,Y+90)
  // pg.text("Solve Stage: "+SO, X, Y+150)
  // texture(pg)
  // //plane(300,100)
  // pop()
  if (SOLVE_STAGE == 0){
    if (check_white_cross(CUBE)){
      SOLVE_STAGE = 1
    }
    else if (can_turn()){
      // if (WHITE_EDGE_COLOR_STAGE == 0){
      //   Tree(blue_cond)
      //   WHITE_EDGE_COLOR_STAGE++
      // }
      // else if (WHITE_EDGE_COLOR_STAGE == 1){
      //   Tree(red_cond)
      //   WHITE_EDGE_COLOR_STAGE++
      // }
      // else if (WHITE_EDGE_COLOR_STAGE == 2){
      //   Tree(green_cond)
      //   WHITE_EDGE_COLOR_STAGE++
      // }
      // else if (WHITE_EDGE_COLOR_STAGE == 3){
      //   Tree(orange_cond)
      //   WHITE_EDGE_COLOR_STAGE++
      //   SOLVE_STAGE = 1
      // }
      if (WHITE_CROSS_STAGE == -1){
        WHITE_CROSS_STAGE = 0
        white_cross_edge_up(WHITE_EDGE_COLORS[WHITE_EDGE_COLOR_STAGE])
      }
      else if (WHITE_CROSS_STAGE == 0){
        WHITE_CROSS_STAGE = 1
        white_cross_align(WHITE_EDGE_COLORS[WHITE_EDGE_COLOR_STAGE])
      }
      else if (WHITE_CROSS_STAGE == 1){
        WHITE_CROSS_STAGE = -1
        white_cross_insert(WHITE_EDGE_COLORS[WHITE_EDGE_COLOR_STAGE])
        WHITE_EDGE_COLOR_STAGE ++
        if (WHITE_EDGE_COLOR_STAGE >= 4){
          SOLVE_STAGE = 1
        }
      }
    }
  }
  if (SOLVE_STAGE == 1){
    if (check_white_corners()){
      SOLVE_STAGE = 2
    }
    else if (can_turn()){
      if (WHITE_CORNER_STAGE == -1){
        WHITE_CORNER_STAGE = 0
        white_corner_up(WHITE_CORNER_COLORS[WHITE_CORNER_COLOR_STAGE])
      }
      else if (WHITE_CORNER_STAGE == 0){
        WHITE_CORNER_STAGE = -1
        white_corner_insert(WHITE_CORNER_COLORS[WHITE_CORNER_COLOR_STAGE])
        WHITE_CORNER_COLOR_STAGE ++ 
        if (WHITE_CORNER_COLOR_STAGE >= 4){
          SOLVE_STAGE = 2
        }
      }
    }
  }
  if (SOLVE_STAGE == 2){
    if (check_f2l()){
      SOLVE_STAGE = 3
    }
    else if (can_turn()){
      if (F2L_STAGE == -1){
        F2L_STAGE = 0
        f2l_up(F2L_EDGE_COLORS[F2L_EDGE])
      }
      else if (F2L_STAGE == 0){
        F2L_STAGE = -1
        f2l_insert(F2L_EDGE_COLORS[F2L_EDGE])
        F2L_EDGE ++
        if (F2L_EDGE >= 4){
          SOLVE_STAGE = 3
        }
      }
    }
  }
  if (SOLVE_STAGE == 3){
    if (can_turn()){
      if (yellow_cross()){
        SOLVE_STAGE = 4
      }
    }
  }
  if (SOLVE_STAGE == 4){
    if (can_turn()){
      if (yellow_layer()){
        SOLVE_STAGE = 5
      }
    }
  }
  if (SOLVE_STAGE == 5){
    if (can_turn()){
      if (PLL_STAGE == -1){
        if (PLL_head()){
          PLL_STAGE = 0
        }
      }
      else if (PLL_STAGE == 0){
        if (PLL_final()){
          console.log(MOVES)
          SOLVE_STAGE = -1
          MOVES = []
          F2L_EDGE = 0
          WHITE_CORNER_COLOR_STAGE = 0
          WHITE_EDGE_COLOR_STAGE = 0
          PLL_STAGE = -1
        }
      }
    }
  }
  
  //----------------
  //--- buffer
  if (CUBE.animation_queue == -1 && TURN_BUFFER.length > 0 && allow_move){
    if (SOLVE_STAGE != -1){
      MOVES.push(TURN_BUFFER[0])
    }
    CUBE.run_move(TURN_BUFFER[0])
    TURN_BUFFER.splice(0,1)
    allow_move = false
  }
  //----
  CUBE.show()
  
  
}

function keyPressed(){
  
  if (keyCode == 38){
    TURN_SPEED += 0.02
  }
  if (keyCode == 40){
    TURN_SPEED -= 0.02
  }
  TURN_SPEED = constrain(TURN_SPEED, 0.01, PI/2)
  //F
  if (SOLVE_STAGE != -1 || !can_turn() || MAKE_MODE){
    return
  }
  if (keyCode == 32){
    SOLVE_STAGE = 0
  }
  if (keyCode == 83){
    TURN_BUFFER = scramble(30)
  }
  if (keyCode === 70){
    if (keyIsDown(16)){
      CUBE.F_prime_turn_anim()
    }
    else{
      CUBE.F_turn_anim()
    }
  }
  //B
  if (keyCode === 66){
    if (keyIsDown(16)){
      CUBE.B_prime_turn_anim()
    }
    else{
      CUBE.B_turn_anim()
    }
  }
  //U
  if (keyCode === 85){
    if (keyIsDown(16)){
      CUBE.U_prime_turn_anim()
    }
    else{
      CUBE.U_turn_anim()
    }
  }
  //D
  if (keyCode === 68){
    if (keyIsDown(16)){
      CUBE.D_prime_turn_anim()
    }
    else{
      CUBE.D_turn_anim()
    }
  }
  //L
  if (keyCode === 76){
    if (keyIsDown(16)){
      CUBE.L_prime_turn_anim()
    }
    else{
      CUBE.L_turn_anim()
    }
  }
  //R
  if (keyCode === 82){
    if (keyIsDown(16)){
      CUBE.R_prime_turn_anim()
    }
    else{
      CUBE.R_turn_anim()
    }
  }
  //M
  if (keyCode === 77){
    if (keyIsDown(16)){
      CUBE.M_horiz_prime_turn_anim()
    }
    else{
      CUBE.M_horiz_turn_anim()
    }
  }
}


function mousePressed(){
  mouseDown = true
  easycam_prev = [...easycam.state.rotation]
}
function mouseReleased(){
  if (mouseDown && MAKE_MODE){
    let full_diff = 0
    for (let i=0;i<easycam_prev.length;i++){
      full_diff += abs(easycam_prev[i]-easycam.state.rotation[i])
    }
    if (full_diff < 0.1){
      let di = CUBE.get_mouse()
      //console.log(di)
      if (di.length > 0){
        CUBE.cube_matrix[di[0]][di[1]][di[2]].cycle(CUBE.face_view)
      }
    }
  }
  mouseDown = false
}
function mouseClicked() {
  // console.log(mouseButton)
  // if (mouseButton == LEFT) {
  //   let di = CUBE.get_mouse()
  //   if (di.length > 0){
  //     //CUBE.cube_matrix[di[0]][di[1]][di[2]].cycle(0)
  //   }
  // }
}
