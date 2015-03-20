namespace('SpeechApp');

(function(){
    
    var SpeechView = function(){
        
        var alignLeft = false;
        var self = this;
        
        function getAlignment(isLeft){
            return isLeft? 'left' : 'right';
        }
        
        function pickRandomColour(brightness){
            var rgb = [Math.random() * 256, Math.random() * 256, Math.random() * 256];
            var mix = [brightness*51, brightness*51, brightness*51]; //51 => 255/5
            var mixedrgb = [rgb[0] + mix[0], 
                            rgb[1] + mix[1], 
                            rgb[2] + mix[2]].map(function(x){ 
                                                    return Math.round(x/2.0);
                                                });
            return "rgb(" + mixedrgb.join(",") + ")";
        }
        
        function toggleActive($button){
            $('.active').removeClass('active');
            $button.addClass('active');
        }
        
        this.init = function(){
            $('.engButton').on('click', function(event){
                event.preventDefault();
                toggleActive($(this));
                self.publish('en-US');
            });
            
            $('.rusButton').on('click', function(event){
                event.preventDefault();
                toggleActive($(this));
                self.publish('ru');
            });
        };
        
        this.drawTranscribedSpeech = function(repeat){
            var $speechNode = $('<div class="speechNode"></div>');
            $speechNode.text(repeat);
            
            $speechNode.css({'text-align' : getAlignment(alignLeft)});
            $speechNode.css({'color' : pickRandomColour(3)});
            
            alignLeft = !alignLeft;
            
            $("#dictation").append($speechNode);
        };
        
    };
    
    SpeechApp.SpeechView = SpeechView;
    
})();