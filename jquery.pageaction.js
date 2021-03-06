(function($){

    $.pageaction = function(options){
        var effectiveOptions = $.extend({}, $.pageaction.options, options);
        do_action(this, effectiveOptions, location.hash);
    };

    $.extend($.pageaction, {
        options: {
            container: window,
            delimiter: '__'
        }
    });

    $.fn.pageaction = function(options) {
        $(this).live('click', function(e) {
            var effectiveOptions = $.extend({}, $.pageaction.options, options);
            do_action(this, effectiveOptions, $(this).attr("href"));
            return false;
        });
        return this;
    };

    do_action = function(self, options, action_string){
        if (!action_string)
            return;
        var action = action_string.substr(1);
        var elements = action.split(options.delimiter);
        var fname = elements[0];
        var args = elements.slice(1);
        if (typeof options.container[fname] == 'function') {
            options.container[fname].apply(self, args);
        }
    };
})(jQuery);
