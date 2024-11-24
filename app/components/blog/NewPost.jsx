import React, { useRef, useState } from 'react'
import DivTag from '../DivTag'
import { Editor } from '@tinymce/tinymce-react'
import server from "@/app/server";
import InputText from "../../components/form/InputText";
import InputSelect from "../../components/form/InputSelect";
import Truncate from "../../components/reuseable/Truncate";

export default function NewPost() {
    const { tinyMCE_key, savePost } = server();

    const [title, settitle] = useState('');
    const [tags, settags] = useState('');
    const [category, setcategory] = useState('');
    const [posting, setposting] = useState(false);

    const editorRef = useRef(null);

    const createPost = async () => {
        if (editorRef.current) {
            let content = editorRef.current.getContent()
            let el = document.createElement('div');
            el.innerHTML = content;
            const data = {
                title,
                description: Truncate(el.textContent, 12),
                tags,
                category,
                article: content
            };
            setposting(true)
            const response = await savePost(data);
            setposting(false)
            if (response.ok) {
                settitle('')
                settags('')
                setcategory('')
            }
        }
    };
    return (
        <DivTag
            bgc={"white"}
        >
            <DivTag
                height={'max-content'}
                gap={"10px"}
                padding={'15px'}
            >
                <InputText
                    tabIndex={"0"}
                    label={"Post Title"}
                    inputType={"text"}
                    autoComplete={"false"}
                    padding={0}
                    id={"title"}
                    name={"title"}
                    value={title}
                    inputBgc={"#f5f5f5"}
                    // width={"320px"}
                    containerPadding={'10px 0px 0 0px'}
                    placeholder={""}
                    onChange={(e) => {
                        settitle(e.target.value);
                    }}
                />
                <InputText
                    tabIndex={"1"}
                    label={"Post Tags"}
                    inputType={"text"}
                    autoComplete={"false"}
                    padding={0}
                    id={"tags"}
                    name={"tags"}
                    value={tags}
                    inputBgc={"#f5f5f5"}
                    // width={"320px"}
                    containerPadding={'10px 0px 0 0px'}
                    placeholder={"e.g Economy, Cars, Honey"}
                    onChange={(e) => {
                        settags(e.target.value);
                    }}
                />
                <InputSelect
                    inputBgc={"#f5f5f5"}
                    padding={0}
                    valueColor={"black"}
                    id={"category"}
                    name={"category"}
                    label={"Choose Post category:"}
                    containerPadding={'10px 0px 0 0px'}
                    value={category}
                    onChange={(e) => {
                        setcategory(e.target.value);
                    }}
                >
                    <option value="">-- Please select state--</option>
                    <option value="Food">Food</option>
                    <option value="Travel">Travel</option>
                    <option value="Health and fitness">Health and fitness</option>
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="Fashion and beauty">Fashion and beauty</option>
                    <option value="Photography">Photography</option>
                    <option value="Personal">Personal</option>
                    <option value="DIY craft">DIY craft</option>
                    <option value="Parenting">Parenting</option>
                    <option value="Music">Music</option>
                    <option value="Business">Business</option>
                    <option value="Art and design">Art and design</option>
                    <option value="Book and writing">Book and writing</option>
                    <option value="Personal finance">Personal finance</option>
                    <option value="Interior design">Interior design</option>
                    <option value="Sports">Sports</option>
                    <option value="News">News</option>
                    <option value="Movie">Movie</option>
                    <option value="Religion">Religion</option>
                    <option value=" Political"> Political</option>
                </InputSelect>
                <Editor
                    apiKey={tinyMCE_key}
                    onInit={(_evt, editor) => editorRef.current = editor}
                    initialValue=""
                    init={{
                        height: 500,
                        menubar: true,
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                        ],
                        toolbar: 'undo redo | blocks | ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:18px;  }'
                    }}
                />
                <button
                    style={{
                        background: '#53b4a9',
                        color: 'white',
                        outline: 'none',
                        border: 'unset',
                        padding: 10,
                        borderRadius: 20,
                        justifySelf: 'end',
                        fontSize: 'large',
                    }}
                    onClick={createPost}
                >{posting ? 'Posting...' : 'Create & Publish'}</button>
            </DivTag>
        </DivTag>
    )
}
