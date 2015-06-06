QUnit.test('appendTo default', function (assert) {
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

QUnit.test('itemsPerPage default', function (assert) {
    var pg = paginator.create('article');
    assert.equal(pg.pagesCount(), 1);
});

QUnit.test('itemsPerPage set', function (assert) {
    var pg = paginator.create('article', { 'itemsPerPage': 2 });
    assert.equal(pg.pagesCount(), 3);
});

QUnit.test('currentPage default', function (assert) {
    var pg = paginator.create('article');
    assert.ok(pg.getCurrentPage().classList.contains('paginator-active'));
});

QUnit.test('currentPage set', function (assert) {
    var pg = paginator.create('article', { 'itemsPerPage': 2 });
    assert.equal(pg.pagesCount(), 3);
});

QUnit.test('prevText', function (assert) {
    var pg = paginator.create('article', { 'prevText': '<' });
    assert.equal(pg._linksWrapper.children[0].textContent, '<');
});

QUnit.test('nextText', function (assert) {
    var pg = paginator.create('article', { 'prevText': '>' });
    assert.equal(pg._linksWrapper.children[0].textContent, '>');
});

QUnit.test('select(1) should exist', function (assert) {
    var pg = paginator.create('article', { 'itemsPerPage': '2' }),
        res = pg.select(1);

    assert.equal(res.link.textContent, '2');
    assert.ok(res.link.classList.contains('paginator-active'));
});

QUnit.test('select(1) should return null', function (assert) {
    var pg = paginator.create('article'),
        res = pg.select(1);

    assert.equal(res, null);
});