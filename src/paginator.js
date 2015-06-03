/**
 * paginator.js
 * Description: A lightweight and dependency-free pagination library
 * Version: 0.0.1
 * Author: Ossama Edbali
 */

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

    $.wrap = function (fn) {
        var args = Array.prototype.slice.call(arguments, 1),
            self = this;

        return function () {
            fn.apply(self, args);
        };
    };
    // END: Utilities

    // BEGIN: Private member

    // TODO: Use DocumentFragment!
    $.createLinks = function (parent) {
        var self = this,
            o = self._opts,
            elements = self._elements,
            numPages = Math.ceil(elements.length / o.itemsPerPage);

        // Create wrapper around the links
        var wrapper = document.createElement('div'),
            fragment = document.createDocumentFragment();
        wrapper.className = 'paginator-wrapper ' + (o.theme === 'default' ? 'default-theme' : 'no-theme');

        // Create previous
        var prev = document.createElement('a');
        prev.className = 'paginator-link';
        prev.setAttribute('href', '#page-prev');
        prev.innerHTML = o.prevText;
        prev.addEventListener('click', $.wrap.call(self, self.previous));
        fragment.appendChild(prev);
        //wrapper.appendChild(prev);

        // Create page links
        for (var i = 1; i <= numPages; i++) {
            var plink = document.createElement('a');
            plink.className = 'paginator-link';
            if (o.currentPage === i) {
                plink.className += ' paginator-active';
            }
            plink.setAttribute('href', '#page-' + i);
            plink.innerHTML = i + '';
            plink.addEventListener('click', $.wrap.call(self, self.select, i - 1), false);

            self._links.push(plink);
            fragment.appendChild(plink);
            //wrapper.appendChild(plink);
        }

        // Create next
        var next = document.createElement('a');
        next.className = 'paginator-link';
        next.setAttribute('href', '#page-next');
        next.innerHTML = o.nextText;
        next.addEventListener('click', $.wrap.call(self, self.next));
        fragment.appendChild(next);
        //wrapper.appendChild(next);
        wrapper.appendChild(fragment);

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

            // Append to page
            for (var j = 0, l = toAdd.length; j < l; j++) {
                page.appendChild(toAdd[j]);
            }

            // Append page and update elements
            parent.appendChild(page);
            this._pages.push(page);
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
        self._pages = [];
        self._links = [];
        self._activePageNum = self._opts.currentPage - 1;

        // Initialise links and pages
        var parent = $.getParent.call(self);
        $.createPages.call(self, parent);
        $.createLinks.call(self, parent);
    };

    _.create = function (elements, opts) {
        return new _.Paginator(elements, opts);
    };

    // BEGIN: Public methods
    _.Paginator.prototype.select = function (pageNum) {
        var currentPage = this.getCurrentPage();

        // Remove
        currentPage.classList.remove('paginator-active');
        this._links[this._activePageNum].classList.remove('paginator-active');

        // Add
        this._pages[pageNum].classList.add('paginator-active');
        this._links[pageNum].classList.add('paginator-active');

        // Update active page number
        this._activePageNum = pageNum;
    };

    _.Paginator.prototype.getCurrentPage = function () { // Getter and setter
        return this._pages[this._activePageNum];
    };

    $.isOutOfRange = function (i, arr) {
        return i < 0 || i >= arr.length;
    };

    _.Paginator.prototype.previous = function () {
        var pageNum = this._activePageNum - 1;
        if (!$.isOutOfRange(pageNum, this._pages)) {
            this.select(pageNum);
        }
    };

    _.Paginator.prototype.next = function () {
        var pageNum = this._activePageNum + 1;
        if (!$.isOutOfRange(pageNum, this._pages)) {
            this.select(pageNum);
        }
    };

    _.Paginator.prototype.pagesCount = function () {
        return this._pages.length;
    };

    _.Paginator.prototype.disable = function () {

    };

    _.Paginator.prototype.enable = function () {

    };

    // END: Public methods

    return _;

})();