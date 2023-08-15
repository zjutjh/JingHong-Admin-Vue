declare namespace LostfoundAPI {
  interface Item {
    id: number;
    /** 校区 */
    campus: string;
    /** 物品分类 */
    kind: string;
    /** 公布时间 */
    publish_time: string;
    /** 类型, false: 丢失, true: 招领 */
    type: boolean;
    /** 内容 */
    content: string;
    publisher: string;
    img1: null | string;
    img2: null | string;
    img3: null | string;
    item_name: string;
    lost_or_found_place: string;
    lost_or_found_time: string;
    pickup_place: string;
    /** 联系方式 */
    contact: string;
    introduction: string;
  }
}