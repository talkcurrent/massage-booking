"use client";

import React, { useState, useEffect, useRef, useImperativeHandle } from "react";
import styled from "styled-components";
import ToolTip from "./ToolTip";
import DivTag from "./DivTag";
import Link from "next/link";

const IconToolTipBtn = React.forwardRef((props, ref) => {
  const {
    ancestor,
    closeable,
    pointer,
    overflowY,
    tooltipMounted,
    maxHeight,
    minHeight,
    padding,
    context,
    tooltipBgc,
    fixedTop,
    fixedBottom,
    iconElement,
  } = props;
  //States
  const [elemParams, setParams] = useState({});
  const [toolTip, setToolTip] = useState(false);

  const [btnClass, setBtnClass] = useState(props.class);

  const tooltipBtn = useRef();
  const isTooltipOpen = useRef(false);

  // useEffect(() => {
  //     if (ancestor && document.querySelector(`.${ancestor}`)) {
  //         document.querySelector(`.${ancestor}`)
  //             .addEventListener("click", handleToolTipClose, true);
  //     }
  //     return () => {
  //         if (ancestor && document.querySelector(`.${ancestor}`)) {
  //             document.querySelector(`.${ancestor}`)
  //                 .removeEventListener("click", handleToolTipClose, true);
  //         }
  //     };
  // }, []);

  useEffect(() => {
    isTooltipOpen.current = toolTip;
    if (toolTip) {
      document.addEventListener("scroll", updateElemParams, true);
    }
    return () => {
      document.removeEventListener("scroll", updateElemParams, true);
    };
  }, [toolTip]);

  useEffect(() => {
    if (props.boundingClientRect) {
      setParams(props.boundingClientRect);
    }
    if (props.closeTooltip && toolTip) {
      setToolTip(false);
    }
  }, [props.closeTooltip, props.boundingClientRect]);

  useEffect(() => {
    if (props.closeTooltip && toolTip) {
      setToolTip(false);
    }
  }, [props.closeTooltip]);

  useImperativeHandle(ref, () => ({
    click: (param) => {
      tooltipBtn.current.click();
    },
  }));

  useEffect(() => {
    if (props.scrollIntoView === true) {
      tooltipBtn.current.scrollIntoView(false);
    }
  }, [props.scrollIntoView]);

  const handleToolTip = (event) => {
    event.preventDefault();
    let params;
    if (props.boundingClientRect) {
      params = props.boundingClientRect;
    } else {
      params = event.target.parentElement.getBoundingClientRect();
    }
    setParams(params);

    setToolTip(!toolTip);
  };
  const handleToolTipClose = (e) => {
    if (isTooltipOpen.current && !e.target.closest(`.${props.class}`)) {
      setToolTip(false);
    }
  };
  const updateElemParams = () => {
    // run update on button position to readjust tooltip but only when button tooltip is active
    if (props.boundingClientRect) {
      // const params = tooltipBtn.current.parentElement.getBoundingClientRect();
      setParams(props.boundingClientRect);
    } else {
      const params = tooltipBtn.current.parentElement.getBoundingClientRect();
      setParams(params);
    }
  };

  const handleMounted = () => {
    props.tooltipMounted ? tooltipMounted() : "";
  };
  const handleClick = () => {
    props.handleClick ? props.handleClick() : "";
  };
  return (
    <EachBtn
      $color={props.textColor}
      $btnpadding={props.btnPadding}
      $display={props.display}
      $backgroundcolor={props.backgroundColor}
      $borderdadius={props.borderRadius}
      $border={props.border}
      $fsize={props.fontSize}
      $fontweight={props.fontWeight}
      className={props.class}
    >
      {props.onMouseDown ? (
        <DivTag
          align={"center"}
          justify={"center"}
          handleMouseDown={(e) => {
            props.toolTip ? handleToolTip(e) : handleClick(e);
          }}
        >
          {props.linkBtn === true ? (
            <Link href={props.btnLink}>
              <div ref={tooltipBtn} className={`cursor-pointer`}>
                {iconElement}
              </div>
            </Link>
          ) : (
            <div ref={tooltipBtn} className={`cursor-pointer`}>
              {iconElement}
            </div>
          )}
        </DivTag>
      ) : (
        <DivTag
          align={"center"}
          justify={"center"}
          handleClick={(e) => {
            props.toolTip ? handleToolTip(e) : handleClick(e);
          }}
        >
          {props.linkBtn === true ? (
            <Link href={props.btnLink}>
              <div ref={tooltipBtn} className={`cursor-pointer`}>
                {iconElement}
              </div>
            </Link>
          ) : (
            <div ref={tooltipBtn} className={`cursor-pointer`}>
              {iconElement}
            </div>
          )}
        </DivTag>
      )}

      {toolTip ? (
        <ToolTip
          elemParams={elemParams}
          fixedTop={fixedTop}
          handleToolTipClose={handleToolTipClose}
          ancestor={ancestor}
          fixedBottom={fixedBottom}
          closeable={closeable}
          overflowY={overflowY}
          pointer={pointer}
          maxHeight={maxHeight}
          minHeight={minHeight}
          padding={padding}
          tooltipBgc={tooltipBgc}
          handleToolTip={handleToolTip}
          handleMounted={handleMounted}
        >
          {props.children}
        </ToolTip>
      ) : (
        ""
      )}
    </EachBtn>
  );
});

export default IconToolTipBtn;
export const EachBtn = styled.div`
  display: ${(props) => props.$display};
  position: relative;
  line-height: normal;
  color: ${(props) => props.$color};
  background: ${(props) => props.$backgroundcolor};
  border: ${(props) => props.$border};
  border-radius: ${(props) => props.$borderdadius};
  font-size: ${(props) => (props.$fsize ? props.$fsize : "")};
  i {
    font-weight: ${(props) => props.$fontweight};
    padding: ${(props) => props.$btnpadding};
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;
