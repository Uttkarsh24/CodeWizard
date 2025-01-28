const getScrambleWords = function(arr, count) {
    if (count > arr.length) {
        throw new Error("Count cannot be greater than the array length.");
    }
    const shuffled = arr.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
};

export default getScrambleWords;