$(document).ready(function() {
     // Handle floating button click to show the modal
    $('#createPinBtn').on('click', function() {
        $('#createPinModal').css('display', 'block');
    });

    // Handle close button click to hide the modal
    $('.close').on('click', function() {
        $('#createPinModal').css('display', 'none');
    });

    // Handle form submission to create a new pin
    $('#createPinForm').on('submit', function(event) {
        event.preventDefault();

        let fileInput = $('#pinImage')[0];
        if (fileInput.files && fileInput.files[0]) {
            let reader = new FileReader();
            reader.onload = function(e) {
                let imgSrc = e.target.result;
                let caption = $('#pinCaption').val();
                let pinId = new Date().getTime(); // Use timestamp as unique ID

                // Create new pin element
                let newPin = `
                    <div class="grid-item">
                        <img class="grid-imgs" src="${imgSrc}" alt="New Post" data-id="${pinId}">
                        <figcaption class="image-caption">${caption}</figcaption>
                        <button type="button" class="btn btn-dark gridbtn">View In 3D</button>
                        <i class="fa-regular fa-heart btn-like btn"></i>
                    </div>
                `;

                // Append new pin to the grid
                $('.grid').append(newPin);

                // Save to localStorage (optional)
                let createdPins = JSON.parse(localStorage.getItem('createdPins')) || [];
                createdPins.push({id: pinId, src: imgSrc, caption: caption});
                localStorage.setItem('createdPins', JSON.stringify(createdPins));

                // Close the modal
                $('#createPinModal').css('display', 'none');

                // Reset the form
                $('#createPinForm')[0].reset();
            };
            reader.readAsDataURL(fileInput.files[0]);
        }
    });

    // // Load created pins from localStorage (optional)
    // let createdPins = JSON.parse(localStorage.getItem('createdPins')) || [];
    // createdPins.forEach(pin => {
    //     let newPin = `
    //         <div class="grid-item">
    //             <img class="grid-imgs" src="${pin.src}" alt="Post" data-id="${pin.id}">
    //             <figcaption class="image-caption">${pin.caption}</figcaption>
    //             <button type="button" class="btn btn-dark gridbtn">View In 3D</button>
    //             <i class="fa-regular fa-heart btn-like btn"></i>
    //         </div>
    //     `;
    //     $('.grid').append(newPin);
    // });

    // //Ensure like button functionality works for dynamically added elements
    // $(document).on('click', '.btn-like', function() {
    //     $(this).toggleClass('red');

    //     let imgSrc = $(this).siblings('img').attr('src');
    //     let imgId = $(this).siblings('img').data('id');

    //     let likedItems = JSON.parse(localStorage.getItem('likedItems')) || [];

    //     if ($(this).hasClass('red')) {
    //         likedItems.push({id: imgId, src: imgSrc});
    //     } else {
    //         likedItems = likedItems.filter(item => item.id !== imgId);
    //     }

    //     localStorage.setItem('likedItems', JSON.stringify(likedItems));
    // });




    // Load liked items from localStorage
    let likedItems = JSON.parse(localStorage.getItem('likedItems')) || [];

    // Mark liked items
    $('.grid-item').each(function() {
        let imgId = $(this).find('img').data('id');
        if (likedItems.some(item => item.id === imgId)) {
            $(this).find('.btn-like').addClass('red');
        }
    });

    // Handle like button click
    $('.btn-like').on('click', function() {
        $(this).toggleClass('red');
        
        let imgSrc = $(this).siblings('img').attr('src');
        let imgId = $(this).siblings('img').data('id');
        
        if ($(this).hasClass('red')) {
            likedItems.push({id: imgId, src: imgSrc});
        } else {
            likedItems = likedItems.filter(item => item.id !== imgId);
        }
        
        localStorage.setItem('likedItems', JSON.stringify(likedItems));
    });
});
