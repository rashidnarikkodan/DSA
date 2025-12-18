// const isAnagram = (s,t) =>{
//     if(s.length!==t.length) return false

//     const obj1={}
//     const obj2={}
//     for (let i = 0; i < s.length; i++) {
//         obj1[s[i]] = (obj1[s[i]]||0)+1
//         obj2[t[i]] = ( obj2[t[i]] || 0 )+1
//     }
//     for (const key of Object.keys(obj1)) {
//         if (obj1[key] !== obj2[key]) return false
//     } 
    
//     return true
// }

// console.log(isAnagram('acr',"rac"))

function sum(ar){
    return ar.length*(ar.length+1)/2
}
console.log(sum([1,2,3,4,5,6,7,8,9,10]))

function missing(ar){
    let n = ar[ar.length-1]
    let missing=[]
    const set = new Set(ar)
    for (let i = 1; i < n; i++) {
        if(!set.has(i)) missing.push(i)
    }
    return missing
}
console.log(missing([1,2,3,4,6,7,8,15]));

function isAnagram(s,t){
    s=s.split('').sort().join('')
    t=t.split('').sort().join('')
    return s==t
}
console.log(isAnagram('car','arc'))