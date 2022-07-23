const CENTER = 0;
const EDGE = 1;
const CORNER = 2;
const SIZE = 60
const CUBE_SIZE = 3
let TURN_SPEED = 0.02
//
const F_TURN = 0
const F_PRIME_TURN = 1
const B_TURN = 2
const B_PRIME_TURN = 3
const U_TURN = 4
const U_PRIME_TURN = 5
const D_TURN = 6
const D_PRIME_TURN = 7
const L_TURN = 8
const L_PRIME_TURN = 9
const R_TURN = 10
const R_PRIME_TURN = 11
const M_HORIZ_TURN = 12
const M_HORIZ_PRIME_TURN = 13

const F2_TURN = 14
const B2_TURN = 15
const L2_TURN = 16
const R2_TURN = 17
const U2_TURN = 18
const D2_TURN = 19

const BLACK = -1
const BLUE = 0
const YELLOW = 1
const GREEN = 2
const WHITE = 3
const ORANGE = 4 
const RED = 5

let SOLVED_CUBE = []
let SOLVED_CUBE_SIDES = []

function transpose(matrix) {
  return matrix[0].map((val, index) => matrix.map(row => row[index]).reverse()) 
}
 
class RCube {
  constructor(s) {
    this.size = s
    this.cube_matrix = []
    this.animation_queue = -1
    this.face_view = 0
    for (let z = 0; z < this.size; z++) {
      let face = []
      for (let y = 0; y < this.size; y++) {
        let row = []
        for (let x = 0; x < this.size; x++) {
          row.push(new Cubie([z, y, x]))
        }
        face.push(row)
      }
      this.cube_matrix.push(face)
    }

    for (let z = 0; z < this.size; z++) {
      let face = []
      let face2 = []
      for (let y = 0; y < this.size; y++) {
        let row = []
        let row2 = []
        for (let x = 0; x < this.size; x++) {
          row.push([...this.cube_matrix[z][y][x].colors])
          row2.push([...this.cube_matrix[z][y][x].sides])
        }
        face.push(row)
        face2.push(row2)
      }
      SOLVED_CUBE.push(face)
      SOLVED_CUBE_SIDES.push(face2)
    }
  }
  run_move(m){
    if (m == F_TURN){
      this.F_turn_anim()
    }
    if (m == F_PRIME_TURN){
      this.F_prime_turn_anim()
    }
    if (m == B_TURN){
      this.B_turn_anim()
    }
    if (m == B_PRIME_TURN){
      this.B_prime_turn_anim()
    }
    if (m == D_TURN){
      this.D_turn_anim()
    }
    if (m == D_PRIME_TURN){
      this.D_prime_turn_anim()
    }
    if (m == U_TURN){
      this.U_turn_anim()
    }
    if (m == U_PRIME_TURN){
      this.U_prime_turn_anim()
    }
    if (m == L_TURN){
      this.L_turn_anim()
    }
    if (m == L_PRIME_TURN){
      this.L_prime_turn_anim()
    }
    if (m == R_TURN){
      this.R_turn_anim()
    }
    if (m == R_PRIME_TURN){
      this.R_prime_turn_anim()
    }
    if (m == M_HORIZ_TURN){
      this.M_horiz_turn_anim()
    }
    if (m == M_HORIZ_PRIME_TURN){
      this.M_horiz_prime_turn_anim()
    }
  }
  run_move_no_anim(m){
    if (m == F_TURN){
      this.F_turn()
    }
    if (m == F2_TURN){
      this.F_turn()
    }
    if (m == F_PRIME_TURN){
      this.F_prime_turn()
    }
    if (m == B_TURN){
      this.B_turn()
    }
    if (m == B_PRIME_TURN){
      this.B_prime_turn()
    }
    if (m == D_TURN){
      this.D_turn()
    }
    if (m == D_PRIME_TURN){
      this.D_prime_turn()
    }
    if (m == U_TURN){
      this.U_turn()
    }
    if (m == U_PRIME_TURN){
      this.U_prime_turn()
    }
    if (m == L_TURN){
      this.L_turn()
    }
    if (m == L_PRIME_TURN){
      this.L_prime_turn()
    }
    if (m == R_TURN){
      this.R_turn()
    }
    if (m == R_PRIME_TURN){
      this.R_prime_turn()
    }
    if (m == M_HORIZ_TURN){
      this.M_horiz_turn()
    }
    if (m == M_HORIZ_PRIME_TURN){
      this.M_horiz_prime_turn()
    }
  }
  F_turn_anim(){
    if (this.animation_queue != -1){
      return
    }
    for (let i=0;i<CUBE_SIZE;i++){
      for (let j=0;j<CUBE_SIZE;j++){
        this.cube_matrix[0][i][j].ang_z = -TURN_SPEED
      }
    }
    this.animation_queue = F_TURN
  }
  F_prime_turn_anim(){
    if (this.animation_queue != -1){
      return
    }
    for (let i=0;i<CUBE_SIZE;i++){
      for (let j=0;j<CUBE_SIZE;j++){
        this.cube_matrix[0][i][j].ang_z = TURN_SPEED
      }
    }
    this.animation_queue = F_PRIME_TURN
  }
  B_turn_anim(){
    if (this.animation_queue != -1){
      return
    }
    for (let i=0;i<CUBE_SIZE;i++){
      for (let j=0;j<CUBE_SIZE;j++){
        this.cube_matrix[2][i][j].ang_z = TURN_SPEED
      }
    }
    this.animation_queue = B_TURN
  }
  B_prime_turn_anim(){
    if (this.animation_queue != -1){
      return
    }
    for (let i=0;i<CUBE_SIZE;i++){
      for (let j=0;j<CUBE_SIZE;j++){
        this.cube_matrix[2][i][j].ang_z = -TURN_SPEED
      }
    }
    this.animation_queue = B_PRIME_TURN
  }
  U_turn_anim(){
    if (this.animation_queue != -1){
      return
    }
    for (let i=CUBE_SIZE-1;i>=0;i--){
      for (let j=0;j<CUBE_SIZE;j++){
        this.cube_matrix[i][0][j].ang_y = -TURN_SPEED
      }
    }
    this.animation_queue = U_TURN
  }
  U_prime_turn_anim(){
    if (this.animation_queue != -1){
      return
    }
    for (let i=CUBE_SIZE-1;i>=0;i--){
      for (let j=0;j<CUBE_SIZE;j++){
        this.cube_matrix[i][0][j].ang_y = TURN_SPEED
      }
    }
    this.animation_queue = U_PRIME_TURN
  }
  M_horiz_turn_anim(){
    if (this.animation_queue != -1){
      return
    }
    for (let i=CUBE_SIZE-1;i>=0;i--){
      for (let j=0;j<CUBE_SIZE;j++){
        this.cube_matrix[i][1][j].ang_y = -TURN_SPEED
      }
    }
    this.animation_queue = M_HORIZ_TURN
  }
  M_horiz_prime_turn_anim(){
    if (this.animation_queue != -1){
      return
    }
    for (let i=CUBE_SIZE-1;i>=0;i--){
      for (let j=0;j<CUBE_SIZE;j++){
        this.cube_matrix[i][1][j].ang_y = TURN_SPEED
      }
    }
    this.animation_queue = M_HORIZ_PRIME_TURN
  }
  D_turn_anim(){
    if (this.animation_queue != -1){
      return
    }
    for (let i=CUBE_SIZE-1;i>=0;i--){
      for (let j=0;j<CUBE_SIZE;j++){
        this.cube_matrix[i][2][j].ang_y = TURN_SPEED
      }
    }
    this.animation_queue = D_TURN
  }
  D_prime_turn_anim(){
    if (this.animation_queue != -1){
      return
    }
    for (let i=CUBE_SIZE-1;i>=0;i--){
      for (let j=0;j<CUBE_SIZE;j++){
        this.cube_matrix[i][2][j].ang_y = -TURN_SPEED
      }
    }
    this.animation_queue = D_PRIME_TURN
  }
  L_turn_anim(){
    if (this.animation_queue != -1){
      return
    }
    for (let i=CUBE_SIZE-1;i>=0;i--){
      for (let j=0;j<CUBE_SIZE;j++){
        this.cube_matrix[j][i][0].ang_x = -TURN_SPEED
      }
    }
    this.animation_queue = L_TURN
  }
  L_prime_turn_anim(){
    if (this.animation_queue != -1){
      return
    }
    for (let i=CUBE_SIZE-1;i>=0;i--){
      for (let j=0;j<CUBE_SIZE;j++){
        this.cube_matrix[j][i][0].ang_x = TURN_SPEED
      }
    }
    this.animation_queue = L_PRIME_TURN
  }
  R_turn_anim(){
    if (this.animation_queue != -1){
      return
    }
    for (let i=CUBE_SIZE-1;i>=0;i--){
      for (let j=0;j<CUBE_SIZE;j++){
        this.cube_matrix[j][i][2].ang_x = TURN_SPEED
      }
    }
    this.animation_queue = R_TURN
  }
  R_prime_turn_anim(){
    if (this.animation_queue != -1){
      return
    }
    for (let i=CUBE_SIZE-1;i>=0;i--){
      for (let j=0;j<CUBE_SIZE;j++){
        this.cube_matrix[j][i][2].ang_x = -TURN_SPEED
      }
    }
    this.animation_queue = R_PRIME_TURN
  }
  
