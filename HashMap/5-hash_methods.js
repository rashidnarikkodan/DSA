/*
1. Division method
2. Multiplication method
3. Mid-square method
4. Folding method
5. Digit Extraction method
6. Cryptographic Hash Functions
7. Universal Hashing (Advanced)
*/

let key = "malayalam";
let size = 15;

function divisionHash(key, m) {
  let total = 0;
  for (let c of key) total += c.charCodeAt(0);
  return total % m;
}
function multiplicationHash(key, m) {
  let total = 0;
  for (let c of key) total += c.charCodeAt(0);
  const A = 0.61803398875;
  const fraction = (total * A) % 1;
  return Math.floor(m * fraction);
}
function foldingHash(key,size) {

}
// function divisionHash(){

// }
// function divisionHash(){

// }
// function divisionHash(){

// }
// function divisionHash(){

// }

console.log(divisionHash(key, size));
console.log(multiplicationHash(key, size));


function hash64(str) {
  let h = 0xcbf29ce484222325n;        // 64-bit offset basis
  const prime = 0x100000001b3n;       // 64-bit FNV prime

  for (let c of str) {
    h ^= BigInt(c.charCodeAt(0));     // XOR with byte
    h = (h * prime) & 0xFFFFFFFFFFFFFFFFn;  // keep 64-bit
  }

  return h; // BigInt (0 … 2^64-1)
}

// Example:
console.log(hash64("apple").toString(16)); 
