# paginator.js
> A small and dependency-free pagination library for modern browsers. <a href="http://oss6.github.io/paginator.js/">http://oss6.github.io/paginator.js/</a>

> **Note**: This library works for major moder browsers (with I.E. >= 9)

## Install
Download the zip file containing paginator.min.js and paginator.css from <a href="http://oss6.github.io/paginator.js/">here</a>.

or

using bower, run the following:

```bash
bower install --save paginator.js
```

## Basic usage
The basic usage is very simple to configure:

```html
<div id="test">
    <article>
        ...
    </article>

    <article>
        ...
    </article>

    <article>
        ...
    </article>
</div>
```

```javascript
var pg = paginator.create('#test article');
```

For more examples check the above web site.

## Documentation
The library documentation is available here: <a href="http://oss6.github.io/paginator.js/">http://oss6.github.io/paginator.js/</a>

## License
MIT © [Ossama Edbali](http://oss6.github.io)
