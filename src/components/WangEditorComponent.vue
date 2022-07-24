<template>
    <div style="border: 1px solid #ccc;">
        <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editor="editor"
            :mode="mode"
        />
        <Editor
            style="height: 500px; overflow-y: hidden;"
            v-model="contents"
            :mode="mode"
            :defaultConfig="editorConfig"
            @onCreated="onCreated"
            @onChange="onChange"
        />

    </div>
</template>

<script>
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
export default {
    name: "WangEditorComponent",
    props: [
        'content'
    ],
    components: {
        Editor, Toolbar
    },
    data() {
        return {
            editor: null,
            contents: this.content,
            toolbarConfig: { },
            editorConfig: {
                placeholder: '请输入内容...',
                MENU_CONF: {
                    uploadImage: {
                        server: '/backend/file/handle/wangEditor/single/upload',
                        fieldName: 'file',
                        withCredentials: true,
                    }
                }
            },
            mode: 'default', // or 'simple'
        }
    },
    watch: {
        content(newVal, oldVal) {
            this.contents = newVal;
        }
    },
    methods: {
        onCreated(editor) {
            this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
        },
        onChange(editor) {
            this.$emit("wangEditorChildOnChange", editor.getHtml());
        },
        async handleUploadToAliyunOSS(file, insertFn) {

        }
    },
    mounted() {
        // 模拟 ajax 请求，异步渲染编辑器
        // setTimeout(() => {
        //     this.html = '<p>模拟 Ajax 异步设置内容 HTML</p>'
        // }, 1500)
        // this.contents = this.props.content;
    },
    beforeDestroy() {
        const editor = this.editor
        if (editor == null) return
        editor.destroy() // 组件销毁时，及时销毁编辑器
    }

}
</script>

<style scoped>

</style>