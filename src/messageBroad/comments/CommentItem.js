import React, { PureComponent } from "react";
import { Comment, Avatar, Tooltip ,Divider} from "antd";
import CommentInput from "./CommentInput";
import { DeleteOutlined, FileAddOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import eventsBus from "../eventBus";

const DelA = styled.a`
  font-size: 12px;
  margin-right: 20px;
  &:active {
    color: red;
  }
`;
export default class CommentItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isComment: false,
      userInfo: [],
    };
  }
  render() {
    const { nickname, content, avatar, dataTime, id, display } =
      this.props.info;
    const ExampleComment = ({ children }) => (
      <Comment
        actions={[<span key="comment-nested-reply-to">Reply to</span>]}
        author={<a href="/#">{nickname}</a>}
        avatar={<Avatar src={avatar} alt={nickname} />}
        content={<p>{content}</p>}
        datetime={
          <Tooltip title={dataTime.format("YYYY-MM-DD")}>
            <span style={{ cursor: "pointer" }}>{dataTime.fromNow()}</span>
          </Tooltip>
        }
        actions={[
          <DelA onClick={(e) => this.delItem(id)}>
            <DeleteOutlined />
            删除
          </DelA>,

          <DelA onClick={(e) => this.addItem(id)}>
            <FileAddOutlined />
            评论
          </DelA>,
        ]}
      >
        {children}
        <Divider orientation="right">{nickname}</Divider>
      </Comment>
    );

    function IsInput(props) {
      console.log(props);
      eventsBus.emit("removeItem", props.IsInput, props.info.id);
      console.log(props.IsInput);
      if (props.IsInput) {
        return <CommentInput {...props}></CommentInput>;
      } else {
        return "";
      }
    }

    return (
      <div style={{ alignSelf: "flex-start" }}>
        <CSSTransition timeout={300} key={null}>
          <ExampleComment>
            <IsInput
              IsInput={this.state.isComment}
              {...this.props}
              submitContent={(info) => this.submitContent(info)}
            ></IsInput>
          </ExampleComment>
        </CSSTransition>
      </div>
    );
  }

  componentWillUnmount(){
    return null
  }
  delItem(id) {
    eventsBus.emit("delItem", true);
    this.props.delItem(id);
  }
  addItem() {
    eventsBus.emit("removeBtn");
    this.setState({
      isComment: !this.state.isComment,
    });
  }
  submitContent(info) {
    const userInfo = [...this.state.userInfo, info];
    this.setState({
      userInfo,
    });
  }
}
