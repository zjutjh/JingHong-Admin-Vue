declare namespace SystemInfoAPI {
  interface SystemInfo {
    is_begin: boolean;
    /** 学期字符 */
    term: "上" | "下" | "短";
    /** 学期开始时间 */
    termStartDate: string;
    /** 学年 YYYY-MM-DD */
    termYear: string;
    /** 当前时间, 没什么用 */
    time: string;
    /** 距离开学周的周数 */
    week: number;
    /** 获取分数的学期 */
    scoreTerm: string;
    /** 获取分数的学年 */
    scoreYear: string;
    /** 校车链接 */
    schoolBusUrl: string;
    /** 图片链接 */
    jpgUrl: string;
    /** 文件链接 */
    fileUrl: string;
    /** 注册提醒 */
    register: string;
  }
}
