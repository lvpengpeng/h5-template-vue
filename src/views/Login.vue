<template>
    <div class="login-containe">
        <div class="title-text">短信验证码登录</div>
        <span class="tips">若该手机号未注册，我们将自动为您注册</span>
        <Sinput title="请输入手机号" @handleClick="handleMobile"/>
        <Sinput title="请输入验证码" @handleClick="handleCode" :num="4">
            <div v-show="show" class="btn" @click="gethandleCode">获取验证码</div>
            <div v-show="!show" class="btn" @click="gethandleCode">{{count}}秒</div>
        </Sinput>
        <div class="login_btn-wrap">
            <van-image @click="handleSubmit" class="login_btn"
                :src="require('@/assets/images/login_btn.png')"/>
        </div>
    </div>
</template>

<script>

import Sinput  from '../components/Sinput';
import { isMobile ,isEmpty } from '@/utils/validate'
    export default {
        name:'Login',
        components:{Sinput},
        data() {
            return {
                mobileVal:"",
                codeVal:"",
                show: true,
                count: '',
                timer: null,
            }
        },
        methods: {
            handleMobile(val){
                this.mobileVal = val;
            },
            handleCode(val){
                this.codeVal = val;
            },
            gethandleCode(){
                if(isEmpty(this.mobileVal)||!isMobile(this.mobileVal)){
                    this.$toast('请输入正确的手机号');
                    return;
                }
                const TIME_COUNT = 60;
                if (!this.timer) {
                    this.count = TIME_COUNT;
                    this.show = false;
                    this.timer = setInterval(() => {
                        if (this.count > 0 && this.count <= TIME_COUNT) {
                        this.count--;
                        } else {
                            this.show = true;
                        clearInterval(this.timer);
                            this.timer = null;
                        }
                    }, 1000)
                }
                try {
                    this.$dyy.api.login.Getcode({
                        "phone": this.mobileVal,
                        "pid": 1
                    })
                } catch (e) {

                }
            },
            handleSubmit(){
                if(isEmpty(this.mobileVal)||!isMobile(this.mobileVal)){
                    this.$toast('请输入正确的手机号');
                    return;
                }
                if (isEmpty(this.codeVal)) {
                    this.$toast('请输入验证码');
                    return;
                }
                try {
                    this.$dyy.api.login.Postlogin({
                    "loginType": 1,
                    "phoneData": {
                        "code": this.codeVal,
                        "phone": this.mobileVal
                    },
                    "pid": 1,
                    "platformType": 1
                    }).then(res=>{
                        if (res.code === '200') {
                            this.$store.dispatch('user/grade', res.data.selectGrade)
                            this.$store.dispatch('user/userInfo', res.data.bsInfo)
                            this.$store.dispatch('user/appLogin', res.data.token.token)
                            const { query } = this.$route;
                            const redirect = decodeURIComponent(query.redirect);
                            if (query && (redirect!="undefined")) {
                                this.$router.replace(redirect);
                                return;
                            }
                        }
                    })
                    
                } catch (e) {

                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.login-containe{
    width:100%;
    height:100%;
    box-sizing: border-box;
    padding:44px 25px 0;
    .title-text{
        height: 42px;
        font-size: 30px;
        font-weight: 500;
        color: #2C2C2C;
        line-height: 42px;
    }
    .tips{
        height: 17px;
        font-size: 12px;
        color: #D0D1D3;
        line-height: 17px; 
        margin: 13px 0 6px;
    }
    .btn{
        width: 84px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.85);
    }
    .btn::before{
        content:"";
        width: 1px;
        height: 24px;
        background:rgba(220, 220, 220, 1);
        display:inline-block;      
        position:absolute ;     
        right: 84px;
    }
    .login_btn-wrap{
            width:100%;
            height: 74px;
            margin-top: 69px;
            display: flex;
            justify-content: center;
        .login_btn{
            width:325px;
            height: 74px;
        }
    }

}
</style>
