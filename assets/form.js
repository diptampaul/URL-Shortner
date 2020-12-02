
formScript()

function formScript(){
        let name, email, url;

        //chat start
        const startbtn = document.querySelector('.field-start')
        startbtn.addEventListener('click', function(e){
                const nextDiv = startbtn.nextElementSibling;
                //move to next Slide
                nextSlide(startbtn, nextDiv) 
        })

        //chat close
        const closeChat = document.querySelector('.fa-times')
        closeChat.addEventListener('click', function(e){
                const parent = closeChat.parentElement;
                const prevDiv = parent.previousElementSibling;
                prevSlide(parent, prevDiv)

                //change the background to default one depending on the theme
                document.querySelector('.box').style.backgroundColor = 'var(--mainColor)'

                //clear all the input tags
                try{
                    document.getElementById('wurl').value = ''
                }
                catch{
                    console.log("Not Found")
                }

                try{
                    document.getElementById('wemail').value = ''
                }
                catch{
                    console.log("Not Found")
                }

                try{
                    document.getElementById('wdes').value = ''
                }
                catch{
                    console.log("Not Found")
                }
        })

        //arrow down effects
        const arrowDown = document.querySelectorAll('.fa-arrow-down')
        arrowDown.forEach(function(arrow){
                arrow.addEventListener('click', function(e){
                        //input tag
                        const input = arrow.previousElementSibling.childNodes[3];

                        //parent div
                        const parent = arrow.parentElement;

                        //fetch the next div
                        const nextForm = parent.nextElementSibling;
                        
                        //check for validation
                        if(input.type === 'text' && validateUser(input)){
                                //store the name
                                name = input.value
                                //move to next Slide
                                nextSlide(parent, nextForm)
                        }else if(input.type === 'email' && validateEmail(input)){
                                //store the email
                                email = input.value
                                //move to next Slide
                                nextSlide(parent, nextForm)                             
                        }else if(input.type === 'url' && validateURL(input)){
                            //store the email
                            url = input.value
                            document.getElementById('wurl').value = input.value

                            //move to next Slide
                            nextSlide(parent, nextForm)                             
                    }   else{
                                parent.style.animation = 'shake 0.5s ease'
                        }

                        //Delete Parent Animation after done as it will not do multiple times by default
                        parent.addEventListener('animationend', ()=>{
                                parent.style.animation = '';
                        })
                })
        })

        //arrow up effects
        const arrowUp = document.querySelectorAll('.fa-arrow-up')
        arrowUp.forEach(function(arrow){
                arrow.addEventListener('click', function(e){
                        //parent div
                        const parent = arrow.parentElement;

                        //fetch the previous div
                        const prevForm = parent.previousElementSibling;
                        
                        //move to Prev Slide
                        prevSlide(parent, prevForm)

                        //change the background to default one depending on the theme
                        document.querySelector('.box').style.backgroundColor = 'var(--mainColor)'
                        })
        })

        //submit arrow effects
        // const submitBtn = document.querySelector('.sumit_form')
        // submitBtn.addEventListener('click', function(e){
        //         //parent link a tag
        //         const link = submitBtn.parentElement;

        //         //previous div
        //         const pdiv = link.previousElementSibling;

        //         //description input tag
        //         const input = pdiv.childNodes[3]

        //         //parentdiv
        //         const parent = link.parentElement;

        //         //nextForm
        //         const nextForm = link.parentElement.nextElementSibling;

        //         let text;
        //         if(input.type === 'text' && validateUser(input)){
        //                 //input tag value with custom text
        //                 text = `Hi Diptam, I'm ${name} (contact: ${email}). My message is: ${input.value}`;
        //                 //replace the spaces with %20 so that we can use it in whatsapp message
        //                 const message = text.replace(/\s/g, "%20")
        //                 console.log(message)
        //                 //set the href of a tag
        //                 link.setAttribute('href', `https://wa.me/+916378874873?text=${message}`)

        //                 //move to next elem
        //                 nextSlide(parent, nextForm)
        //         }else{
        //                 parent.style.animation = 'shake 0.5s ease'
        //         }

        //         //Delete Parent Animation after done as it will not do multiple times by default
        //         parent.addEventListener('animationend', ()=>{
        //                 parent.style.animation = '';
        //         })
        // })
        // submitBtn.addEventListener('click', function(e){
        //     document.querySelector('.before_form').style.display = 'none'
        //     document.querySelector('.after_form').style.display = 'block'
        // })
}

//input validation for user
function validateUser(user){
        if(user.value.length < 3){
                // console.log('not enough characters')
                error('rgb(189,87,87)')

        }else{
                //change the background to default one depending on the theme
                document.querySelector('.box').style.backgroundColor = 'var(--mainColor)'
                return true;
        }
}
function validateURL(url){
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    if(pattern.test(url.value)){
        //change the background to default one depending on the theme
        document.querySelector('.box').style.backgroundColor = 'var(--mainColor)'
        return true;
            

    }else{
        // console.log('not enough characters')
        error('rgb(189,87,87)')
    }
}

//input validation for email
function validateEmail(email){
        const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(re.test(email.value)){
                //validation successful
                //change the background to default one depending on the theme
                document.querySelector('.box').style.backgroundColor = 'var(--mainColor)'
                return true;  
        }else{
                error('rgb(189,87,87)')

        }
    }

//Move to Next Slide
function nextSlide(parent, nextform){
        parent.classList.add('inactive')
        parent.classList.remove('present')
        nextform.classList.add('present')
}

//Move to Previous Slide
function prevSlide(parent, prevForm){
        parent.classList.add('inactive')
        parent.classList.remove('present')
        prevForm.classList.add('present')
}

//error background color change 
function error(color){
        document.querySelector('.box').style.backgroundColor = color
}

//clear error page after 3 sec
function clearError(){
        document.querySelector('.contacterror').remove()
}