import { ResultFile } from '../../types/file'

export default function getFile(): [string[], ResultFile] {
    return [[], {
        name: '.editorconfig',
        ext: '',
        content: `# http://editorconfig.org
        root = true
        
        [*]
        indent_style = space
        indent_size = 2
        charset = utf-8
        trim_trailing_whitespace = true
        insert_final_newline = true
        
        [*.md]
        trim_trailing_whitespace = false`
    }]
}
