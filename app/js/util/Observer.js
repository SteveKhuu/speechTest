namespace('SpeechApp');

(function(){
    
    var Observer = {
            addSubscriber : function(callback){
                this.subscribers[this.subscribers.length] = callback;
            },
            removeSubscriber : function(subscribedCallback){
                for (var i = 0; i < this.subscribers.length; i++) {
                    if (this.subscribers[i] === subscribedCallback) {
                        this.subscribers.splice(i, 1);
                    }
                }
            },
            publish : function(context){
                for (var i = 0; i < this.subscribers.length; i++) {
                    this.subscribers[i](context);
                }
            },
            make : function(publisher){
                for(var k in this){
                    publisher[k] = this[k];
                    publisher.subscribers = [];
                }
            },
    };
    
    SpeechApp.Observer = Observer;
    
})();