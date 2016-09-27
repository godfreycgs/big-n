var test = require('tape');
var mul = require('..').mul

test('Two positive number multiply', function (t) {
    t.plan(2);

    t.equal(mul('12', '12'), '144')
    t.equal(mul('99887766', '99887766'), '9977565796470756')
});

test('One positive number multiply 0', function (t) {
    t.plan(1);

    t.equal(mul('12', '0'), '0')
});

test('0 multiply 0', function (t) {
    t.plan(1);

    t.equal(mul('0', '0'), '0')
});

test('Positive number multiply negative number', function (t) {
    t.plan(1);

    t.equal(mul('-12', '12'), '-144')
});

test('Negative number multiply negative number', function (t) {
    t.plan(1);

    t.equal(mul('-12', '-12'), '144')
});
