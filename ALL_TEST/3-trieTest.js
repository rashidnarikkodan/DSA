
class Node{
    constructor(){
        this.children = new Map()
        this.isEnd = false
    }
}
class Trie{
    constructor(){
        this.root = new Node()
        this.clean = (c)=>c.trim().toLowerCase()
    }
    add(word){
        if(typeof word !== 'string') return false
        word=this.clean(word)
        let node = this.root
        for(let char of word){
            let exist = node.children.get(char)
            if(!exist){
                exist = new Node()
                node.children.set(char,exist)
            }
            node = exist
        }
        node.isEnd = true
    }
    remove(word){
        word=this.clean(word)
        this.#delete(this.root,word,0)
    }
    #delete(node, word, i){
        if(!node) return false
        if(i == word.length){
            if(!node.isEnd) return false
            node.isEnd = false
            return node.children.size === 0
        }
        let char = word[i]
        let child= node.children.get(char)
        if(!child)return false
        let shouldDelete = this.#delete(child, word, i+1)
        if(shouldDelete){
            node.children.delete(char)
            return node.children.size === 0 && node.isEnd == false
        }
        return false

    }
    getWords(prefix){
        if(typeof prefix !== 'string') return []
        prefix=this.clean(prefix)
        let node = this.root
        for(let char of prefix){
            if(!node.children.has(char)) return []
            node=node.children.get(char)
        }
        let result=[]
        this.#collect(node,prefix,result)
        return result
    }
    #collect(node,prefix,result){
        if(node.isEnd)result.push(prefix)
        for(let [char,child] of node.children){
            this.#collect(child, prefix+char, result)
        }
    }
    search(){
        
    }
}
const trie = new Trie()
trie.add('rahul')
trie.add('rashid')
trie.add('riswan')
trie.add('ramesh')
trie.remove('ramesh')
console.log(trie.getWords('r'));
