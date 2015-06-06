QUnit.test('appendTo normal', function (assert) {
    var pg = paginator.create('article'),
        pages = pg.getPages(),
        links = pg.getLinks();

    pages.forEach(function (page) {
        assert.equal(page.parentNode.getAttribute('id'), 'qunit-fixture');
    });

    links.forEach(function (link) {
        assert.ok(link.parentNode.classList.contains('paginator-wrapper'));
        assert.equal(link.parentNode.parentNode.getAttribute('id'), 'qunit-fixture');
    });
});

QUnit.test('appendTo set', function (assert) {
    var pg = paginator.create('article', { 'appendTo': '#append-here' }),
        pages = pg.getPages(),
        links = pg.getLinks();

    pages.forEach(function (page) {
        assert.equal(page.parentNode.getAttribute('id'), 'append-here');
    });

    links.forEach(function (link) {
        assert.ok(link.parentNode.classList.contains('paginator-wrapper'));
        assert.equal(link.parentNode.parentNode.getAttribute('id'), 'append-here');
    });
});