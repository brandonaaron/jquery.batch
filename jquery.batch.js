/*! Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version: 1.0.2
 */
(function($){

$.fn.batch = function(method) {
    var args = [].slice.call(arguments, 1), results = [];
    this.each(function() {
        var $this = $(this);
        results.push($this[method].apply($this, args));
    });
    return results;
};

$.batch = {
    version: "1.0.2",
    registerPlugin: function() {
        $.each(arguments, function(index, plugin) {
            var isArray   = $.isArray(plugin),
                method    = isArray && plugin[0] || plugin,
                newMethod = isArray && plugin[1] || plugin+"s";
            if ($.fn[method] && !$.fn[newMethod])
                $.fn[newMethod] = function() {
                    return this.batch.apply(this, [method].concat([].slice.call(arguments)));
                };
        });
    }
};

var methods = 'attr offset position scrollTop scrollLeft innerWidth innerHeight outerWidth outerHeight width height html text val data'.split(' ');
methods.push(['css', 'styles']); // special case for css
$.batch.registerPlugin.apply(this, methods);

})(jQuery);