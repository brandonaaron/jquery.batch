# jQuery.batch

Batch is a jQuery plugin that gives you the ability to batch the results of any jQuery method or plugin into an Array. In its most basic form you can use it like this.

    $('div').batch('offset'); // => [{ top: 3, left: 3}, { top: 10, left: 30 }]

You can also pass along the arguments as you normally would.

    $('div').batch('css', 'position'); // => ['relative', 'absolute']

The batch plugin automatically creates plural versions of the getter methods within jQuery's core. That means you can do the following.

    $('div').offsets(); // => [{ top: 3, left: 3}, { top: 10, left: 30 }]

This is a list of the pluralized core methods.

* attrs
* datas
* heights
* htmls
* innerHeights
* innerWidths
* offsets
* outerHeights
* outerWidths
* positions
* scrollLefts
* scrollTops
* styles
* texts
* vals
* widths


The batch plugin also provides a way for you to register other plugins to be pluralized *(just adds an s)*.

    $.batch.registerPlugin('myPlugin');

This will create a method called `myPlugins` that will return a Array of its results.

You can pass in multiple methods at a time if you want.

    $.batch.registerPlugin('myPlugin', 'thatPlugin', 'thisPlugin');

This will create pluralized versions of each plugin passed in.

You can also manually set what the pluralized version should be named by passing in an Array of the plugin name and then the desired pluralized name.

    $.batch.registerPlugin(['myPlugin', 'myPluralizedPlugin']);

This will use `myPluralizedPlugin` as the name, instead of `myPlugins`.


## License

The batch plugin is dual licensed *(just like jQuery)* under the MIT (http://www.opensource.org/licenses/mit-license.php) and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.

Copyright (c) 2007 Brandon Aaron (http://brandonaaron.net)