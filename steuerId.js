function getRandomElement(arr) {
    const i = Math.floor(Math.random() * arr.length);
    return arr[i];
}

function doubleElement(arr) {
    arr.push(getRandomElement(arr));
}

function trippleElement(arr) {
    const e = getRandomElement(arr);
    arr.push(e, e);
}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function remove(arr, n) {
    for (let i = 0; i < n; i++) {
        arr.pop();
    }
}

function getFirstTenDigits() {
    const digits = [];
    for (let i = 0; i < 10; i++) {
        digits.push(i);
    }

    shuffle(digits);

    if (Math.random() > 0.5) {
        remove(digits, 1);
        doubleElement(digits);
    } else {
        remove(digits, 2);
        trippleElement(digits);
    }

    shuffle(digits);

    // the first digit must not be 0
    if (digits[0] === 0) {
        digits.push(digits.shift())
    }


    return digits;
}

function calcCheckDigit(digits) {
    let prod = 0;
    for (let i = 0; i < digits.length; i++) {
        let sum = (digits[i] + prod) % 10;
        if (sum === 0) {
            sum = 10;
        }
        prod = (sum * 2) % 11;
    }

    let check = 11 - prod;
    if (check === 10) {
        check = 0;
    }

    return check;
}

function createSteuerIdDigits() {
    const digits = getFirstTenDigits();
    digits.push(calcCheckDigit(digits));
    return digits;
}
