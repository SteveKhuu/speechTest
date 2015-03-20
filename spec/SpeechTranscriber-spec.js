describe("Speech Transcriber", function(){
    
    var speechTranscriber;
    
    beforeEach(function(){
        speechTranscriber = new SpeechApp.SpeechTranscriber();
    });
    
    describe("listen for words", function(){
        it("will initiate annyang if it is supported", function(){
            annyang = {
                addCommands : function(){},
                setLanguage : function(){},
                debug: function(){},
                start: function(){}
            };
            spyOn(annyang, 'start');
            
            speechTranscriber = new SpeechApp.SpeechTranscriber(annyang);
            
            speechTranscriber.listenForWords();
            
            expect(annyang.start).toHaveBeenCalled();
        });
        
        it("will not initiate annyang if it is not supported", function(){
            annyang = false;
            console.log = jasmine.createSpy("log");
            speechTranscriber = new SpeechApp.SpeechTranscriber(annyang);
            
            speechTranscriber.listenForWords();
            
            expect(console.log).toHaveBeenCalled();
        });

        it('will publish transcribed texts', function() {
            annyang = {
                addCommands : function(callbackObj){
                    for(var k in callbackObj){
                        callbackObj[k]('text');
                    }
                },
                setLanguage : function(){},
                debug: function(){},
                start: function(){}
            };
            speechTranscriber = new SpeechApp.SpeechTranscriber(annyang);
            SpeechApp.Observer.make(speechTranscriber);
            spyOn(speechTranscriber, 'publish');
            
            speechTranscriber.listenForWords();
            
            expect(speechTranscriber.publish).toHaveBeenCalledWith('text');
        });
    });
    
    describe("update language", function(){
        it("will update transcriber with a provided language", function(){
            annyang = {
                abort : function(){},
                setLanguage : function(){},
                resume: function(){}
            };
            spyOn(annyang, 'abort');
            spyOn(annyang, 'setLanguage');
            spyOn(annyang, 'resume');
            speechTranscriber = new SpeechApp.SpeechTranscriber(annyang);
            
            speechTranscriber.updateLanguage('test');
            
            expect(annyang.abort).toHaveBeenCalled();
            expect(annyang.setLanguage).toHaveBeenCalledWith('test');
            expect(annyang.resume).toHaveBeenCalled();
        });
    });
});