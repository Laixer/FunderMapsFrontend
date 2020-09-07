<template>
  <div class="RadioImageOption">
    <input type="radio" />
    <label>label</label>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import SvgIcon from '@/components/common/SvgIcon.vue'

@Component({
  components: {
    SvgIcon
  }
})
export default class RadioImageOption extends Vue {
  /**
   * The progress # (step)
   */
  @Prop({ default: 0, required: true }) readonly step!: number;
}
</script>

<style lang="scss">

.radio-btn-group {
  display: flex;
  
  .radio {
    margin: 0 .25rem;
    
    label {
      background: #fff;
      border: 1px solid #ddd;
      padding: .5rem 1.25rem;
      border-radius: 5px;
      cursor: pointer;
      color: #444;
      transition: box-shadow 400ms ease;
      
      &:hover {
        box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
      }
    }
    
    input[type="checbox"] {
      display: none;
    }
    
    input[type="checbox"]:checked+label {
      background: #2196F3;
      color: #fff;
      border-color: #2196F3;
    }
  }
}
</style>