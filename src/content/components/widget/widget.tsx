import React, {
  useState, useRef, useImperativeHandle, useEffect,
} from 'react';
import './widget.less';
import Logo from '@/assets/images/logo.png';
import { COMMON_ACTIONS } from '@/constants';

const MACACA_RECORDER_CONTAINER_FLOATING = 'macaca-recorder-container-floating';
const MACACA_RECORDER_SELECTORS = 'macaca-recorder-selectors';
const MACACA_RECORDER_STEPS = 'macaca-recorder-steps';
const MACACA_RECORDER_BUTTON = 'macaca-recorder-button';
const MACACA_RECORDER_BUTTON_DIV = 'macaca-recorder-button-div';
const MACACA_RECORDER_TEMPLATE = 'macaca-recorder-template';
const MACACA_RECORDER_TEMPLATEL_SELECT = 'macaca-recorder-template-select';
const MACACA_RECORDER_CELL_SELECT = 'macaca-recorder-cell-select';
const MACACA_RECORDER_WIDGET = 'macaca-recorder-widget';
const MACACA_RECORDER_WIDGET_ID = `macaca-recorder-${new Date().getTime()}`;

interface selectorsProps {
  index: number,
  length: number,
  xpath: string,
}

interface FloatingViewProps {
  handleWidgetClick: (
    action: string,
    opts?: object
  ) => void;
  selectors: Array<selectorsProps>;
  steps: Array<string>,
  template: string
}

