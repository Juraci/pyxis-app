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

  describe('Runs first page', function() {
    beforeEach(function() {
      var httpBackendMock = function () {
        var app = angular.module('httpBackendMock', ['ngMockE2E']),
            firstPageResult = {
              runs: [
                {fails: 2, id: '1', passes: 8, skips: 0, success_percentage: 80},
                {fails: 2, id: '2', passes: 8, skips: 0, success_percentage: 80}
              ],
              meta: {
                offset: 0,
                limit: 2,
                total_count: 4
              }
            };

        app.run(function ($httpBackend) {
          $httpBackend.whenGET('http://localhost:5000/runs').respond(firstPageResult);
          $httpBackend.whenGET(/.*/).passThrough();
        })
      };

      browser.addMockModule('httpBackendMock', httpBackendMock);
    });

    it('allows to go to the next page', function() {
      browser.get('http://localhost:3000/app/index.html');
      expect(element(by.css('.pagination-control .next')).isDisplayed()).toBe(true);
    });

    it('is not possible to go to the previous page', function() {
      browser.get('http://localhost:3000/app/index.html');
      expect(element(by.css('.pagination-control .previous')).isDisplayed()).toBe(false);
    });
  });

  describe('Runs last page', function() {
    beforeEach(function() {
      var httpBackendMock = function () {
        var app = angular.module('httpBackendMock', ['ngMockE2E']),
            firstPageResult = {
              runs: [
                {fails: 2, id: '3', passes: 8, skips: 0, success_percentage: 80},
                {fails: 2, id: '4', passes: 8, skips: 0, success_percentage: 80}
              ],
              meta: {
                offset: 2,
                limit: 2,
                total_count: 4
              }
            };

        app.run(function ($httpBackend) {
          $httpBackend.whenGET('http://localhost:5000/runs').respond(firstPageResult);
          $httpBackend.whenGET(/.*/).passThrough();
        })
      };

      browser.addMockModule('httpBackendMock', httpBackendMock);
    });

    it('does not have next page', function() {
      browser.get('http://localhost:3000/app/index.html');
      expect(element(by.css('.pagination-control .next')).isDisplayed()).toBe(false);
    });

    it('has previous page', function() {
      browser.get('http://localhost:3000/app/index.html');
      expect(element(by.css('.pagination-control .previous')).isDisplayed()).toBe(true);
    });
  });
});
