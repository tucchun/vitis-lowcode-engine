import { makeAutoObservable } from 'mobx';
import { ComponentType } from 'react'

import ComponentSpec from './componentSpec'
import { innerMaterial } from '../shell'
export default class Designer {
    componentSpecMap: Map<string, ComponentSpec> = new Map()
    componentImplMap: Map<string, ComponentType> = new Map()

    constructor() {
        makeAutoObservable(this);
    }

    buildComponentSpecMap(packageNames: string[]) {
        packageNames.forEach(packageName => {
            const result = innerMaterial.getComponentSpecRaw(packageName)

            if (result) {
                this.componentSpecMap.set(packageName, new ComponentSpec(result))
            }
        })
    }

    addComponentImpl(name: string, component: ComponentType) {
        if (this.componentImplMap.has(name)) {
            console.error(`${name} 的实现已经存在，即将重置！！！`)
        }
        this.componentImplMap.set(name, component)
    }
}
