(function(a) { (function() {
        var b = false;
        var c = (/xyz/.test(function() {
            xyz
        })) ? (/\b_super\b/) : (/.*/);
        this.Class = function() {};
        Class.extend = function(h) {
            var g = this.prototype;
            b = true;
            var f = new this();
            b = false;
            for (var e in h) {
                if (typeof h[e] == "function" && typeof g[e] == "function" && c.test(h[e])) {
                    f[e] = (function(i, j) {
                        return function() {
                            var l = this._super;
                            this._super = g[i];
                            var k = j.apply(this, arguments);
                            this._super = l;
                            return k
                        }
                    })(e, h[e])
                } else {
                    f[e] = h[e]
                }
            }
            function d() {
                if (!b && this.init) {
                    this.init.apply(this, arguments)
                }
            }
            d.prototype = f;
            d.constructor = d;
            d.extend = arguments.callee;
            return d
        }
    })();
    a.fn.lateralSlider = function(b) {
        var d = {
            displayDuration: 2000,
            animateDuration: 1500,
            numColumns: 10,
            transitions: "fade,slideUp,slideDown,slideLeft,slideRight,slideUpAndDown,slideLeftAndRight,fadeAndSlideUp,fadeAndSlideDown,fadeAndSlideLeft,fadeAndSlideRight,fadeSlideUpAndRight,fadeSlideDownAndLeft",
            random: false,
            hidePrevAndNextArrows: false,
            hideSlideChooser: false,
            captionOpacity: 0.8
        };
        var c = a.extend({},
        d, b);
        this.each(function() {
            var j = a(this);
            var t = Class.extend({
                $imgs: null,
                size: null,
                displayImg: null,
                nextImg: null,
                numDivs: null,
                divWidth: null,
                baseCSS: null,
                $divs: null,
                transitions: [],
                transition: null,
                transitionCount: null,
                interval: null,
                width: null,
                init: function() {
                    this.$imgs = a("img", j);
                    this.size = this.$imgs.size();
                    this.$imgs.hide();
                    this.nextImg = 0;
                    this.width = j.width();
                    this.numDivs = c.numColumns;
                    this.divWidth = this.width / this.numDivs;
                    this.baseCSS = {
                        width: this.divWidth,
                        position: "absolute",
                        top: 0,
                        backgroundRepeat: "no-repeat"
                    };
                    this.createDivs();
                    this.$divs = a("div", j);
                    this.transitionCount = -1
                },
                createDivs: function() {
                    for (var A = 0; A < this.numDivs; A++) {
                        var B = a("<div></div>");
                        B.css(this.baseCSS);
                        B.css("left", this.divWidth * A);
                        B.appendTo(j)
                    }
                }
            });
            var y = new t();
            var g = Class.extend({
                baseDuration: null,
                originalOffset: null,
                offset: null,
                init: function() {
                    this.baseDuration = c.animateDuration / 8;
                    this.originalOffset = 7 * c.animateDuration / (8 * y.numDivs);
                    this.offset = 7 * c.animateDuration / (8 * y.numDivs)
                },
                duration: function() {
                    return this.baseDuration + this.offset
                },
                increment: function() {
                    this.offset += this.originalOffset
                },
                reset: function() {
                    this.offset = this.originalOffset
                },
                getCSS: function(A) {
                    return {}
                },
                eachDiv: function() {
                    return {}
                },
                applyTransition: function() {
                    y.$divs.each(this.eachDiv);
                    this.reset()
                }
            });
            var v = g.extend({
                applyTransition: function() {
                    var A = this;
                    y.$divs.each(function() {
                        var B = A.eachDiv;
                        if (typeof(A.eachDiv) == "function") {
                            B = B()
                        }
                        a(this).animate(B, A.duration());
                        A.increment()
                    });
                    this.reset()
                }
            });
            var m = v.extend({
                getCSSIndex: null,
                eachDivIndex: null,
                getCSSGroup: null,
                eachDivGroup: null,
                init: function() {
                    this._super();
                    this.getCSSGroup = new Array();
                    this.eachDivGroup = new Array();
                    this.getCSSIndex = 0;
                    this.eachDivIndex = 0
                },
                getCSS: function(B) {
                    var A = this.getCSSGroup[this.getCSSIndex];
                    this.getCSSIndex = (this.getCSSIndex + 1) % this.getCSSGroup.length;
                    return A(B)
                },
                addTransition: function(A) {
                    this.getCSSGroup.push(A.getCSS);
                    this.eachDivGroup.push(A.eachDiv)
                },
                applyTransition: function() {
                    var A = this;
                    y.$divs.each(function() {
                        var B = A.eachDivGroup[A.eachDivIndex];
                        if (typeof(B) == "function") {
                            B = B()
                        }
                        a(this).animate(B, A.duration());
                        A.eachDivIndex = (A.eachDivIndex + 1) % A.eachDivGroup.length;
                        A.increment()
                    });
                    this.reset()
                }
            });
            var u = v.extend({
                getCSS: function(A) {
                    return {
                        opacity: 0
                    }
                },
                eachDiv: {
                    opacity: 1
                }
            });
            var f = v.extend({
                getCSS: function(A) {
                    return {
                        top: y.$imgs.eq(y.nextImg).height()
                    }
                },
                eachDiv: {
                    top: 0
                }
            });
            var h = v.extend({
                getCSS: function(A) {
                    return {
                        height: 0
                    }
                },
                eachDiv: function() {
                    return {
                        height: y.$imgs.eq(y.nextImg).height()
                    }
                }
            });
            var r = v.extend({
                getCSS: function(B) {
                    var A = B.css("left");
                    A = parseInt(A.substring(0, A.length - 2), 10);
                    return {
                        left: A + y.divWidth,
                        width: 0
                    }
                },
                eachDiv: {
                    left: "-=" + y.divWidth,
                    width: y.divWidth
                }
            });
            var q = v.extend({
                getCSS: function(A) {
                    return {
                        width: 0
                    }
                },
                eachDiv: {
                    width: y.divWidth
                }
            });
            var o = m.extend({
                addTransitions: function(A, B) {
                    this.addTransition(A);
                    this.addTransition(B)
                }
            });
            var w = m.extend({
                addTransitions: function(B, A) {
                    this.addTransition(B);
                    this.addTransition(A)
                }
            });
            var k = m.extend({
                addTransitions: function(A, B) {
                    this.addTransition(A);
                    this.addTransition(B)
                }
            });
            var n = m.extend({
                addTransitions: function(A, B) {
                    this.addTransition(A);
                    this.addTransition(B)
                }
            });
            var p = m.extend({
                addTransitions: function(A, B) {
                    this.addTransition(A);
                    this.addTransition(B)
                }
            });
            var e = m.extend({
                addTransitions: function(A, B) {
                    this.addTransition(A);
                    this.addTransition(B)
                }
            });
            var x = m.extend({
                addTransitions: function(A, C, B) {
                    this.addTransition(A);
                    this.addTransition(C);
                    this.addTransition(B)
                }
            });
            var s = m.extend({
                addTransitions: function(C, A, B) {
                    this.addTransition(C);
                    this.addTransition(A);
                    this.addTransition(B)
                }
            });
            var z = {
                fade: new u(),
                slideUp: new f(),
                slideDown: new h(),
                slideLeft: new r(),
                slideRight: new q(),
                slideUpAndDown: new o(),
                slideLeftAndRight: new w(),
                fadeAndSlideUp: new k(),
                fadeAndSlideDown: new n(),
                fadeAndSlideLeft: new p(),
                fadeAndSlideRight: new e(),
                fadeSlideUpAndRight: new x(),
                fadeSlideDownAndLeft: new s()
            };
            z.slideUpAndDown.addTransitions(z.slideUp, z.slideDown);
            z.slideLeftAndRight.addTransitions(z.slideLeft, z.slideRight);
            z.fadeAndSlideUp.addTransitions(z.slideUp, z.fade);
            z.fadeAndSlideDown.addTransitions(z.fade, z.slideDown);
            z.fadeAndSlideLeft.addTransitions(z.fade, z.slideLeft);
            z.fadeAndSlideRight.addTransitions(z.slideRight, z.fade);
            z.fadeSlideUpAndRight.addTransitions(z.slideUp, z.fade, z.slideRight);
            z.fadeSlideDownAndLeft.addTransitions(z.slideDown, z.fade, z.slideLeft);
            t.prototype.populateTransitions = function() {
                var B = c.transitions.split(/,\s*/g);
                for (var A in B) {
                    this.transitions.push(z[B[A]])
                }
            };
            t.prototype.getTransition = function() {
                if (c.random) {
                    var A = Math.floor(Math.random() * this.transitions.length);
                    return this.transitions[A]
                } else {
                    this.transitionCount = (this.transitionCount + 1) % this.transitions.length;
                    return this.transitions[this.transitionCount]
                }
            };
            t.prototype.addDivCSS = function() {
                var B = this;
                var C = B.$imgs.eq(B.nextImg);
                var D = "url(" + C.attr("src") + ")";
                var A = C.height();
                this.$divs.each(function() {
                    var E = a(this);
                    E.css({
                        backgroundImage: D,
                        backgroundPosition: "-" + E.css("left") + " 0px",
                        height: A
                    });
                    E.css(B.transition.getCSS(E))
                })
            };
            t.prototype.process = function() {
                j.css({
                    backgroundImage: "url(" + this.$imgs.eq(this.displayImg).attr("src") + ")",
                    backgroundRepeat: "no-repeat"
                });
                this.transition = this.getTransition();
                this.addDivCSS();
                this.transition.applyTransition();
                j.animate({
                    height: this.$imgs.eq(this.nextImg).height()
                },
                c.animateDuration);
                this.advanceShow()
            };
            t.prototype.updateCurrent = function() {
                a('.circle[rel="' + this.displayImg + '"]').removeClass("circle-current");
                a('.circle[rel="' + this.nextImg + '"]').addClass("circle-current")
            };
            t.prototype.advanceShow = function() {
                this.updateCurrent();
                this.displayImg = this.nextImg;
                if (this.nextImg == this.size - 1) {
                    this.nextImg = 0
                } else {
                    this.nextImg++
                }
            };
            t.prototype.startShow = function() {
                this.interval = window.setInterval(a.proxy(this.runner, this), c.displayDuration + c.animateDuration)
            };
            t.prototype.stopShow = function() {
                window.clearInterval(this.interval)
            };
            t.prototype.goToSlide = function(A) {
                if (this.$divs.filter(":animated").size() > 0) {
                    return
                }
                this.stopShow();
                this.nextImg = A;
                this.updateCurrent();
                this.runner();
                if (this.nextImg == 0) {
                    this.displayImg = this.size - 1
                } else {
                    this.displayImg = this.nextImg - 1
                }
                this.startShow()
            };
            t.prototype.applyLink = function() {
                var C = this.$imgs.eq(this.displayImg);
                var B = C.parent();
                if (B.is("a")) {
                    B.removeAttr("style")
                }
                var A = this.$imgs.eq(this.nextImg);
                var D = A.parent();
                if (D.is("a")) {
                    D.css({
                        display: "block",
                        textDecoration: "none",
                        border: "0",
                        width: j.width(),
                        height: A.height(),
                        position: "absolute",
                        top: 0,
                        left: 0,
                        zIndex: 100
                    })
                }
            };
            t.prototype.applyCaption = function() {
                var A = this.$imgs.eq(this.nextImg);
                var C = A.attr("title");
                var D = a(".caption", j);
                D.slideUp(function() {
                    a(this).html(C)
                });
                if (C != "") {
                    if (D.size() > 0) {
                        if (!D.is(":visible")) {
                            D.html(C)
                        }
                        D.slideDown()
                    } else {
                        var B = a('<div class="caption"><span>' + C + "</span></div>");
                        B.css({
                            opacity: c.captionOpacity,
                            width: j.width(),
                            position: "absolute",
                            top: 0,
                            left: 0,
                            display: "none"
                        });
                        B.appendTo(j);
                        B.slideDown()
                    }
                }
            };
            t.prototype.runner = function() {
                this.applyLink();
                this.applyCaption();
                this.process()
            };
            t.prototype.begin = function() {
                var A = this.$imgs.eq(this.nextImg);
                j.css({
                    backgroundImage: "url(" + A.attr("src") + ")",
                    height: A.height()
                });
                this.runner();
                this.transitionCount--;
                this.startShow()
            };
            var i = Class.extend({
                circleCount: null,
                init: function() {
                    this.circleCount = 0
                },
                addAll: function() {
                    this.addCircles();
                    this.addPrevAndNextLinks();
                    a("a.circle").click(this.circleClickHandler);
                    a(".prev-link").click(this.prevLinkHandler);
                    a(".next-link").click(this.nextLinkHandler);
                    if (c.hideSlideChooser) {
                        a("a.circle").hide()
                    }
                    if (c.hidePrevAndNextArrows) {
                        a(".prev-link, .next-link").hide()
                    }
                },
                addCircles: function() {
                    var A = this;
                    y.$imgs.each(function() {
                        var B = a('<a href="#" rel="' + A.circleCount + '" class="circle"></a>');
                        B.css({
                            right: (y.size - A.circleCount - 1) * 20 + 10
                        });
                        B.appendTo(j);
                        A.circleCount++
                    })
                },
                addPrevAndNextLinks: function() {
                    a('<a href="#" class="prev-link"></a>').appendTo(j);
                    a('<a href="#" class="next-link"></a>').appendTo(j)
                },
                circleClickHandler: function(B) {
                    var A = parseInt(a(this).attr("rel"), 10);
                    y.goToSlide(A);
                    B.preventDefault()
                },
                prevLinkHandler: function(B) {
                    var A = y.displayImg - 1;
                    if (A < 0) {
                        A = y.size - 1
                    }
                    y.goToSlide(A);
                    B.preventDefault()
                },
                nextLinkHandler: function(B) {
                    var A = y.displayImg + 1;
                    if (A >= y.size) {
                        A = 0
                    }
                    y.goToSlide(A);
                    B.preventDefault()
                }
            });
            var l = new i();
            l.addAll();
            y.populateTransitions();
            y.begin()
        });
        return this
    }
})(jQuery);
/*
本代码由97站长网收集并编辑整理;
尊重他人劳动成果;
转载请保留97站长网链接 - www.97zzw.com
*/