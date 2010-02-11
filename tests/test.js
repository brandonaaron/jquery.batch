test("basics", 18, function() {
    ok(jQuery.batch.version, "should provide a version indicator");
    
    ok(jQuery.isFunction(jQuery.batch.registerPlugin), "should provide a method for registering plugins (registerPlugin)");
    
    jQuery.each(['attr', ['css','styles'], 'offset', 'position', 'scrollTop', 'scrollLeft', 'innerWidth', 'innerHeight', 'outerWidth', 'outerHeight', 'width', 'height', 'html', 'text', 'val', 'data'], function(index, method) {
        var isArray = jQuery.isArray(method),
            current = isArray ? method[0] : method, 
            plural  = isArray ? method[1] : method+'s';
        ok(jQuery.isFunction(jQuery.fn[plural]), "should provide a plural version of the core method " + current + " called " + plural);
    });
});

test("registerPlugin", 5, function() {
    jQuery.batch.registerPlugin("testPlugin1");
    ok(!jQuery.isFunction(jQuery.fn.testPlugin1s), "should not register a plural method for a non-existant plugin");
    
    jQuery.fn.testPlugin1 = function() { return this; }
    jQuery.batch.registerPlugin("testPlugin1");
    ok(jQuery.isFunction(jQuery.fn.testPlugin1s), "should create a plural version of the plugin method");
    
    jQuery.fn.testPlugin1s = "test";
    jQuery.batch.registerPlugin("testPlugin1");
    ok(jQuery.fn.testPlugin1s === "test", "should not overwrite existing methods");
    
    jQuery.fn.testPlugin2 = function() { return this; }
    jQuery.fn.testPlugin1s = undefined;
    jQuery.batch.registerPlugin("testPlugin1", "testPlugin2");
    ok(jQuery.isFunction(jQuery.fn.testPlugin1s) && jQuery.isFunction(jQuery.fn.testPlugin2s), "should take one or more method/plugin names");
    
    jQuery.batch.registerPlugin(["testPlugin1", "testPlugins1"]);
    ok(jQuery.isFunction(jQuery.fn.testPlugins1), "should allow the plural form to be overwritten by passing an array");
});

test("batch", 2, function() {
    jQuery.fn.testPlugin1 = function() { return 'test'; };
    same(jQuery('<div /><div />').batch('testPlugin1'), ['test', 'test'], "should return an array of results based on the matched elements");
    
    jQuery.fn.testPlugin1 = function(arg1, arg2) { return arg1 + arg2; };
    same(jQuery('<div /><div />').batch('testPlugin1', 1, 1), [2, 2], "should curry any extra arguments to the original plugin method");
});

test("using generated methods", 2, function() {
    jQuery.fn.testPlugin1 = function() { return 'test'; };
    jQuery.fn.testPlugin1s = undefined;
    jQuery.batch.registerPlugin("testPlugin1");
    same(jQuery('<div /><div />').testPlugin1s(), ["test", "test"], "should return an array of results based on the matched elements");
    
    jQuery.fn.testPlugin1 = function(arg1, arg2) { return arg1 + arg2; };
    jQuery.fn.testPlugin1s = undefined;
    jQuery.batch.registerPlugin("testPlugin1");
    same(jQuery('<div /><div />').testPlugin1s(1, 1), [2, 2], "should curry any extra arguments to the original plugin method");
});