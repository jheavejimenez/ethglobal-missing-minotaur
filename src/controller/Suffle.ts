export default function Shuffle(array: Array<Array<number>>) {
    let currentIndex = 0;
    let randomIndex = 0;

    let temporaryValue: Array<number>;

    currentIndex = array.length;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};