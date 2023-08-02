setTimeout((()=>{window.location.href.includes("bing.com")?targetElement=document.querySelector("#b_sydConvCont > cib-serp").shadowRoot.querySelector("#cib-action-bar-main").shadowRoot.querySelector("div > div.outside-left-container"):window.location.href.includes("bard.google.com")?targetElement=document.querySelector("body > chat-app > side-navigation > mat-sidenav-container > mat-sidenav-content > main > chat-window"):window.location.href.includes("chat.openai.com")?targetElement=document.querySelector("#__next > div.overflow-hidden.w-full.h-full.relative.flex.z-0 > div.relative.flex.h-full.max-w-full.flex-1.overflow-hidden > div > main > div.absolute.bottom-0.left-0.w-full.border-t.md\\:border-t-0.dark\\:border-white\\/20.md\\:border-transparent.md\\:dark\\:border-transparent.md\\:bg-vert-light-gradient.bg-white.dark\\:bg-gray-800.md\\:\\!bg-transparent.dark\\:md\\:bg-vert-dark-gradient.pt-2 > form"):window.location.href.includes("127.0.0.1:5500")&&(targetElement=document.querySelector("#message-form")),targetElement&&console.log(targetElement);const e=document.createElement("input");e.type="file",e.style.display="none";const t=document.createElement("button");t.style.backgroundColor="rgba(0, 166, 126, 0.1)",t.style.color="white",t.style.padding="5px",t.style.borderRadius="5px",t.style.display="flex",t.style.marginRight="5px",t.setAttribute("title","upload audio ,video or any image supports mp3,mp4,etc"),t.style.maxWidth="35px",t.style.maxHeight="37px";const o=document.createElement("span");o.textContent="upload most of the audio ,video or any image and it supports mp3,mp4,etc",o.style.display="none",o.style.position="absolute",o.style.backgroundColor="#00A67E",o.style.color="white",o.style.padding="5px",window.location.href.includes("bard.google.com")&&(t.style.position="relative",t.style.bottom="-570px",t.style.left="-1050px"),o.style.borderRadius="5px",window.location.href.includes("chat.openai.com")?o.style.top="35px":window.location.href.includes("bard.google.com")?o.style.top="600px":window.location.href.includes("bing.com")&&(o.style.top="40px"),t.appendChild(o),t.addEventListener("mouseover",(()=>{o.style.display="block"})),t.addEventListener("mouseout",(()=>{o.style.display="none"})),targetElement.style.display="flex";const n=document.createElementNS("http://www.w3.org/2000/svg","svg");n.setAttribute("width","24"),n.setAttribute("height","24"),n.setAttribute("viewBox","0 0 24 24");const l=trustedTypes.createPolicy("forceInner",{createHTML:e=>e});n.innerHTML=l.createHTML('<path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5s-2.24-5-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/>'),t.appendChild(n);const d=document.createElement("div");d.style.display="none",d.style.position="absolute",d.style.width="40px",d.style.height="40px",d.style.border="4px solid #f3f3f3",d.style.borderTop="4px solid #3498db",d.style.borderRadius="50%",d.style.animation="spin 2s linear infinite",document.body.appendChild(d);const i=document.createElement("style");i.textContent="@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }",document.head.appendChild(i),document.addEventListener("mousemove",(e=>{d.style.top=e.clientY+"px",d.style.left=e.clientX+"px"})),targetElement.appendChild(e),targetElement.appendChild(t)}),100);




   
   // Listen for button click
   uploadButton.addEventListener('click', () => {
    console.log('Button clicked');
    const clipboardData = navigator.clipboard;
    let imageFound = false;

    // Read the clipboard data as an image
    clipboardData.read().then(items => {
        // Loop over the items

       

        for (let i = 0; i < items.length; i++) {
            // Check if the item is an image
            if (items[i].types[0] === 'image/png') {
                imageFound = true;
                // Get the image blob
                items[i].getType('image/png').then(blob => {
                    const reader = new FileReader();
                    reader.readAsDataURL(blob);

                    // When the file is loaded
                    reader.onload = event => {
                      spinner.style.display = 'block';

                        // Recognize text in the image using Tesseract.js
                        const formData = new FormData();
                        formData.append('image', blob);

                        fetch('https://sponsorssss.pythonanywhere.com/upload', {
                            method: 'POST',
                            body: formData
                        })
                            .then(response => response.text())
                            .then(text => {
                                // Log the recognized text to the console
                                console.log('text :>> ', text);
                                text = text.replace(/\s+/g, ' ').trim();
                             //    console.log(text);
                             //    let promptTextarea;
                                console.log("will start promptext area");
                                if (window.location.href.includes("chat.openai.com")) {
                                    promptTextarea = document.querySelector('#prompt-textarea');

                                } else if (window.location.href.includes("bing.com")) {
                                    promptTextarea = document.querySelector("#b_sydConvCont > cib-serp").shadowRoot.querySelector("#cib-action-bar-main").shadowRoot.querySelector("div > div.main-container.body-2 > div.input-container.as-ghost-placement > cib-text-input").shadowRoot.querySelector("#searchbox")

                                } else if (window.location.href.includes("bard.google.com")) {
                                    promptTextarea = document.querySelector("#mat-input-0");
                                } else if (window.location.href.includes("127.0.0.1:5500")){
                                 console.log("window found");
                                    promptTextarea = document.querySelector("#message-input");
                                    console.log("element found");
                                    console.log('promptTextarea :>> ', promptTextarea);                                   
                                }
                                if (promptTextarea) {
                                    promptTextarea.value = text;
                                    spinner.style.display = 'none';

                                }
                            });
                    };
                })
            }
        }
        if (!imageFound) {
            fileInput.click();
        }
    });
});

