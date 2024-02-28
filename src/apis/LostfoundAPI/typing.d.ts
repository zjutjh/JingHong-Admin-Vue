declare namespace LostfoundAPI {
  interface Item {
    id: number;

    /** 类型, false: 寻物启事, true: 失物招领 */
    type: boolean;

    /** 物品名称 */
    item_name: string;

    /** 校区 */
    campus: string;

    /** 物品分类 */
    kind: string;

    /** 公布时间 */
    publish_time: string;

    /** 物品介绍 */
    introduction: string;

    /** 遗失/拾得时间 */
    lost_or_found_time: string;

    /** 遗失/拾得地点 */
    lost_or_found_place: string;

    img1: null | string;
    img2: null | string;
    img3: null | string;
  }

  /** 寻物启事 */
  interface FoundItem extends Item {
    /** 联系方式 */
    contact: string;

    /** 发布组织 */
    publisher: string;
  }

  /** 失物招领 */
  interface LostItem extends Item {
    /** 领取地点 */
    pickup_place: string;
  }
}