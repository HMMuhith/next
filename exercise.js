function genOTP(){
  return Math.floor(10000+Math.random()*90000).toString()
}

console.log(genOTP())