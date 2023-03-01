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
  }
}
