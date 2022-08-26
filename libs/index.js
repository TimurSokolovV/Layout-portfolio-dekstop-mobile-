
window.onload = function(){
  let active = true
 //Плавный скролл==============================================================================
    function smoothScroll (targetEl, duration) {
        let target = document.querySelector(targetEl);
        let targetPosition = target.getBoundingClientRect().top;
        let startPosition = window.pageYOffset;
        let startTime = null;
    
        const ease = function(t,b,c,d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };
    
        const animation = function(currentTime){
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, targetPosition, duration);
            window.scrollTo(0,run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };
        requestAnimationFrame(animation);

    };

    const scrollTo = function () {
        const links = document.querySelectorAll('a[href^="#"');
        links.forEach(each => {
            each.addEventListener('click', function () {
                const currentTarget = this.getAttribute('href');
                if(currentTarget === '#portfolio'){
                  smoothScroll(currentTarget, 800);
                }
                else{
                  active = false
                  setTimeout(()=>{
                    active = true
                  },1600)
                  document.querySelectorAll('.element_hidden').forEach(item => item.classList.add('element_show'))
                  smoothScroll(currentTarget, 1600);
                }
                
            });
        });
    };
    scrollTo()
    

//Появление элементов при скролле страницы==============================================================================
// document.querySelectorAll('.element_hidden').forEach(item => item.classList.add('element_show'))
  function onEntry(entry) {
    entry.forEach(change => {
      if (change.isIntersecting) {
      change.target.classList.add('element_show');
      }
    });
  }

  let options = {
    threshold: [0.1],

  };
  let observer = new IntersectionObserver(onEntry, options);
  let elements = document.querySelectorAll('.element_hidden');

  for (let elm of elements) {
    observer.observe(elm);
  }
//Ховер на карточки==============================================================================

    if(active){
      const cardLgPic = document.querySelectorAll('.lg_pic')

      cardLgPic.forEach(cardLgItem => {
        cardLgItem.addEventListener('mouseover', function(){
          const container = this.closest('.lg_pic_container')
          const arrow = container.querySelector('.arrow')
          arrow.classList.add('hover_card')
        })
      })
      cardLgPic.forEach(cardLgItem => {
        cardLgItem.addEventListener('mouseout', function(){
          const container = this.closest('.lg_pic_container')
          const arrow = container.querySelector('.arrow')
          arrow.classList.remove('hover_card')
          text.style.display = 'none'
        })
      })


      const cardSmPic = document.querySelectorAll('.sm_pic')
      
      cardSmPic.forEach(cardSmItem => {
        cardSmItem.addEventListener('mouseover', function(){
          const smPicItem = this.closest('.sm_pic_item')
          const arrow = smPicItem.querySelector('.arrow')
          arrow.classList.add('hover_card')
        })
      })

      cardSmPic.forEach(cardSmItem => {
        cardSmItem.addEventListener('mouseout', function(){
          const smPicItem = this.closest('.sm_pic_item')
          const arrow = smPicItem.querySelector('.arrow')
          arrow.classList.remove('hover_card')
          text.style.display = 'none'
        })
      })

  //Ховер на ссылки==============================================================================
  const link = document.querySelectorAll('.arrow')
  link.forEach(linkItem => {
    linkItem.addEventListener('mouseover', function(){
      if(this.closest('.lg_pic_container')){
        const containerLg = this.closest('.lg_pic_container')
        const imgLg = containerLg.querySelector('.img')
        imgLg.classList.add('hover_link')
      }
      else{
        const containerSm = this.closest('.sm_pic_item')
        const imgSm = containerSm.querySelector('.img')
        imgSm.classList.add('hover_link')
      }
    })
  })
  link.forEach(linkItem => {
    linkItem.addEventListener('mouseout', function(){
      if(this.closest('.lg_pic_container')){
        const containerLg = this.closest('.lg_pic_container')
        const imgLg = containerLg.querySelector('.img')
        imgLg.classList.remove('hover_link')
      }
      else{
        const containerSm = this.closest('.sm_pic_item')
        const imgSm = containerSm.querySelector('.img')
        imgSm.classList.remove('hover_link')
      }
    })
  })

  //Текст над курсором==============================================================================

      const text = document.querySelector('.text')
    cardLgPic.forEach(cardItem => {
      cardItem.addEventListener('mousemove', function(e){
        const container = this.closest('.lg_pic_container')
        const arrow = container.querySelector('.arrow')
        const cordX = e.pageX - (text.offsetWidth / 2)
        const cordY = e.pageY - 20
        text.textContent = arrow.textContent
        text.style.display = 'inline'
        text.style.left = `${cordX}px`
        text.style.top = `${cordY}px`
        
      })
    })
    cardSmPic.forEach(cardItem => {
      cardItem.addEventListener('mousemove', function(e){
        const container = this.closest('.sm_pic_item')
        const arrow = container.querySelector('.arrow')
        const cordX = e.pageX - (text.offsetWidth / 2)
        const cordY = e.pageY - 20
        text.textContent = arrow.textContent
        text.style.display = 'inline'
        text.style.left = `${cordX}px`
        text.style.top = `${cordY}px`
        
      })
    })
  }
}

