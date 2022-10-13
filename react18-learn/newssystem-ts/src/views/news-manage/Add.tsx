import React, { useState, useEffect, useRef } from 'react'
import { PageHeader, Steps, Button, Space, Form, Input, Select, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import style from './add.module.scss'
const { Step } = Steps;
const { Option } = Select;

export default function Add() {

    const [current, setCurrent] = useState(0);
    const [category, setCategory] = useState([]);
    const [editorState, setEditorState] = useState(undefined)
    const addFormRef: any = useRef(null);
    const navigate = useNavigate();

    const handleNext = () => {
        if(current === 0) {
            addFormRef.current.validateFields()
            .then((res: any) => {
                setCurrent(current + 1)
            }).catch((error: any) => {
                console.log(error)
            })
        } else if(current === 1) {
            if(draftToHtml(convertToRaw((editorState as any).getCurrentContent())) === '' || draftToHtml(convertToRaw((editorState as any).getCurrentContent())).trim() === '<p></p>') {
                message.error('新闻内容不能为空!')
            } else {
                setCurrent(current + 1)
            }
        } else {
            setCurrent(current + 1)
        }
    }
    const handlePrevious = () => {
        setCurrent(current - 1)
    }
    const editorStateChange = (value: any) => {
        setEditorState(value)
    }
    const handleblurEdit = () => {
        console.log(draftToHtml(convertToRaw((editorState as any).getCurrentContent())))
    }
    const handleSaveNews = (status: number) => {
        if(status === 0) {
            navigate('/news-manage/draft')
        } else {
            navigate('/audit-manage/list')
        }
    }

    useEffect(() => {
        fetch('category.json').then(res => res.json()).then(res => {
            setCategory(res.categories)
        })
    }, [])

    return (
        <>
            <PageHeader className="site-page-header" title="撰写新闻"/>
            <div style={{ marginTop: '20px' }}>
                <Steps current={ current }>
                    <Step title="新闻标题" description="标题分类" />
                    <Step title="新闻内容" description="新闻内容" />
                    <Step title="新闻提交" description="新闻提交" />
                </Steps>
                <div style={{ marginTop: '50px',marginBottom: '50px' }}>
                <div className={ current > 0 ? style.hidenStep : ''}>
                <Form
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    autoComplete="off"
                    style={{ width: '600px' }}
                    ref={ addFormRef }>
                    <Form.Item
                        label="新闻标题"
                        name="title"
                        rules={[{ required: true, message: '请输入新闻标题!' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="新闻分类"
                        name="categoryId"
                        rules={[{ required: true, message: '请选择新闻分类!' }]}>
                        <Select>
                            {
                                category.map((item: any) => <Option value={ item.id } key={ item.id }>{ item.title }</Option>)
                            }
                        </Select>
                    </Form.Item>
                    </Form>
                </div>
                <div className={ current !== 1 ? style.hidenStep : ''}>
                    <Editor
                    editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={editorStateChange}
                    onBlur = { handleblurEdit }
                    />
                </div>
                </div>
                <div>
                    <Space>
                    {
                        current > 0 && <Button type="primary" onClick={ () => handlePrevious() }>上一步</Button>
                    }
                    {
                        current < 2 && <Button onClick={ () => handleNext() }>下一步</Button>
                    }
                    {
                        current === 2 && <><Button onClick={ () => handleSaveNews(0) }>保存草稿</Button><Button type="primary" danger onClick={ () => handleSaveNews(1) }>提交审核</Button></>
                    }
                    </Space>
                </div>
            </div>
        </>
    )
}
