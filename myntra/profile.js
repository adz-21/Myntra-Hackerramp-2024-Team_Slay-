document.addEventListener('DOMContentLoaded', () => {
    // localStorage.clear();
    // User data (this would typically come from our backend)
    const userData = {
        name: "Aditi Soni",
        profilePicture: "./images/profile.png",
        coins: 0,
        pinsCreated: 0,
        savedPins: [],
        createdPins: [
        ]
    };

    // Populate user profile
    document.getElementById('user-name').textContent = userData.name;
    document.getElementById('profile-picture').src = userData.profilePicture;
    document.getElementById('user-coins').textContent = userData.coins;
    document.getElementById('pins-created').textContent = userData.pinsCreated;

    // Populate saved pins
    const savedPinsContainer = document.getElementById('saved-pins');
    userData.savedPins.forEach(pin => {
        const img = document.createElement('img');
        img.src = pin;
        savedPinsContainer.appendChild(img);
    });

    // Populate created pins
    const createdPinsContainer = document.getElementById('created-pins');
    userData.createdPins.forEach(pin => {
        const img = document.createElement('img');
        img.src = pin;
        createdPinsContainer.appendChild(img);
    });

    // Share profile button functionality
    document.getElementById('share-profile').addEventListener('click', () => {
        const shareData = {
            title: `${userData.name}'s Profile`,
            text: `Check out my profile on MyntraMoods!`,
            url: window.location.href
        };
        navigator.share(shareData).then(() => {
            console.log('Profile shared successfully');
        }).catch(console.error);
    });

    let likedItems = JSON.parse(localStorage.getItem('likedItems')) || [];

    likedItems.forEach(item => {
        $('#saved-pins').append(`<img src="${item.src}" alt="Liked Item">`);
    });

    let createdPins = JSON.parse(localStorage.getItem('createdPins')) || [];

    createdPins.forEach(item => {
        $('#created-pins').append(`<img src="${item.src}" alt="Created Item">`);
    });

    let numberOfPins = createdPins.length; // Get the number of created pins

    // Update the text inside <span id="pins-created"> with the number of pins
    $('#pins-created').text(numberOfPins);

    let coins = numberOfPins*100;
    $('#user-coins').text(coins);

});
