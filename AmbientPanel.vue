<template>
    <div style="width: 100%;height: 30px;background-color: #26282f;display: flex;align-items: center;justify-content: center;color: white;"
        class="modal-drag">
        Ambient
    </div>
    <PropItem v-for="prop in AmbientModel.props" :key="prop.key" :model="AmbientModel" :prop-name="prop.name"
        :prop-key="prop.key" :clz-name="'cc.AmbientInfo'"></PropItem>
</template>

<script lang="ts" setup>

const props = defineProps({
    show: Boolean,
});


class AmbientModel {

    static props = [
        { name: 'Sky Lighting Color', key: 'skyLightingColor' },
        { name: 'Sky Illum', key: 'skyIllum' },
        { name: 'Ground Lighting Color', key: 'groundLightingColor' },
    ];

    static get ambient(){
        // @ts-ignore
        const cc = window['cc'];
        if (!cc?.director?.getScene()?.globals?.ambient) {
            return null;
        }
        return cc.director.getScene().globals.ambient;
    }

    static get skyLightingColor() {
        return this.ambient?.skyLightingColor;
    }
    static set skyLightingColor(val) {
        this.ambient.skyLightingColor = val;
    }

    static get skyIllum() {
        return this.ambient?.skyIllum;
    }
    static set skyIllum(val) {
        this.ambient.skyIllum = val;
    }

    static get groundLightingColor() {
        return this.ambient?.groundLightingColor;
    }
    static set groundLightingColor(val) {
        this.ambient.groundLightingColor = val;
    }
}

</script>