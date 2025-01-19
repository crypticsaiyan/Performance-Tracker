let box = document.getElementById('words');
let wordlist = [];
let queryString;
fetch('https://random-word-api.vercel.app/api?words=10')
    .then(response => response.json())
    .then(words => {
        words.forEach((word) => {
            wordlist.push(word);
            let sbox = document.createElement('div')
            sbox.textContent = word;
            box.append(sbox)
        })
        queryString = encodeURIComponent(JSON.stringify(wordlist));
        console.log(queryString)
    })
    .catch(error => {
        console.error('Error fetching random words:', error);
    });
// console.log(JSON.stringify(wordlist))
let next= () => {
    window.location.href = `answer.html?words=${queryString}`;
}
document.getElementById('Button').addEventListener('click', next)
setTimeout(next, 30000);