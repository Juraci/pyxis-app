describe('pyxis app', function() {
  it('should have a list of runs', function() {
    browser.get('http://localhost:3000/app/index.html');
    var runs = element.all(by.css('.run-item'));
    expect(runs.count()).toEqual(1);
  });
});
