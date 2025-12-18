class Node{
    constructor(key,value){
        this.key = key;
        this.value = value;
        this.next = null;
    }
}
class HashMap{
    constructor(limit=5){
        this.table = new Array(limit).fill(null)
        this.limit = limit;
        this.size = 0
    }
    _hash(key){
        let total = 0;
        for(let c of key) total+=c.charCodeAt(0)
            return total%this.limit
    }
    set(key,value){
        const index = this._hash(key)
        const node = new Node(key,value)
        this.size++
        if(!this.table[index])return this.table[index] = node
        let current = this.table[index]
        while(current.next){
            if(current.key == key){
                current.value = value
            }
            current = current.next
        }
        if(current.key == key)current.value = value
        else current.next = node
    }
    get(key){
        let index = this._hash(key)
        let current = this.table[index]
        while(current){
            if(current.key === key) return current.value;
            current = current.next
        }
        return undefined
    }
    delete(key){
        let index = this._hash(key)
        if(!this.table[index]) return undefined
        let current = this.table[index]
        let prev = null
        if(current.key == key) return this.table[index] = current.next
        while(current.next && current.key !== key){
            prev = current
            current = current.next
        }
        if(!prev)return undefined
        prev.next = prev.next.next
        this.size--
    }
    length(){
        return this.size
    }
    has(key){
        let index = this._hash(key)
        if(!this.table[index]) return false
        let current = this.table[index]
        while(current){
            if(current.key == key)return true
            current = current.next
        }
        return false 
    }
    keys(){
        let table = this.table
        let keysArr = []
        for(let list of table){
            let current = list
            while(current){
                keysArr.push(current.key)
                current = current.next
            }
        }
        return keysArr
    }
    values(){
        let table = this.table
        let valuesArr = []
        for(let list of table){
            let current = list
            while(current){
                valuesArr.push(current.value)
                current = current.next
            }
        }
        return valuesArr
    }
    entries(){
        let table = this.table
        let entriesArray = []
        for(let list of table){
            let current = list
            while(current){
                entriesArray.push([current.key,current.value])
                current = current.next
            }
        }
        return entriesArray
    }
}
// const map = new HashMap(5)
// map.set('name','Rashid')
// map.set('gender','Male')
// map.set('address','adiyath house')
// map.set('age','17')
// map.delete('asdfa')
// console.log(map.get('gender'))
// console.log(map.get('address'))
// console.log(map.get('name'))
// console.log(map.length())
// console.log(map.has('a'))
// console.log(map.has('name'))
// console.log(map.keys())
// console.log(map.values())
// console.log(map.entries())
// console.log(map.table);

export default HashMap