describe('pyxis app', function() {

  beforeEach(function() {
    var httpBackendMock = function () {
      var app = angular.module('httpBackendMock', ['ngMockE2E']);
      app.run(function ($httpBackend) {
        var  runs = {runs: [{fails: 2, id: '1', passes: 8, skips: 0, success_percentage: 100}]};
        $httpBackend.whenGET('http://localhost:5000/runs').respond(runs);
        $httpBackend.whenGET(/.*/).passThrough();
      })
    };

    browser.addMockModule('httpBackendMock', httpBackendMock);
  });

  it('has a list of runs', function() {
    browser.get('http://localhost:3000/app/index.html');
    var runs = element.all(by.css('.run-item'));
    expect(runs.count()).toEqual(1);
  });

  it('has the basic info about a given run', function() {
    browser.get('http://localhost:3000/app/index.html');
    expect(element(by.css('.name')).getText()).toEqual('1');
    expect(element(by.css('.run-success-percentage')).getText()).toEqual('100%');
    expect(element(by.css('.run-fails')).getText()).toEqual('2');
    expect(element(by.css('.run-passes')).getText()).toEqual('8');
    expect(element(by.css('.run-skips')).getText()).toEqual('0');
  });
});
