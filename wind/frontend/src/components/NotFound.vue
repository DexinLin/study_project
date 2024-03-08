<template>
    <div class="notFound">
        <div class="wrapper">
            <div class="big">页面不见了！</div>
            <div>首页瞧瞧，点击<a><router-link to="/">这里</router-link></a>进入首页。</div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {};
        }
    }
</script>

<style lang="scss" scoped>
.notFound {
    height: 100%;
    background: url(../assets/stars404.jpg) center no-repeat;
    background-size: cover, auto;
}
.notFound .wrapper {
    position: absolute;
    top: 60%;
    right: 2%;
    color: #fff;
    width: 635px;
    font-size: 19px;
    line-height: 29px;
    padding: 20px;
}
.notFound .wrapper .big {
    font-size: 74px;
    font-weight: 700;
    line-height: 68px;
    margin-bottom: 48px;
}
.notFound .wrapper a {
    color: #ffcc00;
    text-decoration: none;
    font-weight: 700;
    cursor: pointer;
}
</style>