function FloatingView(props: FloatingViewProps) {
  const {
    handleWidgetClick, selectors, steps, template,
  } = props;
  const [selectIndex, setSelectIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const tds = document.getElementsByTagName('td') as HTMLCollection;
    Array.prototype.forEach.call(tds, (td) => {
      td.classList.remove(MACACA_RECORDER_CELL_SELECT);
    });
    setSelectIndex(0);
  }, [selectors]);

  useEffect(() => {
    scrollContainerRef.current.scrollTo(
      0,
      scrollContainerRef.current.scrollHeight,
    );
  }, [steps]);

  const handleActionClick = (event) => {
    const action = event.target.getAttribute('data-action');
    handleWidgetClick(action, {
      action,
      index: selectIndex,
      selectors,
    });
  };

  const handleStepClick = (event) => {
    const action = event.target.getAttribute('data-action');
    handleWidgetClick(action);
  };

  const handleTemplateChange = (event) => {
    const action = event.target.getAttribute('data-action');
    handleWidgetClick(action, {
      action,
      template: event.target.value,
    });
  };

  const handleTdClick = (e) => {
    const { target } = e;
    const tds = document.getElementsByTagName('td');
    Array.prototype.forEach.call(tds, (td) => {
      td.classList.remove(MACACA_RECORDER_CELL_SELECT);
    });
    target.classList.add(MACACA_RECORDER_CELL_SELECT);
    const dataIndex = Number(target.getAttribute('data-index'));
    setSelectIndex(dataIndex);
  };

  return (
    <div
      className={MACACA_RECORDER_CONTAINER_FLOATING}
      id={MACACA_RECORDER_WIDGET_ID}
    >
      <div className={MACACA_RECORDER_SELECTORS} id={MACACA_RECORDER_WIDGET_ID}>
        <table id={MACACA_RECORDER_WIDGET_ID}>
          <tr id={MACACA_RECORDER_WIDGET_ID}>
            <th id={MACACA_RECORDER_WIDGET_ID}>
              <span id={MACACA_RECORDER_WIDGET_ID}>元素 / 操作</span>
              <div
                className={MACACA_RECORDER_BUTTON_DIV}
                id={MACACA_RECORDER_WIDGET_ID}
              >
                <button
                  type="button"
                  className={MACACA_RECORDER_BUTTON}
                  onClick={handleActionClick}
                  id={MACACA_RECORDER_WIDGET_ID}
                  data-action={COMMON_ACTIONS.CLICK}
                >
                  点击
                </button>
                <button
                  type="button"
                  className={MACACA_RECORDER_BUTTON}
                  onClick={handleActionClick}
                  id={MACACA_RECORDER_WIDGET_ID}
                  data-action={COMMON_ACTIONS.DBLCLICK}
                >
                  双击
                </button>
                <button
                  type="button"
                  className={MACACA_RECORDER_BUTTON}
                  onClick={handleActionClick}
                  id={MACACA_RECORDER_WIDGET_ID}
                  data-action={COMMON_ACTIONS.HOVER}
                >
                  悬浮
                </button>
                <button
                  type="button"
                  className={MACACA_RECORDER_BUTTON}
                  onClick={handleActionClick}
                  id={MACACA_RECORDER_WIDGET_ID}
                  data-action={COMMON_ACTIONS.CHECK}
                >
                  检查
                </button>
              </div>
            </th>
          </tr>
          {selectors.map((selector, index) => (
            <tr>
              <td
                onClick={handleTdClick}
                id={MACACA_RECORDER_WIDGET_ID}
                data-index={index}
              >
                {`[${selector.index + 1}/${selector.length}] ${selector.xpath}`}
              </td>
            </tr>
          ))}
        </table>
      </div>
      <div className={MACACA_RECORDER_TEMPLATE} id={MACACA_RECORDER_WIDGET_ID}>
        <span id={MACACA_RECORDER_WIDGET_ID}> 模板：</span>
        <select
          className={MACACA_RECORDER_TEMPLATEL_SELECT}
          onChange={handleTemplateChange}
          id={MACACA_RECORDER_WIDGET_ID}
          data-action={COMMON_ACTIONS.CHANGE_TEMPLATE}
          defaultValue={template}
          value={template}
        >
          <option id={MACACA_RECORDER_WIDGET_ID}>macaca</option>
          <option id={MACACA_RECORDER_WIDGET_ID}> cypress </option>
        </select>
        <div
          className={MACACA_RECORDER_BUTTON_DIV}
          id={MACACA_RECORDER_WIDGET_ID}
        >
          <button
            type="button"
            className={MACACA_RECORDER_BUTTON}
            onClick={handleStepClick}
            id={MACACA_RECORDER_WIDGET_ID}
            data-action={COMMON_ACTIONS.COPY_CODE}
          >
            复制代码
          </button>
          <button
            type="button"
            className={MACACA_RECORDER_BUTTON}
            onClick={handleStepClick}
            id={MACACA_RECORDER_WIDGET_ID}
            data-action={COMMON_ACTIONS.CLEAN_CODE}
          >
            清除代码
          </button>
        </div>
      </div>
      <div
        className={MACACA_RECORDER_STEPS}
        id={MACACA_RECORDER_WIDGET_ID}
        ref={scrollContainerRef}
      >
        {steps.map((step) => (
          <span id={MACACA_RECORDER_WIDGET_ID}>
            {step}
            <br />
          </span>
        ))}
      </div>
    </div>
  );
}

interface Props {
  handleWidgetClick: () => void;
  onRef: any;
}

function Widget(props: Props) {
  const [expanded, setExpanded] = useState(false);
  const [selectors, setSelectors] = useState([]);
  const [steps, setSteps] = useState([]);
  const [template, setTemplate] = useState();
  const [position] = useState({ right: 20, bottom: 200 });
  const { handleWidgetClick, onRef } = props;

  const updateSelectors = (data) => {
    setSelectors(data);
  };

  const updateSteps = (data) => {
    setSteps(data.steps);
    setTemplate(data.template);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(steps.join('\n'))
      .catch((error) => {
        console.error('Failed to copy code: ', error);
      });
  };

  useImperativeHandle(onRef, () => ({
    updateSelectors,
    updateSteps,
    copyCode,
  }));

  return (
    <div
      className={MACACA_RECORDER_WIDGET}
      id={MACACA_RECORDER_WIDGET_ID}
      style={{ right: position.right, bottom: position.bottom }}
    >
      <img
        src={Logo}
        alt=""
        id={MACACA_RECORDER_WIDGET_ID}
        onClick={() => setExpanded(!expanded)}
      />
      {expanded && (
        <FloatingView
          handleWidgetClick={handleWidgetClick}
          selectors={selectors}
          steps={steps}
          template={template}
        />
      )}
    </div>
  );
}

export default Widget;
