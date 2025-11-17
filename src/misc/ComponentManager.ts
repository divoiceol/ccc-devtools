interface IComponentProp {
    name: string;
    key: string;
    custom?: boolean;
}

interface IComponentViewModel {
    props: IComponentProp[];
}

declare const cc: any

export class ComponentManager {
    static getViewModel(name: string, componentGetter: any) {
        switch (name) {
            case 'cc.UITransform':
                return new CCUITransformModel(componentGetter);
            case 'cc.Label':
                return new CCLabelModel();
            case 'cc.Sprite':
                return new CCSpriteModel();
            case 'cc.Camera':
                return new CCCameraModel();
            case 'cc.BoxCollider':
                return new CCBoxColliderModel(componentGetter);
            case 'cc.DirectionalLight':
                return new CCDirectionalLightModel();
            case 'CustomAmbient':
                return new CustomAmbientModel();
            default:
                return null
        }
    }
}

class CCUITransformModel implements IComponentViewModel {

    private componentGetter: any;

    props: IComponentProp[] = [
        { name: 'Width', key: 'width', custom: true },
        { name: 'Height', key: 'height', custom: true },
        { name: 'Anchor X', key: 'anchorX', custom: true },
        { name: 'Anchor Y', key: 'anchorY', custom: true },
    ]

    constructor(componentGetter: any) {
        this.componentGetter = componentGetter;
    }

    get component(): any {
        return this.componentGetter();
    }

    get width() {
        return this.componentGetter().contentSize.width;
    }

    set width(value: number) {
        const origin = this.component.contentSize;
        this.component.setContentSize(value, origin.height);
    }

    get height() {
        return this.component.contentSize.height;
    }

    set height(value: number) {
        const origin = this.component.contentSize;
        this.component.setContentSize(origin.width, value);
    }

    get anchorX() {
        return this.component.anchorPoint.x;
    }

    set anchorX(value: number) {
        const origin = this.component.anchorPoint;
        this.component.setAnchorPoint(value, origin.y);
    }

    get anchorY() {
        return this.component.anchorPoint.y;
    }

    set anchorY(value: number) {
        const origin = this.component.anchorPoint;
        this.component.setAnchorPoint(origin.x, value);
    }

}

class CCLabelModel implements IComponentViewModel {

    props: IComponentProp[] = [
        { name: 'String', key: 'string' },
        { name: 'Color', key: 'color' },
        { name: 'Font Size', key: 'fontSize' },
        { name: 'Line Height', key: 'lineHeight' },
    ];

}

class CCSpriteModel implements IComponentViewModel {

    props: IComponentProp[] = [
        { name: 'Color', key: 'color' },
    ];

}

class CCCameraModel implements IComponentViewModel {

    props: IComponentProp[] = [
        { name: 'OrthoHeight', key: 'orthoHeight' },
        { name: 'ClearColor', key: 'clearColor' },
    ];

}

class CCBoxColliderModel implements IComponentViewModel {

    private componentGetter: any;

    props: IComponentProp[] = [
        { name: 'Center X', key: 'centerX', custom: true },
        { name: 'Center Y', key: 'centerY', custom: true },
        { name: 'Center Z', key: 'centerZ', custom: true },
        { name: 'Size X',   key: 'sizeX', custom: true },
        { name: 'Size Y',   key: 'sizeY', custom: true },
        { name: 'Size Z',   key: 'sizeZ', custom: true },
    ];

    constructor(componentGetter: any) {
        this.componentGetter = componentGetter;
    }

    get component(): any {
        return this.componentGetter();
    }

    get centerX() {
        return this.component.center.x;
    }

    set centerX(value: number) {
        const origin = this.component.center;
        this.setCenter(value, origin.y, origin.z);
    }

    get centerY() {
        return this.component.center.y;
    }

    set centerY(value: number) {
        const origin = this.component.center;
        this.setCenter(origin.x, value, origin.z);
    }

    get centerZ() {
        return this.component.center.z;
    }

    set centerZ(value: number) {
        const origin = this.component.center;
        this.setCenter(origin.x, origin.y, value);
    }

    setCenter(x: number, y: number, z: number) {
        this.component.center = cc.v3(x, y, z);
    }

    get sizeX() {
        return this.component.size.x;
    }

    set sizeX(value: number) {
        const origin = this.component.size;
        this.setSize(value, origin.y, origin.z);
    }

    get sizeY() {
        return this.component.size.y;
    }

    set sizeY(value: number) {
        const origin = this.component.size;
        this.setSize(origin.x, value, origin.z);
    }

    get sizeZ() {
        return this.component.size.z;
    }

    set sizeZ(value: number) {
        const origin = this.component.size;
        this.setSize(origin.x, origin.y, value);
    }

    setSize(x: number, y: number, z: number) {
        this.component.size = cc.v3(x, y, z);
    }

}

class CCDirectionalLightModel implements IComponentViewModel {

    props: IComponentProp[] = [
        { name: 'Color', key: 'color' },
        { name: 'Use Color Temperature', key: 'useColorTemperature' },
        { name: 'Color Temperature', key: 'colorTemperature' },
        { name: 'Illuminance', key: 'illuminance' },
    ];

}

class CustomAmbientModel implements IComponentViewModel {

    props: IComponentProp[] = [
        { name: 'Sky Lighting Color', key: 'skyLightingColor' },
        { name: 'Sky Illum', key: 'skyIllum' },
        { name: 'Ground Lighting Color', key: 'groundLightingColor' },
    ];

}