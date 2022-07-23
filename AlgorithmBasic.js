let EDGES = [
  [0,0,1],
  [0,1,0],
  [0,1,2],
  [0,2,1],
  [1,0,0],
  [2,0,1],
  [1,0,2],
  [2,1,0],
  [2,1,2],
  [1,2,0],
  [1,2,2],
  [2,2,1]
]
let CORNERS = [
  [0,0,0],
  [2,0,0],
  [2,0,2],
  [0,0,2],
  [0,2,0],
  [2,2,0],
  [2,2,2],
  [0,2,2]
]

let YELLOW_CASES = [
  [
    [0,1,0],
    [1,1,1],
    [1,1,0]
  ],
  [
    [0,1,1],
    [1,1,1],
    [0,1,1]
  ],
  [
    [0,1,0],
    [1,1,1],
    [0,1,0]
  ],
  [
    [1,1,0],
    [1,1,1],
    [0,1,1]
  ],
]

  
function arraysEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b)
}
function find_edge(search){
  for (let ind of EDGES){
    let cubie = CUBE.cube_matrix[ind[0]][ind[1]][ind[2]]
    if ((cubie.colors.indexOf(search[0]) != -1 && 
        cubie.colors.indexOf(search[1]) != -1)){
      return ind
    }
  }
}
function find_corner(search){
  for (let ind of CORNERS){
    let cubie = CUBE.cube_matrix[ind[0]][ind[1]][ind[2]]
    if (cubie.colors.indexOf(search[0]) != -1 && 
        cubie.colors.indexOf(search[1]) != -1 &&
       cubie.colors.indexOf(search[2]) != -1){
      return ind
    }
  }
}
function white_cross_edge_up(s){
  // TURN_SPEED = 0.05
  //Search for blue_white edge
  let search = s
  let edge = []
  edge = find_edge(search)
  if (arraysEqual(edge, [2,1,0])){
    TURN_BUFFER = [B_PRIME_TURN, U_PRIME_TURN, B_TURN, U_TURN]
  }
  if (arraysEqual(edge, [2,1,2])){
    TURN_BUFFER = [B_TURN, U_PRIME_TURN, B_PRIME_TURN, U_TURN]
  }
  if (arraysEqual(edge, [0,1,0])){
    TURN_BUFFER = [F_TURN, U_PRIME_TURN, F_PRIME_TURN, U_TURN]
  }
  if (arraysEqual(edge, [0,1,2])){
    TURN_BUFFER = [F_PRIME_TURN, U_PRIME_TURN, F_TURN, U_TURN]
  }
  if (arraysEqual(edge, [0,2,1])){
    TURN_BUFFER = [F_TURN,F_TURN]
  }
  if (arraysEqual(edge, [2,2,1])){
    TURN_BUFFER = [B_TURN,B_TURN]
  }
  if (arraysEqual(edge, [1,2,0])){
    TURN_BUFFER = [L_TURN,L_TURN]
  }
  if (arraysEqual(edge, [1,2,2])){
    TURN_BUFFER = [R_TURN,R_TURN]
  }
  
}

function white_cross_align(S){
  let edge;
  edge = find_edge(S)
  if (edge[0] == 2){
    TURN_BUFFER = [U_TURN,U_TURN]
  }
  if (arraysEqual(edge,[1,0,0])){
    TURN_BUFFER = [U_PRIME_TURN]
  }
  if (arraysEqual(edge,[1,0,2])){
    TURN_BUFFER = [U_TURN]
  }  
}

