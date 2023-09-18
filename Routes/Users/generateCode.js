const digits=[1,2,3,4,5,6,7,8,9,0]
const code=[]
const getCode=()=>{
for(let i=0;i<6;i++){
  code.push(digits[Math.floor(Math.random()*digits.length)])
}
return code.join("")
}
export default getCode