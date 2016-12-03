describe('Budget Controller', function() {
    var budgetController = require('../src/js/components/budgetController');
    var addItem = budgetController.addItem;


    it('should be able to add item', function () {
        addItem('exp', 'Test', 100);

        expect(addItem).toBe(true);
    });
});