function white_cross_insert(C){
  let edge;
  edge = find_edge(C)
  if (C[0] == BLUE){
    if ( CUBE.cube_matrix[edge[0]][edge[1]][edge[2]].colors[0] != WHITE){
      TURN_BUFFER = [F_TURN,F_TURN]
    }
    else{
      TURN_BUFFER = [U_PRIME_TURN, R_PRIME_TURN, F_TURN, R_TURN]
    }
  }
  else if (C[0] == RED){
    if ( CUBE.cube_matrix[edge[0]][edge[1]][edge[2]].colors[0] != WHITE){
      TURN_BUFFER = [D_PRIME_TURN, F_TURN, F_TURN, D_TURN]
    }
    else{
      TURN_BUFFER = [D_PRIME_TURN, U_PRIME_TURN, R_PRIME_TURN, F_TURN, R_TURN, D_TURN]
    }
  }
  else if (C[0] == ORANGE){
    if ( CUBE.cube_matrix[edge[0]][edge[1]][edge[2]].colors[0] != WHITE){
      TURN_BUFFER = [D_TURN, F_TURN, F_TURN, D_PRIME_TURN]
    }
    else{
      TURN_BUFFER = [D_TURN, U_PRIME_TURN, R_PRIME_TURN, F_TURN, R_TURN, D_PRIME_TURN]
    }
  }
  else if (C[0] == GREEN){
    if ( CUBE.cube_matrix[edge[0]][edge[1]][edge[2]].colors[0] != WHITE){
      TURN_BUFFER = [D_TURN,D_TURN, F_TURN, F_TURN, D_PRIME_TURN,D_PRIME_TURN]
    }
    else{
      TURN_BUFFER = [D_TURN,D_TURN, U_PRIME_TURN, R_PRIME_TURN, F_TURN, R_TURN, D_PRIME_TURN,D_PRIME_TURN]
    }
  }
}

function check_white_cross(C){
  let a = C.cube_matrix[0][2][1].colors
  let b = C.cube_matrix[1][2][2].colors
  let c = C.cube_matrix[2][2][1].colors
  let d = C.cube_matrix[1][2][0].colors

  if (arraysEqual(a, [0, -1, -1, 3, -1, -1]) &&
     arraysEqual(b, [-1, -1, -1, 3, -1, 5]) &&
     arraysEqual(c,[-1, -1, 2, 3, -1, -1]) &&
     arraysEqual(d, [-1, -1, -1, 3, 4, -1])){
      return true
  }
  return false
  
}
//---------
function white_corner_up(C){
  let corner = find_corner(C)
  let colors = CUBE.cube_matrix[corner[0]][corner[1]][corner[2]].colors
  if (arraysEqual(corner,[0,2,0])){
    if (colors[0] == WHITE){
      TURN_BUFFER = [F_TURN, U_TURN, F_PRIME_TURN, U_PRIME_TURN, U_PRIME_TURN]
    }
    else if (colors[4] == WHITE){
      TURN_BUFFER = [L_PRIME_TURN, U_PRIME_TURN, L_TURN]
    }
    else{
      TURN_BUFFER = [L_PRIME_TURN, U_PRIME_TURN, L_TURN]
    }
  }

  if (arraysEqual(corner,[2,2,0])){
    if (colors[4] == WHITE){
      TURN_BUFFER = [D_TURN, F_TURN, U_TURN, F_PRIME_TURN, U_PRIME_TURN, D_PRIME_TURN, U_PRIME_TURN]
    }
    else if (colors[2] == WHITE){
      TURN_BUFFER = [D_TURN, L_PRIME_TURN, U_PRIME_TURN, L_TURN, U_TURN, D_PRIME_TURN, U_PRIME_TURN]
    }
    else{
      TURN_BUFFER = [D_TURN,L_PRIME_TURN, U_PRIME_TURN, L_TURN, U_TURN,D_PRIME_TURN, U_PRIME_TURN]
    }
  }
  if (arraysEqual(corner,[0,2,2])){
    if (colors[0] == WHITE){
      TURN_BUFFER = [F_PRIME_TURN, U_PRIME_TURN, F_TURN, U_TURN]
    }
    else if (colors[5] == WHITE){
      TURN_BUFFER = [R_TURN, U_TURN, R_PRIME_TURN, U_PRIME_TURN]
    }
    else{
      TURN_BUFFER = [R_TURN, U_TURN, R_PRIME_TURN, U_PRIME_TURN]
    }
  }
  if (arraysEqual(corner,[2,2,2])){
    if (colors[5] == WHITE){
      TURN_BUFFER = [D_PRIME_TURN,F_PRIME_TURN, U_PRIME_TURN, F_TURN, U_TURN, D_TURN]
    }
    else if (colors[2] == WHITE){
      TURN_BUFFER = [D_PRIME_TURN, R_TURN, U_TURN, R_PRIME_TURN, U_PRIME_TURN, D_TURN]
    }
    else{
      TURN_BUFFER = [D_PRIME_TURN, R_TURN, U_TURN, R_PRIME_TURN, U_PRIME_TURN, D_TURN]
    }
  }
  //---
  if (arraysEqual(corner,[0,0,0])){
    if (colors[1] == WHITE){
      TURN_BUFFER = [U_PRIME_TURN, R_TURN, U_TURN, U_TURN, R_PRIME_TURN, U_TURN, U_TURN, F_PRIME_TURN, U_PRIME_TURN, F_TURN, U_TURN, U_TURN]
    }
    else{
      TURN_BUFFER = [U_PRIME_TURN]
    }
  }
  if (arraysEqual(corner,[0,0,2])){
    if (colors[1] == WHITE){
      TURN_BUFFER = [R_TURN, U_TURN, U_TURN, R_PRIME_TURN, U_TURN, U_TURN, F_PRIME_TURN, U_PRIME_TURN, F_TURN, U_TURN, U_TURN]
    }
    
  }
  if (arraysEqual(corner,[2,0,0])){
    if (colors[1] == WHITE){
      TURN_BUFFER = [U_PRIME_TURN, U_PRIME_TURN, R_TURN, U_TURN, U_TURN, R_PRIME_TURN, U_TURN, U_TURN, F_PRIME_TURN, U_PRIME_TURN, F_TURN, U_TURN, U_TURN]
    }
    else{
      TURN_BUFFER = [U_TURN,U_TURN]
    }
  }
  if (arraysEqual(corner,[2,0,2])){
    if (colors[1] == WHITE){
      TURN_BUFFER = [U_TURN, R_TURN, U_TURN, U_TURN, R_PRIME_TURN, U_TURN, U_TURN, F_PRIME_TURN, U_PRIME_TURN, F_TURN, U_TURN, U_TURN]
    }
    else{
      TURN_BUFFER = [U_TURN]
    }
  }
}

