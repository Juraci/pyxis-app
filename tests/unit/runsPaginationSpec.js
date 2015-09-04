describe('pagination', function() {
  beforeEach(module('pyxisApp'));

  var $controller, $httpBackend;

  beforeEach(inject(function(_$controller_, _$httpBackend_) {
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
  }));

  describe('the first page is loaded with results', function() {
    var scope = {},
        controller, 
        resultWithPagination = {
          runs: [{ids: '1'}],
          meta: {
            limit: 20,
            offset: 0,
            total_count: 102
          }
        };

    beforeEach(function() {
      $httpBackend.expectGET(/(.)*\/runs$/).respond(function() {
        return [200, resultWithPagination, {}];
      });
      controller = $controller('RunController', {$scope: scope});
      $httpBackend.flush();
    });

    it('says you are at the first page', function() {
      expect(scope.currentPage).toBe(1);
    });

    it('counts total pages', function() {
      expect(scope.totalPages).toBe(6);
    });
  });

  describe('the first page is loaded', function() {
    var scope = {},
        singleRun = {
          runs: [{ids: '1'}],
          meta: {
            limit: 20,
            offset: 0
          }
        };

    beforeEach(function() {
      $httpBackend.expectGET(/(.)*\/runs$/).respond(function() {
        return [200, singleRun, {}];
      });
      controller = $controller('RunController', {$scope: scope});
      $httpBackend.flush();
    });

    describe('when I click next page', function() {

      var twoRunsWithPagination = {
        runs: [{id: '1'}, {id: '2'}],
        meta: {
          offset: 20,
          limit: 20
        }
      };

      beforeEach(function() {
        $httpBackend.expectGET("http://localhost:5000/runs?limit=20&offset=20").respond(function() {
          return [200, twoRunsWithPagination, {}];
        });
      });

      it('loads the second page', function() {
        scope.next();
        $httpBackend.flush();

        expect(scope.runs).toEqual( twoRunsWithPagination.runs );
      });

      it('updates the pagination info', function() {
        expect(scope.pagination.offset).toBe(0);

        scope.next();
        $httpBackend.flush();

        expect(scope.pagination.offset).toBe(20);
      });
    });
  });
});
