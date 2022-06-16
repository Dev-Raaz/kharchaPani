import Variables from "../variables";

const colors = [
    "#252525",
    "#525252",
    "#737373",
    "#969696",
    "#bdbdbd",
    "#d9d9d9",
    "#f0f0f0"
  ];
  const charcoal = "red";
  const grey = "#969696";

  const baseLabelStyles = {
    fontFamily: 'sans-serif',
    fontSize: 10,
    letterSpacing: 1,
    padding: 10,
    fill: charcoal,
    stroke: "transparent"
  };

export default theme = {
    bar: {
          style: {
            data: {
              fill: Variables.color.error,
              padding: 8,
              strokeWidth: 0
            },
            labels: baseLabelStyles
          }
        }
}