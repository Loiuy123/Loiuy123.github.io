var SUPABASE_URL = 'https://ewkmvcinzjugudchppuw.supabase.co'
var SUPABASE_KEY =
  'JINrYkGJxV/TDCigAbQU+hF98NxFiaTbkacVWCBkDSgakkanDlCBTmmqpZPclRbhTOxFyqiCpkqchdnrIF8X6Q=='

var supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY)

(window.webpackJsonp = window.webpackJsonp || []).push([
    [1],
    [function(e, t, i) {
        "use strict";
        var n = i(1);

        function s(e, t) {
            var i;
            if ("undefined" == typeof Symbol || null == e[Symbol.iterator]) {
                if (Array.isArray(e) || (i = function(e, t) {
                        if (!e) return;
                        if ("string" == typeof e) return o(e, t);
                        var i = Object.prototype.toString.call(e).slice(8, -1);
                        "Object" === i && e.constructor && (i = e.constructor.name);
                        if ("Map" === i || "Set" === i) return Array.from(e);
                        if ("Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)) return o(e, t)
                    }(e)) || t && e && "number" == typeof e.length) {
                    i && (e = i);
                    var n = 0,
                        s = function() {};
                    return {
                        s: s,
                        n: function() {
                            return n >= e.length ? {
                                done: !0
                            } : {
                                done: !1,
                                value: e[n++]
                            }
                        },
                        e: function(e) {
                            throw e
                        },
                        f: s
                    }
                }
                throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }
            var r, a = !0,
                l = !1;
            return {
                s: function() {
                    i = e[Symbol.iterator]()
                },
                n: function() {
                    var e = i.next();
                    return a = e.done, e
                },
                e: function(e) {
                    l = !0, r = e
                },
                f: function() {
                    try {
                        a || null == i.return || i.return()
                    } finally {
                        if (l) throw r
                    }
                }
            }
        }

        function o(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var i = 0, n = new Array(t); i < t; i++) n[i] = e[i];
            return n
        }
        var r = {
            initId: "board",
            mineSweeperBoard: "",
            col: 19,
            row: 11,
            blocks: 0,
            mineRate: .16,
            mineNumber: 0,
            mineSweeperArray: [],
            mineArray: [],
            blockIDs: "block_",
            clickedBlocks: 0,
            markedBlocks: new Set,
            unCoveredBlocks: 0,
            clickTime: 0,
            interval: null,
            tipsInterval: null,
            debugMode: !1,
            isAutoSweeper: !1,
            aiDelay: 0,
            isLoopSweeper: !1,
            initBoard: function(e) {
                var t = document.getElementById("mineSweeper"),
                    i = document.getElementById(this.initId);
                this.col = e.col, this.row = e.row, this.mineRate = e.mineRate, t.removeChild(i);
                var n = document.createElement("section");
                n.setAttribute("id", this.initId), t.style.width = 40 * this.col + "px", n.style.width = 40 * this.col + "px", n.style.height = 40 * this.row + "px", t.appendChild(n), this.mineSweeperBoard = n, this.blocks = this.col * this.row, this.mineNumber = Math.floor(this.blocks * this.mineRate), this.clickedBlocks = 0, this.unCoveredBlocks = 0, this.markedBlocks = new Set, this.tipsInterval = e.tipsInterval, this.debugMode = e.debugMode, this.isAutoSweeper = e.isAutoSweeper, this.aiDelay = e.aiDelay, this.isLoopSweeper = e.isLoopSweeper, document.getElementById("flagNum").textContent = this.mineNumber, document.getElementById("clockNum").textContent = 0, clearInterval(this.interval), this._initMine()
            },
            _initMine: function() {
                this.mineSweeperArray = new Array(this.blocks);
                for (var e = 0; e < this.mineSweeperArray.length; e++) this.mineSweeperArray[e] = {
                    status: "cover",
                    value: 0
                };
                this._generateMineBoard()
            },
            _generateMineBoard: function() {
                for (var e = this, t = function(t) {
                        var i = document.createElement("span");
                        if (t % 2 == 0 ? i.classList.add("odd-cover-color") : i.classList.add("even-cover-color"), i.id = e.blockIDs + t, e.debugMode) {
                            var n = document.createElement("i");
                            n.textContent = t, n.style.fontSize = "small", n.style.color = "#000", n.style.marginBottom = "1.8rem", i.appendChild(n)
                        }
                        e.mineSweeperBoard.appendChild(i), i.addEventListener("click", (function() {
                            e._handleBlocksLeftClick(t)
                        })), i.addEventListener("contextmenu", (function(i) {
                            e._handleBlocksRightClick(i, t)
                        }))
                    }, i = 0; i < this.blocks; i++) t(i);
                this.isAutoSweeper && this.initAiSweeper()
            },
            _handleBlocksLeftClick: function(e) {
                var t = this;
                if (0 === this.clickedBlocks) {
                    var i = Object(n.a)(e, this.blocks, this.col);
                    this.mineArray = this._getRandomNumber(this.blocks, this.mineNumber, i);
                    for (var o = 0; o < this.blocks; o++) {
                        var r, a = s(Object(n.a)(o, this.blocks, this.col));
                        try {
                            for (a.s(); !(r = a.n()).done;) {
                                var l = r.value;
                                this.mineArray.includes(l) && this.mineSweeperArray[o].value++
                            }
                        } catch (e) {
                            a.e(e)
                        } finally {
                            a.f()
                        }
                    }
                    this.clickTime = new Date, this.interval = setInterval((function() {
                        t._setTimeInterval()
                    }), 1e3), this._removeTips()
                }
                "cover" === this.mineSweeperArray[e].status && (this.clickedBlocks += 1, this._removeZeroMineCover(e))
            },
            _handleBlocksRightClick: function(e, t) {
                e && e.preventDefault();
                var i = document.getElementById(this.blockIDs + t);
                if ("uncover" !== this.mineSweeperArray[t].status && 0 !== this.clickedBlocks) {
                    if ("marked" === this.mineSweeperArray[t].status) t % 2 == 0 ? (i.classList.remove("odd-marked-mine"), i.classList.add("odd-cover-color")) : (i.classList.remove("even-marked-mine"), i.classList.add("even-cover-color")), this.markedBlocks.delete(t), this.mineSweeperArray[t].status = "cover";
                    else {
                        if (this.markedBlocks.size >= this.mineNumber) return;
                        t % 2 == 0 ? (i.classList.remove("odd-cover-color"), i.classList.add("odd-marked-mine")) : (i.classList.remove("even-cover-color"), i.classList.add("even-marked-mine")), this.markedBlocks.add(t), this.mineSweeperArray[t].status = "marked", this._checkSuccess()
                    }
                    document.getElementById("flagNum").textContent = this.mineNumber - this.markedBlocks.size
                }
            },
            _removeZeroMineCover: function(e) {
                var t = this,
                    i = document.getElementById(this.blockIDs + e);
                if ("cover" === this.mineSweeperArray[e].status) {
                    var s;
                    if (e % 2 == 0 ? i.classList.remove("odd-cover-color") : i.classList.remove("even-cover-color"), this.mineSweeperArray[e].status = "uncover", s = this.mineArray.includes(e) ? document.createTextNode("X") : document.createTextNode(this.mineSweeperArray[e].value), this._setDiffColor(i, s.textContent), 0 !== this.mineSweeperArray[e].value && i.appendChild(s), this.mineArray.includes(e)) return this._showMessage("Fail"), this._removeAllMineCover(e), void(this.aiClickResult && (this.aiClickResult = ["BOOM", e]));
                    if (this.aiClickResult && this.aiClickResult.push({
                            index: e,
                            value: this.mineSweeperArray[e].value
                        }), 0 === this.mineSweeperArray[e].value) Object(n.a)(e, this.blocks, this.col).forEach((function(i) {
                        e !== i && t._removeZeroMineCover(i)
                    }));
                    this.unCoveredBlocks += 1, this._checkSuccess()
                }
            },
            _removeAllMineCover: function(e) {
                var t = this;
                clearInterval(this.interval), this.mineArray.forEach((function(i, n) {
                    t.mineSweeperArray[i].status = "uncover";
                    var s = document.getElementById(t.blockIDs + i);
                    e !== i && setTimeout((function() {
                        i % 2 == 0 ? s.classList.remove("odd-cover-color") : s.classList.remove("even-cover-color"), "even-marked-mine" === s.classList[0] ? (s.classList.remove("even-marked-mine"), s.classList.add("even-marked-uncover-mine"), s.classList.add("mine")) : "odd-marked-mine" === s.classList[0] ? (s.classList.remove("odd-marked-mine"), s.classList.add("odd-marked-uncover-mine"), s.classList.add("mine")) : s.classList.add("boom"), s.appendChild(document.createTextNode("X"))
                    }), 100 * n)
                }))
            },
            _setDiffColor: function(e, t) {
                "2" === t ? e.classList.add("two") : "3" === t ? e.classList.add("three") : "4" === t ? e.classList.add("four") : "5" === t ? e.classList.add("five") : "X" === t && e.classList.add("boom")
            },
            _removeTips: function() {
                clearInterval(this.tipsInterval);
                var e = document.getElementById("tipsDig"),
                    t = document.getElementById("tipsFlag");
                e.style.display = "none", t.style.display = "none"
            },
            _setTimeInterval: function() {
                var e = document.getElementById("clockNum"),
                    t = Math.floor((new Date - this.clickTime) / 1e3);
                e.textContent = t < 1e3 ? t : 999
            },
            _checkSuccess: function() {
                if (this.unCoveredBlocks + this.markedBlocks.size === this.blocks && this.markedBlocks.size === this.mineArray.length) {
                    for (var e = 0; e < this.markedBlocks.size; e++)
                        if (!this.markedBlocks.has(this.mineArray[e])) return;
                    this.aiClickResult && (this.aiClickResult = ["Succ"]), this._showMessage("Succ"), this._removeAllMineCover()
                }
            },
            _getRandomNumber: function(e, t) {
                for (var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [], n = []; t > 0;) {
                    var s = Math.floor(Math.random() * e);
                    n.includes(s) || i.includes(s) || (n.push(s), t--)
                }
                return n
            },
            _showMessage: function(e) {
                if (this.isLoopSweeper) i.e(2).then(i.bind(null, 2)).then((function(t) {
                    t.loopSweeper.getResult(e)
                }));
                else {
                    var t = document.getElementById("rightMsg"),
                        n = document.getElementById("errorMsg"),
                        s = document.getElementById("messageBox");
                    s.style.animationName = "slidedown", s.addEventListener("animationiteration", (function() {
                        s.style.animationPlayState = "paused", setTimeout((function() {
                            s.style.animationPlayState = "running"
                        }), 2e3), setTimeout((function() {
                            s.style.animationName = ""
                        }), 4e3)
                    }), !1), "Succ" === e ? (t.style.display = "flex", n.style.display = "none") : "Fail" === e && (t.style.display = "none", n.style.display = "flex")
                }
            },
            initAiSweeper: function() {
                var e = {
                    col: this.col,
                    blocks: this.blocks,
                    mineNumber: this.mineNumber,
                    mineRate: this.mineRate,
                    blockIDs: this.blockIDs,
                    debugMode: this.debugMode,
                    aiDelay: this.aiDelay
                };
                i.e(0).then(i.bind(null, 6)).then((function(t) {
                    t.autoSweeper.getBoardInfo(e)
                }))
            },
            clickForAi: function(e, t) {
                if (this.debugMode && console.log("".concat(t, " click for ai, id: ").concat(e)), void 0 !== e) return this.aiClickResult = [], "left" === t ? this._handleBlocksLeftClick(e) : "right" === t && this._handleBlocksRightClick(null, e), this.aiClickResult
            }
        };
        t.a = r
    }, function(e, t, i) {
        "use strict";

        function n(e, t, i) {
            var n = [e];
            return 0 === e ? n.push.apply(n, [e + 1, e + i, e + i + 1]) : e === i - 1 ? n.push.apply(n, [e - 1, e + i, e + i - 1]) : e === t - i ? n.push.apply(n, [e + 1, e - i, e - i + 1]) : e === t - 1 ? n.push.apply(n, [e - 1, e - i, e - i - 1]) : e > 0 && e < i - 1 ? n.push.apply(n, [e - 1, e + 1, e + i, e + i - 1, e + i + 1]) : e > t - i && e < t - 1 ? n.push.apply(n, [e - 1, e + 1, e - i, e - i - 1, e - i + 1]) : e % i == 0 ? n.push.apply(n, [e + 1, e - i, e - i + 1, e + i, e + i + 1]) : (e + 1) % i == 0 ? n.push.apply(n, [e - 1, e - i, e - i - 1, e + i, e + i - 1]) : n.push.apply(n, [e - 1, e + 1, e + i, e - i, e - i - 1, e - i + 1, e + i - 1, e + i + 1]), n
        }
        i.d(t, "a", (function() {
            return n
        }))
    }, , function(e, t, i) {
        "use strict";
        i.r(t);
        var n = i(0),
            s = (i(4), document.getElementById("diffMode")),
            o = document.getElementById("refresh"),
            r = document.getElementById("tipsDig"),
            a = document.getElementById("tipsFlag"),
            l = document.getElementById("autoSweeper"),
            c = document.getElementById("debugMode"),
            d = document.getElementById("aiDelay"),
            u = document.getElementById("loopSweeper"),
            m = document.getElementById("showChart"),
            h = !0,
            v = setInterval((function() {
                h ? (r.style.display = "inline", a.style.display = "none") : (r.style.display = "none", a.style.display = "inline"), h = !h
            }), 1500);
        s.addEventListener("change", (function() {
            if ("Easy" === s.value ? (p.col = 11, p.row = 7, p.mineRate = .13) : "Medium" === s.value ? (p.col = 19, p.row = 11, p.mineRate = .16) : "Diffcult" === s.value && (p.col = 35, p.row = 17, p.mineRate = .19), u.checked) {
                var e = new Event("change");
                u.checked = !1, u.dispatchEvent(e), n.a.initBoard(p)
            } else if (l.checked) {
                var t = new Event("change");
                l.checked = !1, l.dispatchEvent(t)
            } else n.a.initBoard(p)
        }));
        var p = {
            col: 19,
            row: 11,
            mineRate: .16,
            tipsInterval: v,
            debugMode: !1,
            isAutoSweeper: !1,
            aiDelay: 0,
            isLoopSweeper: !1
        };
        l.addEventListener("change", (function(e) {
            p.isAutoSweeper = e.target.checked, n.a.initBoard(p)
        })), c.addEventListener("change", (function(e) {
            p.debugMode = e.target.checked, n.a.initBoard(p)
        })), d.addEventListener("change", (function(e) {
            p.aiDelay = e.target.checked ? 1e3 : 0, n.a.initBoard(p)
        })), u.addEventListener("change", (function(e) {
            var t = document.getElementById("loopInfo");
            i.e(2).then(i.bind(null, 2)).then((function(i) {
                var n = i.loopSweeper;
                e.target.checked ? (p.isLoopSweeper = !0, p.isAutoSweeper = !0, t.style.display = "block", l.checked = !0, d.disabled = !0, n.init(p)) : (p.isLoopSweeper = !1, p.isAutoSweeper = !1, l.checked = !1, d.disabled = !1, n.resetStatus(), t.style.display = "none")
            }))
        })), m.addEventListener("change", (function(e) {
            var t = document.getElementById("charts");
            e.target.checked ? (Promise.all([i.e(6), i.e(5), i.e(7), i.e(3)]).then(i.bind(null, 5)), t.style.display = "block") : t.style.display = "none"
        })), o.addEventListener("click", (function() {
            n.a.initBoard(p)
        })), n.a.initBoard(p)
    }, function(e, t, i) {}],
    [
        [3, 4]
    ]
]);