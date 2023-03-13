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
    /** 是否已处理 */
    is_processed: boolean;
    /** 内容 */
    content: string;
    img1: null | string
    img2: null | string;
    img3: null | string;
  }
}