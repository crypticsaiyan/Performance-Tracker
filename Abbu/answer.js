// Ensure the DOM is fully loaded before accessing window.location
let words=[];
let correct=0;
let box = document.getElementById('answers');
let superdiv;
let removehidden=()=>{
    superdiv=document.getElementById('input')
    superdiv.classList.remove('hidden');
}
let over=()=>{
    timeOverWindow.classList.remove('hidden');
    timeOverWindow.classList.add('block');
}
document.addEventListener('DOMContentLoaded', () => {
    // Log the query string
    // console.log(window.location.search);

    // Get the query parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);

    // Extract and decode the 'words' parameter
    const encodedWords = urlParams.get('words');
    if (encodedWords) {
        words = JSON.parse(decodeURIComponent(encodedWords));
        console.log(words); // Logs the array of words
    } else {
        console.log('No words found in the query string.');
    }
});
document.getElementById('submit').addEventListener('click',()=>{
    let input=document.getElementById('ans').value
    if(words.includes(input)){
        console.log(true)
        correct++;
        let sbox = document.createElement('div')
            sbox.textContent = input;
            box.append(sbox)
            document.getElementById('score').textContent=10-correct;
        document.getElementById('ans').value='';    

    }
    else{
        document.getElementById('ans').value='';    
    console.log(false)
    }
})
setTimeout(removehidden, 10000)
setTimeout(over, 40000);