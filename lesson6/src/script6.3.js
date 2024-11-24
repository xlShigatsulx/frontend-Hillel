function removeElement(array, item) {
    let newArray = [];
    
    for (let i = 0; i < array.length; i++) {
        if (array[i] !== item) newArray[newArray.length] = array[i];
    }

    return newArray;
}

const array = [1, 3, 4, 6, 2, 5, 7];
let newArray = [];

newArray = removeElement(array, 4);
console.log(newArray);