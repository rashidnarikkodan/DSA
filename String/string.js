// const str = 'pani pori'
// function reverse(str){
//     if(str.length == 0)return ""
//     return reverse(str.slice(1))+str[0]
//     let result = ''
//     for(let i=str.length-1;i>=0;i--){
//         result+=str[i]
//     }
//     return result
// } 
// console.log(reverse(str))

// function isPalindrome(str){
//     if(str.length<=1)return true
//     if(str[0]!==str[str.length-1]) return false
//     return isPalindrome(str.slice(1,-1))
// }
// console.log(isPalindrome('sts'))

// function nonRepeat(str){
//     const map=new Map()
//     for(let c of str){
//         if(map.has(c)){
//             map.set(c, map.get(c)+1)
//         }else{
//             map.set(c, 1)
//         }
//     }
//     for(let c of str){
//         if(map.get(c) === 1)return c
//     }
// }
// console.log(nonRepeat('batmob'))


// function rmDuplicate(str){
//     let result = ''
//     const set = new Set()
//     for(let s of str){
//         if(!set.has(s)){
//             result+=s
//             set.add(s)
//         }
//     }
//     return result
// }
// console.log(rmDuplicate('anuragam'));

// function prefix(arr){
//     if(!arr.length) return ''
//     let base = arr[0]
//     for(let i=0;i<base.length;i++){
//         let char = base[i]
//         for(let j=1;j<arr.length;j++){
//             if(char !== arr[j][i] || i >= arr[j].length ){
//                 return base.slice(0,i)
//             }
//         }
//     }
//     return base
// }
// console.log(prefix(['cat','car','kaar']));


// function reverseWord(str){
//     str = str.split('')
//     for(let i=0;i<str.length;i++){
//         if(/[aeiou]/i.test(str[i])){
//             str.splice(i,1)
//         }
//     }
//     return str.join('')
// }
// console.log(reverseWord('The Most Wanted notorias criminal'));


// function isAnagram(str1,str2){
//     if(str1.length !== str2.length)return false
//     let map1 = new Map()
//     let map2 = new Map()
//     for(let c of str1){
//         map1.set(c,(map1.get(c)||0)+1)
//     }
//     for(let c of str2){
//         map2.set(c,(map2.get(c)||0)+1)
//     }
//     for(let s of str1){
//         if(map1.get(s)!==map2.get(s)) return false
//     }
//     return true
// }
// console.log(isAnagram('carr','raec'))

class Node{
    constructor(val){
        this.val = val
        this.next = null
    }
}
