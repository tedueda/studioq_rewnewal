class QuillEditorManager {
    constructor() {
        this.editors = {};
        this.toolbarOptions = [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'indent': '-1'}, { 'indent': '+1' }],
            ['link', 'blockquote', 'code-block'],
            [{ 'align': [] }],
            ['clean']
        ];
    }

    initializeEditor(containerId, initialContent = '') {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container with ID ${containerId} not found`);
            return null;
        }

        const quill = new Quill(`#${containerId}`, {
            theme: 'snow',
            modules: {
                toolbar: this.toolbarOptions,
                history: {
                    delay: 1000,
                    maxStack: 50,
                    userOnly: true
                }
            },
            placeholder: 'ここにコンテンツを入力してください...',
            formats: [
                'header', 'bold', 'italic', 'underline', 'strike',
                'list', 'bullet', 'indent', 'link', 'blockquote', 
                'code-block', 'align'
            ]
        });

        if (initialContent) {
            quill.root.innerHTML = initialContent;
        }

        quill.on('text-change', (delta, oldDelta, source) => {
            if (source === 'user') {
                this.onContentChange(containerId, quill);
            }
        });

        this.editors[containerId] = quill;
        
        return quill;
    }

    onContentChange(editorId, quill) {
        const text = quill.getText();
        const wordCount = text.trim().length;
        
        const event = new CustomEvent('quillContentChange', {
            detail: {
                editorId: editorId,
                content: quill.root.innerHTML,
                text: text,
                wordCount: wordCount
            }
        });
        document.dispatchEvent(event);
    }

    getEditor(containerId) {
        return this.editors[containerId];
    }

    getContent(containerId) {
        const editor = this.editors[containerId];
        return editor ? editor.root.innerHTML : '';
    }

    setContent(containerId, content) {
        const editor = this.editors[containerId];
        if (editor) {
            editor.root.innerHTML = content;
        }
    }

    getAllContent() {
        const content = {};
        Object.keys(this.editors).forEach(editorId => {
            content[editorId] = this.getContent(editorId);
        });
        return content;
    }

    validateContent() {
        const errors = [];
        Object.keys(this.editors).forEach(editorId => {
            const text = this.editors[editorId].getText().trim();
            if (text.length < 50) {
                errors.push(`${editorId}: コンテンツが短すぎます（最低50文字）`);
            }
        });
        return errors;
    }

    parseContentToSections(htmlContent) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        const sections = [];
        
        let currentSection = { heading: '', content: '' };
        let sectionIndex = 0;
        
        const elements = doc.body.children;
        
        for (let element of elements) {
            if (element.tagName.match(/^H[1-6]$/)) {
                if (currentSection.content || currentSection.heading) {
                    sections.push(currentSection);
                }
                
                currentSection = {
                    heading: element.textContent,
                    content: ''
                };
                sectionIndex++;
            } else {
                currentSection.content += element.outerHTML;
            }
        }
        
        if (currentSection.content || currentSection.heading) {
            sections.push(currentSection);
        }
        
        while (sections.length < 4) {
            sections.push({ heading: `セクション ${sections.length + 1}`, content: '' });
        }
        
        return sections.slice(0, 4);
    }

    generateContentFromSections() {
        let fullContent = '';
        
        for (let i = 1; i <= 4; i++) {
            const editorId = `editor-${i}`;
            const heading = document.getElementById(`heading-${i}`)?.textContent || `セクション ${i}`;
            const content = this.getContent(editorId);
            
            if (content && content.trim() !== '<p><br></p>') {
                fullContent += `<h2>${heading}</h2>\n${content}\n`;
            }
        }
        
        return fullContent;
    }
}

window.quillManager = new QuillEditorManager();
