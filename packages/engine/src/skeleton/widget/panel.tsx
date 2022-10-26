import { createElement } from 'react'
import { WidgetBaseConfig } from 'vitis-lowcode-types'
import { makeAutoObservable } from 'mobx';

export default class Panel {
    readonly isPanel: true = true
    readonly name: string
    readonly config: WidgetBaseConfig
    visible: boolean = true

    constructor(name: string, config: WidgetBaseConfig) {
        this.name = name
        this.config = config
        makeAutoObservable(this, {
            isPanel: false,
            config: false,
            name: false
        })

    }

    getName(): string {
        return this.name
    }

    get content() {
        return createElement(this.config.content, this.config.contentProps)
    }

    hide(): void {
        this.visible = false
    }

    show(): void {
        this.visible = true
    }

    toggle(): void {
        this.visible = !this.visible
    }
}