function white_corner_insert(C){
  let corner = find_corner(C)
  let colors = CUBE.cube_matrix[corner[0]][corner[1]][corner[2]].colors
  if (colors[0] == WHITE){
    if (colors[1] == RED && colors[5] == GREEN){
      TURN_BUFFER = [D_PRIME_TURN, F_PRIME_TURN, U_PRIME_TURN, F_TURN, D_TURN]
    }
    if (colors[1] == ORANGE && colors[5] == BLUE){
      TURN_BUFFER = [D_TURN, F_PRIME_TURN, U_PRIME_TURN, F_TURN, D_PRIME_TURN]
    }
    if (colors[1] == GREEN && colors[5] == ORANGE){
      TURN_BUFFER = [D_TURN, D_TURN, F_PRIME_TURN, U_PRIME_TURN, F_TURN, D_PRIME_TURN, D_PRIME_TURN]
    }
    if (colors[1] == BLUE && colors[5] == RED){
      TURN_BUFFER = [F_PRIME_TURN, U_PRIME_TURN, F_TURN]
    }
  }
  if (colors[5] == WHITE){
    if (colors[0] == RED && colors[1] == GREEN){
      TURN_BUFFER = [D_PRIME_TURN, R_TURN, U_TURN, R_PRIME_TURN, D_TURN]
    }
    if (colors[0] == ORANGE && colors[1] == BLUE){
      TURN_BUFFER = [D_TURN, R_TURN, U_TURN, R_PRIME_TURN, D_PRIME_TURN]
    }
    if (colors[0] == GREEN && colors[1] == ORANGE){
      TURN_BUFFER = [D_TURN, D_TURN, R_TURN, U_TURN, R_PRIME_TURN, D_PRIME_TURN, D_PRIME_TURN]
    }
    if (colors[0] == BLUE && colors[1] == RED){
      TURN_BUFFER = [R_TURN, U_TURN, R_PRIME_TURN]
    }
  }
}

