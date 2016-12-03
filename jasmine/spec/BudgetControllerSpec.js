describe('Budget Controller', function() {

    var addItem = budgetController.addItem;

    it('should be able to add item', function () {
        addItem('exp', 'Test', 100);
        budgetController.calculateBudget();

        var result = budgetController.getBudget();

        expect(result).toEqual(jasmine.objectContaining({
            budget: -100,
            totalInc: 0,
            totalExp: 100,
            percentage: -1
        }));
    });
});