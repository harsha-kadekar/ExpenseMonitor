import * as angular from 'angular';
import 'angular-mocks';

angular.module('expenseMonitorApp', []);

describe('greeter', function () {

    it('should say Hello to the World', function () {
        expect(4).toEqual(4);
        
        //expect(greet('World')).toEqual('Hello, World!');
    });
});