function check_white_corners(){
  let a = CUBE.cube_matrix[0][2][0].colors
  let b = CUBE.cube_matrix[0][2][2].colors
  let c = CUBE.cube_matrix[2][2][0].colors
  let d = CUBE.cube_matrix[2][2][2].colors
  if (arraysEqual(a, [0, -1, -1, 3, 4, -1]) &&
     arraysEqual(b, [0, -1, -1, 3, -1, 5]) &&
     arraysEqual(c, [-1, -1, 2, 3, 4, -1]) &&
     arraysEqual(d, [-1, -1, 2, 3, -1, 5])){
    return true  
  }
  return false
}
//----------
function check_f2l(){
  let a = CUBE.cube_matrix[0][1][0].colors
  let b = CUBE.cube_matrix[2][1][0].colors
  let c = CUBE.cube_matrix[2][1][2].colors
  let d = CUBE.cube_matrix[0][1][2].colors
  if (arraysEqual(a, [0, -1, -1, -1, 4, -1]) &&
     arraysEqual(b, [-1, -1, 2, -1, 4, -1]) &&
     arraysEqual(c, [-1, -1, 2, -1, -1, 5]) &&
     arraysEqual(d, [0, -1, -1, -1, -1, 5])){
    return true  
  }
  return false
}
function f2l_up(C){
  let edge = find_edge(C)
  if (arraysEqual(edge,[0,1,0])){
    //left
    TURN_BUFFER = [U_PRIME_TURN, L_PRIME_TURN, U_TURN, L_TURN, U_TURN, F_TURN, U_PRIME_TURN, F_PRIME_TURN, U_TURN, U_TURN]
  }
  if (arraysEqual(edge,[0,1,2])){
    //right
    TURN_BUFFER = [U_TURN, R_TURN, U_PRIME_TURN, R_PRIME_TURN, U_PRIME_TURN, F_PRIME_TURN, U_TURN, F_TURN, U_TURN, U_TURN]
  }
  if (arraysEqual(edge,[2,1,0])){
    TURN_BUFFER = [U_PRIME_TURN, B_PRIME_TURN, U_TURN, B_TURN, U_TURN, L_TURN, U_PRIME_TURN, L_PRIME_TURN, U_TURN]
  }
  if (arraysEqual(edge,[2,1,2])){
    TURN_BUFFER = [U_TURN, B_TURN, U_PRIME_TURN, B_PRIME_TURN, U_PRIME_TURN, R_PRIME_TURN, U_TURN, R_TURN, U_PRIME_TURN]
  }
  if (arraysEqual(edge,[1,0,0])){
    TURN_BUFFER = [U_PRIME_TURN]
  }
  if (arraysEqual(edge,[1,0,2])){
    TURN_BUFFER = [U_TURN]
  }
  if (arraysEqual(edge,[2,0,1])){
    TURN_BUFFER = [U_PRIME_TURN, U_PRIME_TURN]
  }
}

function f2l_insert(C){
  let edge = find_edge(C)
  let colors = CUBE.cube_matrix[edge[0]][edge[1]][edge[2]].colors

  if (colors[0] == BLUE && colors[1] == RED){
    TURN_BUFFER = [U_TURN, R_TURN, U_PRIME_TURN, R_PRIME_TURN, U_PRIME_TURN, F_PRIME_TURN, U_TURN, F_TURN, U_TURN, U_TURN]
  }
  if (colors[0] == RED && colors[1] == BLUE){
    TURN_BUFFER = [M_HORIZ_TURN, U_PRIME_TURN, L_PRIME_TURN, U_TURN, L_TURN, U_TURN, F_TURN, U_PRIME_TURN, F_PRIME_TURN, U_TURN, U_TURN, M_HORIZ_PRIME_TURN]
  }

  if (colors[0] == GREEN && colors[1] == ORANGE){
    TURN_BUFFER = [M_HORIZ_TURN, M_HORIZ_TURN, U_TURN, R_TURN, U_PRIME_TURN, R_PRIME_TURN, U_PRIME_TURN, F_PRIME_TURN, U_TURN, F_TURN, U_TURN, U_TURN, M_HORIZ_TURN, M_HORIZ_TURN]
  }
  if (colors[0] == ORANGE && colors[1] == GREEN){
    TURN_BUFFER = [M_HORIZ_PRIME_TURN, U_PRIME_TURN, L_PRIME_TURN, U_TURN, L_TURN, U_TURN, F_TURN, U_PRIME_TURN, F_PRIME_TURN, U_TURN, U_TURN, M_HORIZ_TURN]
  }

  if (colors[0] == BLUE && colors[1] == ORANGE){
    TURN_BUFFER = [U_PRIME_TURN, L_PRIME_TURN, U_TURN, L_TURN, U_TURN, F_TURN, U_PRIME_TURN, F_PRIME_TURN, U_TURN, U_TURN]
  }
  if (colors[0] == ORANGE && colors[1] == BLUE){
    TURN_BUFFER = [M_HORIZ_PRIME_TURN, U_TURN, R_TURN, U_PRIME_TURN, R_PRIME_TURN, U_PRIME_TURN, F_PRIME_TURN, U_TURN, F_TURN, U_TURN, U_TURN, M_HORIZ_TURN]
  }

  if (colors[0] == RED && colors[1] == GREEN){
    TURN_BUFFER = [M_HORIZ_TURN,U_TURN, R_TURN, U_PRIME_TURN, R_PRIME_TURN, U_PRIME_TURN, F_PRIME_TURN, U_TURN, F_TURN, U_TURN, U_TURN, M_HORIZ_PRIME_TURN]
  }
  if (colors[0] == GREEN && colors[1] == RED){
    TURN_BUFFER = [M_HORIZ_TURN, M_HORIZ_TURN, U_PRIME_TURN, L_PRIME_TURN, U_TURN, L_TURN, U_TURN, F_TURN, U_PRIME_TURN, F_PRIME_TURN, U_TURN, U_TURN, M_HORIZ_TURN, M_HORIZ_TURN]
  }
}

