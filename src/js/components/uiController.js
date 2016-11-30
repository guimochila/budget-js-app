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

   function nodeListForEach (list, callback) {
                for (var i = 0; i < list.length; i++) {
                    callback(list[i], i);
                }
            };

    function formatNumber(num, type) {
        var numSplit, int, dec;

        num = Math.abs(num);
        num = num.toFixed(2);
        numSplit = num.split('.');
        int = numSplit[0];

        if (int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
        }

        dec = numSplit[1];

        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' +  dec;
    }

    return {
        getinput: function () {
            return {
                type: DOMStrings.$inputType.value, // inc or exp
                description: DOMStrings.$inputDescription.value,
                value: parseFloat(DOMStrings.$inputValue.value)
            };
        },

        addListItem: function (obj, type) {
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
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

            // Insert the HTML into the DOM
            element.insertAdjacentHTML('beforeend', newHtml);

        },

        deleteListItem: function (selectorID) {

            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);

        },

        clearFields: function () {
            var fields, fieldsArr;

            fields = document.querySelectorAll('.add__description' + ', ' + '.add__value');

            fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(function (element, index, arr) {
                element.value = '';
            }, this);

            fieldsArr[0].focus();
        },

        displayBudget: function (obj) {
            var type;

            obj.budget > 0 ? type = 'inc' : type = 'exp';

            DOMStrings.$budgetLabel.textContent = formatNumber(obj.budget, type);
            DOMStrings.$incomeLabel.textContent = formatNumber(obj.totalInc, 'inc');
            DOMStrings.$expenseLabel.textContent = formatNumber(obj.totalExp, 'exp');

            if (obj.percentage > 0) {
                DOMStrings.$percentageLabel.textContent = obj.percentage + '%';
            } else {
                DOMStrings.$percentageLabel.textContent = '---';
            }
        },

        displayPercentage: function (percentages) {

            var fields = document.querySelectorAll('.item__percentage');

            var nodeListForEach = function (list, callback) {
                for (var i = 0; i < list.length; i++) {
                    callback(list[i], i);
                }
            };

            nodeListForEach(fields, function (current, index) {
                if (percentages[index] > 0) {
                    current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = '---';
                }
            });
        },

        displayMonth: function() {
            var now, year, month, months;

            now = new Date();
            year = now.getFullYear();

            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            month =  now.getMonth();
            document.querySelector('.budget__title--month').textContent = months[month] + ' ' + year;
        },

        changedType: function () {
            var fields = document.querySelectorAll('.add__type , .add__description, .add__value');

            nodeListForEach(fields, function (item) {
                item.classList.toggle('red-focus');
            });

            DOMStrings.$inputBtn.classList.toggle('red');
        },

        getDOMStrings: function () {
            return DOMStrings;
        }
    };

})();

module.exports = UIController;