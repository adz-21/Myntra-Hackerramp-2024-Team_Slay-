$("#flexSwitchCheckDefault").click(function()
{
     if ($(this).prop('checked')) 
     {
        $('body').css('background-color', 'black');
        $('body').css('color', 'white'); 
     } 
     else 
     {
        $('body').css('background-color', 'white');
        $('body').css('color', 'black'); 
    }
});
