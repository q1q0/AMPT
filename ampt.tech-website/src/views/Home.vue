<template>
  <div class="home">
    <Banner />
    <div class="home-content">
      <h3 class="home-title">
        <p class="home-title__big">{{ $t("AMPLIFY的优势") }}</p>
        <p class="home-title__little">Advantages of AMPLIFY</p>
      </h3>
      <Content class="super-list pdlr">
        <div
          class="super-list__item"
          v-for="(item, index) in superList"
          :key="index"
        >
          <div>
            <img :src="item.icon" class="icon" />
          </div>
          <div class="title">{{ $t(item.name) }}</div>
          <div class="text">{{ $t(item.text) }}</div>
        </div>
      </Content>
      <h3 class="home-title">
        <p class="home-title__big">
          {{ $t("去中心化治理的供应链金融B2B2C基础架构") }}
        </p>
        <p class="home-title__little">
          Decentralized governance of supply chain finance B2B2C infrastructure
        </p>
      </h3>
      <Content class="pdlr">
        <div class="B2B2C">
          <img class="B2B2C-img" :src="require('@/assets/b2b2c.png')" alt="" />
        </div>
        <div class="qingsuang">
          <div class="qingsuang-text">
            <h4>{{ $t("链上融资清算") }}</h4>
            <div class="text">
              {{ $t("AMPLIFY基于核心企业的链上授信") }}
            </div>
          </div>
          <div class="qingsuang-img">
            <img class="B2B2C-img" :src="qingsuangImg[lang]" alt="" />
          </div>
        </div>
      </Content>
      <div class="ampt">
        <Content>
          <h3 class="home-title__big">{{ $t("AMPT代币") }}</h3>
          <div class="text">
            {{ $t("AMPT代币是AMPLIFY去中心化架构的核心代币") }}
          </div>
          <div class="text__btn">
            <span>{{ $t("白皮书") }}</span>
          </div>
        </Content>
      </div>
      <h3 class="home-title">
        <p class="home-title__big">{{ $t("创始团队") }}</p>
        <!-- <p class="home-title__little">
          Team and Advisors
        </p> -->
      </h3>
      <Content style="margin-bottom: 100px; text-align: center" class="teams">
        <div class="member">
          <img src="@/assets/team/1.png" />
          <div class="name">Eugene Tan</div>
        </div>
        <div class="member">
          <img src="@/assets/team/2.png" />
          <div class="name">Pranav Burnwal</div>
        </div>
        <div class="member">
          <img src="@/assets/team/4.png" />
          <div class="name">Chuang Keng Wee</div>
        </div>
        <div class="member">
          <img src="@/assets/team/5.png" />
          <div class="name">Giorgia Pellizzari</div>
        </div>
        <div class="member">
          <img src="@/assets/team/6.png" />
          <div class="name">Nizam Ismail</div>
        </div>
        <div class="member">
          <img src="@/assets/team/8.png" />
          <div class="name">Hendri Suwardi</div>
        </div>
      </Content>

      <h3 class="home-title">
        <p class="home-title__big">{{ $t("顾问团队") }}</p>
        <!-- <p class="home-title__little">
          Team and Advisors
        </p> -->
      </h3>
      <Content style="margin-bottom: 100px; text-align: center" class="teams">
        <div class="member">
          <img src="@/assets/team/7.png" />
          <div class="name">张晨</div>
        </div>
        <div class="member">
          <img src="@/assets/team/3.png" />
          <div class="name">Antonio Tinto</div>
        </div>
        <div class="member">
          <img src="@/assets/team/9.png" />
          <div class="name">Vincent Khoo</div>
        </div>
      </Content>

      <h3 class="home-title">
        <p class="home-title__big">{{ $t("新闻") }}</p>
      </h3>
      <Content style="margin-bottom: 100px; text-align: center" class="news">
        <div class="news-links">
          <ul>
            <li>
              <a href="https://www.ibtimes.sg/3-examples-how-decentralized-finance-integrating-traditional-financial-infrastructure-54756" target="_blank">3 Examples of How Decentralized Finance Is Integrating with Traditional Financial Infrastructure</a>
            </li>
            <li>
              <a href="https://www.benzinga.com/markets/cryptocurrency/20/12/18937751/can-defi-do-better-than-traditional-financial-institutions" target="_blank">Can DeFi Do Better Than Traditional Financial Institutions?</a>
            </li>
            <li>
              <a href="https://www.publish0x.com/analysis-from-moon/supply-chain-finance-meets-defi-on-the-amplify-b2b2c-ethereu-xlyyzgy" target="_blank">Supply Chain Finance Meets DeFi on the AMPLIFY B2B2C Ethereum-Built Infrastructure</a>
            </li>
            <li>
              <a href="https://coingape.com/how-cryptocurrencies-are-becoming-part-of-traditional-finance-sector/" target="_blank">How Cryptocurrencies Are Becoming Part Of Traditional Finance Sector</a>
            </li>
          </ul>
        </div>
        <div class="news-banner">
          <img src="@/assets/fund-raising.png" usemap="#banner-fundraising" />
          <map name="banner-fundraising">
            <area shape="rect" coords="40,166,168,198" href="https://emirex.com/investments/sfc/7" target="_blank">
          </map>
        </div>
      </Content>

      <h3 class="home-title">
        <p class="home-title__big">{{ $t("发展线路图") }}</p>
        <p class="home-title__little">Development roadmap</p>
      </h3>
      <Content style="margin-bottom: 100px; text-align: center" class="pdlr">
        <img
          class="B2B2C-img"
          :src="viewWidth > 900 ? DevelopmentImg[lang] : mDevelopmentImg[lang]"
          alt=""
        />
      </Content>
      <img class="ba-l ba-lr" src="@/assets/Background_6.png" alt="" />
      <img class="ba-r ba-lr" src="@/assets/Background_7.png" alt="" />
    </div>
    <Footer />
  </div>
