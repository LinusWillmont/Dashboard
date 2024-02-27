// You can pass this object to the `theme` property
const colours = {
  DARKBLUE: "#2C2B30",
  GREY: "#4F4F51",
  WHITE: "#D6D6D6",
  PINK: "#F2C4CE",
  ORANGE: "#F58F7C",
};

const byTheNumbers = {
  background: colours.DARKBLUE,
  text: {
    fontSize: 11,
    fill: colours.WHITE,
    outlineWidth: 0,
    outlineColor: "transparent",
  },
  axis: {
    domain: {
      line: {
        stroke: colours.ORANGE,
        strokeWidth: 1,
      },
    },
    legend: {
      text: {
        fontSize: 15,
        fill: colours.WHITE,
        outlineWidth: 1,
        outlineColor: "transparent",
      },
    },
    ticks: {
      line: {
        stroke: colours.ORANGE,
        strokeWidth: 1,
      },
      text: {
        fontSize: 11,
        fill: colours.ORANGE,
        outlineWidth: 0,
        outlineColor: "transparent",
      },
    },
  },
  grid: {
    line: {
      stroke: colours.GREY,
      strokeWidth: 1,
    },
  },
  legends: {
    title: {
      text: {
        fontSize: 11,
        fill: colours.ORANGE,
        outlineWidth: 0,
        outlineColor: "transparent",
      },
    },
    text: {
      fontSize: 11,
      fill: colours.PINK,
      outlineWidth: 0,
      outlineColor: "transparent",
    },
    ticks: {
      line: {},
      text: {
        fontSize: 10,
        fill: colours.ORANGE,
        outlineWidth: 0,
        outlineColor: "transparent",
      },
    },
  },
  annotations: {
    text: {
      fontSize: 13,
      fill: colours.ORANGE,
      outlineWidth: 2,
      outlineColor: colours.ORANGE,
      outlineOpacity: 1,
    },
    link: {
      stroke: colours.ORANGE,
      strokeWidth: 1,
      outlineWidth: 2,
      outlineColor: colours.ORANGE,
      outlineOpacity: 1,
    },
    outline: {
      stroke: colours.ORANGE,
      strokeWidth: 2,
      outlineWidth: 2,
      outlineColor: colours.ORANGE,
      outlineOpacity: 1,
    },
    symbol: {
      fill: colours.ORANGE,
      outlineWidth: 2,
      outlineColor: colours.ORANGE,
      outlineOpacity: 1,
    },
  },
  tooltip: {
    container: {
      background: colours.GREY,
      fontSize: 12,
    },
    basic: {},
    chip: {},
    table: {},
    tableCell: {},
    tableCellValue: {},
  },
};

export default byTheNumbers;
