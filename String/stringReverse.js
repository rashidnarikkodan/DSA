

//=== range start =====
function range(start,end) {
    // if(end<start) return []
    // const numbers = range(start,end-1)
    // numbers.push(end)
    // return numbers
    if(end<start)return []
    let numbers = range(start,end-1)
    numbers.push(end)
    return numbers
}
// range(1,5) => [1, 2, 3, 4, 5]
// range(1,4) => [1, 2, 3, 4]
// range(1,3) => [1, 2, 3]
// range(1,2) => [1, 2]
// range(1,1) => [1]
// range(1,0) => []

    console.log(range(1,5))
    
    //=== range end =====
    
    // //= = = fibonacci = = = = =
    
    // //fib loop
    // var fib = function (n){
    //     let ar = [0, 1]
    //     for(let i=2;i<=n;i++){
    //         ar.push(ar[i-1]+ar[i-2])
    //     }
    //     console.log(ar)
    //     return ar[n]
    // }
    // console.log(fib(5))

    // //fib recursion
    // const fibo = (n) => n < 2 ? n : fibo(n-1) + fibo(n-2)
    // console.log(fibo(5))

    // // ========== fibonacci end=======

    // //============== reverse a string ==========

    // function reverseStr(str){
    //     return str===''?"":reverseStr(str.substr(1))+str[0]
    // }
    // console.log(reverseStr('anfihS'))




    // function countSubSet(ar){

    // }




    // function subset(ar) {
    //     let result = []
    //     let temp = []
    //     function recSubSet(nums,i){
    //         if(i==ar.length) return result.push([...temp])

    //             temp.push(nums[i])
    //             recSubSet(nums, i+1)
    //             temp.pop()
    //             recSubSet(nums, i+1)
    //     }
    //     recSubSet(ar,0)
    //     return result
    // }

    // console.log(subset([1,2,3]))