</template>

<script>
import Banner from "@/views/Layout/Banner.vue";
import Content from "@/views/Layout/Content.vue";
import Footer from "@/views/Layout/Footer.vue";
import { mapState, mapMutations } from "vuex";

export default {
  name: "Home",
  components: { Banner, Content, Footer },
  data() {
    return {
      superList: [
        {
          icon: require("@/assets/CLIPBOARD.png"),
          name: "协议授信",
          text: "AMPLIFY将利用多年的供应链金融以及区块链从业经验",
        },
        {
          icon: require("@/assets/icon1.png"),
          name: "链上融资清算",
          text: "AMPLIFY认为",
        },
        {
          icon: require("@/assets/icon2.png"),
          name: "流动性支撑",
          text: "全球数字资产市场是一个去中心化的金融机构",
        },
      ],
      adviserList: [
        {
          icon: require("@/assets/touxiang.png"),
          name: "张三",
          text:
            "密码学专家，网络安全专家，资深区块链架构师，精通区块链底层及智能合约开发，拥有多个成功区块链项目开发经验。",
        },
        {
          icon: require("@/assets/touxiang.png"),
          name: "张三",
          text:
            "密码学专家，网络安全专家，资深区块链架构师，精通区块链底层及智能合约开发，拥有多个成功区块链项目开发经验。",
        },
        {
          icon: require("@/assets/touxiang.png"),
          name: "张三",
          text:
            "密码学专家，网络安全专家，资深区块链架构师，精通区块链底层及智能合约开发，拥有多个成功区块链项目开发经验。",
        },
        {
          icon: require("@/assets/touxiang.png"),
          name: "张三",
          text:
            "密码学专家，网络安全专家，资深区块链架构师，精通区块链底层及智能合约开发，拥有多个成功区块链项目开发经验。",
        },
        {
          icon: require("@/assets/touxiang.png"),
          name: "张三",
          text:
            "密码学专家，网络安全专家，资深区块链架构师，精通区块链底层及智能合约开发，拥有多个成功区块链项目开发经验。",
        },
      ],
      // B2B2CImg: {
      //   zh: require("@/assets/B2B2C_zh.png"),
      //   en: require("@/assets/B2B2C_en.png"),
      // },
      qingsuangImg: {
        zh: require("@/assets/qingsuang_zh.png"),
        en: require("@/assets/qingsuang_en.png"),
      },
      DevelopmentImg: {
        zh: require("@/assets/Development_zh.jpg"),
        en: require("@/assets/Development_en.jpg"),
      },
      mDevelopmentImg: {
        zh: require("@/assets/mDevelopment_zh.jpg"),
        en: require("@/assets/mDevelopment_en.jpg"),
      },
    };
  },
  computed: {
    ...mapState({
      lang: (state) => state.lang,
      viewWidth: (state) => state.viewWidth,
    }),
  },
  methods: {
    changeLang(lang) {
      this.$i18n.locale = lang;
      console.log(lang);
    },
  },
};
</script>
<style lang="stylus" scoped>
.home {
  overflow: hidden;
}