  F_turn(){
    SOLVE.move("F")
    this.cube_matrix[0] = transpose(this.cube_matrix[0])
    for (let i=0;i<CUBE_SIZE;i++){
      for (let j=0;j<CUBE_SIZE;j++){
        this.cube_matrix[0][i][j].index = [0,i,j]
        this.cube_matrix[0][i][j].F_turn()
      }
    }
  }
  F_prime_turn(){
    this.F_turn();this.F_turn();this.F_turn()
  }
  B_prime_turn(){
    SOLVE.move("B'")
    this.cube_matrix[2] = transpose(this.cube_matrix[2])
    for (let i=0;i<CUBE_SIZE;i++){
      for (let j=0;j<CUBE_SIZE;j++){
        this.cube_matrix[2][i][j].index = [2,i,j]
        this.cube_matrix[2][i][j].F_turn()
      }
    }
  }
  B_turn(){
    this.B_prime_turn();this.B_prime_turn();this.B_prime_turn()
  }
  U_turn(){
    SOLVE.move("U")
    //Collect U face colors
    let colors = []
    let colors2 = []
    for (let i=CUBE_SIZE-1;i>=0;i--){
      let temp = []
      let temp2 = []
      for (let j=0;j<CUBE_SIZE;j++){
        temp.push([ ...this.cube_matrix[i][0][j].sides ])
        temp2.push([ ...this.cube_matrix[i][0][j].colors ])
      }
      colors.push(temp)
      colors2.push(temp2)
    }
    let rot = transpose(colors)
    let rot2 = transpose(colors2)
    for (let i=CUBE_SIZE-1;i>=0;i--){
      for (let j=0;j<CUBE_SIZE;j++){
        this.cube_matrix[i][0][j].sides = [...rot[CUBE_SIZE-1-i][j]]
        this.cube_matrix[i][0][j].colors = [...rot2[CUBE_SIZE-1-i][j]]
        this.cube_matrix[i][0][j].U_turn()
      }
    }
  }
  U_prime_turn(){
    this.U_turn();this.U_turn();this.U_turn()
  }
  M_horiz_turn(){
    //Collect U face colors
    SOLVE.move("E'")
    let colors = []
    let colors2 = []
    for (let i=CUBE_SIZE-1;i>=0;i--){
      let temp = []
      let temp2 = []
      for (let j=0;j<CUBE_SIZE;j++){
        temp.push([ ...this.cube_matrix[i][1][j].sides ])
        temp2.push([ ...this.cube_matrix[i][1][j].colors ])
      }
      colors.push(temp)
      colors2.push(temp2)
    }
    let rot = transpose(colors)
    let rot2 = transpose(colors2)
    for (let i=CUBE_SIZE-1;i>=0;i--){
      for (let j=0;j<CUBE_SIZE;j++){
        this.cube_matrix[i][1][j].sides = [...rot[CUBE_SIZE-1-i][j]]
        this.cube_matrix[i][1][j].colors = [...rot2[CUBE_SIZE-1-i][j]]
        this.cube_matrix[i][1][j].U_turn()
      }
    }
  }
  M_horiz_prime_turn(){
    this.M_horiz_turn();this.M_horiz_turn();this.M_horiz_turn()
  }
  D_prime_turn(){
    SOLVE.move("D'")
    //Collect U face colors
    let colors = []
    let colors2 = []
    for (let i=CUBE_SIZE-1;i>=0;i--){
      let temp = []
      let temp2 = []
      for (let j=0;j<CUBE_SIZE;j++){
        temp.push([ ...this.cube_matrix[i][2][j].sides ])
        temp2.push([ ...this.cube_matrix[i][2][j].colors ])
      }
      colors.push(temp)
      colors2.push(temp2)
    }
    let rot = transpose(colors)
    let rot2 = transpose(colors2)
    for (let i=CUBE_SIZE-1;i>=0;i--){
      for (let j=0;j<CUBE_SIZE;j++){
        this.cube_matrix[i][2][j].sides = [...rot[CUBE_SIZE-1-i][j]]
        this.cube_matrix[i][2][j].colors = [...rot2[CUBE_SIZE-1-i][j]]
        this.cube_matrix[i][2][j].U_turn()
      }
    }
  }
  D_turn(){
    this.D_prime_turn();this.D_prime_turn();this.D_prime_turn()
  }
  L_turn(){
    SOLVE.move("L")
    let colors = []
    let colors2 = []
    for (let i=CUBE_SIZE-1;i>=0;i--){
      let temp = []
      let temp2 = []
      for (let j=0;j<CUBE_SIZE;j++){
        temp.push([ ...this.cube_matrix[j][i][0].sides ])
        temp2.push([ ...this.cube_matrix[j][i][0].colors ])
      }
      colors.push(temp)
      colors2.push(temp2)
    }
    let rot = transpose(colors)
    let rot2 = transpose(colors2)
    for (let i=CUBE_SIZE-1;i>=0;i--){
      for (let j=0;j<CUBE_SIZE;j++){
        this.cube_matrix[j][i][0].sides = [...rot[CUBE_SIZE-1-i][j]]
        this.cube_matrix[j][i][0].colors = [...rot2[CUBE_SIZE-1-i][j]]
        this.cube_matrix[j][i][0].L_turn()
      }
    }
  }
  L_prime_turn(){
    this.L_turn();this.L_turn();this.L_turn()
  }
  R_prime_turn(){
    SOLVE.move("R'")
    let colors = []
    let colors2 = []
    for (let i=CUBE_SIZE-1;i>=0;i--){
      let temp = []
      let temp2 = []
      for (let j=0;j<CUBE_SIZE;j++){
        temp.push([ ...this.cube_matrix[j][i][2].sides ])
        temp2.push([ ...this.cube_matrix[j][i][2].colors ])
      }
      colors.push(temp)
      colors2.push(temp2)
    }
    let rot = transpose(colors)
    let rot2 = transpose(colors2)
    for (let i=CUBE_SIZE-1;i>=0;i--){
      for (let j=0;j<CUBE_SIZE;j++){
        this.cube_matrix[j][i][2].sides = [...rot[CUBE_SIZE-1-i][j]]
        this.cube_matrix[j][i][2].colors = [...rot2[CUBE_SIZE-1-i][j]]
        this.cube_matrix[j][i][2].L_turn()
      }
    }
  }
  R_turn(){
    this.R_prime_turn();this.R_prime_turn();this.R_prime_turn();
  }
  get_mouse(){
    let A = toEuler(easycam.getRotation())
    let db = 10000
    let di = []
    let mx = mouseX - width/2
    let my = mouseY - height/2
    if (A[1] < PI/4 && A[1] > -PI/4 && A[0] > -PI/4 && A[0] < PI/4){
      this.face_view = 0
      for (let y=0;y<CUBE_SIZE;y++){
        for (let x=0;x<CUBE_SIZE;x++){
          let P = this.cube_matrix[0][y][x].getScreen(0,0,-SIZE/2)
          let d = dist(mx, my, P.x, P.y)
          if (d < db){
            db = d
            di = [0,y,x]
          }
        }
      }
    }
    else if (A[1] < PI/4 && A[1] > -PI/4 && A[0] < -PI/4 && A[0] > -3*PI/4){
      this.face_view = 1
      for (let z=0;z<CUBE_SIZE;z++){
        for (let x=0;x<CUBE_SIZE;x++){
          let P = this.cube_matrix[z][0][x].getScreen(0,-SIZE/2,0)
          let d = dist(mx, my, P.x, P.y)
          if (d < db){
            db = d
            di = [z,0,x]
          }
        }
      }
    }

    else if ( ((A[0]+2*PI < 5*PI/4 && A[0] < PI) || (A[0] > 0 && A[0] < PI && A[0] > 3*PI/4)) && A[1] < PI/4 && A[1] > -PI/4){
      this.face_view = 2
      for (let y=0;y<CUBE_SIZE;y++){
        for (let x=0;x<CUBE_SIZE;x++){
          let P = this.cube_matrix[2][y][x].getScreen(0,0,SIZE/2)
          let d = dist(mx, my, P.x, P.y)
          if (d < db){
            db = d
            di = [2,y,x]
          }
        }
      }
    }
    else if (A[1] < PI/4 && A[1] > -PI/4 && A[0] < 3*PI/4 && A[0] > PI/3){
      this.face_view = 3
      for (let z=0;z<CUBE_SIZE;z++){
        for (let x=0;x<CUBE_SIZE;x++){
          let P = this.cube_matrix[z][2][x].getScreen(0,SIZE/2,0)
          let d = dist(mx, my, P.x, P.y)
          if (d < db){
            db = d
            di = [z,2,x]
          }
        }
      }
    }
    else if (A[1] < -PI/4 && A[1] > -PI/2){
      this.face_view = 5
      for (let y=0;y<CUBE_SIZE;y++){
        for (let z=0;z<CUBE_SIZE;z++){
          let P = this.cube_matrix[z][y][2].getScreen(-SIZE/2,0,0)
          let d = dist(mx, my, P.x, P.y)
          if (d < db){
            db = d
            di = [z,y,2]
          }
        }
      }
    }
    else{
      this.face_view = 4
      for (let y=0;y<CUBE_SIZE;y++){
        for (let z=0;z<CUBE_SIZE;z++){
          let P = this.cube_matrix[z][y][0].getScreen(SIZE/2,0,0)
          let d = dist(mx, my, P.x, P.y)
          if (d < db){
            db = d
            di = [z,y,0]
          }
        }
      }
    }
    if (db > SIZE){
      di = []
    }
    return di
  }
  show(){
    
    //console.log(A)

    for (let z = 0; z < this.size; z++) {
      for (let y = 0; y < this.size; y++) {
        for (let x = 0; x < this.size; x++) {
          this.cube_matrix[z][y][x].show()
        }
      }
    }
    //----
    
    
    if (this.animation_queue == F_TURN){
      if (this.cube_matrix[0][0][0].ang_z == 0){
        this.animation_queue = -1
        this.F_turn()
      }
    }
    if (this.animation_queue == F_PRIME_TURN){
      if (this.cube_matrix[0][0][0].ang_z == 0){
        this.animation_queue = -1
        this.F_prime_turn()
      }
    }
    
    if (this.animation_queue == B_TURN){
      if (this.cube_matrix[2][0][0].ang_z == 0){
        this.animation_queue = -1
        this.B_turn()
      }
    }
    if (this.animation_queue == B_PRIME_TURN){
      if (this.cube_matrix[2][0][0].ang_z == 0){
        this.animation_queue = -1
        this.B_prime_turn()
      }
    }
    
    if (this.animation_queue == U_TURN){
      if (this.cube_matrix[0][0][0].ang_y == 0){
        this.animation_queue = -1
        this.U_turn()
      }
    }
    if (this.animation_queue == U_PRIME_TURN){
      if (this.cube_matrix[0][0][0].ang_y == 0){
        this.animation_queue = -1
        this.U_prime_turn()
      }
    }

    if (this.animation_queue == M_HORIZ_TURN){
      if (this.cube_matrix[0][1][0].ang_y == 0){
        this.animation_queue = -1
        this.M_horiz_turn()
      }
    }
    if (this.animation_queue == M_HORIZ_PRIME_TURN){
      if (this.cube_matrix[0][1][0].ang_y == 0){
        this.animation_queue = -1
        this.M_horiz_prime_turn()
      }
    }

    if (this.animation_queue == D_TURN){
      if (this.cube_matrix[0][2][0].ang_y == 0){
        this.animation_queue = -1
        this.D_turn()
      }
    }
    if (this.animation_queue == D_PRIME_TURN){
      if (this.cube_matrix[0][2][0].ang_y == 0){
        this.animation_queue = -1
        this.D_prime_turn()
      }
    }

    if (this.animation_queue == L_TURN){
      if (this.cube_matrix[0][0][0].ang_x == 0){
        this.animation_queue = -1
        this.L_turn()
      }
    }
    if (this.animation_queue == L_PRIME_TURN){
      if (this.cube_matrix[0][0][0].ang_x == 0){
        this.animation_queue = -1
        this.L_prime_turn()
      }
    }

    if (this.animation_queue == R_TURN){
      if (this.cube_matrix[0][0][2].ang_x == 0){
        this.animation_queue = -1
        this.R_turn()
      }
    }
    if (this.animation_queue == R_PRIME_TURN){
      if (this.cube_matrix[0][0][2].ang_x == 0){
        this.animation_queue = -1
        this.R_prime_turn()
      }
    }
  }

