Screw.Unit(function() {
	describe("jQuery.batch Plugin", function() {
		it("should provide a version indicator", function() {
			expect( jQuery.batch.version ).to_not( be_undefined );
		});
		$.each(['attr', ['css','styles'], 'offset', 'width', 'height', 'html', 'text', 'val'], function(index, method) {
			var current = method.constructor == Array ? method[0] : method, plural = method.constructor == Array ? method[1] : method+'s';
			it("should provide a plural version of the core method " + current + " called " + plural, function() {
				expect( jQuery.fn[plural] ).to_not( be_undefined );
			});
		});
		it("should provide a method for registering plugins (registerPlugin)", function() {
			expect( jQuery.batch.registerPlugin ).to_not( be_undefined );
		});
		describe("using the API for registering plugins", function() {
			it("should create a plural version of the plugin method", function() {
				jQuery.fn.testPlugin1 = function() { return this; };
				jQuery.batch.registerPlugin("testPlugin1");
				expect( jQuery.fn.testPlugin1s ).to_not( be_undefined );
				jQuery.fn.testPlugin1 = jQuery.fn.testPlugin1s = undefined;
			});
			it("should not create a plural version of the plugin method if the plugin method does not exist", function() {
				jQuery.batch.registerPlugin("testPlugin1");
				expect( jQuery.fn.testPlugin1s ).to( be_undefined );
			});
			it("should not overwrite existing methods", function() {
				jQuery.fn.testPlugin1 = function() { return this; };
				jQuery.fn.testPlugin1s = 'test';
				jQuery.batch.registerPlugin("testPlugin1");
				expect( jQuery.fn.testPlugin1s ).to( equal, 'test' );
				jQuery.fn.testPlugin1 = jQuery.fn.testPlugin1s = undefined;
			});
			it("should take one or more method/plugin names", function() {
				jQuery.fn.testPlugin1 = function() { return this; };
				jQuery.fn.testPlugin2 = function() { return this; };
				jQuery.batch.registerPlugin("testPlugin1", "testPlugin2");
				expect( jQuery.fn.testPlugin1s ).to_not( be_undefined );
				expect( jQuery.fn.testPlugin2s ).to_not( be_undefined );
				jQuery.fn.testPlugin1 = jQuery.fn.testPlugin1s = jQuery.fn.testPlugin2 = jQuery.fn.testPlugin2s = undefined;
			});
			it("should allow the plural form to be overwritten by passing an array", function() {
				jQuery.fn.testPlugin1 = function() { return this; };
				jQuery.batch.registerPlugin(["testPlugin1", "testPlugins1"]);
				expect( jQuery.fn.testPlugins1 ).to_not( be_undefined );
				jQuery.fn.testPlugin1 = jQuery.fn.testPlugins1 = undefined;
			});
		});
		describe("using the generated plural version of the plugin method", function() {
			it("should provide a collection (Array) of results based on the matched elements", function() {
				jQuery.fn.testPlugin1 = function() { return 'test'; };
				jQuery.batch.registerPlugin("testPlugin1");
				expect( jQuery('<div /><div />').testPlugin1s() ).to( equal, ['test', 'test']);
				jQuery.fn.testPlugin1 = jQuery.fn.testPlugin1s = undefined;
			});
			it("should curry any extra arguments to the original plugin method", function() {
				jQuery.fn.testPlugin1 = function(arg1, arg2) { return arg1 + arg2; };
				jQuery.batch.registerPlugin("testPlugin1");
				expect( jQuery('<div /><div />').testPlugin1s( 1, 1) ).to( equal, [2, 2] );
				jQuery.fn.testPlugin1 = jQuery.fn.testPlugin1s = undefined;
			});
		});
		describe("using the jQuery(...).batch plugin method", function() {
			it("should take a plugin method name return a collection (Array) of results based on the matched elements", function() {
				jQuery.fn.testPlugin1 = function() { return 'test'; };
				expect( jQuery('<div /><div />').batch('testPlugin1') ).to( equal, ['test', 'test'] );
				jQuery.fn.testPlugin1 = undefined;
			});
			it("should curry any extra arguments to the original plugin method", function() {
				jQuery.fn.testPlugin1 = function(arg1, arg2) { return arg1 + arg2; };
				expect( jQuery('<div /><div />').batch('testPlugin1', 1, 1) ).to( equal, [2, 2] );
				jQuery.fn.testPlugin1 = undefined;
			});
		});
	});
});