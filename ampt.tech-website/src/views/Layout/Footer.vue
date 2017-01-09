<template>
  <div class="footer">
    <Content class="footer-content">
      <div class="footer-content__item">
        <div class="title">
          <img src="@/assets/logo_1.png" alt="" />
        </div>
        <div class="copyright">
          <p>
            {{ $t("去中心化供应链金融基础设施") }}
          </p>
          <p>© 2020 Amplify Labs, Inc.</p>
        </div>
      </div>
      <div class="footer-content__item">
        <div class="title">{{ $t("联系我们（链接）") }}</div>
        <div class="contact">
          <a href="mailto:contact@ampt.tech" class="item" target="__blank"
            ><img class="email" src="@/assets/email.png" alt=""
          /></a>

          <a
            href="https://www.reddit.com/user/AMPTdefi"
            class="item"
            target="__blank"
            ><img class="reddit" src="@/assets/reddit.svg" alt=""
          /></a>
          <a href="https://medium.com/ampt-defi" class="item" target="__blank"
            ><img class="medium" src="@/assets/medium.svg" alt=""
          /></a>

          <a href="https://twitter.com/ampt_defi" class="item" target="__blank"
            ><img class="twitter" src="@/assets/twitter.svg" alt=""
          /></a>
          <a
            href="https://www.facebook.com/Amplify-Defi-104124308174922"
            class="item"
            target="__blank"
            ><img class="facebook" src="@/assets/facebook.svg" alt=""
          /></a>
          <a
            href="https://www.linkedin.com/company/amplify-tokenized-solutions-pte-ltd/"
            class="item"
            target="__blank"
            ><img class="linkedin" src="@/assets/linkedin.svg" alt=""
          /></a>
        </div>
      </div>
      <div class="footer-content__item">
        <div class="title">{{ $t("合作伙伴") }}</div>
        <div>
          <a href="https://www.flovtec.com/" target="__blank"
            ><img class="pyImg" src="@/assets/flovtec.png" alt=""
          /></a>
        </div>
      </div>
    </Content>
  </div>
</template>

<script>
import Content from "./Content.vue";
export default {
  name: "Footer",
  components: { Content },
};
</script>

<style lang="stylus" scoped>
.footer {
  padding: 59px 20px;
  background: rgb(233, 244, 255);
  font-size: 24px;
  color: #000;

  .title {
    height: 40px;

    img {
      max-height: 70%;
    }
  }

  .contact {
    width: 220px;
    display: flex;
    flex-wrap: wrap;

    .item {
      width: 40px;
      height: @width;
      position: relative;
      margin: 12px 20px 15px 0;

      img {
        width: 40px;

        &.email {
          width: 45px;
        }        
        &.reddit {
          width: 45px;
        }     
        &.medium {
          width: 45px;
        }
      }
    }
  }

  .copyright {
    font-size: 20px;
    margin: 14px 0;

    p {
      margin: 0 0 10px;
    }
  }
}

.footer-content {
  display: flex;
}

.footer-content__item {
  flex: 0 0 auto;

  &:nth-child(2) {
    margin: 0 100px;
  }

  &:nth-child(1) {
    flex: 1 1 100%;
  }
}

.pyImg {
  height: 40px;
  margin: 14px 0 0;
}

@media screen and (max-width: 900px) {
  .footer {
    .contact {
      display: flex;
      width: 100%;
    }
  }

  .footer-content {
    flex-direction: column;
  }

  .footer-content__item:nth-child(2) {
    margin: 40px 0;
  }

  .pyImg {
    height: 40px;
  }
}
</style>
