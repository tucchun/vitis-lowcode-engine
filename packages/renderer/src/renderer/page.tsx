import React from 'react'
import { PageSchema } from 'vitis-lowcode-types'
import { Context } from '../context'
import { RendererMode } from '../types'

interface Props {
    nodeSchema: PageSchema
}
export default class PageRenderer extends React.Component<Props, {}>{
    static contextType = Context;
    context: React.ContextType<typeof Context>
    rootRef = React.createRef<HTMLDivElement>()
    componentDidMount() {
        if (this.context.rendererMode === RendererMode.design && this.context.onCompGetRef) {
            this.context.onCompGetRef(this.props.nodeSchema, this, this.rootRef.current)
        }
    }
    componentWillUnmount() {
        if (this.context.rendererMode === RendererMode.design && this.context.onCompGetRef) {
            this.context.onCompGetRef(this.props.nodeSchema, null, null)
        }
    }
    render() {
        return (
            <div 
                data-node-id={this.props.nodeSchema.id} 
                style={{minHeight: '100%'}}
                ref={this.rootRef}
            >{
                !this.props.nodeSchema.children.length ? 
                this.context.emptyPageComponent: 
                <div>ddd</div>
            }</div>
        )
    }
}