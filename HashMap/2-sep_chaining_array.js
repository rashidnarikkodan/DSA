class HashMap{
    constructor(size=5){
        this.table = new Array(size)
    }
    _hash(key){
        let total = 0
        for(let c of key) total += c.charCodeAt(0)
        return total%this.table.length
    }
    set(key,value){
        const index = this._hash(key)
        if(!this.table[index]) this.table[index] = [] //here exactly collision handling using array
        for(let pairs of this.table[index]){
            if(pairs[0] == key){
                pairs[1] = value
                return;
            }
        }
        this.table[index].push([key,value])
    }
    get(key){
        const index = this._hash(key)
        let pairs = this.table[index]
        for(let pair of pairs) {
            if(pair[0] == key) return pair[1]
        }
        return undefined
    }
    size(){
        let total =0
       for(let bucket of this.table){
        if(!bucket)continue
        total+=bucket.length
       } 
       return total
    }
    delete(key){
        const index = this._hash(key)
        let pairs = this.table[index]
        for(let i = 0;i < pairs.length;i++){
            if(pairs[i][0]===key){
                pairs.splice(i,1)
            }
        }
    }
    has(key){
        const index = this._hash(key)
        for(let pair of this.table[index]){
            if(pair[0] == key) return true
        }
        return false
    }
    keys(){
        let table = this.table;
        let keysArray = []
        for(let bucket of table){
            if(!bucket)continue;
            let i=0
            while(bucket.length !== i){
                keysArray.push(bucket[i][0])
                i++
            }
        }
        return keysArray
    }
    values(){
        let table = this.table;
        let valuesArray = []
        for(let bucket of table){
            if(!bucket)continue;
            let i=0
            while(bucket.length !== i){
                valuesArray.push(bucket[i][1])
                i++
            }
        }
        return valuesArray
    }
    entries(){
        let table = this.table;
        let valuesArray = []
        for(let bucket of table){
            if(!bucket)continue;
            let i=0
            while(bucket.length !== i){
                valuesArray.push(bucket[i])
                i++
            }
        }
        return valuesArray
    }
}
const map = new HashMap()
map.set('name','Rashid')
map.set('gender','Male')
map.set('address','adiyath house')
map.set('age','17')
map.delete('gender')
console.log(map.get('gender'))
console.log(map.get('address'))
console.log(map.size())
console.log(map.has('a'))
console.log(map.has('name'))
console.log(map.keys())
console.log(map.values())
console.log(map.entries())
