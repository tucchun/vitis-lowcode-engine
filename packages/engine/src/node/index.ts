import { NodeSchema, ContainerSchema } from 'vitis-lowcode-types'
import { makeAutoObservable } from 'mobx'
import { project } from '../shell'
import type ComponentSpec from '../project/componentSpec'
import Props from './props'
import { uniqueId } from '../utils'
import type DocumentModel from '../project/documentModel'

export default class Node<S extends NodeSchema = NodeSchema> {
    readonly id: string;
    readonly componentName: string;
    readonly isContainer: boolean;
    readonly parent: Node<NodeSchema> | undefined;
    readonly owner: DocumentModel
    protected readonly children: Node<NodeSchema>[]
    readonly props: Props
    readonly containerType?: ContainerSchema['containerType']
    readonly packageName: string

    get componentSpec(): ComponentSpec {
        const result = project.project.designer.componentSpecMap.get(this.packageName)
        if (!result) {
            throw `不存在 ${this.packageName} 组件`
        }
        return result
    }

    get nextSibling(): Node<NodeSchema> | undefined {
        if (this.parent) {
            const index = this.parent.children.findIndex(c => c === this)
            if (index === -1) {
                return undefined
            } else {
                return this.parent.children[index + 1] || undefined
            }
        } else {
            return undefined
        }
    }

    get prevSibling(): Node<NodeSchema> | undefined {
        if (this.parent) {
            const index = this.parent.children.findIndex(c => c === this)
            if (index === -1) {
                return undefined
            } else {
                return this.parent.children[index - 1] || undefined
            }
        } else {
            return undefined
        }
    }

    get title() {
        return this.componentSpec.title
    }

    get lastChild(): Node<NodeSchema> | undefined {
        return this.children[this.children.length - 1]
    }

    get childrenSize(): number {
        return this.children.length
    }

    constructor(owner: DocumentModel,initSchema: S, parent: Node<S> | undefined) {
        makeAutoObservable(this, {
            id: false,
            componentName: false,
            isContainer: false,
            owner: false
        })

        this.parent = parent
        this.id = initSchema.id || uniqueId('node')
        this.componentName = initSchema.componentName
        this.packageName = initSchema.packageName
        this.isContainer = initSchema.isContainer
        this.containerType = initSchema.containerType
        this.owner = owner

        this.children = initSchema.children.map(child => this.owner.createNode(child, this))
        this.props = new Props(this, initSchema.props)
    }

    export(): NodeSchema {
        return {
            id: this.id,
            componentName: this.componentName,
            packageName: this.packageName,
            isContainer: this.isContainer,
            props: this.props.export(),
            containerType: this.containerType,
            children: this.children.map(child => child.export()),
        }
    }

    inertChildAtIndex = (node: Node<NodeSchema>, index: number) => {
        this.children.splice(index, 0, node)
    }

    delChildAtIndex = (index: number) => {
        this.children.splice(index, 1)
    }

    getChildAtIndex = (index: number): Node<NodeSchema> | undefined => {
        return this.children[index]
    }
}