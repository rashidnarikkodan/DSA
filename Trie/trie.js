class TrieNode{
    constructor(){
        this.children = new Map();
        this.isEnd = false;
    }
}
class Trie{
    constructor(clean=(w)=>w.trim().toLowerCase()){
        this.root = new TrieNode();
        this.clean = clean
    }
    insert(word){
        if(typeof word !== 'string')return;
        if(word.length === 0)return this.isEnd = true;
        word = this.clean(word)
        let node = this.root
        for(let char of word){
            let exist = node.children.get(char)
            if(!exist){
                exist = new TrieNode()
                node.children.set(char,exist)
            }
            node = exist
        }
        node.isEnd = true
    }
    search(word){
        if(typeof word !== 'string')return false;
        if(word.length === 0)return this.isEnd === true;
        word = this.clean(word)
        let node = this.root
        for(let char of word){
            let exist = node.children.get(char)
            if(!exist) return false;
            node=exist
        }
        return node.isEnd === true
    }
    startPrefix(prefix){
        if(typeof prefix !== 'string') return;
        if(prefix.length == 0) return [];
        prefix = this.clean(prefix)
        let current = this.root
        for(let char of prefix){
            let exist = current.children.get(char)
            if(!exist) return false;
            current = exist
        }
        return true
    }
    getWordsWithPrefix(prefix){
        if(typeof prefix !== 'string') return undefined
        if(prefix.length == 0) return []
        prefix = this.clean(prefix)
        let current = this.root
        for(let char of prefix){
            let exist = current.children.get(char)
            if(!exist) return []
            current = exist
        }
        let result = []
        this.#dfsPrefix(current, prefix, result)
        return result
    }
    #dfsPrefix(current, prefix, result){
        if(current.isEnd) result.push(prefix)
        for(let [char,child] of current.children){
            this.#dfsPrefix(child,prefix+char,result)
        }
    }
    
    delete(word) {
        this._deleteDFS(this.root, word, 0);
    }

    _deleteDFS(node, word, i) {
        // Word finished: base case
        if (i === word.length) {
            if (!node.isEnd) return false;           // Word not present
            node.isEnd = false;                      // Unmark end
            return node.children.size === 0;         // True if no children -> delete me
        }

        const ch = word[i];
        const child = node.children.get(ch);
        if (!child) return false;                    // Word not present

        const shouldDeleteChild = this._deleteDFS(child, word, i + 1);

        if (shouldDeleteChild) {
            node.children.delete(ch);
            return node.children.size === 0 && !node.isEnd;
        }

        return false;
    }
}

const data = new Trie()
data.insert('adam')
data.insert('alan')
data.insert('andrew')
data.insert('sam')
data.insert('arthur')
data.insert('brian')
data.insert('bruce')
console.log(data.delete('alan'));
console.log(data.getWordsWithPrefix('a'));