//----
//TURN_BUFFER = [R_TURN, R_TURN, U_TURN, R_TURN, U_TURN, R_PRIME_TURN, U_PRIME_TURN, R_PRIME_TURN, U_PRIME_TURN, R_PRIME_TURN, U_TURN, R_PRIME_TURN]
function yellow_cross(){
  //Search for L shape
  let TOP = []
  for (let i=2;i>=0;i--){
    let temp = []
    for (let j=0;j<3;j++){
      temp.push(CUBE.cube_matrix[i][0][j].colors[1] == YELLOW ? 1 : 0)
    }
    TOP.push(temp)
  }
  if (TOP[0][1] == 1 && TOP[1][0] == 1 && TOP[2][1] == 1 && TOP[1][2] == 1){
    return true
  }
  //No edges
  if (TOP[0][1] == 0 && TOP[1][0] == 0 && TOP[2][1] == 0 && TOP[1][2] == 0){
    TURN_BUFFER = [F_TURN, R_TURN, U_TURN, R_PRIME_TURN, U_PRIME_TURN, F_PRIME_TURN]
  }
  else if (TOP[0][1] == 1 && TOP[1][0] == 1){
    TURN_BUFFER = [F_TURN, R_TURN, U_TURN, R_PRIME_TURN, U_PRIME_TURN, F_PRIME_TURN, F_TURN, R_TURN, U_TURN, R_PRIME_TURN, U_PRIME_TURN, F_PRIME_TURN]
  }
  else if (TOP[0][1] == 1 && TOP[1][2] == 1){
    TURN_BUFFER = [U_PRIME_TURN, F_TURN, R_TURN, U_TURN, R_PRIME_TURN, U_PRIME_TURN, F_PRIME_TURN, F_TURN, R_TURN, U_TURN, R_PRIME_TURN, U_PRIME_TURN, F_PRIME_TURN]
  }
  else if (TOP[2][1] == 1 && TOP[1][2] == 1){
    TURN_BUFFER = [U_PRIME_TURN, U_PRIME_TURN, F_TURN, R_TURN, U_TURN, R_PRIME_TURN, U_PRIME_TURN, F_PRIME_TURN, F_TURN, R_TURN, U_TURN, R_PRIME_TURN, U_PRIME_TURN, F_PRIME_TURN]
  }
  else if (TOP[2][1] == 1 && TOP[1][0] == 1){
    TURN_BUFFER = [U_TURN, F_TURN, R_TURN, U_TURN, R_PRIME_TURN, U_PRIME_TURN, F_PRIME_TURN, F_TURN, R_TURN, U_TURN, R_PRIME_TURN, U_PRIME_TURN, F_PRIME_TURN]
  }

  else if (TOP[1][0] == 1){
    TURN_BUFFER = [F_TURN, R_TURN, U_TURN, R_PRIME_TURN, U_PRIME_TURN, F_PRIME_TURN]
  }
  else{
    TURN_BUFFER = [U_TURN, F_TURN, R_TURN, U_TURN, R_PRIME_TURN, U_PRIME_TURN, F_PRIME_TURN]
  }
}

