declare namespace SchoolBusAPI {
  interface Line {
    id: number;
    /** 出发地 */
    departure: string;
    /** 目的地 */
    destination: string;
    /** 线路名称 */
    line: string;
    /** 出发时间 HH:mm:ss */
    startTime?: string;
    /** 是否周末 */
    type: number;
  }
}
