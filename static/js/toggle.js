!function (e) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = e(); else if ("function" == typeof define && define.amd) define([], e); else {
        var n;
        "undefined" != typeof window ? n = window : "undefined" != typeof global ? n = global : "undefined" != typeof self && (n = self), n.dragula = e()
    }
}(function () {
    return function e(n, t, r) {
        function o(u, c) {
            if (!t[u]) {
                if (!n[u]) {
                    var a = "function" == typeof require && require;
                    if (!c && a) return a(u, !0);
                    if (i) return i(u, !0);
                    var f = new Error("Cannot find module '" + u + "'");
                    throw f.code = "MODULE_NOT_FOUND", f
                }
                var l = t[u] = {exports: {}};
                n[u][0].call(l.exports, function (e) {
                    var t = n[u][1][e];
                    return o(t ? t : e)
                }, l, l.exports, e, n, t, r)
            }
            return t[u].exports
        }

        for (var i = "function" == typeof require && require, u = 0; u < r.length; u++) o(r[u]);
        return o
    }({
        1: [function (e, n) {
            (function (t) {
                "use strict";

                function r(e, n) {
                    function t(e) {
                        return function (n) {
                            function t(n) {
                                o(n, e, "mousedown", v)
                            }

                            function r(e) {
                                return -1 === i.indexOf(e)
                            }

                            var i = Array.isArray(n) ? n : [n];
                            i.forEach(t), X = "add" === e ? X.concat(i) : X.filter(r)
                        }
                    }

                    function r(e) {
                        var n = e ? "remove" : "add";
                        o(U, n, "mouseup", y)
                    }

                    function u() {
                        r(!0), F.removeContainer(X), y({})
                    }

                    function v(e) {
                        var n = e.target;
                        if (!(0 !== e.which && 1 !== e.which || e.metaKey || e.ctrlKey) && m(n) === !0) {
                            var t = i(_);
                            j = d("pageX", e) - t.left, A = d("pageY", e) - t.top, S(), N(e), e.preventDefault()
                        }
                    }

                    function m(e) {
                        var n = e;
                        if (!(F.dragging && P || -1 !== X.indexOf(e))) {
                            for (; -1 === X.indexOf(e.parentElement);) {
                                if (g(e)) return;
                                e = e.parentElement
                            }
                            if (!g(e)) {
                                var t = e.parentElement, r = Y.moves(e, t, n);
                                if (r) return h(), Y.copy ? (k = e.cloneNode(!0), l(k, "gu-transit"), F.emit("cloned", k, e)) : l(e, "gu-transit"), D = t, _ = e, M = R = f(e), F.dragging = !0, F.emit("drag", _, D), !0
                            }
                        }
                    }

                    function g(e) {
                        return "A" === e.tagName || "BUTTON" === e.tagName
                    }

                    function h() {
                        if (F.dragging) {
                            var e = k || _;
                            w(e, e.parentElement)
                        }
                    }

                    function y(e) {
                        if (F.dragging) {
                            var n = k || _, t = d("clientX", e), r = d("clientY", e), o = c(P, t, r), i = T(o, t, r);
                            !i || Y.copy !== !1 && i === D ? Y.removeOnSpill ? E() : x() : w(n, i)
                        }
                    }

                    function w(e, n) {
                        O(n) ? F.emit("cancel", e, D) : F.emit("drop", e, n, D), b()
                    }

                    function E() {
                        if (F.dragging) {
                            var e = k || _, n = e.parentElement;
                            n && n.removeChild(e), F.emit(Y.copy ? "cancel" : "remove", e, n), b()
                        }
                    }

                    function x(e) {
                        if (F.dragging) {
                            var n = arguments.length > 0 ? e : Y.revertOnSpill, t = k || _, r = t.parentElement;
                            r === D && Y.copy && r.removeChild(k);
                            var o = O(r);
                            o === !1 && Y.copy === !1 && n && D.insertBefore(t, M), o || n ? F.emit("cancel", t, D) : F.emit("drop", t, r, D), b()
                        }
                    }

                    function b() {
                        var e = k || _;
                        C(), s(e, "gu-transit"), D = _ = k = M = R = null, F.dragging = !1, F.emit("dragend", e)
                    }

                    function O(e, n) {
                        var t;
                        return t = void 0 !== n ? n : P ? R : f(_ || k), e === D && t === M
                    }

                    function T(e, n, t) {
                        function r() {
                            var r = -1 !== X.indexOf(o);
                            if (r === !1) return !1;
                            var i = B(o, e), u = L(o, i, n, t), c = O(o, u);
                            return c ? !0 : Y.accepts(_, o, D, u)
                        }

                        for (var o = e; o && !r();) o = o.parentElement;
                        return o
                    }

                    function N(e) {
                        if (P) {
                            var n = d("clientX", e), t = d("clientY", e), r = n - j, o = t - A;
                            P.style.left = r + "px", P.style.top = o + "px";
                            var i = c(P, n, t), u = T(i, n, t);
                            if (u !== D || !Y.copy) {
                                var a, l = k || _, s = B(u, i);
                                if (null !== s) a = L(u, s, n, t); else {
                                    if (Y.revertOnSpill !== !0) return;
                                    a = M, u = D
                                }
                                (null === a || a !== l && a !== f(l)) && (R = a, u.insertBefore(l, a), F.emit("shadow", l, u))
                            }
                        }
                    }

                    function S() {
                        if (!P) {
                            var e = _.getBoundingClientRect();
                            P = _.cloneNode(!0), P.style.width = e.width + "px", P.style.height = e.height + "px", s(P, "gu-transit"), l(P, " gu-mirror"), q.appendChild(P), o(U, "add", "mousemove", N), l(q, "gu-unselectable"), F.emit("cloned", P, _)
                        }
                    }

                    function C() {
                        P && (s(q, "gu-unselectable"), o(U, "remove", "mousemove", N), P.parentElement.removeChild(P), P = null)
                    }

                    function B(e, n) {
                        for (var t = n; t !== e && t.parentElement !== e;) t = t.parentElement;
                        return t === U ? null : t
                    }

                    function L(e, n, t, r) {
                        function o() {
                            var n, o, i, u = e.children.length;
                            for (n = 0; u > n; n++) {
                                if (o = e.children[n], i = o.getBoundingClientRect(), c && i.left > t) return o;
                                if (!c && i.top > r) return o
                            }
                            return null
                        }

                        function i() {
                            var e = n.getBoundingClientRect();
                            return u(c ? t > e.left + e.width / 2 : r > e.top + e.height / 2)
                        }

                        function u(e) {
                            return e ? f(n) : n
                        }

                        var c = "horizontal" === Y.direction, a = n !== e ? i() : o();
                        return a
                    }

                    var P, D, _, j, A, M, R, k, q = document.body, U = document.documentElement, X = [], Y = n || {};
                    void 0 === Y.moves && (Y.moves = a), void 0 === Y.accepts && (Y.accepts = a), void 0 === Y.copy && (Y.copy = !1), void 0 === Y.revertOnSpill && (Y.revertOnSpill = !1), void 0 === Y.removeOnSpill && (Y.removeOnSpill = !1), void 0 === Y.direction && (Y.direction = "vertical");
                    var F = p({
                        addContainer: t("add"),
                        removeContainer: t("remove"),
                        start: m,
                        end: h,
                        cancel: x,
                        remove: E,
                        destroy: u,
                        dragging: !1
                    });
                    return r(), F.addContainer(e), F
                }

                function o(e, n, r, o) {
                    var i = {mouseup: "touchend", mousedown: "touchstart", mousemove: "touchmove"},
                        u = {mouseup: "MSPointerUp", mousedown: "MSPointerDown", mousemove: "MSPointerMove"};
                    t.navigator.msPointerEnabled && v[n](e, u[r], o), v[n](e, i[r], o), v[n](e, r, o)
                }

                function i(e) {
                    var n = e.getBoundingClientRect();
                    return {left: n.left + u("scrollLeft", "pageXOffset"), top: n.top + u("scrollTop", "pageYOffset")}
                }

                function u(e, n) {
                    if ("undefined" != typeof t[n]) return t[n];
                    var r = document.documentElement;
                    if (r.clientHeight) return r[e];
                    var o = document.body;
                    return o[e]
                }

                function c(e, n, t) {
                    if (!n && !t) return null;
                    var r, o = e || {}, i = o.className;
                    return o.className += " gu-hide", r = document.elementFromPoint(n, t), o.className = i, r
                }

                function a() {
                    return !0
                }

                function f(e) {
                    function n() {
                        var n = e;
                        do n = n.nextSibling; while (n && 1 !== n.nodeType);
                        return n
                    }

                    return e.nextElementSibling || n()
                }

                function l(e, n) {
                    -1 === e.className.indexOf(" " + n) && (e.className += " " + n)
                }

                function s(e, n) {
                    e.className = e.className.replace(new RegExp(" " + n, "g"), "")
                }

                function d(e, n) {
                    return "undefined" == typeof n.targetTouches ? n[e] : n.targetTouches && n.targetTouches.length && n.targetTouches[0][e] || n.changedTouches && n.changedTouches.length && n.changedTouches[0][e] || 0
                }

                var p = e("contra.emitter"), v = e("crossvent");
                n.exports = r
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {"contra.emitter": 3, crossvent: 5}], 2: [function (e, n) {
            function t() {
                if (!u) {
                    u = !0;
                    for (var e, n = i.length; n;) {
                        e = i, i = [];
                        for (var t = -1; ++t < n;) e[t]();
                        n = i.length
                    }
                    u = !1
                }
            }

            function r() {
            }

            var o = n.exports = {}, i = [], u = !1;
            o.nextTick = function (e) {
                i.push(e), u || setTimeout(t, 0)
            }, o.title = "browser", o.browser = !0, o.env = {}, o.argv = [], o.version = "", o.versions = {}, o.on = r, o.addListener = r, o.once = r, o.off = r, o.removeListener = r, o.removeAllListeners = r, o.emit = r, o.binding = function () {
                throw new Error("process.binding is not supported")
            }, o.cwd = function () {
                return "/"
            }, o.chdir = function () {
                throw new Error("process.chdir is not supported")
            }, o.umask = function () {
                return 0
            }
        }, {}], 3: [function (e, n) {
            n.exports = e("./src/contra.emitter.js")
        }, {"./src/contra.emitter.js": 4}], 4: [function (e, n) {
            (function (e) {
                !function (t, r) {
                    "use strict";

                    function o(e, n) {
                        return Array.prototype.slice.call(e, n)
                    }

                    function i(e, n, t) {
                        e && c(function () {
                            e.apply(t || null, n || [])
                        })
                    }

                    function u(e, n) {
                        var t = n || {}, u = {};
                        return e === r && (e = {}), e.on = function (n, t) {
                            return u[n] ? u[n].push(t) : u[n] = [t], e
                        }, e.once = function (n, t) {
                            return t._once = !0, e.on(n, t), e
                        }, e.off = function (n, t) {
                            var r = arguments.length;
                            if (1 === r) delete u[n]; else if (0 === r) u = {}; else {
                                var o = u[n];
                                if (!o) return e;
                                o.splice(o.indexOf(t), 1)
                            }
                            return e
                        }, e.emit = function () {
                            var n = o(arguments);
                            return e.emitterSnapshot(n.shift()).apply(this, n)
                        }, e.emitterSnapshot = function (n) {
                            var r = (u[n] || []).slice(0);
                            return function () {
                                var c = o(arguments), a = this || e;
                                if ("error" === n && t["throws"] !== !1 && !r.length) throw 1 === c.length ? c[0] : c;
                                return u[n] = r.filter(function (e) {
                                    return t.async ? i(e, c, a) : e.apply(a, c), !e._once
                                }), e
                            }
                        }, e
                    }

                    var c, a = "" + r, f = "function" == typeof setImmediate;
                    c = f ? function (e) {
                        setImmediate(e)
                    } : typeof e !== a && e.nextTick ? e.nextTick : function (e) {
                        setTimeout(e, 0)
                    }, typeof n !== a && n.exports ? n.exports = u : (t.contra = t.contra || {}, t.contra.emitter = u)
                }(this)
            }).call(this, e("_process"))
        }, {_process: 2}], 5: [function (e, n) {
            (function (e) {
                "use strict";

                function t(e, n, t, r) {
                    return e.addEventListener(n, t, r)
                }

                function r(e, n, t) {
                    return e.attachEvent("on" + n, a(e, n, t))
                }

                function o(e, n, t, r) {
                    return e.removeEventListener(n, t, r)
                }

                function i(e, n, t) {
                    return e.detachEvent("on" + n, f(e, n, t))
                }

                function u(e, n) {
                    var t;
                    s.createEvent ? (t = s.createEvent("Event"), t.initEvent(n, !0, !0), e.dispatchEvent(t)) : s.createEventObject && (t = s.createEventObject(), e.fireEvent("on" + n, t))
                }

                function c(n, t, r) {
                    return function (t) {
                        var o = t || e.event;
                        o.target = o.target || o.srcElement, o.preventDefault = o.preventDefault || function () {
                            o.returnValue = !1
                        }, o.stopPropagation = o.stopPropagation || function () {
                            o.cancelBubble = !0
                        }, r.call(n, o)
                    }
                }

                function a(e, n, t) {
                    var r = f(e, n, t) || c(e, n, t);
                    return v.push({wrapper: r, element: e, type: n, fn: t}), r
                }

                function f(e, n, t) {
                    var r = l(e, n, t);
                    if (r) {
                        var o = v[r].wrapper;
                        return v.splice(r, 1), o
                    }
                }

                function l(e, n, t) {
                    var r, o;
                    for (r = 0; r < v.length; r++) if (o = v[r], o.element === e && o.type === n && o.fn === t) return r
                }

                var s = document, d = t, p = o, v = [];
                e.addEventListener || (d = r, p = i), n.exports = {add: d, remove: p, fabricate: u}
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}]
    }, {}, [1])(1)
});

dragula([document.getElementById('lii'),
    document.getElementById('inProgressCard')]);