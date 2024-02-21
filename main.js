const socket = io();

socket.on('connect', () => {
    console.log('WebSocket connected!');
});

socket.on('initialVocabulary', (initialVocabulary) => {
    const vocabularyList = document.getElementById('student-list');
    initialVocabulary.forEach((word) => {
        const newWordItem = document.createElement('li');
        newWordItem.textContent = word;
        vocabularyList.appendChild(newWordItem);
    });
});

function addWord(inputId) {
    const inputElement = document.getElementById(inputId);
    const word = inputElement.value.trim();

    if (word !== '') {
        const wordList = document.getElementById('student-list');
        const newWordItem = document.createElement('li');
        newWordItem.textContent = word;
        wordList.appendChild(newWordItem);

        // Send the new word to the server
        socket.emit('newWord', word);

        // Clear the input
        inputElement.value = '';
    }
}

socket.on('newWord', (word) => {
    const wordList = document.getElementById('student-list');
    const newWordItem = document.createElement('li');
    newWordItem.textContent = word;
    wordList.appendChild(newWordItem);
});
