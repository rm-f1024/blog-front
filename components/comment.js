/*
 * @Description: 
 * @Author: kang
 * @Date: 2022-10-10 14:39:17
 */
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Avatar, Tooltip, Button, Comment, Form, Input, List, Row, Col, message, Drawer } from 'antd';
import React, { createElement, useState, useEffect, useRef } from 'react';
import servicePath from '../config/apiUrl.js';
import moment from 'moment'
const { TextArea } = Input;


const NestedComment = ({ actions, author, avatar, content, datetime, children }, ref) =>
  <Comment
    actions={actions}
    author={author}
    avatar={avatar}
    content={content}
    datetime={
      datetime
    }
  >
    {children}
  </Comment>

const UserComment = ({ articleId }) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);
  const [replyAuthor, setReplyAuthor] = useState({ id: -1, name: '' });
  const [comments, setComments] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction('liked');
  };
  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction('disliked');
  };
  const onClose = () => {
    setOpen(!open)
  }
  const onOpen = () => {

  }


  useEffect(() => {
    const getAllCommentsByArticleId = async () => {
      let res = await fetch(servicePath.getAllCommentsByArticleId + '/' + articleId)
      let { data } = await res.json()
      data = data.map((com) => {
        com['appendTime'] = moment(com['appendTime']).format('YYYY-MM-DD HH:mm:ss');
        if (com['replyMsg']) {
          com['replyMsg'] = com['replyMsg'].map((msg) => {
            return (
              getReplyMsg(msg)
            )
          })
        }
        return com
      })
      setComments(data)
    }
    getAllCommentsByArticleId();
  }, [articleId, action, dislikes, likes])
  const getReplyMsg = (mesObj) => {
    const actions = [
      <Tooltip key="comment-basic-like" title="Like">
        <span onClick={likes}>
          {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
          <span className="comment-action">{likes}</span>
        </span>
      </Tooltip>,
      <Tooltip key="comment-basic-dislike" title="Dislike">
        <span onClick={dislike}>
          {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
          <span className="comment-action">{dislikes}</span>
        </span>
      </Tooltip>,
    ]
    const { nickname, email, appendTime, comment, avatar } = mesObj
      return (
        <NestedComment
        key={nickname + appendTime}
        actions={actions}
        author={<a>{nickname}</a>}
        avatar={<Avatar src={getImg(avatar)} alt="Han Solo" />}
        content={
          <p>
            {comment}
          </p>
        }
        datetime={
          <Tooltip title={appendTime}>
            {/* <span>{(new Date().getTime() - new Date(appendTime).getTime()) > (3600 * 1000) ? '一小时前' : '一小时内'}</span> */}
            <span>{appendTime}</span>
          </Tooltip>
        }
      >
      </NestedComment>
      )
  }
  const handleReply = (id, nickname, that) => {
    setReplyAuthor({ id, nickname })
    setOpen(!open)
  }

  const getImg = (path) => {
    return servicePath.getRandomAvatar + path;
  }

  const handleSubmit = async () => {
    let info = null
    try {
      const values = await form.validateFields();
      const { nickname, email, comment } = values
      let com = {
        nickname: nickname,
        avatar: avatarPath,
        email: email,
        comment: comment,
        appendTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        articleId
      }
      const res = await fetch(servicePath.addComment, {
        method: "POST",
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
          "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1"
        },
        body: JSON.stringify(com)
      })
      const { data: { msg, avatarPath } } = await res.json()
      info = msg
      com['avatar'] = avatarPath
      setComments([
        com, ...comments
      ]);
      message.success(info)
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
      info = '校验失败'
      message.error(info)
    }

  }


  const handleReplyAuthor = async () => {
    let info = null
    try {
      const values = await form1.validateFields();
      const { nickname, email, comment } = values
      //回复信息对象
      let com = {
        nickname: nickname,
        avatar: avatarPath,
        email: email,
        comment: comment,
        appendTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        articleId,
        replyId: replyAuthor.id
      }
      const res = await fetch(servicePath.addComment, {
        method: "POST",
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
          "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1"
        },
        body: JSON.stringify(com)
      })
      const { data: { msg, avatarPath } } = await res.json()
      info = msg
      com['avatar'] = avatarPath
      
      for (let i = 0; i < comments.length; i++) {
        const { id } = comments[i]
        if (id == replyAuthor.id) {
          if (!comments[i]['replyMsg']) {
            comments[i]['replyMsg'] = []
          }
          comments[i]['replyMsg'].push(getReplyMsg(com));
        }
      }
      setComments([...comments]);
      message.success('回复成功')
      
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
      info = '校验失败'
      message.error(info)
    }
    setOpen(!open)

  }
  const Editor = ({ validateEmail, onSubmit, myForm,submitInfo }) => (
    <>
      <Form
        name="comment-form"
        requiredMark={false}
        initialValues={{
          'nickname': '捞猴子的星星',
        }}
        form={myForm}
        validateTrigger={[]}
      >
        <Row>
          <Col><Form.Item label='昵称' name='nickname'
            rules={[
              {
                required: true,
                message: '请输入昵称!',
              },
              {
                max: 15,
                message: '昵称最大长度15',
              }
            ]}
          >
            <Input></Input>
          </Form.Item></Col>
          <Col>
            <Form.Item label='邮箱' name='email'
              rules={[
                {
                  validator: validateEmail
                }
              ]}
            >
              <Input></Input>
            </Form.Item></Col>
        </Row>
        <Form.Item name='comment'
          rules={[
            {
              required: true,
              message: '请输入评论内容',
            },
            {
              max: 225,
              message: '评论最长不能超过225个字',
            },
          ]}
        >
          <TextArea autoSize={{ minRows: 4 }} maxLength={225} rows={4} placeholder='写下你的精彩评论吧...' />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" onClick={onSubmit} type="primary">
            {submitInfo}
          </Button>
        </Form.Item>
      </Form>

    </>
  );
  const submitting = () => {
  }
  const validateEmail = async (rule, value) => {
    console.log("@rule:", rule)
    if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)) {
      await Promise.resolve()
    } else {
      await Promise.reject('请输入正确的邮箱格式')
    }
  }
  // console.log(comments)
  return (
    <>
      <Editor
        onSubmit={handleSubmit}
        validateEmail={validateEmail}
        submitInfo={'添加评论'}
        myForm={form}
      />
      <Drawer
        title={`回复:${replyAuthor.nickname}`}
        placement={'bottom'}
        closable={false}
        onClose={onClose}
        maskClosable={true}
        visible={open}
        key={'bottom'}
      >
      <Editor
          onSubmit={handleReplyAuthor}
          validateEmail={validateEmail}
           submitInfo={'回复'}
          myForm={form1}
        />
      </Drawer>
      {
        comments.length !== 0 && comments.map(({ id, nickname, email, replyMsg, appendTime, comment, avatar }) => {
          return (
            <NestedComment
              key={nickname + appendTime}
              actions={[
                <Tooltip key="comment-basic-like" title="Like">
                  <span onClick={likes}>
                    {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
                    <span className="comment-action">{likes}</span>
                  </span>
                </Tooltip>,
                <Tooltip key="comment-basic-dislike" title="Dislike">
                  <span onClick={dislike}>
                    {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
                    <span className="comment-action">{dislikes}</span>
                  </span>
                </Tooltip>,
                <span key="comment-basic-reply-to" onClick={handleReply.bind(this, id, nickname, this)}>Reply to</span>,
              ]}
              author={<a>{nickname}</a>}
              avatar={<Avatar src={getImg(avatar)} alt="Han Solo" />}
              content={
                <p>
                  {comment}
                </p>
              }
              datetime={
                <Tooltip title={appendTime}>
                  {/* <span>{(new Date().getTime() - new Date(appendTime).getTime()) > (3600 * 1000) ? '一小时前' : '一小时内'}</span> */}
                  <span>{appendTime}</span>
                </Tooltip>
              }
            >
              {replyMsg}
            </NestedComment>
          )
        })
      }
    </>
  );
};
export default UserComment;