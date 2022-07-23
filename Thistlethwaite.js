
let CUBE2
let samples = new Array(6)
function copy_cube(a, b) {
  for (let z = 0; z < CUBE_SIZE; z++) {
    for (let y = 0; y < CUBE_SIZE; y++) {
      for (let x = 0; x < CUBE_SIZE; x++) {
        b.cube_matrix[z][y][x].colors = [...a.cube_matrix[z][y][x].colors]
      }
    }
  }
}

function Treesearch(moves, cond, C, depth, maxDepth){
  let c = new RCube(CUBE_SIZE)
  copy_cube(C, c)
  if (cond(c)){
    console.log(samples)
    return samples
  }
  else if (depth <= maxDepth){
    for (let i of moves){
      c.run_move_no_anim(i)
      samples[depth] = i
      Treesearch(moves, cond, c, depth+1, maxDepth)
    }
  }
}

function ida(moves, cond, maxDepth){
  for (let m=0;m<maxDepth;m++){
    let f = Treesearch(moves, cond, CUBE, 0, m+1)
    if (f != undefined){
      return f
    }
  }
}

function Tree(possible, cond) {
  let moves_stack = []
  for (let i of possible) {
    moves_stack.push([i])
  }

  for (let N = 0; N < 3; N++) {
    let U = 0
    for (let i of moves_stack) {
      let C = new RCube(CUBE_SIZE)
      copy_cube(CUBE, C)
      for (let m of i) {
        if (i == -1) {
          C.run_move_no_anim(L_TURN)
          C.run_move_no_anim(L_TURN)
        }
        else if (i == -2) {
          C.run_move_no_anim(L_TURN)
          C.run_move_no_anim(L_TURN)
        }
        else {
          C.run_move_no_anim(m)
        }

      }
      //--state
      if (cond(C)) {
        for (let m of i) {
          if (i == -1) {
            TURN_BUFFER.push(L_TURN)
            TURN_BUFFER.push(L_TURN)
          }
          else if (i == -2) {
            TURN_BUFFER.push(L_TURN)
            TURN_BUFFER.push(L_TURN)
          }
          else {
            TURN_BUFFER.push(m)
          }
        }
        return i
      }
      U++
      //---
    }
    for (let i = moves_stack.length - 1; i >= 0; i--) {

      for (let j = 1; j < possible.length; j++) {
        let cpy = [...moves_stack[i]]
        cpy.push(possible[j])
        moves_stack.push(cpy)
      }
      moves_stack[i].push(possible[0])
    }
  }
}

function get_bad_edges(C) {
  let bads = []
  for (let edge of EDGES) {
    let colors = C.cube_matrix[edge[0]][edge[1]][edge[2]].colors
    if (colors[0] == YELLOW || colors[0] == WHITE) {
      bads.push(edge)
    }
    else if (colors[2] == YELLOW || colors[2] == WHITE) {
      bads.push(edge)
    }
    else if ((colors[4] == YELLOW || colors[4] == WHITE) && edge[1] == 0) {
      bads.push(edge)
    }
    else if ((colors[4] == YELLOW || colors[4] == WHITE) && edge[1] == 2) {
      bads.push(edge)
    }
    else if (colors[1] == GREEN || colors[1] == BLUE) {
      bads.push(edge)
    }
    else if (colors[3] == GREEN || colors[3] == BLUE) {
      bads.push(edge)
    }
    else if (edge[1] == 1 && (colors[4] == GREEN || colors[4] == BLUE)) {
      bads.push(edge)
    }
    else if (edge[1] == 1 && (colors[5] == GREEN || colors[5] == BLUE)) {
      bads.push(edge)
    }
  }
  return bads
}

function sort_bad_cond(C) {
  let bads = get_bad_edges(C)
  let bOn = 0
  for (let i of bads) {
    if (i[2] == 2) {
      bOn++
    }
  }
  if (bads.length == 2 && bOn >= 2) {
    return true
  }
  if (bOn >= 4 || bads.length == 0) {
    return true
  }
  return false
}

//-