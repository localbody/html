// functions for traversing the DOM

var getDOMElements = function(element) {
    return Array.prototype.slice.call(element);
};

var findChildElementByClass = function(parent, cssClass) {
    var children = getDOMElements(parent.childNodes);
    var element;

    children.forEach(function(node) {
        if (node.classList !== undefined && node.classList.contains(cssClass)) {
            element = node;
        };
    });

    return element
};

// variables

var menuItems = getDOMElements(document.getElementsByClassName('js-item'));
var menuItemCount = menuItems.length;
var menuToggle = getDOMElements(document.getElementsByClassName('js-toggle'));
var uiClose = document.getElementsByClassName('js-ui-close')[0];
var twitterIcon = document.getElementsByClassName('js-icon')[0];
var author = document.getElementsByClassName('js-copy')[0];
var dribbble = document.getElementsByClassName('js-dribbble');
var menuHeader = document.getElementsByClassName('js-menu');

var colors = [
    '#563761',
    '#A7425C',
    '#F3825F',
    '#FFE26F'
];

// animation functions

var toInitialState = function(time, curve) {
    var curve = curve || 'Power2.easeInOut';
    TweenMax.to(menuItems[0], time, {
        x: "5%",
        y: "10%",
        ease: curve
    });
    TweenMax.to(menuItems[1], time, {
        x: "10%",
        y: "20%",
        ease: curve
    });
    TweenMax.to(menuItems[2], time, {
        x: "15%",
        y: "30%",
        ease: curve
    });
    TweenMax.to(menuItems[3], time, {
        x: "20%",
        y: "40%",
        ease: curve
    });
};

var toInitialStateOffset = function(time, curve, offset) {
    var curve = curve || 'Power2.easeInOut';
    var offset = offset || 0.1;

    TweenMax.to(menuItems[0], time + offset, {
        x: "5%",
        y: "10%",
        ease: curve
    });
    TweenMax.to(menuItems[1], time + offset * 2, {
        x: "10%",
        y: "20%",
        ease: curve
    });
    TweenMax.to(menuItems[2], time + offset * 3, {
        x: "15%",
        y: "30%",
        ease: curve
    });
    TweenMax.to(menuItems[3], time + offset * 4, {
        x: "20%",
        y: "40%",
        ease: curve
    });
};

var menuOffset = function (time, curve) {
    TweenMax.staggerFrom(menuHeader, time, {
        x: 500
    }, 0.1, curve);
};

menuItems.forEach(function(element) {
    element.addEventListener('click', function() {
        var current = this;
        var index = menuItems.indexOf(current);
        var nextElements = [];
        var previousElements = [];
        var currentColor = colors[index];
        //var currentColor = window.getComputedStyle(this).backgroundColor;

        for (var i = 0; i < menuItemCount; i++) {
            if (i > index) {
                nextElements.push(menuItems[i]);
            } else if (i < index) {
                previousElements.push(menuItems[i]);
            }
        }

        var menu = findChildElementByClass(current, 'js-menu');
        var button = findChildElementByClass(menu, 'js-toggle');

        TweenMax.to(current, 0.3, {
            x: "0%",
            y: "0%",
            ease: Power2.easeInOut,
        });
        TweenMax.to(current, 0.001, {
            backgroundColor: "rgb(255, 255, 255)"
        });
        TweenMax.to(current, 0.3, {
            backgroundColor: currentColor
        }).delay(0.001);
        TweenMax.to(previousElements, 0.3, {
            x: "0%",
            y: "0%",
            ease: Power2.easeInOut
        });
        TweenMax.to(nextElements, 0.3, {
            x: "100%",
            ease: Power2.easeInOut
        });
        TweenMax.to(menu, 0.3, {
            x: "0%",
            ease: Power2.easeInOut
        });
        TweenMax.to(button, 0.3, {
            autoAlpha: 1
        });
        TweenMax.to(uiClose, 0.3, {
            css: {
                rotation: 30,
                y: 30
            }
        });
    });
});

menuToggle.forEach(function(element) {
    element.addEventListener('click', function(event) {
        event.stopPropagation();

        var toggle = this;
        var parent = this.parentNode;

        toInitialState(0.3);

        TweenMax.to(parent, 0.3, {
            x: "-30px"
        });
        TweenMax.to(toggle, 0.3, {
            autoAlpha: 0
        });
        TweenMax.to(uiClose, 0.3, {
            css: {
                rotation: 0,
                y: 0
            }
        });
    });
});

uiClose.addEventListener('click', function() {
    if (!this.classList.contains('is-opened')) {
        TweenMax.to(menuItems, 0.5, {
            x: "100%",
            ease: Power3.easeIn
        });
        TweenMax.fromTo(twitterIcon, 0.6, {
            x: 300,
            ease: Power3.easeOut
        }, {
            x: 0
        });
        TweenMax.fromTo(author, 0.6, {
            css: {
                letterSpacing: "-6px",
                x: 300,
                autoRound: false
            }
        }, {
            css: {
                letterSpacing: "2px",
                x: 0
            }
        });
        TweenMax.fromTo(dribbble, 2, {
            x: 50
        }, {
            x: 0,
            ease: Bounce.easeOut
        });
        this.classList.add('is-opened');

    } else {
        this.classList.remove('is-opened');
        toInitialStateOffset(0.6);
        menuOffset(0.5, "Power2.easeInOut");

        TweenMax.to(twitterIcon, 0.5, {
            x: 300,
            ease: Power2.easeIn
        });
        TweenMax.to(author, 0.6, {
            css: {
                letterSpacing: "2px",
                x: 300,
                autoRound: false,
            },
            ease: Power3.easeIn
        });
        TweenMax.to(dribbble, 0.6, {
            x: 400,
            ease: Power3.easeIn
        });
    }
});
