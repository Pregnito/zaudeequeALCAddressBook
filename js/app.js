$(document).ready(function(){

  // VARIABLES
  var contactList = [
      {
        id: 'dasf23322',
        fullname: 'Abdulqahhar Adaviruku',
        phoneNumber: 2348162740850,
        emailAddress: 'jattoade@gmail.com',
        imageName: 'yuna.jpg'
      },
      {
        id: 'dasf233rt2',
        fullname: 'Lekan Sadiq',
        phoneNumber: 2349082740850,
        emailAddress: 'lekan@gmail.com',
        imageName: 'yuna.jpg'
      }
  ]

  $('.sidenav').sidenav({
      menuWidth: 300, // Default is 300
      edge: 'left', // Choose the horizontal origin
      closeOnClick: false, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true // Choose whether you can drag to open on touch screens
    }
  );

  $('.modal').modal();

  // displayContactItemFunction
  function displayContactItem(contactItems) {
      if (contactItems.length >= 1) { 
        $('.empty-list').hide()
        $('.collection').show()
        console.log('am valid')
        // Iterate through contact list Array and display for each contact item in collection ul
        $.each(contactItems, function( index, contact ) {
          var contactLI = `<li id='${contact.id}' class='collection-item avatar'>
              <img src='images/${contact.imageName}' alt='' class='circle'>
              <p class='title'>
                ${contact.fullname}
              </p>
              <a href='#!' class='secondary-content delete-contact'>
              <i class='material-icons delete-icon'>delete</i>
              </a>
            </li>`;
          $('.collection').append(contactLI)
        });

       } else {
        // display empty list div
        $('.empty-list').show()
        $('.collection').hide()
        console.log('am empty')
       }
  }

  displayContactItem(contactList)

  // TODO: display details on click of contact item
  $('.collection-item').on( "click", function() {
    var instance = M.Modal.getInstance($('#contact-details'));
    instance.open();
  });
  
  // TODO: add new contact to contactList variable and add to DOM

  // TODO: delete contact list from array and from DOM

  // TODO: edit contact item in coctact list array and update DOM

  // TODO: sort Contact list DOM elements

});