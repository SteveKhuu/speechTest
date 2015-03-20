describe('Observer', function() {

    var author;
    var reader;
    
    beforeEach(function() {
        author = {};
        reader = {
            read: function(story){
                console.log('I read ' + story);
            }
        };
    });
    
    it('will make publishers', function() {
        SpeechApp.Observer.make(author);
        
        expect(author.subscribers).toBeDefined();
    });
    
    it('will add subscribers', function() {
        SpeechApp.Observer.make(author);
        author.addSubscriber(reader.read);
        
        expect(author.subscribers.length).toEqual(1);
        expect(author.subscribers[0]).toEqual(reader.read);
    });
    
    it('will remove subscribers', function() {
        SpeechApp.Observer.make(author);
        author.addSubscriber(reader.read);
        author.removeSubscriber(reader.read);
        
        expect(author.subscribers.length).toEqual(0);
    });
    
    it('will publish an event to the subscriber', function() {
        author = {
            writeNovel : function(){
                this.publish('This is a story');
            }
        };
        
        SpeechApp.Observer.make(author);
        spyOn(reader, 'read');
        author.addSubscriber(reader.read);
        
        author.writeNovel();
        
        expect(reader.read).toHaveBeenCalledWith('This is a story');
    });
});