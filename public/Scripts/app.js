// IIFE -- Immediately Invoked Function Expression
/*   File name: app.js
     Student name: Parth Patel
     Student ID: 301207843
     Assignment: web authentication 
     date : 25th oct 2021   */
(function(){

    function Start()
    {
        console.log("App Started...");

        let deleteButtons = document.querySelectorAll('.btn-danger');
        
        for(button of deleteButtons)
        {
            button.addEventListener('click', (event)=>{
                if(!confirm("Are you sure?")) 
                {
                    event.preventDefault();
                    window.location.assign('/contact-list');
                }
            });
        }
    }

    window.addEventListener("load", Start);

})();