function yellow_layer(){
  let TOP = []
  for (let i=2;i>=0;i--){
    let temp = []
    for (let j=0;j<3;j++){
      temp.push(CUBE.cube_matrix[i][0][j].colors[1] == YELLOW ? 1 : 0)
    }
    TOP.push(temp)
  }
  let SOL = [
    [1,1,1],
    [1,1,1],
    [1,1,1]
  ]

  if (arraysEqual(TOP,SOL)){
    return true
  }
  else if (arraysEqual(TOP, YELLOW_CASES[0])){
    if (CUBE.cube_matrix[0][0][2].colors[0] == YELLOW){
      TURN_BUFFER = [R_TURN, U_TURN, R_PRIME_TURN, U_TURN, R_TURN, U_TURN, U_TURN, R_PRIME_TURN]
    }
    else{
      TURN_BUFFER = [U_TURN, R_PRIME_TURN, U_PRIME_TURN, R_TURN, U_PRIME_TURN, R_PRIME_TURN, U_PRIME_TURN, U_PRIME_TURN, R_TURN]
    }
  }
  else if (arraysEqual(TOP, YELLOW_CASES[1])){
    if (CUBE.cube_matrix[0][0][0].colors[0] == YELLOW){
      TURN_BUFFER = [L_TURN, F_TURN, R_PRIME_TURN, F_PRIME_TURN, L_PRIME_TURN, F_TURN, R_TURN, F_PRIME_TURN]
    }
    else{
      TURN_BUFFER = [U_PRIME_TURN, R_TURN, R_TURN, D_TURN, R_PRIME_TURN, U_TURN, U_TURN, R_TURN, D_PRIME_TURN, R_PRIME_TURN, U_TURN, U_TURN, R_PRIME_TURN]
    }
  }

  else if (arraysEqual(TOP, YELLOW_CASES[3])){
    TURN_BUFFER = [R_PRIME_TURN, F_TURN, R_TURN, B_PRIME_TURN, R_PRIME_TURN, F_PRIME_TURN, R_TURN, B_TURN]
  }

  else if (arraysEqual(TOP, YELLOW_CASES[2])){
    TURN_BUFFER = [R_TURN, U_TURN, R_PRIME_TURN, U_TURN, R_TURN, U_TURN, U_TURN, R_PRIME_TURN]
  }
  else{
    TURN_BUFFER = [U_TURN]
  }
}

