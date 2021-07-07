import React, { PureComponent } from "react";
import styled, { ThemeProvider } from "styled-components";
import moment from "_moment@2.29.1@moment";
import { Input, Button, message, Space } from "antd";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import eventsBus from "../eventBus";
import "./put.css";
const RootDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* justify-content: space-between; */
`;

const Buttoned = styled(Button)`
  align-self: flex-start;
`;

const CInput = styled(Input)`
width: 200px;
align-self: flex-end;
`
const { TextArea } = Input;
export default class CommentInput extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      display: "block",
      content: "",
      isShow: true,
      isOn: true,
    };
  }
  render() {
    const { isShow, isOn, display, TDisplay } = this.state;
    console.log(display);
    return (
      <RootDiv style={{ display: `${display}` }}>
        <CSSTransition
          in={isOn}
          timeout={300}
          classNames="TextArea"
          unmountOnExit="true"
        >
          <TextArea
            style={{ display: `${TDisplay}` }}
            autoFocus
            placeholder="请留言..."
            value={this.state.content}
            rows={4}
            onChange={(e) => this.handleChange(e)}
          ></TextArea>
        </CSSTransition>

        <RootDiv style={{flexDirection:'row',justifyContent:'space-between'}}>
        <SwitchTransition>
          <CSSTransition
            key={isShow ? "on" : "off"}
            timeout={500}
            classNames="btn"
          >
            <Buttoned
              type="primary"
              isShow={(isShow) => this.isShow(isShow)}
              onClick={(e) => this.putContext()}
            >
              点击留言
            </Buttoned>

          </CSSTransition>
        </SwitchTransition>

        {/* 添加邮箱验证 */}
        <CInput placeholder="请输入您的邮箱" allowClear />
        </RootDiv>
      </RootDiv>
    );
  }
  handleChange(event) {
    const content = event.target.value.trim();
    this.setState({
      content,
    });
  }
  componentDidMount() {
    eventsBus.addListener("removeItem", (...args) => {
      console.log(args);
      if (args[0]) {
        console.log(this.state);
        this.setState({
          display: "none",
        });
      } else {
        this.setState({
          display: "block",
        });
      }
    });

    eventsBus.addListener("delItem", (...args) => {
      if (args[0]) {
        this.setState({
          display: "block",
          isShow: true,
          isOn: true,
        });
      }
    });
  }

  putContext() {
    const { isOn, isShow } = this.state;
    if (!isOn) {
      this.setState({
        isOn: !this.state.isOn,
      });
      return;
    }
    if (!this.state.content && isOn) {
      return message.error("Content is empty");
    }
    const contextInfo = {
      id: moment().valueOf(),
      avatar:
        "https://img1.baidu.com/it/u=2192265457,2884791613&fm=26&fmt=auto&gp=0.jpg",
      nickname: "cherry",
      dataTime: moment(),
      content: this.state.content,
    };

    this.props.submitContent(contextInfo);
    this.setState({
      content: "",
      isShow: !isShow,
      isOn: !isOn,
    });
  }
}
