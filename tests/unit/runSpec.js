describe('RunController', function() {

  var singleRun = {id: '1234'};

  beforeEach(module('pyxisApp'));

  var $controller, $httpBackend;

  beforeEach(inject(function(_$controller_, _$httpBackend_) {
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
  }));

  it('list runs', function() {
    var scope = {};
    $httpBackend.expectGET('http://localhost:5000/runs').respond({
      runs: [singleRun]
    });

    var controller = $controller('RunController', {$scope: scope});
    $httpBackend.flush();

    expect(scope.runs.runs).toEqual([singleRun]);
  });
});