  color_to_face(n){
    if (n == 0){
      return "F"
    }
    if (n == 1){
      return "U"
    }
    if (n == 2){
      return "B"
    }
    if (n == 3){
      return "D"
    }
    if (n == 4){
      return "L"
    }
    if (n == 5){
      return "R"
    }
    return ""
  }
  to_facelet(){
    let facelet = ""
    for (let z=CUBE_SIZE-1;z>=0;z--){
      for (let x=0;x<CUBE_SIZE;x++){
        facelet += this.color_to_face(this.cube_matrix[z][0][x].colors[1])
      }
    }
    for (let y=0;y<CUBE_SIZE;y++){
      for (let z=0;z<CUBE_SIZE;z++){
        facelet += this.color_to_face(this.cube_matrix[z][y][2].colors[5])
      }
    }
    for (let y=0;y<CUBE_SIZE;y++){
      for (let x=0;x<CUBE_SIZE;x++){
        facelet += this.color_to_face(this.cube_matrix[0][y][x].colors[0])
      }
    }
    for (let z=0;z<CUBE_SIZE;z++){
      for (let x=0;x<CUBE_SIZE;x++){
        facelet += this.color_to_face(this.cube_matrix[z][2][x].colors[3])
      }
    }
    for (let y=0;y<CUBE_SIZE;y++){
      for (let z=CUBE_SIZE-1;z>=0;z--){
        facelet += this.color_to_face(this.cube_matrix[z][y][0].colors[4])
      }
    }
    for (let y=0;y<CUBE_SIZE;y++){
      for (let x=CUBE_SIZE-1;x>=0;x--){
        facelet += this.color_to_face(this.cube_matrix[2][y][x].colors[2])
      }
    }
    
    return facelet
  }
}

