import React, {useEffect, useRef} from 'react';
import {
  ChordStyle,
  FretLabelPosition,
  Orientation,
  Shape,
  SVGuitarChord,
  type Chord,
  type ChordSettings
} from 'svguitar';
import './chordView.scss';

const ChordView: React.FC<{
  title: string;
  chord: Chord;
  settings?: ChordSettings;
  style?: React.CSSProperties;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}> = ({title, chord, settings, ...rest}) => {
  const viewRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<SVGuitarChord | null>(null);

  const draw = () => {
    if (!chartRef.current) {
      return;
    }
    chartRef.current
      .chord({
        ...chord,
        title: ''
      })
      .configure({
        // 自定义配置（全部为可选项，下面为默认值）
        /**
         * 和弦图的方向，可选值为 'vertical' 或 'horizontal'
         */
        orientation: Orientation.horizontal,

        /**
         * 选择 'normal' 或 'handdrawn' 风格
         */
        style: ChordStyle.normal,

        /**
         * 弦的数量
         */
        strings: 6,

        /**
         * 品的数量
         */
        frets: 4,

        /**
         * 默认起始品（第一品为1）
         */
        position: 3,

        /**
         * 弦下方的调弦标签，可为任意字符串
         */
        tuning: ['E', 'A', 'D', 'G', 'B', 'E'],

        /**
         * 品标签的位置（例如“3品”）
         */
        fretLabelPosition: FretLabelPosition.RIGHT,

        /**
         * 品标签的字体大小
         */
        fretLabelFontSize: 28,

        /**
         * 弦标签的字体大小
         */
        tuningsFontSize: 0,

        /**
         * 手指或大横按相对于弦间距的大小
         */
        fingerSize: 0.65,

        /**
         * 手指或大横按的颜色
         */
        fingerColor: '#000',

        /**
         * 手指或大横按内文字的颜色
         */
        fingerTextColor: '#FFF',

        /**
         * 手指或大横按内文字的大小
         */
        fingerTextSize: 22,

        /**
         * 手指或大横按的描边颜色。如果未设置，则使用 fingerColor
         */
        fingerStrokeColor: '#000000',

        /**
         * 手指或大横按的描边宽度
         */
        fingerStrokeWidth: 0,

        /**
         * 大横按的描边颜色。如果未设置，则使用 fingerColor
         */
        barreChordStrokeColor: '#000000',

        /**
         * 大横按的描边宽度
         */
        barreChordStrokeWidth: 0,

        /**
         * 品的高度，相对于两根弦之间的距离
         */
        fretSize: 1.5,

        /**
         * 和弦图左右边距的最小值（相对于总宽度）
         */
        sidePadding: 0.2,

        /**
         * 所有文本使用的字体
         */
        fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',

        /**
         * 默认的标题（如果未提供 title）
         */
        title,

        /**
         * 标题的字体大小（初始大小，过长会自动缩放）
         */
        titleFontSize: 48,

        /**
         * 标题与图表之间的间距
         */
        titleBottomMargin: 0,

        /**
         * 图表的全局颜色，可被更具体的设置覆盖
         */
        color: '#000000',

        /**
         * 和弦图的背景色。默认透明。设置为 'none' 或 undefined 表示透明
         */
        backgroundColor: 'none',

        /**
         * 大横按矩形边角的圆角，相对于 fingerSize（1 表示完全圆，0 表示直角）
         */
        barreChordRadius: 0.25,

        /**
         * 空弦上方的 X 和 O 的大小，相对于弦间距
         */
        emptyStringIndicatorSize: 0.6,

        /**
         * 全局描边宽度
         */
        strokeWidth: 2,

        /**
         * 上枕宽度（仅 position 为 1 时使用）
         */
        nutWidth: 10,

        /**
         * 若设置为 true，则不显示起始品位（例如“3fr”）
         */
        noPosition: false,

        /**
         * 标题颜色（覆盖 color）
         */
        titleColor: '#000000',

        /**
         * 弦的颜色（覆盖 color）
         */
        stringColor: '#000000',

        /**
         * 品标签颜色（覆盖 color）
         */
        fretLabelColor: '#000000',

        /**
         * 调弦标签颜色（覆盖 color）
         */
        tuningsColor: '#000000',

        /**
         * 品的颜色（覆盖 color）
         */
        fretColor: '#000000',

        /**
         * 若为 true，即使没有标题也保持顶部间距一致
         */
        fixedDiagramPosition: false,

        /**
         * 水印文字（位于图表底部）
         */
        watermark: '',

        /**
         * 水印字体大小
         */
        watermarkFontSize: 12,

        /**
         * 水印颜色（覆盖 color）
         */
        watermarkColor: '#000000',

        /**
         * 水印字体（覆盖 fontFamily）
         */
        watermarkFontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',

        /**
         * SVG 的标题，不可见，但用于辅助功能（如屏幕阅读器）
         */
        svgTitle: 'Guitar chord diagram of ' + title,

        /**
         * 品记（圆点、双圆点等）
         */
        fretMarkers: [
          2,
          4,
          6,
          8,
          {
            fret: 11,
            double: true
          }
        ],

        /**
         * 是否显示所有品记（快捷控制）
         */
        showFretMarkers: true,

        /**
         * 品记的形状（默认为圆形）
         */
        fretMarkerShape: Shape.CIRCLE,

        /**
         * 品记的大小（相对于弦间距）
         */
        fretMarkerSize: 0.4,

        /**
         * 品记的颜色
         */
        fretMarkerColor: 'rgba(0, 0, 0, 0.2)',

        /**
         * 品记描边颜色（默认无边框）
         */
        fretMarkerStrokeColor: '#000000',

        /**
         * 品记描边宽度（默认无边框）
         */
        fretMarkerStrokeWidth: 0,

        /**
         * 双品记之间的距离，相对于琴颈宽度（0.5 表示距离为琴颈宽度的一半）
         */
        doubleFretMarkerDistance: 0.4,
        ...settings
      })
      .draw();
  };

  useEffect(() => {
    if (viewRef.current) {
      chartRef.current = new SVGuitarChord(viewRef.current);
      draw();
    }
    return () => {
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, []);

  return <div className="chord" {...rest}>
    <div className="chord-chart" ref={viewRef} />
    <div className="chord-title">{title}</div>
  </div>;
};

export default ChordView;
