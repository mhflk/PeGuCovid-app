import React, { useState, useEffect, useRef } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { v4 as uuid } from 'uuid';

const Bokeh = window.Bokeh;

const useStyles = makeStyles({
  plot: {
    width: '90%',
    height: '90%'
  }
});

export interface LineChartProps {
  title?: string;
  lineColor?: string;
  data: { x: Array<number>; y: Array<number> } | undefined;
}

export const LineChart = (props: LineChartProps) => {
  const classes = useStyles(props);
  const targetRef = useRef<HTMLDivElement>(null);
  const [plotId] = useState<string>('plot-' + uuid());

  const checkWindowSizePeriod = 500;
  let checkWindowSizeTimer: any = null;

  useEffect(() => {
    checkWindowSize();
    window.addEventListener('resize', () => {
      clearInterval(checkWindowSizeTimer);
      checkWindowSizeTimer = setTimeout(checkWindowSize, checkWindowSizePeriod);
    });
  }, []);

  const checkWindowSize = () => {
    targetRef?.current && linePlot();
  };

  const linePlot = () => {
    const source = new Bokeh.ColumnDataSource({
      data: props.data
    });

    const plot = Bokeh.Plotting.figure({
      title: props.title || '',
      // tools: 'reset,pan,wheel_zoom',
      tools: [
        new Bokeh.ResetTool(),
        new Bokeh.PanTool(),
        new Bokeh.WheelZoomTool()
      ],
      height: targetRef.current?.offsetHeight || 300,
      width: targetRef.current?.offsetWidth || 300,
      x_axis_type: 'datetime',
      x_axis_label: 'Date',
      y_axis_label: 'Number of cases'
    });
    plot.toolbar.logo = null;

    plot.left[0].formatter.use_scientific = false;
    plot.line(
      { field: 'x' },
      { field: 'y' },
      {
        source: source,
        line_width: 4,
        line_color: props.lineColor || 'steelblue'
      }
    );
    plot.circle(
      { field: 'x' },
      { field: 'y' },
      {
        source: source,
        line_color: props.lineColor || 'steelblue',
        fill_color: 'white',
        size: 6,
        line_width: 2
      }
    );

    const doc = new Bokeh.Document();
    doc.add_root(plot);
    var div = document.getElementById(plotId);
    div && (div.textContent = '');
    Bokeh.embed.add_document_standalone(doc, div);
  };

  return (
    <Box height="60vh">
      <div ref={targetRef} id={plotId} className={classes.plot}></div>
    </Box>
  );
};
