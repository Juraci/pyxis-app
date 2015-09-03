describe('RunController', function() {

  var singleRun = {runs: [{id: '1234'}]};

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

  describe('pagination', function() {
    describe('the first page is loaded', function() {

      var scope, controller;

      beforeEach(function() {
        $httpBackend.expectGET(/(.)*\/runs$/).respond(function() {
          return [200, singleRun, {}];
        });

        scope = {
          pagination: {
            next: "/runs?limit=2&offset=2",
            offset: 0,
            limit: 2
          }
        }

        controller = $controller('RunController', {$scope: scope});
      });

      describe('when I click next page', function() {

        var twoRunsWithPagination = {
          runs: [{id: '1'}, {id: '2'}],
          meta: {
            offset: 20,
            limit: 20
          }
        };

        it('loads the second page', function() {
          $httpBackend.expectGET("http://localhost:5000" + scope.pagination.next).respond(function() {
            return [200, twoRunsWithPagination, {}];
          });

          scope.next();
          $httpBackend.flush();

          expect(scope.runs).toEqual( twoRunsWithPagination.runs );
        });

        it('updates the pagination info', function() {
          $httpBackend.expectGET("http://localhost:5000" + scope.pagination.next).respond(function() {
            return [200, twoRunsWithPagination, {}];
          });

          expect(scope.pagination.offset).toBe(0);
          scope.next();
          $httpBackend.flush();

          expect(scope.pagination.offset).toBe(20);
        });
      });
    });
  });
});
