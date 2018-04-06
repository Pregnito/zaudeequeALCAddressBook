$(document).ready(function(){

  // VARIABLES
  var contactList = []

  // DEPENDENCY CONFIGS
  $('.sidenav').sidenav({
      menuWidth: 300,
      edge: 'left',
      closeOnClick: false,
      draggable: true
    }
  );

  $('.modal').modal();

  // HELPER FUNCTIONS
  function guidGenerator() {
    var S4 = function () {
      return (((1+Math.random())*0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4()+"-"+S4()+"-"+S4()+S4()+S4());
  }

  // sortContactList Function
  function sortContactList(contactList) {
    return contactList.sort(function(prev, next) {
      if (prev.fullname.toLowerCase() < next.fullname.toLowerCase()) return -1;
      if (prev.fullname.toLowerCase() > next.fullname.toLowerCase()) return 1;
      return 0;
    });
  }

  // addItemToDOM
  function addItemToDom(contact) {
    var contactLI = `<li id='${contact.id}' class='collection-item avatar'>
              <img src='https://robohash.org/${contact.fullname}/set_set2' alt='' class='circle'>
              <p class='title'>
                ${contact.fullname}
              </p>
              <a href='#!' class='secondary-content delete-contact'>
              <i class='material-icons delete-icon'>delete</i>
              </a>
            </li>`;
    $('.collection').append(contactLI)
  }

  // displayContactItemFunction
  function displayContactItem(contactItems) {
    // sort contact
    contactItems = sortContactList(contactItems);

    $('.collection').html('');
    if (contactItems.length >= 1) { 
      $('.empty-list').hide()
      $('.collection').show()

      // iterate through contactList Array and add each contactItem to DOM
      $.each(contactItems, function( index, contact ) {
        addItemToDom(contact);
      });

      } else {
        // display empty list div if contactList empty
        $('.empty-list').show()
        $('.collection').hide()
      }
  }

  displayContactItem(contactList)

  // display details on click of contact item
  $('.collection').on( "click", ".collection-item", function(event) {
    currentContact = contactList.find(x => x.id === $(this).attr('id'));
    var instance = M.Modal.getInstance($('#contact-details'));
    instance.open();
    $('#contact-details .modal-content').attr('id', currentContact.id);
    $('#user_image').attr('src', `https://robohash.org/${currentContact.fullname}/set_set2`);
    $('.fullname-detail').html(currentContact.fullname);
    $('.email-detail').html(currentContact.emailAddress);
    $('.telephone-detail').html(currentContact.phoneNumber);
  });
  
  // add new contact to contactList variable and add to DOM
  $('.save-contact').on( "click", function(event) {
    event.preventDefault();
    var fullName = $('input#full_name').val();
    var email = $('input#email').val();
    var telephone = $('input#telephone').val();

    var contactListItem = {
      id: 'z'+guidGenerator(),
      fullname: fullName,
      phoneNumber: telephone,
      emailAddress: email
    }

    contactList.push(contactListItem);
    displayContactItem(contactList);
    var instance = M.Modal.getInstance($('#add_contact_modal'));
    instance.close();
    $('input#full_name').val('');
    $('input#email').val('');
    $('input#telephone').val('');
  });

  // delete contact list from array and from DOM
  $('.collection').on( 'click', '.delete-contact', function(event){
    event.stopPropagation();
    // find index of specific object in contactList using findIndex method.
    contactId = $(this).attr('id');
    contactIndex = contactList.findIndex((obj => obj.id == contactId));
    
    // remove the item from the contactList and from the DOM.
    contactList.splice(contactIndex, 1);
    $(this).parent().remove();

    // if contact list empty, show empty state
    if (contactList.length <= 0) { 
      $('.empty-list').show()
      $('.collection').hide()
    }
  });

  // edit contact item by making element content editable
  $('#contact-details').on( "click", '.edit-icon', function(){
    $('.edit-save-btn').removeClass('hide');
    
    // make the element content editable
    $('.fullname-detail').prop('contenteditable', true).addClass('editable');
    $('.email-detail').prop('contenteditable', true).addClass('editable');
    $('.telephone-detail').prop('contenteditable', true).addClass('editable');
  });

  // save editted contact item in contact list array and update DOM
  $('#contact-details').on( "click", '.edit-save-btn', function(){

    // get contact detail in a variable
    var id = $('#contact-details .modal-content').attr('id');
    var fullName = $('.fullname-detail').text();
    var emailAddress = $('.email-detail').text();
    var phoneNumber = $('.telephone-detail').text();

    // find index of specific object in contactList Array using findIndex method
    contactIndex = contactList.findIndex((obj => obj.id == id));
    
    // update ContactList Array
    contactList[contactIndex].fullname = fullName;
    contactList[contactIndex].emailAddress = emailAddress;
    contactList[contactIndex].phoneNumber = phoneNumber;

    // update contact-image on details modal
    $('#user_image').attr('src', `https://robohash.org/${fullName}/set_set2`);
    
    // update list item on DOM after editting
    $(`li#${id} .title`).html(fullName);
    $(`li#${id} img`).attr('src', `https://robohash.org/${fullName}/set_set2`);

    // change back to normal state and remove from edittable mode
    $('.fullname-detail').prop('contenteditable', false).removeClass('editable');
    $('.email-detail').prop('contenteditable', false).removeClass('editable');
    $('.telephone-detail').prop('contenteditable', false).removeClass('editable');
    
    // hide the save button after saving the item and returning back to normal
    $('.edit-save-btn').addClass('hide');
  });

  // hide save button on close of contact details modal
  $('#contact-details').on( "click", '.edit-close-btn', function(){
    $('.fullname-detail').prop('contenteditable', false).removeClass('editable');
    $('.email-detail').prop('contenteditable', false).removeClass('editable');
    $('.telephone-detail').prop('contenteditable', false).removeClass('editable');
    $('.edit-save-btn').addClass('hide');
  });

  // hide save button on close of contact details modal without clicking close
  $(document).on( "click", '.modal-overlay', function(){
    $('.fullname-detail').prop('contenteditable', false).removeClass('editable');
    $('.email-detail').prop('contenteditable', false).removeClass('editable');
    $('.telephone-detail').prop('contenteditable', false).removeClass('editable');
    $('.edit-save-btn').addClass('hide');
  });

});
