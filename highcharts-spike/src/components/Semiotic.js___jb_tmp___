import React, { Component } from 'react';
import OrdinalFrame from "semiotic/lib/OrdinalFrame"

class Semiotic extends Component {

    render() {
        const colors = {
            "Podocytes": "#376be5",
            "Mesangial Cells": "#e03b3f",
            "Distal Tubules": "#d08242"
        }

        const frameProps = {   data: [{ theaterCount: 4, rank: 18, grossWeekly: 327616, title: "Podocytes" },
                { theaterCount: 39, rank: 15, grossWeekly: 1150814, title: "Podocytes" },
                { theaterCount: 1255, rank: 6, grossWeekly: 7156570, title: "Podocytes" },
                { theaterCount: 1279, rank: 6, grossWeekly: 3615000, title: "Podocytes" },
                { theaterCount: 2004, rank: 6, grossWeekly: 5212462, title: "Podocytes" },
                { theaterCount: 1718, rank: 9, grossWeekly: 3108609, title: "Podocytes" },
                { theaterCount: 896, rank: 12, grossWeekly: 2248258, title: "Podocytes" },
                { theaterCount: 506, rank: 13, grossWeekly: 1122034, title: "Podocytes" },
                { theaterCount: 302, rank: 19, grossWeekly: 551552, title: "Podocytes" },
                { theaterCount: 194, rank: 20, grossWeekly: 316877, title: "Podocytes" },
                { theaterCount: 124, rank: 29, grossWeekly: 201345, title: "Podocytes" },
                { theaterCount: 81, rank: 34, grossWeekly: 153162, title: "Podocytes" },
                { theaterCount: 61, rank: 36, grossWeekly: 102114, title: "Podocytes" },
                { theaterCount: 39, rank: 42, grossWeekly: 64350, title: "Podocytes" },
                { theaterCount: 31, rank: 47, grossWeekly: 45344, title: "Podocytes" },
                { theaterCount: 10, rank: 24, grossWeekly: 240160, title: "Mesangial Cells" },
                { theaterCount: 99, rank: 15, grossWeekly: 1090487, title: "Mesangial Cells" },
                { theaterCount: 289, rank: 10, grossWeekly: 1831958, title: "Mesangial Cells" },
                { theaterCount: 865, rank: 7, grossWeekly: 3779833, title: "Mesangial Cells" },
                { theaterCount: 902, rank: 9, grossWeekly: 2246233, title: "Mesangial Cells" },
                { theaterCount: 610, rank: 14, grossWeekly: 1129007, title: "Mesangial Cells" },
                { theaterCount: 366, rank: 17, grossWeekly: 701207, title: "Mesangial Cells" },
                { theaterCount: 256, rank: 20, grossWeekly: 430870, title: "Mesangial Cells" },
                { theaterCount: 122, rank: 24, grossWeekly: 270977, title: "Mesangial Cells" },
                { theaterCount: 105, rank: 28, grossWeekly: 195483, title: "Mesangial Cells" },
                { theaterCount: 98, rank: 30, grossWeekly: 138071, title: "Mesangial Cells" },
                { theaterCount: 74, rank: 39, grossWeekly: 86393, title: "Mesangial Cells" },
                { theaterCount: 47, rank: 42, grossWeekly: 52821, title: "Mesangial Cells" },
                { theaterCount: 27, rank: 58, grossWeekly: 25708, title: "Mesangial Cells" },
                { theaterCount: 18, rank: 60, grossWeekly: 17292, title: "Mesangial Cells" },
                { theaterCount: 3366, rank: 3, grossWeekly: 16660516, title: "Distal Tubules" },
                { theaterCount: 3371, rank: 5, grossWeekly: 9372323, title: "Distal Tubules" },
                { theaterCount: 3140, rank: 7, grossWeekly: 5507604, title: "Distal Tubules" },
                { theaterCount: 2115, rank: 10, grossWeekly: 2369655, title: "Distal Tubules" },
                { theaterCount: 1464, rank: 11, grossWeekly: 1823683, title: "Distal Tubules" },
                { theaterCount: 803, rank: 14, grossWeekly: 780244, title: "Distal Tubules" },
                { theaterCount: 329, rank: 17, grossWeekly: 419930, title: "Distal Tubules" },
                { theaterCount: 230, rank: 21, grossWeekly: 226064, title: "Distal Tubules" },
                { theaterCount: 155, rank: 28, grossWeekly: 126320, title: "Distal Tubules" },
                { theaterCount: 116, rank: 31, grossWeekly: 101719, title: "Distal Tubules" },
                { theaterCount: 45, rank: 40, grossWeekly: 33808, title: "Distal Tubules" },
                { theaterCount: 24, rank: 56, grossWeekly: 17379, title: "Distal Tubules" },
                { theaterCount: 9, rank: 67, grossWeekly: 6872, title: "Distal Tubules" }],
            size: [700,400],
            margin: { left: 160, bottom: 90, right: 10, top: 40 },
            type: "point",
            summaryType: "violin",
            projection: "vertical",
            oAccessor: "title",
            rAccessor: "rank",
            rExtent: [0],
            style: d => {
                return {
                    r: 2,
                    fill: d && colors[d.title]
                }
            },
            summaryStyle: d => ({
                fill: d && colors[d.title],
                fillOpacity: 0.2,
                stroke: d && colors[d.title],
                strokeWidth: 0.5
            }),
            title: "Cell Types",
            axes: [{ orient: "bottom", label: "", tickLineGenerator: ({ xy }) => (
                    <path
                        style={{
                            fill: "#efefef",
                            stroke: "#efefef",
                        }}
                    />
                ) }],
            oLabel: true
        }
        return (
            <OrdinalFrame {...frameProps} />
        );
    }
}

export default Semiotic;