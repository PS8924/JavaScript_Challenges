const parentChildPairs = [
  [1, 3], [2, 3], [3, 6], [5, 6], [15, 9],
  [5, 7], [4, 5], [4, 8], [4, 9], [9, 11]
];

const findNodes = (pairs) =>{
  console.log(pairs);

  const parentCount = {}; // keeping the track of all child and it's count of parents, child will be key here
  //{ 3: 1, 2:0 } here 3 is child and it's parent count is 1, 2 is child and it's parent count is 0
  const uniqueValue = new Set();

  // parents count and gather all unique values  
  pairs.array.forEach(([parent, child]) => {
    if(!(child in parentCount)){
      parentCount[child] = 0;
    }
    parentCount[child]++;
    uniqueValue.add(parent);
    uniqueValue.add(child);
  }); 

    const oneParent = [];
    const zeroParent = [];

   uniqueValue.forEach((a)=>{
      const count = parentCount[a] || 0;
      if(count === 0){
        zeroParent.add(a);
      }else if(count === 1){
        oneParent.add(a);
      }
   });

   return [zeroParent, oneParent];

}

const [zeroParent, oneParent] = findNodes(parentChildPairs);

console.log('zero parents', zeroParent);
console.log('one parents', oneParent);