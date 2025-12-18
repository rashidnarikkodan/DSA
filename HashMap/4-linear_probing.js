class HashMap{
    constructor(size=5){
        this.table = new Array(size).fill(null)
    }
    _hash(key){
        let total=0
        for(let c of key)total+=c.charCodeAt(0)
        return total%this.table.length
    }
    _resize(){
        let oldEntries = this.table
        this.table = new Array(oldEntries.length*2).fill(null)
        for(let entry of oldEntries){
            if(!entry) continue;
            this.set(entry[0],entry[1])
        }
    }
    set(key,value){
        let index = this._hash(key)
        let startIndex = index
        if(!this.table[index]){
            this.table[index] = [key,value]
            return 
        }
        while(this.table[index] && this.table[index][0] !== key){
            index = (index+1)%this.table.length
            if(startIndex == index) this._resize()
        }
        this.table[index] = [key,value]
    }
    get(){

    }
    delete(key){
        let index = this._hash(key)
        if(this.table[index][0]==key)return this.table[index][1]
        while(this.table[index]){
            if(this.table[index][0] == key) return this.table[index][1];
            index = (index+1)%this.table.length
        }
        return undefined
    }

}
const map = new HashMap(5)
map.set('name','Rashid')
map.set('gender','Male')
map.set('address','adiyath house')
map.set('age','17')
map.set('education','+2')
console.log(map.set('Skills','MERN'))
console.log(map.delete('name'))
// console.log(map.get('gender'))
// console.log(map.get('address'))
// console.log(map.get('name'))
// console.log(map.length())
// console.log(map.has('a'))
// console.log(map.has('name'))
// console.log(map.keys())
// console.log(map.values())
// console.log(map.entries())
console.log(map.table);
