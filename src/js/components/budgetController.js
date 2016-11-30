// Budget Controller Module
var budgetController = (function () {

    // Private Functions

    // Expense Constructor
    var _Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    //Calculate percentage method
    _Expense.prototype.calcPercentage = function (total_Income) {
        if (total_Income > 0) {
            this.percentage = Math.round((this.value / total_Income) * 100);
        } else {
            this.percentage = -1;
        }
    };

    // Get percentage method
    _Expense.prototype.getPercentage = function () {
        return this.percentage;
    };

    // _Income contructor
    var _Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var _calculateTotal = function (type) {
        var sum = 0;

        _data.allItems[type].forEach(function (cur) {
            sum += cur.value;
        });
        _data.total[type] = sum;
    };

    var _data = {
        allItems: {
            exp: [],
            inc: []
        },
        total: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };

    // Public Functions
    function addItem(type, des, val) {
        var newItem, ID;

        //Create new ID
        if (_data.allItems[type].length > 0) {
            ID = _data.allItems[type][_data.allItems[type].length - 1].id + 1;
        } else {
            ID = 0;
        }

        //Create newItem based on exp or inc type
        if (type === 'exp') {
            newItem = new _Expense(ID, des, val);
        } else if (type === 'inc') {
            newItem = new _Income(ID, des, val);
        }

        // Push in into the _data sctructure
        _data.allItems[type].push(newItem);

        // Return the new element
        return newItem;
    };

    function deleteItem(type, id) {
        var ids, index;

        ids = _data.allItems[type].map(function (current) {
            return current.id;
        });

        index = ids.indexOf(id);

        if (index !== -1) {
            _data.allItems[type].splice(index, 1);
        }

    };

    function calculateBudget() {
        // Calculate total income and expenses
        _calculateTotal('inc');
        _calculateTotal('exp');

        // Calculate the budget
        _data.budget = _data.total.inc - _data.total.exp;

        // Calculate the percentage
        if (_data.total.inc > 0) {
            _data.percentage = Math.round((_data.total.exp / _data.total.inc) * 100);
        } else {
            _data.percentage = -1;
        }
    };

    function calculatePercentages() {
        _data.allItems.exp.forEach(function (cur) {
            cur.calcPercentage(_data.total.inc);
        });
    };

    function getPercentage() {
        var allPerc = _data.allItems.exp.map(function (cur) {
            return cur.getPercentage();
        });
        return allPerc;
    };

    function getBudget() {
        return {
            budget: _data.budget,
            totalInc: _data.total.inc,
            totalExp: _data.total.exp,
            percentage: _data.percentage
        };
    };

    return {
        addItem: addItem,
        deleteItem: deleteItem,
        calculateBudget: calculateBudget,
        calculatePercentages: calculatePercentages,
        getPercentage: getPercentage,
        getBudget: getBudget
    };

})();

module.exports = budgetController;