
    // const fib = (n) => {
    //     if(n<=1)return n
    //     return fib(n-1)+fib(n-2)
    // }
    // console.log(fib(3))
function countVowels(str){
    for (let i=0;i<str.length;i++){
        if(/[aeiou]/i.test(str[i])){
            str[i] = String.fromCharCode(str.charCodeAt(i)+1);
        }
    }
    return str
}
console.log(countVowels('malayalam'));


function removeDup(str){
    if(str.length==0) return str
    if(str[0]==str[1]){
        return removeDup(str.slice(1))
    }else{
        return str[0] + removeDup(str.slice(1))
    }
}
console.log(removeDup('abbcsbsbbbscsss'));

function sub(str,i=0,current=''){
    if(i == str.length) return console.log(current)
     sub(str,i+1,current+str[i])
     sub(str,i+1,current)
}
console.log(sub('abc'));

function countSubSet(ar,i=ar.length){
    if(i == 0) return 1
    return 2*countSubSet(ar,i-1)
}
console.log(countSubSet([1,2]));
