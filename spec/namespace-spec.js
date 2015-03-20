describe("namespace", function(){
    
    it("will return the namespace if one exists", function(){
        window.existingNamespace = {
            test : 'test'
        };
        
        var result = namespace('existingNamespace');
        
        expect(result.test).toEqual('test');
    });
    
    it("will create a new namespace if one doesn't exist", function(){
        var result = namespace('anotherNamespace');
        
        expect(result).toEqual({});
    });
});