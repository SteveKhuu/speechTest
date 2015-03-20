namespace('SpeechApp');

(function(){
    
    var SpeechTranscriber = function(annyang){
        
        var self = this;
        
        function writeIt(repeat) {
            self.publish(repeat);
        }
        
        this.listenForWords = function(){
            if(annyang){
                var commands = {
                    '*repeat': writeIt
                };
                
                annyang.addCommands(commands);
                annyang.debug();
                annyang.setLanguage('en-US');
                annyang.start({autoRestart:false, continuous:true});
            }else{
                console.log("not ready");
            }
        };
        
        this.updateLanguage = function(language){
            annyang.abort();
            annyang.setLanguage(language);
            annyang.resume();
        };
        
    };
    
    SpeechApp.SpeechTranscriber = SpeechTranscriber;
    
})();