.home-content {
  position: relative;

  .ba-lr {
    position: absolute;
    z-index: -1;
    max-width: 38%;
  }

  .ba-l {
    left: 0;
    top: 184px;
    bottom: 60px;
  }

  .ba-r {
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
}

.home-title {
  text-align: center;
  font-size: 34px;
  font-weight: 500;
  color: #000;
  padding: 76px 20px 50px;
}

.home-title__big {
  line-height: 44px;
}

.home-title__little {
  font-size: 18px;
  font-weight: normal;
  color: #979797;
  margin-top: 5px;
}

.super-list {
  display: flex;
  text-align: center;
  padding-bottom: 46px;
}

.super-list__item {
  flex: 1;
  padding: 60px 30px;
  padding-bottom: 30px;
  border-radius: 6px;
  box-shadow: 0 0 4px -1px #000;

  &:nth-child(2) {
    margin: 0 20px;
  }

  .icon {
    margin-bottom: 59px;
  }

  .title {
    font-size: 24px;
    margin-bottom: 20px;
    font-weight: 500;
    font-family: 'Source Han Sans CN';
  }

  .text {
    font-size: 16px;
    text-align: left;
    line-height: 20px;
    letter-spacing: 1px;
    color: #828282;
  }
}

.B2B2C {
  padding: 0 50px;
}

.B2B2C-img {
  max-width: 100%;
  max-height: 100%;
}

.qingsuang {
  display: flex;
  margin-top: 129px;
}

.qingsuang-text {
  flex: 0 0 40%;
  margin-right: 30px;

  h4 {
    padding-top: 60px;
    font-weight: 500;
    font-size: 36px;
    font-family: 'Source Han Sans CN';
  }

  .text {
    padding-top: 30px;
    line-height: 30px;
    color: #979797;
    font-size: 18px;
  }
}

.qingsuang-img {
  flex: 1 1 100%;

  img {
    max-width: 100%;
  }
}

.ampt {
  margin-top: 92px;
  margin-bottom: 46px;
  padding: 117px 20px 60px;
  background: url('../assets/ampt.png') no-repeat;
  background-size: 100% 100%;
  text-align: center;

  h3 {
    font-size: 34px;
    color: #000;
    font-weight: 500;
  }

  .text {
    margin: 0 auto;
    padding-top: 50px;
    width: 70%;
    line-height: 36px;
    font-size: 24px;
    color: #5e6392;
  }
}

.text__btn {
  margin-top: 90px;

  span {
    display: inline-block;
    width: 400px;
    max-width: 70%;
    padding: 20px 0;
    border-radius: 6px;
    background-color: #5b87f7;
    text-align: center;
    color: #fff;
    font-size: 30px;
    letter-spacing: 2px;
    cursor: pointer;
  }
}

.teams {
  text-align: center;

  .member {
    width: 25%;
    display: inline-block;
    min-width: 160px;
    padding: 10px 0;

    img {
      height: 150px;
      width: 150px;
    }

    .name {
      padding: 5px 0;
    }
  }
}

@media screen and (max-width: 900px) {
  .home-content {
    .ba-lr {
      display: none;
    }
  }

  .pdlr {
    padding: 0 20px;
    box-sizing: border-box;
  }

  .super-list, .qingsuang, .news {
    flex-direction: column;
  }

  .super-list__item:nth-child(2) {
    margin: 20px 0;
  }

  .ampt {
    h3 {
    }

    .text {
      width: 95%;
      font-size: 20px;
    }
  }

  .qingsuang-text {
    .text {
      padding-top: 30px;
      padding-bottom: 10px;
    }
  }
}

.news {
  display: flex;

  .news-links {
    flex: 0 0 60%;

    ul  {
      text-align: left;
      list-style-type: circle;
      margin: 0 20px 0 40px;

      li {
        line-height 36px;
      }
    }

    a {
      position: relative;
      text-decoration: none;
      color: #337ab7;
      font-weight: bold;

      &:hover {
        color: #16aad8;
      }

    }
  }

  .news-banner {
    flex: 1 1 100%;

    img {
      width: 392px;
    }
  }

}

</style>
