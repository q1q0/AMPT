<template>
    <div class="banner">
        <Content class="banner__top">
            <img src="@/assets/logo_1.png" class="logo" alt="" />
            <div class="nav header-links">
              <a href="https://lend.ampt.tech/">Amplify Lend</a>
            </div>
            <div class="lang">
                <span :class="{cur: lang === 'zh'}" @click="changeLang('zh')">{{ $t("中文") }}</span> |
                <span :class="{cur: lang === 'en'}" @click="changeLang('en')">{{ $t("English") }}</span>
            </div>
        </Content>
        <Content class="banner__content">
            <div class="content__text">
                <p class="logo_text">AMPLIFY</p>
                <p class="logo_text__little">
                    {{ $t("去中心化供应链金融基础设施") }}
                </p>
                <p class="logo_text__desc">
                    {{ $t("AMPLIFY将利用自身") }}
                </p>
                <p class="logo_text__btn">
                    <a :href="`amplify_${lang}.pdf`" target="__blank">{{
                        $t("白皮书")
                    }}</a>
                </p>
            </div>
            <img class="img" src="@/assets/bg-top1.png" alt="" />
        </Content>
    </div>
</template>

<script>
import Content from "./Content.vue";
import { mapMutations, mapState } from "vuex";
export default {
    name: "Nav",
    components: { Content },
    computed: {
        ...mapState({
            lang: (state) => state.lang,
        }),
    },
    methods: {
        ...mapMutations({
            setLangs: "SET_LANG",
        }),
        changeLang(lang) {
            this.$i18n.locale = lang;
            this.setLangs(lang);
        },
    },
};
</script>

<style lang="stylus" scoped>
.lang {
  font-size: 22px;
  span {
    cursor pointer
    color: rgba(#373737, .5)

    &.cur{
      color: #373737;
    }
  }
}
.banner {
  display flex
  flex-direction column
  padding-top 15px
  padding-bottom: 110px;
  background url('../../assets/bg_top.png') no-repeat
  background-size 100% 100%
  box-sizing border-box
  .logo {
    width 100px
  }
}
.banner__top
  display flex
  flex 0 0 auto
  width 100%
  padding 0 20px
  justify-content space-between
  align-items center
  margin-bottom 40px
  box-sizing border-box

.banner__content {
  position relative
  flex 1 1 100%
  width 100%
  padding 0 20px
  box-sizing border-box
  .img {
    position absolute
    top 58px
    right 0
    max-height 100%
  }
}
.content__text {
  display inline-block
  max-width 100%
  margin-top 80px
  .logo_text {
    font-size 48px
    letter-spacing 2px
    color #000
    font-weight 500
  }
  .logo_text__little  {
    padding-top 5px
    font-size 30px
    letter-spacing 2px
    color #000
    font-weight 500
  }
  .logo_text__desc {
    padding-top 20px
    font-size 22px
    line-height 30px
    color #090748
    width 525px
    max-width 100%
  }
  .logo_text__btn {
    margin-top 60px
    a {
      display inline-block
      width 400px
      max-width 70%
      padding 20px 0
      border-radius 6px
      background-color #5b87f7
      text-align center
      color #fff
      font-size: 30px;
      letter-spacing: 2px;
      cursor pointer
      text-decoration: none
    }
  }
}

@media screen and (max-width: 900px) {
  .banner {
    background-image url('../../assets/bg_top_2.png')
  }
  .banner__content .img  {
    display none
  }
  .content__text {
    text-align center
    margin-top: 30px
    .logo_text {
      font-size 30px
      margin 0 0 15px
    }
    .logo_text__little {
      font-size 20px
    }
    .logo_text__desc{
      font-size 20px
    }
  }
}

.header-links {
  a {
    text-decoration: none;
    color: #2c73ed;
    font-size: 22px;

    &:hover {
      color: #16aad8;
      text-decoration: underline;
    }
  }
}
</style>
