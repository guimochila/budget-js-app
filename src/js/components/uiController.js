// User-interface controller
var UIController = (function () {

    // DOM Cache
    var DOMStrings = {
        $inputType: document.querySelector('.add__type'),
        $inputDescription: document.querySelector('.add__description'),
        $inputValue: document.querySelector('.add__value'),
        $inputBtn: document.querySelector('.add__btn'),
        $incomeContainer: document.querySelector('.income__list'),
        $expenseContainer: document.querySelector('.expenses__list'),
        $budgetLabel: document.querySelector('.budget__value'),
        $incomeLabel: document.querySelector('.budget__income--value'),
        $expenseLabel: document.querySelector('.budget__expenses--value'),
        $percentageLabel: document.querySelector('.budget__expenses--percentage'),
        $container: document.querySelector('.container'),
    };

    // Private functions
    function _nodeListForEach(list, callback) {
        for (var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    };

    function _formatNumber(num, type) {
        var _numSplit, _int, _dec;

        num = Math.abs(num);
        num = num.toFixed(2);
        _numSplit = num.split('.');
        _int = _numSplit[0];

        if (_int.length > 3) {
            _int = _int.substr(0, _int.length - 3) + ',' + _int.substr(_int.length - 3, 3);
        }

        _dec = _numSplit[1];

        return (type === 'exp' ? '-' : '+') + ' ' + _int + '.' + _dec;
    }

    // Public functions
    function getinput() {
        return {
            type: DOMStrings.$inputType.value, // inc or exp
            description: DOMStrings.$inputDescription.value,
            value: parseFloat(DOMStrings.$inputValue.value)
        };
    }

    function addListItem(obj, type) {
        var html, newHtml, element;
        // Create HTML string with placehold text

        if (type === 'inc') {
            element = DOMStrings.$incomeContainer;
            html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description"> %description% </div ><div class="right clearfix"><div class="item__value"> %value% </div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        } else if (type === 'exp') {
            element = DOMStrings.$expenseContainer;
            html = '<div class="item clearfix" id="exp-%id%"> <div class="item__description"> %description%</div><div class="right clearfix"> <div class="item__value"> %value% </div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div></div></div>';
        }

        // Replace the placeholder text with data
        newHtml = html.replace('%id%', obj.id);
        newHtml = newHtml.replace('%description%', obj.description);
        newHtml = newHtml.replace('%value%', _formatNumber(obj.value, type));

        // Insert the HTML into the DOM
        element.insertAdjacentHTML('beforeend', newHtml);

    }

    function deleteListItem(selectorID) {

        var el = document.getElementById(selectorID);
        el.parentNode.removeChild(el);

    };

    function clearFields() {
        var fields, fieldsArr;

        fields = document.querySelectorAll('.add__description' + ', ' + '.add__value');

        fieldsArr = Array.prototype.slice.call(fields);
        fieldsArr.forEach(function (element) {
            element.value = '';
        }, this);

        fieldsArr[0].focus();
    }

    function displayBudget(obj) {
        var type;

        obj.budget > 0 ? type = 'inc' : type = 'exp';

        DOMStrings.$budgetLabel.textContent = _formatNumber(obj.budget, type);
        DOMStrings.$incomeLabel.textContent = _formatNumber(obj.totalInc, 'inc');
        DOMStrings.$expenseLabel.textContent = _formatNumber(obj.totalExp, 'exp');

        if (obj.percentage > 0) {
            DOMStrings.$percentageLabel.textContent = obj.percentage + '%';
        } else {
            DOMStrings.$percentageLabel.textContent = '---';
        }
    }

    function displayPercentage(percentages) {

        var fields = document.querySelectorAll('.item__percentage');

        var _nodeListForEach = function (list, callback) {
            for (var i = 0; i < list.length; i++) {
                callback(list[i], i);
            }
        };

        _nodeListForEach(fields, function (current, index) {
            if (percentages[index] > 0) {
                current.textContent = percentages[index] + '%';
            } else {
                current.textContent = '---';
            }
        });
    }

    function displayMonth() {
        var now, year, month, months;

        now = new Date();
        year = now.getFullYear();

        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        month = now.getMonth();
        document.querySelector('.budget__title--month').textContent = months[month] + ' ' + year;
    }

    function changedType() {
        var fields = document.querySelectorAll('.add__type , .add__description, .add__value');

        _nodeListForEach(fields, function (item) {
            item.classList.toggle('red-focus');
        });

        DOMStrings.$inputBtn.classList.toggle('red');
    }

    function getDOMStrings() {
        return DOMStrings;
    }

    return {
        getinput:       getinput,
        addListItem:    addListItem,
        deleteListItem: deleteListItem,
        clearFields:    clearFields,
        displayBudget:  displayBudget,
        displayPercentage: displayPercentage,
        displayMonth:   displayMonth,
        changedType:    changedType,
        getDOMStrings:  getDOMStrings
    };

})();

module.exports = UIController;