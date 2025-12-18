//first approch
const isPalindrom = (str)=>{
    return str<0?false:str === +str.toString().split('').reverse().join("")
}
console.log(isPalindrom(121))

//recursion
function isPalindrom(n){
    if(n[i] !== n[n.length-1]) return false
    else return true
    return isPalindrom(n.slice(1,-1))
}