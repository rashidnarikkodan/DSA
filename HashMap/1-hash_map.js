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
        this.table[index] = [key,value]
    }
    get(key){
        const index = this._hash(key)
        return this.table[index][1]
    }
    print(){
        return this.table
    }

}
const map = new HashMap()
map.set('name','Rashid narikkodan')
map.set('address','adiyath house')
map.set('age',17)
map.set('gender','feale')
map.set('gender','Male')
console.log(
    map.get('name')
);
console.log(map.print())


//it have a lot of issues called collision due to when hash return same index for multiple keys,
//  So we need collision resolutions or cillision handling techniques


