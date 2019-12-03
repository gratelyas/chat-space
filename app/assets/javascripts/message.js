$(function(){ 
  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
    last_message_id = $('.chat-main_message:last').data("message_id");
    $.ajax({
      url: 'api/messages#index {:format=>"json"}', 
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.messages').append(insertHTML);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');   
    })
    .fail(function() {
      window.alert('error');
    });
  }
  };
  function buildHTML(message){
    var image = (message.image)? `<img src=${message.image}>`: '';
    var html =
      ` <div class="chat-main_message" data-message_id=${message.id}>
          <div class="chat-main_message__upper-info">
            <div class="chat-main_message__upper-info__talker">
              ${message.user_name}
            </div>
            <div class="chat-main_message__upper-info__date">
              ${message.date}
            </div>
          </div>
          <div class="lower-message">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
          ${image} 
        </div>`
    return html;
 }
$('.new_message').on('submit', function(e){
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action')
 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
 })
  .done(function(data){
    var html = buildHTML(data);
    $('.messages').append(html);
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');   
    $('form')[0].reset();
  })
  .fail(function(){
    alert('error');
  });
    return false;
  });
  setInterval(reloadMessages, 7000);
})