//PLL Headlights
function PLL_head(){
  let F_H = false
  let L_H = false
  let B_H = false
  let R_H = false
  if (CUBE.cube_matrix[0][0][0].colors[0] == CUBE.cube_matrix[0][0][2].colors[0]){
    F_H = true
  }
  if (CUBE.cube_matrix[0][0][0].colors[4] == CUBE.cube_matrix[2][0][0].colors[4]){
    L_H = true
  }
  if (CUBE.cube_matrix[2][0][0].colors[2] == CUBE.cube_matrix[2][0][2].colors[2]){
    B_H = true
  }
  if (CUBE.cube_matrix[0][0][2].colors[5] == CUBE.cube_matrix[2][0][2].colors[5]){
    R_H = true
  }

  if (F_H && L_H && B_H && R_H){
    return true
  }
  else if (B_H){
    TURN_BUFFER = [R_PRIME_TURN, F_TURN, R_PRIME_TURN, B_TURN, B_TURN, R_TURN, F_PRIME_TURN, R_PRIME_TURN, B_TURN, B_TURN, R_TURN, R_TURN]
  }
  else if (F_H){
    TURN_BUFFER = [U_TURN, U_TURN, R_PRIME_TURN, F_TURN, R_PRIME_TURN, B_TURN, B_TURN, R_TURN, F_PRIME_TURN, R_PRIME_TURN, B_TURN, B_TURN, R_TURN, R_TURN]
  }
  else if (L_H){
    TURN_BUFFER = [U_TURN, R_PRIME_TURN, F_TURN, R_PRIME_TURN, B_TURN, B_TURN, R_TURN, F_PRIME_TURN, R_PRIME_TURN, B_TURN, B_TURN, R_TURN, R_TURN]
  }
  else if (R_H){
    TURN_BUFFER = [U_PRIME_TURN, R_PRIME_TURN, F_TURN, R_PRIME_TURN, B_TURN, B_TURN, R_TURN, F_PRIME_TURN, R_PRIME_TURN, B_TURN, B_TURN, R_TURN, R_TURN]
  }
  else{
    TURN_BUFFER = [R_PRIME_TURN, F_TURN, R_PRIME_TURN, B_TURN, B_TURN, R_TURN, F_PRIME_TURN, R_PRIME_TURN, B_TURN, B_TURN, R_TURN, R_TURN]
  }
  
}
let PLL_calls = 0
function PLL_final(){
  PLL_calls ++
  let F_H = false
  let L_H = false
  let B_H = false
  let R_H = false
  if (CUBE.cube_matrix[0][0][0].colors[0] == CUBE.cube_matrix[0][0][2].colors[0]
      && CUBE.cube_matrix[0][0][0].colors[0] == CUBE.cube_matrix[0][0][1].colors[0]){
    F_H = true
  }
  if (CUBE.cube_matrix[0][0][0].colors[4] == CUBE.cube_matrix[2][0][0].colors[4] 
      && CUBE.cube_matrix[0][0][0].colors[4] == CUBE.cube_matrix[1][0][0].colors[4]){
    L_H = true
  }
  if (CUBE.cube_matrix[2][0][0].colors[2] == CUBE.cube_matrix[2][0][2].colors[2] 
      && CUBE.cube_matrix[2][0][0].colors[2] == CUBE.cube_matrix[2][0][1].colors[2]){
    B_H = true
  }
  if (CUBE.cube_matrix[0][0][2].colors[5] == CUBE.cube_matrix[2][0][2].colors[5] 
      && CUBE.cube_matrix[0][0][2].colors[5] == CUBE.cube_matrix[1][0][2].colors[5]){
    R_H = true
  }
  if (F_H && L_H && B_H && R_H){
    
    if (CUBE.cube_matrix[0][0][0].colors[0] == RED){
      TURN_BUFFER = [U_PRIME_TURN]
    }
    if (CUBE.cube_matrix[0][0][0].colors[0] == ORANGE){
      TURN_BUFFER = [U_TURN]
    }
    if (CUBE.cube_matrix[0][0][0].colors[0] == GREEN){
      TURN_BUFFER = [U_TURN, U_TURN]
    }
    return true
  }

  if (F_H){
    TURN_BUFFER = [U_TURN, U_TURN, R_TURN, R_TURN, U_TURN, R_TURN, U_TURN, R_PRIME_TURN, U_PRIME_TURN, R_PRIME_TURN, U_PRIME_TURN, R_PRIME_TURN, U_TURN, R_PRIME_TURN]
  }
  else if (B_H){
    TURN_BUFFER = [R_TURN, R_TURN, U_TURN, R_TURN, U_TURN, R_PRIME_TURN, U_PRIME_TURN, R_PRIME_TURN, U_PRIME_TURN, R_PRIME_TURN, U_TURN, R_PRIME_TURN]
  }
  else if (L_H){
    TURN_BUFFER = [U_TURN, R_TURN, R_TURN, U_TURN, R_TURN, U_TURN, R_PRIME_TURN, U_PRIME_TURN, R_PRIME_TURN, U_PRIME_TURN, R_PRIME_TURN, U_TURN, R_PRIME_TURN]
  }
  else if (R_H){
    TURN_BUFFER = [U_PRIME_TURN, R_TURN, R_TURN, U_TURN, R_TURN, U_TURN, R_PRIME_TURN, U_PRIME_TURN, R_PRIME_TURN, U_PRIME_TURN, R_PRIME_TURN, U_TURN, R_PRIME_TURN]
  }
  else{
    TURN_BUFFER = [R_TURN, R_TURN, U_TURN, R_TURN, U_TURN, R_PRIME_TURN, U_PRIME_TURN, R_PRIME_TURN, U_PRIME_TURN, R_PRIME_TURN, U_TURN, R_PRIME_TURN]
  }
  if (PLL_calls > 4){
    PLL_STAGE = -1
  }
  
}