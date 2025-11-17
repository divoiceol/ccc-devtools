<template>
  <div class="row">
    <span style="flex: 1">{{ propName }}</span>
    <el-input-number v-model="model[propKey]" :precision="2" :min="sliderValue('min', -Infinity)" :max="sliderValue('max', Infinity)" :step="sliderValue('step', 1)" :value-on-clear="0" :step-strictly="sliderValue('step') != undefined" size="small" controls-position="right" style="flex: 1"
      v-if="getPropType() == 'number'" />
    <el-input size="small" v-model="model[propKey]" style="flex: 1" 
      v-else-if="getPropType() == 'string'" />
    <el-checkbox v-model="model[propKey]" size="small" style="margin-left: 10px"
      v-else-if="getPropType() == 'boolean'" />
    <el-color-picker v-model="CustomModel.color" @active-change="CustomModel.selectChange" size="small" style="flex: 1" color-format="hex" show-alpha
      v-else-if="getPropType() == 'cc.Color'" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  model: any;
  propName: string;
  propKey: string;
  updateKey: number;
  clzName: string | undefined;
}>();

function getPropType() {
  const data = props.model[props.propKey];
  const dataType = typeof data;
  if (data && dataType === "object" && data.__classname__) {
    return data.__classname__;
  }
  return dataType;
}

function sliderValue(key: string, def?: number) {
  if (props.clzName) {
    // @ts-ignore
    const clazz = cc.js.getClassByName(props.clzName);
    if (clazz) {
      // @ts-ignore
      const attr = cc.Class.attr(clazz, props.propKey);
      if (attr.slide) {
        return attr[key] ?? def;
      }
    }
  }
  return def;
}

class CustomModel {
  static get color() {
    const origin = props.model[props.propKey];
    const hexA = origin.a.toString(16);
    return `#${origin.toHEX()}${hexA.length === 1 ? "0" + hexA : hexA}`;
  }

  static set color(v: string) {
    // @ts-ignore
    props.model[props.propKey] = new cc.Color().fromHEX(v);
  }

  static selectChange(v: string) {
    // @ts-ignore
    props.model[props.propKey] = new cc.Color().fromHEX(v);
  }
}
</script>
