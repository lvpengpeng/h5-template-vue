<template>
    <div class="s-input">
        <input type="number" :placeholder="title" class="input-item" v-model="val">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'Sinput',
        props:{
            title:{
                type:String,
                default:""
            },
            num:{
                type:Number,
                default:11
            }
        },
        data() {
            return {
                val: "",
            }
        },
        watch:{
            val(n,o){
                if(n.length>this.num)this.val=this.val.slice(0,this.num)
                this.$emit('handleClick',n)
            }
        },
        mounted() {
        },
        methods: {
        }
    }
</script>
<style lang="scss" scoped>
.s-input{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    position: relative;
    border-bottom:1px solid rgba(220, 220, 220, 1);
    .input-item{
        width: 200px;
        padding: 14px 0 ;
        border: 0;  // 去除未选中状态边框
        outline: none; // 去除选中状态边框
        background-color: rgba(0, 0, 0, 0);// 透明背景
        font-size: 14px;
    }
    .input-item::-webkit-input-placeholder { 
        /* WebKit browsers */ 
        color: rgba(0, 0, 0, 0.5);
        font-size: 14px;
        padding: 14px 0 ;
        line-height: 100%;
    } 
}
</style>