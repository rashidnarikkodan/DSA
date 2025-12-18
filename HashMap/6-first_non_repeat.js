import HashMap from './3-sep_chaining_linked.js'
function findRepeat(str){
    const freq = new HashMap()
    for(let c of str){
        freq.set(c,(freq.get(c)||0)+1)
    }
    for(let c of str){
        if(freq.get(c)===1)return c
    }
    
    return 'No non repeating value'
}
console.log(findRepeat('aabbcddee'));


function groupAnagram(words){
    const map = new HashMap()
    for(let word of words){
        const key = word.split('').sort().join('')
        if(!map.has(key)) map.set(key,[])
            map.get(key).push(word)
    }
    return [...map.values()]
}
console.log(groupAnagram(["eat", "tea", "tan", "ate", "nat", "bat"]));
