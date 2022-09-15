(window.webpackJsonp = window.webpackJsonp || []).push([
    [3], {
        5: function(e, t, a) {
            "use strict";
            a.r(t);
            var i = a(148),
                n = a(158),
                s = a(161),
                o = a(159),
                r = a(157),
                p = a(160),
                l = a(141);
            i.b([n.a, s.a, o.a, r.a, p.a, l.a]);
            var d = document.getElementById("charts");
            d.style.height = "500px", d.style.width = "900px", i.a(d).setOption({
                title: {
                    text: "Mine Sweeper Rate Chart (19*11 Blocks)",
                    left: "center"
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow"
                    }
                },
                legend: {
                    data: ["Win Rate", "Lose Rate"],
                    left: "right"
                },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: !0
                },
                xAxis: {
                    name: "Mine Rate (*100%)",
                    nameLocation: "center",
                    nameGap: 25,
                    type: "category",
                    data: [.1, .12, .14, .16, .18, .2, .22]
                },
                yAxis: {
                    name: "Rate (*100%)",
                    type: "value"
                },
                series: [{
                    name: "Win Rate",
                    type: "bar",
                    stack: "Rate",
                    label: {
                        show: !0,
                        position: "insideRight"
                    },
                    barWidth: "60%",
                    data: [.91, .84, .67, .48, .24, .11, .03],
                    max: 1
                }, {
                    name: "Lose Rate",
                    type: "bar",
                    stack: "Rate",
                    label: {
                        show: !0,
                        position: "insideRight"
                    },
                    data: [.09, .16, .33, .52, .76, .89, .97],
                    max: 1
                }]
            })
        }
    }
]);