class Cubie {
  constructor(index) {
    this.sides = [color(0),color(0),color(0),color(0),color(0),color(0)]
    this.colors = [BLACK,BLACK,BLACK,BLACK,BLACK,BLACK]
    this.index = index
    this.type;
    this.z_rot = 0
    this.y_rot = 0
    this.x_rot = 0
    this.initialise()

    this.ang_z = 0
    this.ang_y = 0
    this.ang_x = 0

    this.corner_cycle = 0
    
  }
  cycle(n){
    this.colors[n] ++ 
    if (this.colors[n] >= 6){
      this.colors[n] = 0
    }
    if (this.colors[n] == BLUE){
      this.sides[n] = color(0,0,255)
    }
    if (this.colors[n] == YELLOW){
      this.sides[n] = color(255,255,0)
    }
    if (this.colors[n] == GREEN){
      this.sides[n] = color(0,255,0)
    }
    if (this.colors[n] == WHITE){
      this.sides[n] = color(255)
    }
    if (this.colors[n] == ORANGE){
      this.sides[n] = color(255,165,0)
    }
    if (this.colors[n] == RED){
      this.sides[n] = color(255,0,0)
    }
  }
  F_turn(){
    let cp = []
    let cp2 = [...this.colors]
    for (let i of this.sides){
      cp.push(color(i.levels[0],i.levels[1],i.levels[2]))
    }
    this.sides[1] = cp[4]
    this.sides[5] = cp[1]
    this.sides[3] = cp[5]
    this.sides[4] = cp[3]

    this.colors[1] = cp2[4]
    this.colors[5] = cp2[1]
    this.colors[3] = cp2[5]
    this.colors[4] = cp2[3]
  }
  U_turn(){
    let cp = []
    let cp2 = [...this.colors]
    for (let i of this.sides){
      cp.push(color(i.levels[0],i.levels[1],i.levels[2]))
    }
    this.sides[0] = cp[5]
    this.sides[4] = cp[0]
    this.sides[2] = cp[4]
    this.sides[5] = cp[2]

    this.colors[0] = cp2[5]
    this.colors[4] = cp2[0]
    this.colors[2] = cp2[4]
    this.colors[5] = cp2[2]
  }
  L_turn(){
    let cp = []
    let cp2 = [...this.colors]
    for (let i of this.sides){
      cp.push(color(i.levels[0],i.levels[1],i.levels[2]))
    }
    this.sides[0] = cp[1]
    this.sides[1] = cp[2]
    this.sides[2] = cp[3]
    this.sides[3] = cp[0]

    this.colors[0] = cp2[1]
    this.colors[1] = cp2[2]
    this.colors[2] = cp2[3]
    this.colors[3] = cp2[0]
  }
  copy(){
    let cpy = new Cubie(this.index)
    cpy.sides = [...this.sides]
    return cpy
  }
  initialise() {
    //Assign corner colors
    if ( (this.index[0] == 0 || this.index[0] == CUBE_SIZE-1) &&
         (this.index[1] == 0 || this.index[1] == CUBE_SIZE-1) && 
         (this.index[2] == 0 || this.index[2] == CUBE_SIZE-1) ){

      //console.log(this.index)
      this.type = CORNER
    }
    else{
      let centers = [
        [0,1,1],
        [1,0,1],
        [1,1,0],
        [2,1,1],
        [1,2,1],
        [1,1,2]
      ]
      for (let i of centers){
        if (this.index[0] == i[0] && this.index[1] == i[1] && this.index[2] == i[2]){
          this.type = CENTER
          break
        }
      }
      if (this.type != CENTER){
        this.type = EDGE
      }
      
    }
    if (this.index[0] == 1 && this.index[1] == 1 && this.index[2] == 1){
      this.type = -1
    }
    if (this.index[0] == 0){
      this.sides[0] = color(0,0,255)
      this.colors[0] = BLUE
    }
    if (this.index[1] == 0){
      this.sides[1] = color(255,255,0)
      this.colors[1] = YELLOW
    }
    if (this.index[1] == 2){
      this.sides[3] = color(255,255,255)
      this.colors[3] = WHITE
    }
    if (this.index[0] == 2){
      this.sides[2] = color(0,255,0)
      this.colors[2] = GREEN
    }
    if (this.index[0] == 2){
      this.sides[2] = color(0,255,0)
      this.colors[2] = GREEN
    }
    if (this.index[2] == 0){
      this.sides[4] = color(255,165,0)
      this.colors[4] = ORANGE
    }
    if (this.index[2] == 2){
      this.sides[5] = color(255,0,0)
      this.colors[5] = RED
    }
  }

