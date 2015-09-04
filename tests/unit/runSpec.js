describe('RunController', function() {

  var singleRun = {
    runs: [{id: '1234'}],
    meta: {
      limit: 20,
      offset: 0
    }
  };

  beforeEach(module('pyxisApp'));

  var $controller, $httpBackend;

  beforeEach(inject(function(_$controller_, _$httpBackend_) {
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
  }));

  it('list runs', function() {
    var scope = {};
    $httpBackend.expectGET(/(.)*\/runs$/).respond(function() {
      return [200, singleRun, {}];
    });

    var controller = $controller('RunController', {$scope: scope});
    $httpBackend.flush();

    expect(scope.runs).toEqual([{id: '1234'}]);
  });
});
