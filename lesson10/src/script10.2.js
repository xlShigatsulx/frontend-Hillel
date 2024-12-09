const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]

function getEvenNumbers(arr) {
	let newArr = [];
    for (let i = 0; i < arr.length && arr[i] % 2 === 0; i++) newArr[newArr.length] = arr[i];
    return newArr;
}
/*function getEvenNumbers(arr) {
	let newArr = [];
    for (let i = 0; i < arr.length; arr[i] % 2 === 0 ? newArr.push(arr[i++]) : i++);
    return newArr;
}*/

const even = getEvenNumbers(arr)
console.log(even) // [2, 4, 6, 8]