// Listen for file input change
fileInput.addEventListener('change', async () => {
    const file = fileInput.files[0];
    if (file.type.startsWith('image/')) {
      spinner.style.display = 'block';

    // Create a FormData object to hold the selected file
    const formData = new FormData();
    formData.append('image', file);
  
    // Send the image to the server
    fetch('https://sponsorssss.pythonanywhere.com/upload', {
      method: 'POST',
      body: formData
    })
      .then(response => response.text())
      .then(text => {
        // Log the extracted text to the console
        console.log('text :>> ', text);
        text = text.replace(/\s+/g, ' ').trim();
        console.log(text);
        let promptTextarea;
        if (window.location.href.includes("chat.openai.com")) {
        promptTextarea = document.querySelector('#prompt-textarea');
      
        }else if (window.location.href.includes("bing.com")){
        promptTextarea = document.querySelector("#b_sydConvCont > cib-serp").shadowRoot.querySelector("#cib-action-bar-main").shadowRoot.querySelector("div > div.main-container.body-2 > div.input-container.as-ghost-placement > cib-text-input").shadowRoot.querySelector("#searchbox")
        
        }else if (window.location.href.includes("bard.google.com")){
        promptTextarea = document.querySelector("#mat-input-0");
        }else if (window.location.href.includes("127.0.0.1:5500")){
         console.log("window found");
            promptTextarea = document.querySelector("#message-input");
            console.log("element found");
            console.log('promptTextarea :>> ', promptTextarea);                                   
        }
        $(document).ready(function() {

         var textarea = $('#message-input');
       
         textarea.on('keydown', function(e) {
       
           if(this.scrollHeight > this.clientHeight) {
             $(this).height(function(index, height) {
               return height + 20;
             });
           }
       
         });
       
       });
       

        if (promptTextarea) {
          promptTextarea.value = text;
          spinner.style.display = 'none';
          const height = promptTextarea.scrollHeight;
promptTextarea.style.height = height + 'px';
          textarea.trigger('keydown'); 
          console.log("keydowndone");


        }
      })
      .catch(error => {
        console.error(error);
      });}
      else if (file.type.startsWith('audio/') || file.type.startsWith('video/')) {
        // Handle audio and video files
       
        spinner.style.display = 'block';

        // Create a FormData object to send the file to the server
        const formData = new FormData();
        formData.append("file", file);
      
        // Start a timer to update the progress circle every 100ms
        let progress = 0;
        const interval = setInterval(() => {
          progress += 0.01;
          if (progress > 1) {
            progress = 0;
          }
          const circumference = 2 * Math.PI * 20;
          const offset = circumference - (circumference * progress);
          // progressCircle.setAttribute("stroke-dashoffset", `${offset}`);
        }, 100);
      
        // Make a request to your Flask app
        const response = await fetch("https://hetmeh.pythonanywhere.com/", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
      
        // Handle the response from your Flask app
        console.log(data.transcription);
        // svg.style.display = "none";
  
        // const promptarea = document.querySelector("#prompt-textarea")
        // console.log('promptTextArea aduio video:>> ', promptarea);
        // promptArea.value = data.transcription;
  
        let promptarea;
        if (window.location.href.includes("chat.openai.com")) {
        promptarea = document.querySelector('#prompt-textarea');
        console.log('promptarea :>> ', promptarea);
      
        }else if (window.location.href.includes("bing.com")){
        promptarea =document.querySelector("#b_sydConvCont > cib-serp").shadowRoot.querySelector("#cib-action-bar-main").shadowRoot.querySelector("div > div.main-container.body-2 > div.input-container.as-ghost-placement > cib-text-input").shadowRoot.querySelector("#searchbox")
        
        }else if (window.location.href.includes("bard.google.com")){
        promptarea = document.querySelector("#mat-input-0");
        }
        
        if (promptarea) {
          promptarea.value = data.transcription;
          console.log('data.transcription :>> ', data.transcription);
          console.log('promptarea.value :>> ', promptarea.value);
          spinner.style.display = 'none';

        }
        
        promptarea.addEventListener("mouseover", () => {
          // pressEnter(promptTextArea);
        });
  
        // Stop the timer and hide the SVG element again
        clearInterval(interval);
        // svg.style.display = "none";
      } else {
        // Handle other file types
      }
      });
