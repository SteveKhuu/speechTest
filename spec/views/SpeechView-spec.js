describe("Speech View", function(){
    
    var speechView;
    
    beforeEach(function(){
        $('body').append('<div id="dictation"></div>');
    });
    
    afterEach(function() {
        $('#dictation').remove();
    });
    
    describe('initialization', function() {

        beforeEach(function() {
            $('body').append('<button class="engButton">English</button><button class="rusButton">Russian</button>');
        });
        
        afterEach(function() {
            $('button').remove();
        });
        
        it('will update transcribe Russian when the Russian button is clicked', function() {
            speechView = new SpeechApp.SpeechView();
            SpeechApp.Observer.make(speechView);
            spyOn(speechView, 'publish');

            speechView.init();
            
            $('.rusButton').trigger('click');
            
            expect(speechView.publish).toHaveBeenCalledWith('ru');
        });
        
        it('will update transcribe English when the English button is clicked', function() {
            speechView = new SpeechApp.SpeechView();
            SpeechApp.Observer.make(speechView);
            spyOn(speechView, 'publish');

            speechView.init();
            
            $('.engButton').trigger('click');
            
            expect(speechView.publish).toHaveBeenCalledWith('en-US');
        });
        
        it('will colour the button when it is active', function() {
            speechView = new SpeechApp.SpeechView();
            SpeechApp.Observer.make(speechView);

            speechView.init();
            
            $('.engButton').trigger('click');
            
            expect($('.engButton.active').length).toEqual(1);
        });
        
        it('will only allow one button to be active at any time', function() {
            speechView = new SpeechApp.SpeechView();
            SpeechApp.Observer.make(speechView);

            speechView.init();
            
            $('.engButton').trigger('click');
            $('.rusButton').trigger('click');
            
            expect($('.active').length).toEqual(1);
        });
    });
    
    describe('rendering text', function() {
        it('will draw the speech', function(){
            speechView = new SpeechApp.SpeechView();
            speechView.drawTranscribedSpeech('test');
            
            expect($('.speechNode').text()).toEqual('test');
        });
        
        it('will alternate text alignment', function() {
            speechView = new SpeechApp.SpeechView();
            speechView.drawTranscribedSpeech('test');
            speechView.drawTranscribedSpeech('test2');
            
            expect($('.speechNode').eq(0).css('text-align')).toEqual('right');
            expect($('.speechNode').eq(1).css('text-align')).toEqual('left');
        }); 
        
        it('will colour the transcribed text', function() {
            speechView = new SpeechApp.SpeechView();
            var originalRound = Math.round;
            Math.round = function(){return 1;};
            
            speechView.drawTranscribedSpeech('test');
            
            expect($('.speechNode').eq(0).css('color')).toEqual('rgb(1, 1, 1)');
            Math.round = originalRound;
        });
    });
});