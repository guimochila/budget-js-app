describe('Budget Controller', function () {

    var b = budgetController;

    // Testing adding expense
    it('should be able to add expense', function () {
        b.addItem('exp', 'Test', 100);
        b.calculateBudget();

        var result = b.getBudget();

        expect(result).toEqual(jasmine.objectContaining({
            budget: -100,
            totalInc: 0,
            totalExp: 100,
            percentage: -1
        }));
    });

    // Testing remove items
    it('should be able to remove expense', function () {
        b.deleteItem('exp', 0);
        b.calculateBudget();

        var result = b.getBudget();

        expect(result).toEqual(jasmine.objectContaining({
            budget: 0,
            totalInc: 0,
            totalExp: 0,
            percentage: -1
        }));
    });

    // Testing adding incoming
    it('should be able to add incoming', function () {
        b.addItem('inc', 'Test', 100);
        b.calculateBudget();

        var result = b.getBudget();

        expect(result).toEqual(jasmine.objectContaining({
            budget: 100,
            totalInc: 100,
            totalExp: 0,
            percentage: 0
        }));
    });
});