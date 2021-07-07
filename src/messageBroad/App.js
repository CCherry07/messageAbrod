import React, { PureComponent } from "react";
import CommentInput from "./comments/CommentInput";
import CommentItem from "./comments/CommentItem";
import styled from "styled-components";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import $http from "../servers/request";
import "./item.css";
const RDiv = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: [],
    };
  }
  render() {
    return (
      <RDiv>
        <div style={{ width: "400px" }}>
          <TransitionGroup>
            {this.state.userInfo.map((item, index) => {
              return (
                <CSSTransition key={index} classNames="item" timeout={300}>
                  <CommentItem
                    info={item}
                    key={item.id}
                    delItem={(id) => this.delItem(id)}
                  >
                  </CommentItem>
                </CSSTransition>
              );
            })}
          </TransitionGroup>
          <CommentInput
            submitContent={(info) => this.submitContent(info)}
          ></CommentInput>
        </div>
      </RDiv>
    );
  }

  componentDidMount(){
    $http({
      url: "/post",
      method: "post",
      params: {
        name: "kobe",
      },
    }).then((res) => {
      console.log(res);
    });
  }
  delItem(id) {
    const userInfo = [...this.state.userInfo].filter((item) => {
      if (item.id !== id) {
        return item;
      }
      return false;
    });

    console.log(userInfo);
    this.setState({
      userInfo,
    });
  }
  submitContent(info) {
    const userInfo = [...this.state.userInfo, info];
    this.setState({
      userInfo,
    });
  }
}
