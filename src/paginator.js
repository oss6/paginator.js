var paginator = (function () {

    var _ = {},
        $ = {};

    var defaults = {
        'appendTo': null,
        'itemsPerPage': 10,
        'displayedPageNumbers': 5,
        'currentPage': 1,
        'margins': 2,
        'prevText': 'Prev',
        'nextText': 'Next',
        'theme': 'default' // or 'no-theme' (so it can be customised)

    };

    // BEGIN: Utilities
    $.extend = function (defaults, options) {
        var extended = {};
        var prop;
        for (prop in defaults) {
            if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
                extended[prop] = defaults[prop];
            }
        }
        for (prop in options) {
            if (Object.prototype.hasOwnProperty.call(options, prop)) {
                extended[prop] = options[prop];
            }
        }
        return extended;
    };

    $.isElement = function (o) {
        return o.nodeType && o.nodeType === 1;
    };

    $.getElements = function (e) {
        if (typeof e === 'string') {
            return document.querySelectorAll(e); // NodeList
        }

        if ($.isElement(e)) {
            return e.children; // HTMLCollection
        }
    };

    $.getParent = function () {
        var o = this._opts;

        // [squeeze]: ternary op here
        if (o.appendTo === null) {
            // Append to elements parent
            var testElement = this._elements[0]; // [fix]: empty array
            return testElement.parentNode;
        }
        else {
            return document.querySelector(o.appendTo);
        }
    };

    $.toArray = function (collection) {
        var arr = [];
        for (var i = collection.length; i--; arr.unshift(collection[i]));
        return arr;
    };
    // END: Utilities

    // BEGIN: Private member
    $.createLinks = function (parent) {
        var o = this._opts,
            elements = this._elements,
            numPages = Math.ceil(elements.length / o.itemsPerPage);

        // Create wrapper around the links
        var wrapper = document.createElement('div');
        wrapper.className = 'paginator-wrapper ' + (o.theme === 'default' ? 'default-theme' : 'no-theme');

        // Create previous
        var prev = document.createElement('a');
        prev.className = 'paginator-link';
        prev.setAttribute('href', '#page-prev');
        prev.innerHTML = o.prevText;
        wrapper.appendChild(prev);

        // Create page links
        for (var i = 1; i <= numPages; i++) {
            var plink = document.createElement('a');
            plink.className = 'paginator-link';
            if (o.currentPage === i) {
                plink.className += ' paginator-active';
            }
            plink.setAttribute('href', '#page-' + i);
            plink.innerHTML = i + '';
            wrapper.appendChild(plink);
        }

        // Create next
        var next = document.createElement('a');
        next.className = 'page-next';
        next.setAttribute('href', '#page-next');
        next.innerHTML = o.nextText;
        wrapper.appendChild(next);

        if (parent) {
            parent.appendChild(wrapper);
        }
    };

    $.createPages = function (parent) {
        var o = this._opts,
            elements = $.toArray(this._elements),
            numItems = elements.length,
            itemsPerPage = o.itemsPerPage,
            numPages = Math.ceil(numItems / itemsPerPage);

        for (var i = 1; i <= numPages; i++) {
            var page = document.createElement('div'),
                toAdd = elements.slice(0, itemsPerPage);

            page.className = 'paginator-page';
            if (o.currentPage === i) {
                page.className += ' paginator-active';
            }
            page.setAttribute('id', 'page-' + i); // [fix]: multiple paginators per page

            // Append to page
            for (var j = 0, l = toAdd.length; j < l; j++) {
                page.appendChild(toAdd[j]);
            }

            // Append page and update elements
            parent.appendChild(page);
            elements = elements.slice(itemsPerPage);
        }
    };

    // END: Private member

    _.Paginator = function (elements, opts) {
        var self = this;

        // Unpack options
        opts = opts || {};
        self._opts = $.extend(defaults, opts);
        self._elements = $.getElements(elements);

        // Initialise links and pages
        var parent = $.getParent.call(self);
        $.createPages.call(self, parent);
        $.createLinks.call(self, parent);
    };

    _.create = function (elements, opts) {
        return new _.Paginator(elements, opts);
    };

    // BEGIN: Public methods
    _.Paginator.prototype.currentPage = function (pageNum) { // Getter and setter

    };

    _.Paginator.prototype.previous = function () {

    };

    _.Paginator.prototype.next = function () {

    };

    _.Paginator.prototype.pagesCount = function () {

    };

    _.Paginator.prototype.disable = function () {

    };

    _.Paginator.prototype.enable = function () {

    };

    _.Paginator.prototype.currentPage = function () {

    };

    // END: Public methods

    return _;

})();