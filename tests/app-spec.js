describe('pyxis app', function() {

  beforeEach(function() {
    var httpBackendMock = function () {
      var app = angular.module('httpBackendMock', ['ngMockE2E']);
      app.run(function ($httpBackend) {       
        var  runs = {runs: [{id: '1', success_percentage: 100}]};
        $httpBackend.whenGET('http://localhost:5000/runs').respond(runs);
        $httpBackend.whenGET(/.*/).passThrough();
      })
    };

    browser.addMockModule('httpBackendMock', httpBackendMock);
  });

  it('should have a list of runs', function() {
    browser.get('http://localhost:3000/app/index.html');
    var runs = element.all(by.css('.run-item'));
    expect(runs.count()).toEqual(1);
  });
});