  getScreen(xo,yo,zo){
    let x = -this.index[2]*SIZE+SIZE
    let y = this.index[1]*SIZE-SIZE
    let z = this.index[0]*SIZE-SIZE
    push()
    rotateY(PI)
    let p = screenPosition(x+xo,y+yo,z+zo)
    pop()
    return p
  }
  drawCube(x, y, z, colors) {
    let gRotY = PI
    let currB = 1000000
    let currI = -1
    let mx = mouseX - width/2
    let my = mouseY - height/2
    let a = toEuler(easycam.getRotation())
    let phi = a[0]
    let theta = a[1]
    let psi = a[2]
    let rotation_matrix = [
      [cos(theta)*cos(psi), cos(phi)*sin(psi) + sin(phi)*sin(theta)*cos(psi), sin(phi)*sin(psi)-cos(phi)*sin(theta)*cos(psi)],
      [-cos(theta)*sin(psi), cos(phi)*cos(psi)-sin(phi)*sin(theta)*sin(psi), sin(phi)*cos(psi) + cos(phi)*sin(theta)*sin(psi)],
      [sin(theta), -sin(phi)*cos(theta), cos(phi)*cos(theta)]
    ]
    let coord = [x,y,z]
    // let mat = math.multiply(coord, rotation_matrix)
    let mat = Dw.Rotation.applyToVec3(easycam.getRotation(),coord)
    push()
    rotateY(gRotY)
    let p = screenPosition(x,y,z)
    let d = dist(mx,my,p.x,p.y)
    
    pop()
    
    push()
    //noStroke()
    rotateX(this.x_rot)
    rotateY(this.y_rot+gRotY)
    rotateZ(this.z_rot)
    fill(colors[0])
    beginShape()
    vertex(x+SIZE/2,y-SIZE/2,z-SIZE/2)
    vertex(x+SIZE/2,y+SIZE/2,z-SIZE/2)
    vertex(x-SIZE/2,y+SIZE/2,z-SIZE/2)
    vertex(x-SIZE/2,y-SIZE/2,z-SIZE/2)
    endShape(CLOSE)
    
    pop()
    
    push()
    rotateY(gRotY)
    if (this.type == CENTER){
      textSize(CUBE_SIZE*10)
      translate(x, y, z - SIZE / 2-1)
      fill(0)
      rotateY(PI)
      text("F",-textSize()/4,textSize()/4)
    }
    pop()
    //-------------------------------
    push()
    //noStroke()
    rotateX(this.x_rot)
    rotateY(this.y_rot+gRotY)
    rotateZ(this.z_rot)
    fill(colors[1])
    beginShape()
    vertex(x+SIZE/2,y-SIZE/2,z-SIZE/2)
    vertex(x+SIZE/2,y-SIZE/2,z+SIZE/2)
    vertex(x-SIZE/2,y-SIZE/2,z+SIZE/2)
    vertex(x-SIZE/2,y-SIZE/2,z-SIZE/2)
    endShape(CLOSE)

    
    pop()
    push()
    rotateY(gRotY)
    if (this.type == CENTER){
      textSize(CUBE_SIZE*10)
      translate(x, y - SIZE / 2-1, z)
      fill(0)
      rotateY(PI)
      rotateX(PI/2)
      text("U",-textSize()/4,textSize()/4)
    }
    pop()
    //-------------------------------
    push()
    //noStroke()
    rotateX(this.x_rot)
    rotateY(this.y_rot+gRotY)
    rotateZ(this.z_rot)
    fill(colors[2])
    beginShape()
    vertex(x+SIZE/2,y-SIZE/2,z+SIZE/2)
    vertex(x+SIZE/2,y+SIZE/2,z+SIZE/2)
    vertex(x-SIZE/2,y+SIZE/2,z+SIZE/2)
    vertex(x-SIZE/2,y-SIZE/2,z+SIZE/2)
    endShape(CLOSE)
    
    
    pop()
    push()
    rotateY(gRotY)
    if (this.type == CENTER){
      textSize(CUBE_SIZE*10)
      translate(x, y, z + SIZE / 2+1)
      fill(0)
      text("B",-textSize()/4,textSize()/4)
    }
    pop()
    //-------------------------------
    push()
    //noStroke()
    rotateX(this.x_rot)
    rotateY(this.y_rot+gRotY)
    rotateZ(this.z_rot)
    fill(colors[3])
    beginShape()
    vertex(x+SIZE/2,y+SIZE/2,z-SIZE/2)
    vertex(x+SIZE/2,y+SIZE/2,z+SIZE/2)
    vertex(x-SIZE/2,y+SIZE/2,z+SIZE/2)
    vertex(x-SIZE/2,y+SIZE/2,z-SIZE/2)
    endShape(CLOSE)
    
    pop()
    push()
    rotateY(gRotY)
    if (this.type == CENTER){
      textSize(CUBE_SIZE*10)
      translate(x, y + SIZE / 2+1, z)
      fill(0)
      rotateX(PI/2)
      rotateY(PI)
      text("D",-textSize()/4,textSize()/4)
    }
    pop()
    //-------------------------------
    push()
    //noStroke()
    rotateX(this.x_rot)
    rotateY(this.y_rot+gRotY)
    rotateZ(this.z_rot)
    fill(colors[4])
    beginShape()
    vertex(x+SIZE/2,y+SIZE/2,z+SIZE/2)
    vertex(x+SIZE/2,y-SIZE/2,z+SIZE/2)
    vertex(x+SIZE/2,y-SIZE/2,z-SIZE/2)
    vertex(x+SIZE/2,y+SIZE/2,z-SIZE/2)
    endShape(CLOSE)
    
    pop()
    push()
    rotateY(gRotY)
    if (this.type == CENTER){
      textSize(CUBE_SIZE*10)
      translate(x + SIZE / 2+1, y, z)
      fill(0)
      rotateY(PI/2)
      text("L",-textSize()/4,textSize()/4)
    }
    pop()
    //-------------------------------
    push()
    //noStroke()
    rotateX(this.x_rot)
    rotateY(this.y_rot+gRotY)
    rotateZ(this.z_rot)
    fill(colors[5])
    beginShape()
    vertex(x-SIZE/2,y+SIZE/2,z+SIZE/2)
    vertex(x-SIZE/2,y-SIZE/2,z+SIZE/2)
    vertex(x-SIZE/2,y-SIZE/2,z-SIZE/2)
    vertex(x-SIZE/2,y+SIZE/2,z-SIZE/2)
    endShape(CLOSE)
    
    pop()
    push()
    rotateY(gRotY)
    if (this.type == CENTER){
      textSize(CUBE_SIZE*10)
      translate(x - SIZE / 2 - 1, y, z)
      fill(0)
      rotateY(-PI/2)
      text("R",-textSize()/4,textSize()/4)
    }
    pop()
    //-------------------------------
    this.z_rot += this.ang_z
    this.y_rot += this.ang_y
    this.x_rot += this.ang_x
    if (this.y_rot >= PI/2 || this.y_rot <= -PI/2){
      this.ang_y = 0
      this.y_rot = 0
    }
    if (this.x_rot >= PI/2 || this.x_rot <= -PI/2){
      this.ang_x = 0
      this.x_rot = 0
    }
    if (this.z_rot >= PI/2 || this.z_rot <= -PI/2){
      this.ang_z = 0
      this.z_rot = 0
    }
    return [d,p]
  }
  
  show() {
    if (this.ang_x < 0){
      this.ang_x = -TURN_SPEED
    }
    if (this.ang_x > 0){
      this.ang_x = TURN_SPEED
    }
    if (this.ang_y < 0){
      this.ang_y = -TURN_SPEED
    }
    if (this.ang_y > 0){
      this.ang_y = TURN_SPEED
    }
    if (this.ang_z < 0){
      this.ang_z = -TURN_SPEED
    }
    if (this.ang_z > 0){
      this.ang_z = TURN_SPEED
    }
    return this.drawCube(-this.index[2]*SIZE+SIZE,this.index[1]*SIZE-SIZE,this.index[0]*SIZE-SIZE, this.sides)
  }
}



