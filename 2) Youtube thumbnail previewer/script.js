        let userImg;

        function preview_button(){
            const img_add = document.querySelector('.img-check');
            userImg = document.querySelector('#input-img');

            if(userImg.files.length===0){
                alert("Select image from your device first !")
            }
            else{
                const fileReader= new FileReader();

                fileReader.onload=(e)=>{
                    img_add.innerHTML='<img src="' + e.target.result + '" />';
                }

                fileReader.readAsDataURL(userImg.files[0]);
            }

        }

        let curPage=0;
        
        const prevButton=document.getElementById('prev-button');
        const nextButton=document.getElementById('next-button');
        const pages = document.querySelectorAll('.pages');

        handle_prev_next_buttons_data();
        
        nextButton.addEventListener('click',()=>{
            
            pages[curPage].setAttribute('hidden','');

            
            curPage++;
            if(curPage===1){
                store_img();
            }
            else if(curPage===2){
                make_thumbnail();
            }
            else {
                window.location.reload();
            }
            pages[curPage].removeAttribute('hidden','');

            handle_prev_next();
            handle_prev_next_buttons_data();
            
        })

        prevButton.addEventListener('click',()=>{
            
            pages[curPage].setAttribute('hidden','');
            curPage--;
            pages[curPage].removeAttribute('hidden','');

            handle_prev_next();
            handle_prev_next_buttons_data();
            
        })

        function store_img(){
            userImg = document.querySelector('#input-img');
        }
        
        function handle_prev_next(){
            if(curPage===0){
                prevButton.style.opacity=0;
                prevButton.setAttribute('disabled','');
            }
            else{
                prevButton.style.opacity=1;
                prevButton.removeAttribute('disabled','');
            }
        }
        handle_prev_next();

        function handle_prev_next_buttons_data(){
            if(curPage===0){
                nextButton.innerHTML='next';
            }
            else if(curPage===1){
                nextButton.innerHTML='Generate Now';
            }
            else if(curPage===2){
                nextButton.innerHTML='Create New';
            }
        }

        function make_thumbnail(){
            const uploadDate=new Date(document.querySelector('#date').value);
            const curDate = new Date();
            const diffTime = Math.abs(uploadDate- curDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 


            const addUploadDate = document.querySelector('.add-upload-date');

            if(diffDays>365){
                addUploadDate.innerHTML=`${Math.floor(diffDays/365)} years ago`;
            }
            else if(diffDays>30){
                addUploadDate.innerHTML=`${Math.floor(diffDays/30)} months ago`;
            }
            else{
                addUploadDate.innerHTML=`${diffDays} days ago`;
            }

            const channelName=document.querySelector('#channel-name').value;
            const addChannelName=document.querySelector('.add-channel-name');
            addChannelName.innerHTML=`${channelName}`;

            const title=document.querySelector('#title').value;
            const addTitle = document.querySelector('.add-title');
            addTitle.innerHTML=`${title}`;

            const views=parseInt(document.querySelector('#views').value);
            const addViews=document.querySelector('.add-views');
            if(views>=1000000){
                addViews.innerHTML=`${Math.floor(views/1000000)}M views`;
            }
            else if(views>1000){
                addViews.innerHTML=` ${Math.floor(views/1000)}K views`;
            }
            else{
                addViews.innerHTML=` ${views} views`;
            }

            const duration=parseInt(document.querySelector('#duration').value);
            const addDuration = document.querySelector('.timeStamp');
            if(duration>=3600){
                addDuration.innerHTML=`${Math.floor(duration/3600)}:${Math.floor((duration%3600)/60).toString().padStart(2,'0')}:${(duration%60).toString().padStart(2,'0')}`;
            }
            else{
                addDuration.innerHTML=`${Math.floor(duration/60)}:${(duration%60).toString().padStart(2,'0')}`;
            }

            const img_add = document.querySelector('.add-img');

            if(userImg.files.length===0){
                alert("Select image from your device first !")
            }
            else{
                const fileReader= new FileReader();

                fileReader.onload=(e)=>{
                    img_add.innerHTML='<img src="' + e.target.result + '" />';
                }

                fileReader.readAsDataURL(userImg.files[0]);
            }
        }