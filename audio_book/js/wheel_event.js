$(function(){
    /* 콘텐츠 부모박스 클래스명 선택자에 변수 저장*/
    var wheel_content = $('.wheel_content');
    /* 각각의 콘텐츠 페이지에 이벤트 적용을 하기 위해 each()사용*/
    /* 매개변수 index로 각각의 콘텐트를 구분*/
    $(wheel_content).each(function(index){
        //IE,크롬,오페라 이벤트명 : mousewheel
        //파이어폭스 이벤트명 : DOMMouseScroll
        $(this).on("mousewheel DOMMouseScroll", function(e){
            e.preventDefault();
            /*마우스 휠 스크롤 정보변수 (중요)*/
            var delta = 0;
            
            /*1. 각각의 브라우저 마우스 휠 특성 분석
              a. 크롬, IE, 오페라 : 휠을 내리면 음수
              b. 파이어폭스 : 휠을 내리면 양수*/
            /*1-1. 마우스 휠 스크롤 정보 얻는 메소드
              a. 크롬, IE, 오페라 : wheelDelta
              b. 파이어폭스 : detail*/
            
            /*(중요)각각의 다른 브라우저 마다 값을 양수1로 통일하여 변수 delta에 저장*/
            // A. IE 표준 브라우저
            if(!event){
                event = $(window).event;
            }
            // B. 크롬/IE/오페라
            if(event.wheelDelta){
                delta = event.wheelDelta /120;
                // 오페라의 경우
                if(window.opera){
                    delta = -delta;
                }
            }
            // C. 파이어폭스
            else if(event.detail){
                delta = -event.detail /3;
            }
            
/*스크롤 휠 동작 스크립트 작성*/
            // 각 콘텐츠를 화면에서 한장씩 보여주기 위한 값 필요
            var move_top = $(window).scrollTop();
//            console.log(move_top);
            var each_element = $(wheel_content).eq(index);
            // 마우스휠을 윗쪽에서 아랫쪽으로 내리면
            // 만약, 마우스 휠값이 음수이면 바로 아래 박스 콘텐트 상단으로 이동
            if(delta<0){
                if($(each_element).next() != undefined){
                    try{
                        move_top = $(each_element).next().offset().top;
                    }catch(e){
                        alert('예외처리 : 마지막 페이지입니다!!');
                    }
                }
                   
            }else{
                if($(each_element).prev() != undefined){
                    try{
                        move_top = $(each_element).prev().offset().top;
                    }catch(e){
                        alert('예외처리 : 첫번째 페이지입니다!!');
                    }
                }
            }
            
/*스크롤시 페이지  애니메이션 실행*/
            $('html,body').stop().animate({scrollTop: move_top + 'px'},500);
        });
          
    });
    
    var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };

    window.onload = function() {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
    };

    
});

